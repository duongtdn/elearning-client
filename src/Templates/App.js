"use strict"

import React, { Component } from 'react'

import { Navigator } from '@realmjs/react-navi'

import CourseOverview from './Pages/CourseOverview'
import StudyRoom from './Pages/StudyRoom'
import StudyProgress from './Pages/StudyProgress'
import Sidebar from './Widgets/Sidebar'
import Header from './Widgets/Header'
import Footer from './Widgets/Footer'


const routes = {
  overview: { Page: CourseOverview, url: '/:id/overview'},
  room: { Page: StudyRoom, url: '/:id/room'},
  progress: { Page: StudyProgress, url: '/:id/progress'},
};

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.user) return null;
    return (
      <div>
        <Sidebar contentId = {this.props.contentId} />
        <div className="w3-cell-row" >
          <div className="w3-cell w3-hide-small" style={{width: '60px'}}/>
          <div className="w3-cell">
            <Header {...this.props} />
            <Navigator  routes = {routes}
                        initialRoute = 'overview'
                        fallbackRoute = 'overview'
                        {...this.props}
            />
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}
