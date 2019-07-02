"use strict"

import React, { Component } from 'react'

import Header from './Header'
import Navbar from './Navbar'

export default class Navigator extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        {this._renderInMediumDevice()}
        {this._renderInSmallDevice()}
      </div>
    )
  }
  _renderPage() {
    return(
      <div>
        <Header user = {this.props.user}
                accountClient = {this.props.accountClient}
                template = {this.props.template}
        />
        <Navbar />
        <div className="w3-container">
          <h3 className="w3-text-blue"> Navigator </h3>
        </div>
      </div>
    )
  }
  _renderInMediumDevice() {
    return (
      <div className="w3-hide-small" style={{position: 'relative', marginLeft: '60px'}}>
        {this._renderPage()}
      </div>
    )
  }
  _renderInSmallDevice() {
    return (
      <div className="w3-hide-medium w3-hide-large" style={{position: 'relative'}}>
        {this._renderPage()}
      </div>
    )
  }
}
