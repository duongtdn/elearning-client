"use strict"

import React, { Component } from 'react'

import { xhttp } from 'authenform-utils'

import href from '../lib/href'
import AppShell from './AppShell'
import Error from './Error'
import Loading from './Loading'

const query = href.getQuery()

const progress = {
  key: '__$_Progress__',
  config(options) {
    for (let key in options) {
      this[key] = options[key]
    }
  },
  get(done) {
    // get progress from server. meanwhile return a local storage version (cached) if any
    xhttp.get(`${this.urlBasePath}/progress?c=${query.c}`,
      { authen: true },
      (status, response) => {
        this.clear()
        if (status === 200 || status === 404) {
          const data = JSON.parse(response)
          if (data && data.progress) {
            this.store(data.progress)
            done && done(data.progress)
          } else {
            done && done(null)
          }
        } else {
          console.error(status)
        }
      }
    )
    return localStorage.getItem('__$_Progress__') && JSON.parse(localStorage.getItem(this.key) )
  },
  update(progress, done) {
    const updatedProgress = this.store(progress)
    xhttp.put(`${this.urlBasePath}/progress`,
      { id: query.c, progress },
      { authen: true },
      (status) => {
        if (status === 200) {
          done && done(updatedProgress)
        } else {
          console.error(status)
        }
      }
    )
    return updatedProgress
  },
  store(progress) {
    const storedProgress = JSON.parse(localStorage.getItem('__$_Progress__') ) || {}
    for (let t in progress) {
      storedProgress[t] = {...storedProgress[t], ...progress[t]}
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
    progress.config({urlBasePath: this.props.urlBasePath || ''})
    this.state = {
      loading: true,
      err: null,
      content: null,
      progress: progress.get(progress => this.setState({progress}))
    }
    this.loadContent().then( content => this.setState({loading: false, content})).catch(err => this.setState({loading: false, err}))
  }
  render() {
    if (!query || !query.c) {
      return (<Error code = '400' message = 'Invalid query' />)
    }
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
      <AppShell user = {this.props.user}
                accountClient = {this.props.accountClient}
                template = {this.props.template}
                content = {this.state.content}
                progress = {this.state.progress}
                updateProgress = { p => this.setState({ progress: progress.update(p) }) }
      />
    )
  }
  loadContent() {
    const urlBasePath = this.props.urlBasePath || ''
    return new Promise((resolve, reject) => {
      xhttp.get(`${urlBasePath}/content?c=${query.c}`,
        { authen: true },
        (status, response) => {
          if (status === 200) {
            const content = JSON.parse(response)
            resolve(content)
          } else {
            reject(status)
          }
        }
      )
    })
  }
}
