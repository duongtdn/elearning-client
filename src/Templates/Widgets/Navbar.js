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
        {this._renderInSmallDevice()}
      </div>
    )
  }
  _renderInMediumDevice() {
    return (
      <div className="w3-sidebar w3-black w3-border-grey w3-xlarge w3-hide-small" style={{width: '60px'}}>
        <button className="w3-bar-item w3-button" onClick={e => this.props.navigate('courseOverview')}><i className="fa fa-home"/></button>
        <button className="w3-bar-item w3-button" onClick={e => this.props.navigate('studyCentral')}><i className="fa fa-tv"/></button>
        <button className="w3-bar-item w3-button" onClick={e => this.props.navigate('studyProgress')}><i className="fa fa-bar-chart"/></button>
      </div>
    )
  }
  _renderInSmallDevice() {
    return (
      <div className="w3-bar w3-black w3-hide-medium w3-hide-large">
        <div className="w3-right">
        <button className="w3-bar-item w3-button" onClick={e => this.props.navigate('courseOverview')}><i className="fa fa-home"/></button>
        <button className="w3-bar-item w3-button" onClick={e => this.props.navigate('studyCentral')}><i className="fa fa-tv"/></button>
        <button className="w3-bar-item w3-button" onClick={e => this.props.navigate('studyProgress')}><i className="fa fa-bar-chart"/></button>
      </div>
      </div>
    )
  }
}
