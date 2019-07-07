"use strict"

import React, { Component } from 'react'

import Header from './Header'

export default class Navigator extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="w3-cell-row" >
        <div className="w3-cell w3-hide-small" style={{width: '60px'}}/>
        <div className="w3-cell" >
          <Header user = {this.props.user}
                  accountClient = {this.props.accountClient}
                  template = {this.props.template}
          />
          <div>{
            Object.keys(this.props.routes).map(route => {
              const page = this.props.routes[route]
              const display = this.props.activeRoute === route ? 'block' : 'none'
              return (
                <div key={route} style={{ display }} >
                {React.createElement(page, {content: this.props.content})}
                </div>
              )
            })
          }</div>
        </div>
      </div>
    )
  }
}
