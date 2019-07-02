"use strict"

import React, { Component } from 'react'

export default class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="w3-bar w3-blue">
        <a href="#" className="w3-bar-item w3-button">Header</a>
      </div>
    )
  }
}
