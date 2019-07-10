"use strict"

import React, { Component } from 'react'

export default class CourseOverview extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const user = this.props.user
    const content = this.props.content
    return (
      <div className="w3-container">
        <h4> Course Overview </h4>
        <hr />

        <div>
          <h5 className="w3-text-blue"> Instructor Note </h5>
          <div className="w3-panel w3-leftbar w3-sand w3-large note">
            <p> Dear {user.profile.displayName} </p>
            <p dangerouslySetInnerHTML={createMarkup(content.note)} />
          </div>
        </div>

        <div>
          <h5 className="w3-text-blue"> Content </h5>
        </div>

      </div>
    )
  }
}

function createMarkup(html) {
  return {__html: html};
}
