"use strict"

import React, { Component } from 'react'

import Header from './Header'

export default class Navigator extends Component {
  constructor(props) {
    super(props)
    this.routes =[]
  }
  render() {
    const activeRoute = this.props.activeRoute
    if (this.routes.indexOf(activeRoute) === -1) { this.routes.push(activeRoute)}
    return (
      <div className="w3-cell-row" >
        <div className="w3-cell w3-hide-small" style={{width: '60px'}}/>
        <div className="w3-cell" >
          <Header user = {this.props.user}
                  accountClient = {this.props.accountClient}
                  env = {this.props.env}
          />
          <div>{
            this.routes.map(route => {
              const page = this.props.routes[route]
              const display = activeRoute === route ? 'block' : 'none'
              return (
                <div key={route} style={{ display }} >
                  { React.createElement( page, {
                      user: this.props.user,
                      content: this.props.content,
                      tests: this.props.tests,
                      progress: this.props.progress,
                      updateProgress: this.props.updateProgress,
                      navigate: this.props.navigate,
                      env: this.props.env
                  }) }
                </div>
              )
            })
          }</div>
        </div>
      </div>
    )
  }
}
