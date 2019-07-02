"use strict"

import React, { Component } from 'react'

export default class Error extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className="w3-container">
        <h4 className="w3-text-red"> Error {this.props.code} </h4>
        <p className="w3-text-grey"> {this.props.message} </p>
      </div>
    )
  }
}