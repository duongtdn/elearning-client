"use strict"

import React, { Component } from 'react'

import TopicDropBox from '../Widgets/TopicDropBox'
import LessonList from '../Widgets/LessonList'

export default class StudyCentral extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTopicIndex: 0,
      currentLessonIndex: 0
    }
  }
  render() {
    const content = this.props.content
    return (
      <div className="w3-container">
        <TopicDropBox content = {content}
                      currentTopicIndex = {this.state.currentTopicIndex}
                      onSelectTopic = { index => { this.setState({currentTopicIndex: index}) } }
        />
        <LessonList topic = {content.topics[this.state.currentTopicIndex]}
                    currentIndex = {this.state.currentLessonIndex}
                    onSelectLesson = { index => this.setState({currentLessonIndex: index}) }
        />
      </div>
    )
  }
}
