"use strict"

import React, { Component } from 'react'

export default class Title extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDropdown: this.props.init === 'up'? false : true
    }
    this.onClick = this.onClick.bind(this)
  }
  render() {
    return (
      <h5 className="w3-text-blue" style={{margin: '32px 0 16px 0'}} >
        <span className="cursor-pointer" onClick={this.onClick}>
          {this.props.label}
          &nbsp; <i className={`fa ${this.state.showDropdown?'fa-caret-up':'fa-caret-down'}`} />
        </span>
      </h5>
    )
  }
  onClick() {
    this.setState({ showDropdown: !this.state.showDropdown })
    this.props.onClick && this.props.onClick(!this.state.showDropdown)
  }
}
