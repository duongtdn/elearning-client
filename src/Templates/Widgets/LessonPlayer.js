"use strict"

import React, { Component } from 'react'

import { ContentPresenter } from 'content-presenter'
import { YoutubePlayerReactPlugin } from 'youtube-player-plugin'

export default class LessonPlayer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      height: 'auto'
    }

    this.players = [
      YoutubePlayerReactPlugin,
    ]

    const methods = ['onContentLoaded', 'onContentCompleted', 'onResize']
    methods.forEach(method => this[method] = this[method].bind(this))
  }

  render() {
    return (
      <div style={{height: this.state.height}} >
        <ContentPresenter players = {this.players}
                          content = {this.props.lesson}
                          onContentLoaded = {this.onContentLoaded}
                          onContentFinished = {() => this.onContentCompleted(this.props.lesson.id)}
                          onError = {err => console.log(err)}
                          onResize = {this.onResize}
        />
        <div style={{ textAlign: 'right' }} >
          <div className="w3-padding" style={{position: 'relative', zIndex: 2}} >
            <button className="w3-button no-outline" onClick={() => this.props.moveToPreviousLesson()}> Previous </button>
            <button className="w3-button no-outline" onClick={() => this.props.moveToNextLesson()}> Next </button>
          </div>
        </div>
      </div>
    )
  }

  onContentLoaded() {
    this.setState({ height : 'auto'})
    console.log(`Loaded Lesson: ${this.props.lesson.id}`)
  }

  onResize(height) {
    this.setState({ height : height + 'px'})
  }

  onContentCompleted(id) {
    console.log(`Completed Lesson ${id}`)
    this.props.onCompletedContent && this.props.onCompletedContent(contentId)
  }

}
