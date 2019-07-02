"use strict"

import React, { Component } from 'react'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="w3-bar w3-hide-medium w3-hide-large">
        <a href="#" className="w3-bar-item w3-button"><i className="fa fa-home"/></a>
        <a href="#" className="w3-bar-item w3-button"><i className="fa fa-search"/></a>
        <a href="#" className="w3-bar-item w3-button"><i className="fa fa-envelope"/></a>
      </div>
    )
  }
}
