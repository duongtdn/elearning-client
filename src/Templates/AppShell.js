"use strict"

import React, { Component } from 'react'

import CONST from './constant'
import href from '../lib/href'

import Navbar from './Widgets/Navbar'
import Navigator from './Widgets/Navigator'

import CourseOverview from './Pages/CourseOverview'
import StudyCentral from './Pages/StudyCentral'
import StudyProgress from './Pages/StudyProgress'

const routes = {
  overview: CourseOverview,
  study: StudyCentral,
  progress: StudyProgress
}

href.observer(evt => {
  const bookmark = href.getBookmark()
  if (bookmark === 'study') {
    const lastTopicBookmarked = localStorage.getItem(href.key.bookmark) || undefined
    const newBookmark = !(isNaN(lastTopicBookmarked) || isNaN(parseInt(lastTopicBookmarked))) ? parseInt(lastTopicBookmarked) : 1
    href.set(`#${newBookmark}`)
  }
})

export default class AppShell extends Component {
  constructor(props) {
    super(props)
    const bookmark = _validateRoute(href.getBookmark())
    const lastTopicBookmarked = _validateRoute(localStorage.getItem(href.key.bookmark) || undefined)
    this.state = {
      activeRoute: bookmark || (lastTopicBookmarked || 'overview')
    }
    !bookmark && href.set(`#${this.state.activeRoute}`)
  }
  componentDidMount() {
    console.log(this.props.user)
    console.log(this.props.content)
  }
  render() {
    return (
      <div>
        <Navbar  navigate = {route => this.navigate(route)}
        />
        <Navigator  user = {this.props.user}
                    accountClient = {this.props.accountClient}
                    template = {this.props.template}
                    routes = {routes}
                    activeRoute = {this.state.activeRoute}
                    navigate = {route => this.navigate(route)}
                    content = {this.props.content}
                    progress = {this.props.progress}
                    updateProgress = {this.props.updateProgress}
        />
      </div>
    )
  }
  navigate(route) {
    setTimeout( _ => href.set(`#${route}`), 0)
    this.setState({activeRoute: route})
  }
}

function _validateRoute(route) {
  if (!isNaN(route)) { return 'study' }
  if (!route) { return undefined }
  if (routes[route]) {
    return route
  } else {
    return undefined
  }
}
