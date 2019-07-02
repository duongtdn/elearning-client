"use strict"

import React, { Component } from 'react'

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
  _renderInMediumDevice() {
    return (
      <div className="w3-container w3-hide-small" style={{position: 'relative', marginLeft: '60px'}}>
        <h3 className="w3-text-blue"> Navigator </h3>
      </div>
    )
  }
  _renderInSmallDevice() {
    return (
      <div className="w3-container w3-hide-medium w3-hide-large" style={{position: 'relative'}}>
        <h3 className="w3-text-blue"> Navigator </h3>
      </div>
    )
  }
}
