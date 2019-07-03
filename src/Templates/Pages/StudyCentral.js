"use strict"

import React, { Component } from 'react'

import TopicDropBox from '../Widgets/TopicDropBox'

export default class StudyCentral extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTopicIndex: 0,
      currentLessonIndex: 0
    }
  }
  render() {
    return (
      <div className="w3-container">
        <TopicDropBox content = {this.props.content}
                      currentTopicIndex = {this.state.currentTopicIndex}
                      onSelectTopic = { index => { this.setState({currentTopicIndex: index}) } }
        />
      </div>
    )
  }
}
