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
    const lastTopicBookmarked = localStorage.getItem(href.key.bookmark) || undefined
    const topicIndexFromBookmark = !(isNaN(bookmark) || isNaN(parseInt(bookmark))) ? parseInt(bookmark-1)
                                      : !(isNaN(lastTopicBookmarked) || isNaN(parseInt(lastTopicBookmarked))) ? parseInt(lastTopicBookmarked-1)
                                      : 0

    this.state = {
      currentTopicIndex: (topicIndexFromBookmark < 0 || topicIndexFromBookmark >= props.content.topics.length) ? 0 : topicIndexFromBookmark,
      currentLessonIndex: 0,
      currentSubLessonIndex: null
    }

    const methods = ['moveToNextLesson', 'moveToPreviousLesson', 'onLessonCompleted']
    methods.forEach(method => this[method] = this[method].bind(this))

    setTimeout( _ => this._setBookmark(), 0)
  }
  render() {
    this._setBookmark()
    const content = this.props.content
    const topic = content.topics[this.state.currentTopicIndex]
    const lesson = this.state.currentSubLessonIndex === null ?
                      topic.lessons[this.state.currentLessonIndex] :
                      topic.lessons[this.state.currentLessonIndex].subLessons[this.state.currentSubLessonIndex]
    return (
      <div className="w3-container">
        <TopicDropBox content = {content}
                      currentTopicIndex = {this.state.currentTopicIndex}
                      onSelectTopic = { index => { this.setState({currentTopicIndex: index}) } }
                      progress = {this.props.progress}
        />
        <div className="row" style={{margin: '16px 0'}}>
          <div className="w3-threequarter">
            <LessonPlayer lesson = {lesson}
                          moveToPreviousLesson = {this.moveToPreviousLesson}
                          moveToNextLesson = {this.moveToNextLesson}
                          onLessonCompleted = {this.onLessonCompleted}
                          env = {this.props.env}
            />
            <div className="w3-hide-small w3-hide-large">
              <LessonList topic = {topic}
                          currentIndex = {this.state.currentLessonIndex}
                          onSelectLesson = { index => this.setState({currentLessonIndex: index}) }
                          progress = {this.props.progress}
              />
            </div>
          </div>
          <div className="w3-quarter w3-container w3-hide-medium">
            <LessonList topic = {topic}
                        currentIndex = {this.state.currentLessonIndex}
                        onSelectLesson = { index => this.setState({currentLessonIndex: index}) }
                        progress = {this.props.progress}
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
        this.setState({currentLessonIndex: 0, currentSubLessonIndex: null, currentTopicIndex: currentTopicIndex + 1})
      }
    } else {
      this.setState({currentLessonIndex: currentLessonIndex + 1, currentSubLessonIndex: null})
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
        this.setState({currentLessonIndex: prevTopic.lessons.length-1, currentSubLessonIndex: null,currentTopicIndex: currentTopicIndex - 1})
      }
    } else {
      this.setState({currentLessonIndex: currentLessonIndex - 1, currentSubLessonIndex: null})
    }
  }
  onLessonCompleted(id, evt) {
    console.log(`Completed Lesson ${id}`)

    const content = this.props.content
    const topic = content.topics[this.state.currentTopicIndex]
    const lesson = topic.lessons[this.state.currentLessonIndex]

    if (!lesson.subLessons) {
      this._completeAndMoveToNextLesson()
      return
    }

    let nextSubLessonIndex = this.state.currentSubLessonIndex === null ? 0 : this.state.currentSubLessonIndex + 1
    if (lesson.subLessons[this.state.currentSubLessonIndex] && lesson.subLessons[this.state.currentSubLessonIndex].skip) {
      nextSubLessonIndex = nextSubLessonIndex + parseInt(lesson.subLessons[this.state.currentSubLessonIndex].skip)
    }
    if (evt) {
      if (evt.skip) { nextSubLessonIndex = nextSubLessonIndex + parseInt(evt.skip) }
      if (evt.next) { nextSubLessonIndex = lesson.subLessons.findIndex(l => l.id === evt.next) }
    }

    if (lesson.subLessons[nextSubLessonIndex]) {
      // load sub lesson
      this.setState({ currentSubLessonIndex:  nextSubLessonIndex})
    } else {
      this._completeAndMoveToNextLesson()
    }
  }
  _completeAndMoveToNextLesson() {
    const content = this.props.content
    const topic = content.topics[this.state.currentTopicIndex]
    const lesson = topic.lessons[this.state.currentLessonIndex]

    const progress = {}
    progress[topic.id] = {}
    progress[topic.id][lesson.id] = true

    this.props.updateProgress && this.props.updateProgress(progress)

    this.moveToNextLesson()
  }
  _setBookmark() {
    href.set(`#${this.state.currentTopicIndex+1}`)
    localStorage.setItem(href.key.bookmark, this.state.currentTopicIndex+1)
  }
}
