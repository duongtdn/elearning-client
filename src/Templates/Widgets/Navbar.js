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
      <div className="w3-sidebar w3-bar-block w3-black w3-border-grey w3-xlarge w3-hide-small" style={{width: '60px'}}>
        <a href="#overview" className="w3-bar-item w3-button" onClick={e => this.props.navigate('overview')}><i className="fa fa-home"/></a>
        <a href="#study" className="w3-bar-item w3-button" onClick={e => this.props.navigate('study')}><i className="fa fa-tv"/></a>
        <a href="#progress" className="w3-bar-item w3-button" onClick={e => this.props.navigate('progress')}><i className="fa fa-bar-chart"/></a>
      </div>
    )
  }
  _renderInSmallDevice() {
    return (
      <div className="w3-bar w3-black w3-hide-medium w3-hide-large">
        <div className="w3-right">
          <a href="#overview" className="w3-bar-item w3-button" onClick={e => this.props.navigate('overview')}><i className="fa fa-home"/></a>
          <a href="#study" className="w3-bar-item w3-button" onClick={e => this.props.navigate('study')}><i className="fa fa-tv"/></a>
          <a href="#progress" className="w3-bar-item w3-button" onClick={e => this.props.navigate('progress')}><i className="fa fa-bar-chart"/></a>
        </div>
      </div>
    )
  }
}
