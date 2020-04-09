"use strict"

import React, { Component } from 'react'

import { ContentPresenter } from 'content-presenter'
import { YoutubePlayerReactPlugin } from '@elearn/youtube-player-plugin'
import { QuizPlayerReactPlugin } from '@elearn/quiz-player-plugin'
import { PromptPlayerReactPlugin } from '@elearn/prompt-player-plugin'

export default class LessonPlayer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      height: 'auto'
    }

    this.players = [
      YoutubePlayerReactPlugin,
      QuizPlayerReactPlugin,
      PromptPlayerReactPlugin,
    ]

    QuizPlayerReactPlugin.setPlayerVars({ urlBasePath: this.props.env.urlQuizzesBasePath })

    const methods = ['onContentLoaded', 'onContentFinished', 'onResize']
    methods.forEach(method => this[method] = this[method].bind(this))
  }

  render() {
    return (
      <div style={{height: this.state.height}} >
        <ContentPresenter players = {this.players}
                          content = {this.props.lesson}
                          onContentLoaded = {this.onContentLoaded}
                          onContentFinished = {(e) => this.onContentFinished(this.props.lesson.id, e)}
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

  onContentFinished(id, e) {
    this.props.onLessonCompleted && this.props.onLessonCompleted(id, e)
  }

}
