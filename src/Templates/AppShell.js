"use strict"

import React, { Component } from 'react'

import Navbar from './Widgets/Navbar'
import Navigator from './Widgets/Navigator'

import CourseOverview from './Pages/CourseOverview'
import StudyCentral from './Pages/StudyCentral'
import StudyProgress from './Pages/StudyProgress'

const routes = {
  courseOverview: <CourseOverview />,
  studyCentral: <StudyCentral />,
  studyProgress: <StudyProgress />
}

export default class AppShell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeRoute: 'courseOverview'
    }
  }
  componentDidMount() {
    console.log(this.props.user)
  }
  render() {
    return (
      <div>
        <Navbar  navigate = {activeRoute => this.setState({activeRoute})}
        />
        <Navigator  user = {this.props.user}
                    accountClient = {this.props.accountClient}
                    template = {this.props.template}
                    route = {routes[this.state.activeRoute]}
        />
      </div>
    )
  }
}
