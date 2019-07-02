"use strict"

import React, { Component } from 'react'

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        {this._renderInMediumDevice()}
      </div>
    )
  }
  _renderInMediumDevice() {
    return (
      <div className="w3-sidebar w3-bar-block w3-border-right w3-green w3-xlarge w3-hide-small" style={{width: '60px', paddingTop: '16px'}}>
        <a href="#" className="w3-bar-item w3-button"><i className="fa fa-home"/></a>
        <a href="#" className="w3-bar-item w3-button"><i className="fa fa-search"/></a>
        <a href="#" className="w3-bar-item w3-button"><i className="fa fa-envelope"/></a>
      </div>
    )
  }
}
