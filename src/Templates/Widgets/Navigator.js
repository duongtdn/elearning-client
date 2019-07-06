"use strict"

import React, { Component } from 'react'

import media from 'media-query'

import Header from './Header'

export default class Navigator extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (media.isSmall()) {
      return this._renderInSmallDevice()
    } else {
      return this._renderInMediumDevice()
    }
  }
  _renderPage(page) {
    return(
      <div>
        <Header user = {this.props.user}
                accountClient = {this.props.accountClient}
                template = {this.props.template}
        />
        <div>
          {React.createElement(page, {content: this.props.content})}
        </div>
      </div>
    )
  }
  _renderInMediumDevice() {
    return (
      <div className="w3-hide-small" style={{position: 'relative', marginLeft: '60px'}}>
        {this._renderPage(this.props.route)}
      </div>
    )
  }
  _renderInSmallDevice() {
    return (
      <div className="w3-hide-medium w3-hide-large" style={{position: 'relative'}}>
        {this._renderPage(this.props.route)}
      </div>
    )
  }
}
