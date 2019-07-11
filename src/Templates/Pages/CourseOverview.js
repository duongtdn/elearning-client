"use strict"

import React, { Component } from 'react'

class Title extends Component {
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

export default class CourseOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showInstructorNote: true,
      showTableOfContent: true,
      showMaterials: true
    }
  }
  render() {
    const user = this.props.user
    const content = this.props.content
    return (
      <div className="w3-container">
        <h4> Course Overview </h4>
        <hr />

        <div>
          <Title label="Instructor Note" onClick={show => this.setState({ showInstructorNote: show })} />
          <div className="w3-panel w3-leftbar w3-sand w3-large note" style={{display: this.state.showInstructorNote? 'block': 'none'}}>
            <p> Dear {user.profile.displayName} </p>
            <p style={{maxWidth: '1200px'}} dangerouslySetInnerHTML={createMarkup(content.note)} />
          </div>
          <div className="w3-panel w3-leftbar w3-sand note w3-text-grey" style={{display: !this.state.showInstructorNote? 'block': 'none'}}>
            <p> . . . </p>
          </div>
        </div>

        <div>
          <Title label="Content" onClick={show => this.setState({ showTableOfContent: show })} />
          <div style={{display: this.state.showTableOfContent? 'block': 'none'}}>
            { content.parts.map( (part, index) => {
                const topics = content.topics.filter( topic => topic.part === part.id)
                return (
                <div className="" key={part.id}>
                  <p className="w3-border-bottom" style={{fontStyle: 'italic'}}> Part {index+1}: {part.title} </p>
                  <ul className="w3-ul">
                    { topics.map(topic => {
                      return (
                        <li className="w3-border-0" key={topic.id}> {topic.title} </li>
                      )
                    })}
                  </ul>
                </div>
                )
            }) }
          </div>
          <div className="w3-text-grey" style={{display: !this.state.showTableOfContent? 'block': 'none'}}>
            <p style={{fontStyle: 'italic'}}> Table of Contents... </p>
          </div>
        </div>

        <div>
          <Title label="Materials" onClick={show => this.setState({ showMaterials: show })} />
          <div className="" style={{display: this.state.showMaterials? 'block': 'none'}}>
            <ul className="w3-ul">
              { content.materials.map( (material, index) => (
                <li key={index} className="w3-display-container">
                  {material.title}
                  <a href={material.url} target="_blank" className="w3-button w3-display-right w3-text-blue w3-large">
                    <i className={`fa fa-${material.downloadable?'cloud-download':'external-link'}`} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="w3-text-grey" style={{display: !this.state.showMaterials? 'block': 'none'}}>
            <p style={{fontStyle: 'italic'}}> List of materials </p>
          </div>
        </div>

      </div>
    )
  }
}

function createMarkup(html) {
  return {__html: html};
}
