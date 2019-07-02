"use strict"

import React, { Component } from 'react'

import Header from './Widgets/Header'
import Sidebar from './Widgets/Sidebar'
import Navigator from './Widgets/Navigator'

export default class AppShell extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Navigator />
      </div>
    )
  }
}