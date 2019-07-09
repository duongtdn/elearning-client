"use strict"

import React, { Component } from 'react'

export default class TopicDropBox extends Component {
  constructor(props) {
    super(props)
    this.state = {showDropdown: false}
  }
  render() {
    const content = this.props.content;
    const topics = content.topics
    const currentTopic = topics[this.props.currentTopicIndex]
    const parts = content.parts
    const completion = this._findCompletedTopics()
    const drop = this.state.showDropdown ? 'w3-show' : 'w3-hide'
    return (
      <div className="w3-bar w3-border-grey" >

        <a href="#" className="w3-bar-item w3-button w3-border-left" onClick={e => {this.setState({showDropdown: !this.state.showDropdown})}}> 
          <span > Topic {this.props.currentTopicIndex+1} </span> &nbsp;
          <span className="w3-hide-small">
            <i className="fa fa-angle-right"></i>
            &nbsp; {currentTopic.title}
          </span>
          &nbsp; <i className={`fa ${this.state.showDropdown?'fa-caret-up':'fa-caret-down'}`}></i>
        </a>

        <div className={`w3-light-grey ${drop}`} style={{padding: 0, width: '100%', zIndex: 999}}>
          {
            parts.map((part,index) => (
              <div key={index} style={{display: 'inline-block', width: '100%', margin: '16px 0'}} >
                <div className='w3-container w3-text-blue' >
                  Part {index}: {part.title}
                </div>
                {
                  topics.map((topic,index) => {
                    if (topic.part === part.id) {
                      return (
                        <a key = {index} href={`#${index+1}`} className="w3-button w3-border-bottom" style={{width: '100%', textAlign: 'left'}} onClick={() => this.changeTopic(index)}> 
                          <div style={{position: 'relative'}}>
                            <div style={{fontStyle: 'italic'}}>
                              <div className="w3-text-blue-grey w3-small"> Topic {index+1} </div>
                              <div style={{whiteSpace: 'normal'}} > {topic.title} </div>
                            </div>
                            <div className="w3-text-green" style={{display: `${completion[topic.id]?'block':'none'}`, position: 'absolute', top: 0, right: 0}}>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </div>
                          </div>
                        </a>
                      )
                    }
                  })
                }
              </div>
            ))
          }
        </div>

      </div>
    )
  }
  changeTopic(index) {
    this.props.onSelectTopic && this.props.onSelectTopic(index)
    this.setState({ showDropdown: false })
  }
  _findCompletedTopics() {
    const progress = this.props.progress
    const content = this.props.content;
    const topics = content.topics
    const completed = {}
    for (let t in progress) {
      const topic = topics.find(_t => _t.id === t)
      completed[t] = topic.lessons.every(lesson => progress[t][lesson.id] === true)
    }
    return completed
  }
}
