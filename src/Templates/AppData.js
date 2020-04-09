"use strict"

import React, { Component } from 'react'

import xhttp from '@realmjs/xhttp-request'

import App from './App'
import Error from './Error'
import Loading from './Loading'

const progress = {
  key: '__$_Progress__',
  config(options) {
    for (let key in options) {
      this[key] = options[key]
    }
  },
  content: null,
  get(done) {
    if (!this.contentId) {
      return null
    }
    // get progress from server. meanwhile return a local storage version (cached) if any
    xhttp.get(`${this.urlBasePath}/progress?c=${this.contentId}`, { authen: true })
    .then( ({status, responseText}) => {
      this.clear()
      if (status === 200) {
        const data = JSON.parse(responseText)
        if (data) {
          this.store(data)
          done && done(data)
        } else {
          done && done(null)
        }
      } else {
        console.error(status)
        done && done(null)
      }
    })
    return localStorage.getItem(this.key) && JSON.parse(localStorage.getItem(this.key) )
  },
  update(progress, setFlag, done) {
    console.log(`update progress with flag is ${setFlag}`)
    const updatedProgress = this.store(progress)
    xhttp.put(`${this.urlBasePath}/progress`, { id: this.contentId, progress, setFlag }, { authen: true })
    .then( ({status}) => {
      if (status === 200) {
        done && done(updatedProgress)
      } else {
        console.error(status)
      }
    })
    return updatedProgress
  },
  store(progress) {
    const storedProgress = JSON.parse(localStorage.getItem(this.key) ) || { study: {}, test: {} }
    for (let t in progress.study) {
      storedProgress.study[t] = {...storedProgress.study[t], ...progress.study[t]}
    }
    for (let t in progress.test) {
      storedProgress.test[t] = {...storedProgress.test[t], ...progress.test[t]}
    }
    localStorage.setItem(this.key, JSON.stringify(storedProgress))
    return storedProgress
  },
  clear() {
    localStorage.removeItem(this.key)
    return this
  }
}

export default class AppData extends Component {
  constructor(props) {
    super(props)

    progress.config({urlBasePath: props.env.urlBasePath || '', contentId: props.contentId})
    this._queueFn = []
    this.state = {
      loading: true,
      err: null,
      content: null,
      progress: progress.get(pg => {
        if (!pg) {
          // init progress for the first time
          if (this.state.loading) {
            // content is not loaded yet, defer init progress
            this._queueFn.push('initProgress')
          } else {
            this.initProgress(this.state.content)
          }
        } else {
          this.setState({progress: pg})
        }
      })
    }
    this.loadContent(props.contentId)
    .then(content => {
      if (this._queueFn.length > 0) {
        this[this._queueFn.pop()](content)
      }
      this.setState({loading: false, content})
    })
    .catch(err => {
      this.setState({loading: false, err})
    })
  }
  initProgress(content) {
    if (content) {
      const study = {}
      const test = {}
      content.topics.forEach(topic => {
        study[topic.id] = {}
        topic.lessons.forEach(lesson => study[topic.id][lesson.id] = false )
      })
      content.tests.forEach(t => {
        test[t.examId] = {}
      })
      this.setState({ progress: progress.update({study, test}, true) })
    }
  }
  render() {
    if (this.props.user === null) { return null }
    if (this.props.user === undefined) {
      return (<Error code = '403' message = 'Forbidden' />)
    }
    if (this.state.loading) {
      return(<Loading />)
    }
    if (this.state.err) {
      return(<Error code = {this.state.err} message = 'Error found' />)
    }
    return (
      <App  {...this.props}
            content = {this.state.content}
            progress = {this.state.progress}
            updateProgress = { p => this.setState({ progress: progress.update(p) }) }
      />
    )
  }
  loadContent(contentId) {
    const urlBasePath = this.props.env.urlBasePath || ''
    return new Promise((resolve, reject) => {
      xhttp.get(`${urlBasePath}/content?c=${contentId}`, { authen: true })
      .then( ({status, responseText}) => {
        if (status === 200) {
          const content = JSON.parse(responseText)
          resolve(content)
        } else {
          reject(status)
        }
      })
      .catch(err => console.log(err))
    })
  }
}
