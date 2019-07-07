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

    const methods = ['moveToNextLesson', 'moveToPreviousLesson']
    methods.forEach(method => this[method] = this[method].bind(this))

    setTimeout( _ => href.set(`#${this.state.currentTopicIndex+1}`), 0)
  }
  render() {
    href.set(`#${this.state.currentTopicIndex+1}`)
    const content = this.props.content
    const topic = content.topics[this.state.currentTopicIndex]
    const lesson = topic.lessons[this.state.currentLessonIndex]
    return (
      <div className="w3-container">
        <TopicDropBox content = {content}
                      currentTopicIndex = {this.state.currentTopicIndex}
                      onSelectTopic = { index => { this.setState({currentTopicIndex: index}) } }
        />
        <div className="row" style={{margin: '16px 0'}}>
          <div className="w3-threequarter">
            <LessonPlayer lesson = {lesson}
                          moveToPreviousLesson = {this.moveToPreviousLesson}
                          moveToNextLesson = {this.moveToNextLesson}
            />
            <div className="w3-hide-small w3-hide-large">
              <LessonList topic = {topic}
                          currentIndex = {this.state.currentLessonIndex}
                          onSelectLesson = { index => this.setState({currentLessonIndex: index}) }
              />
            </div>
          </div>
          <div className="w3-quarter w3-container w3-hide-medium">
            <LessonList topic = {topic}
                        currentIndex = {this.state.currentLessonIndex}
                        onSelectLesson = { index => this.setState({currentLessonIndex: index}) }
            />
          </div>
        </div>
      </div>
    )
  }
  moveToNextLesson() {
    const {currentTopicIndex, currentLessonIndex}  = {...this.state}
    const topics = this.props.content.topics
    const currentTopic = topics[currentTopicIndex]
    if (currentLessonIndex >= currentTopic.lessons.length - 1) {
      if (currentTopicIndex >= topics.length - 1) {
        console.log('reach end of course')
        this.props.navigate && this.props.navigate('progress')
      } else {
        this.setState({currentLessonIndex: 0, currentTopicIndex: currentTopicIndex + 1})
      }
    } else {
      this.setState({currentLessonIndex: currentLessonIndex + 1})
    }
  }
  moveToPreviousLesson() {
    const {currentTopicIndex, currentLessonIndex}  = {...this.state}
    const topics = this.props.content.topics
    if (currentLessonIndex <= 0) {
      if (currentTopicIndex <= 0) {
        console.log('reach begin of course')
      } else {
        const prevTopic = topics[currentTopicIndex-1]
        this.setState({currentLessonIndex: prevTopic.lessons.length-1, currentTopicIndex: currentTopicIndex - 1})
      }
    } else {
      this.setState({currentLessonIndex: currentLessonIndex - 1})
    }
  }
}
