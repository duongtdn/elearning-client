"use strict"

import React, { Component } from 'react'
import { nav } from '@realmjs/react-navi'

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
    const data = { id: this.props.contentId}
    return (
      <div className="w3-sidebar w3-bar-block w3-black w3-border-grey w3-xlarge w3-hide-small" style={{width: '60px'}}>
        <a className="w3-bar-item w3-button" onClick={e => nav.navigate('overview', {data})}><i className="fas fa-home"/></a>
        <a className="w3-bar-item w3-button" onClick={e => nav.navigate('room', {data})}><i className="fas fa-tv"/></a>
        <a className="w3-bar-item w3-button" onClick={e => nav.navigate('progress', {data})}><i className="fas fa-chart-bar"/></a>
      </div>
    )
  }
  _renderInSmallDevice() {
    const data = { id: this.props.contentId}
    return (
      <div className="w3-bar w3-black w3-hide-medium w3-hide-large">
        <div className="w3-right">
          <a className="w3-bar-item w3-button" onClick={e => nav.navigate('overview', {data})}><i className="fas fa-home"/></a>
          <a className="w3-bar-item w3-button" onClick={e => nav.navigate('room', {data})}><i className="fas fa-tv"/></a>
          <a className="w3-bar-item w3-button" onClick={e => nav.navigate('progress', {data})}><i className="fas fa-chart-bar"/></a>
        </div>
      </div>
    )
  }
}
