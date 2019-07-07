"use strict"

import React, { Component } from 'react'

import href from '../../lib/href'

import TopicDropBox from '../Widgets/TopicDropBox'
import LessonList from '../Widgets/LessonList'
import LessonPlayer from '../Widgets/LessonPlayer'

export default class StudyCentral extends Component {
  constructor(props) {
    super(props)
    const bookmark = href.getBookmark()
    const topicIndexFromBookmark = (isNaN(bookmark) || isNaN(parseInt(bookmark))) ? 0 : parseInt(bookmark-1)
    this.state = {
      currentTopicIndex: (topicIndexFromBookmark < 0 || topicIndexFromBookmark >= props.content.topics.length) ? 0 : topicIndexFromBookmark,
      currentLessonIndex: 0
    }
  }
  render() {
    const content = this.props.content
    const topic = content.topics[this.state.currentTopicIndex]
    const lesson = topic.lessons[this.state.currentLessonIndex]
    return (
      <div className="w3-container">
        <TopicDropBox content = {content}
                      currentTopicIndex = {this.state.currentTopicIndex}
                      onSelectTopic = { index => { this.setState({currentTopicIndex: index}) } }
        />
        <LessonPlayer lesson = {lesson}
                      moveToPreviousLesson = {() => {this.setState({currentLessonIndex: this.state.currentLessonIndex - 1})}}
                      moveToNextLesson = {() => {this.setState({currentLessonIndex: this.state.currentLessonIndex + 1})}}
        />
        <LessonList topic = {topic}
                    currentIndex = {this.state.currentLessonIndex}
                    onSelectLesson = { index => this.setState({currentLessonIndex: index}) }
        />
      </div>
    )
  }
}
