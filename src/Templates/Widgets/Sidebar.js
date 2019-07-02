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
      <div className="w3-sidebar w3-bar-block w3-border-right w3-border-grey w3-xlarge w3-hide-small" style={{width: '60px'}}>
        <button className="w3-bar-item w3-button" onClick={e => this.props.navigate('courseOverview')}><i className="fa fa-home"/></button>
        <button className="w3-bar-item w3-button" onClick={e => this.props.navigate('studyCentral')}><i className="fa fa-tv"/></button>
        <button className="w3-bar-item w3-button" onClick={e => this.props.navigate('studyProgress')}><i className="fa fa-bar-chart"/></button>
      </div>
    )
  }
}
