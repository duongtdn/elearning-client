"use strict"

import React, { Component } from 'react'

export default class Loading extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className="w3-container">
        <div style={{margin: '64px auto', textAlign: 'center'}}>
          <i className = "w3-spin w3-xxlarge fa fa-spinner" />
          <h4 className="w3-text-red"> Loading... </h4>
        </div>
      </div>
    )
  }
}
