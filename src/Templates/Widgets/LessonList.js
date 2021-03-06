"use strict"

import React, { Component } from 'react'

export default class LessonList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const lessons =  (this.props.topic && this.props.topic.lessons) || undefined
    const progress = (this.props.topic && this.props.progress && this.props.progress.study && this.props.progress.study[this.props.topic.id]) || {}
    return (
      <div>
        <h4 className="w3-white" > Lessons </h4>
        <div className="hr" />
        <div style={{overflow: 'hidden'}}>{
          lessons.map( (lesson,index) => {
            const zIndex = 100 - index
            const highlight = this.props.currentIndex === index ? 'w3-text-blue w3-pale-blue' : ''
            return (
              <div  className={`w3-cell-row ${highlight} w3-hover-pale-blue`} style={{width:'100%', cursor: 'pointer'}}
                    key={index}
                    onClick={() => this.changeLesson(index)} >

                <div className="w3-cell w3-cell-middle" style={{width:'40px'}}>
                  <div className={`circle ${progress[lesson.id]? 'completed':''}`} style={{ zIndex }}/>
                </div>

                <div className={`w3-container w3-cell ${highlight}`}>
                  <p style={{fontStyle: progress[lesson.id]? 'italic': 'normal'}}> {lesson.title} </p>
                </div>
              </div>
            )
          })
        }</div>
      </div>
    )
  }
  changeLesson(index) {
    this.props.onSelectLesson && this.props.onSelectLesson(index)
  }
}
