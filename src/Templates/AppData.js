"use strict"

import React, { Component } from 'react'

import AppShell from './AppShell'
import Error from './Error'

export default class AppData extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.user === null) { return null }
    if (this.props.user === undefined) {
      return (<Error code = '403' message = 'Forbidden' />)
    } else {
      return (
        <AppShell user = {this.props.user}
                  accountClient = {this.props.accountClient}
                  template = {this.props.template}
        />          
      )
    }
  }
}