"use strict"

import React, { Component } from 'react'

import Sidebar from './Widgets/Sidebar'
import Navigator from './Widgets/Navigator'

export default class AppShell extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log(this.props.user)
  }
  render() {
    return (
      <div>
        <Sidebar />
        <Navigator  user = {this.props.user}
                    accountClient = {this.props.accountClient}
                    template = {this.props.template}
        />
      </div>
    )
  }
}