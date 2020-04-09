"use strict"

import React, { Component } from 'react'

import Title from '../Widgets/Title'

export default class StudyProgress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetailProgress: true,
      showDetailTestResults: true,
    }
  }
  render() {
    const user = this.props.user
    const content = this.props.content
    const topics = content.topics
    return (
      <div className="w3-container">

        <h2 style={{marginTop: '16px'}}>
          <div className="w3-cell">
            <img src={this._getUserAvata()}
                className="w3-image w3-round "
                width={60} height={60}
                alt="user picture" />
            </div>
          <div className="w3-container w3-cell w3-cell-middle"> {user.profile.displayName || user.profile.userName} </div>
        </h2>

        <hr />

        <h3> Study Progress </h3>
        <div>
          <Title  label={`Completion: ${this._calculateTotalCompletion()}`}
                  onClick={show => this.setState({showDetailProgress: show})}
          />
          <div className="" style={{display: this.state.showDetailProgress? 'block': 'none'}}>
            { topics.map( (topic, index) => {
                const completion = this._calculateTopicCompletion(topic)
                return (
                  <div className="w3-cell-row w3-border-bottom" key={topic.id} style={{margin: '8px 0px', padding: '8px 0px'}}>
                    <div className="w3-container w3-cell w3-mobile">
                      <span className="w3-small w3-text-grey" > Topic {index+1} </span> <br />
                      <span className="w3-text-blue-grey" > {topic.title} </span>
                    </div>
                    <div className="w3-container w3-cell w3-cell-middle w3-mobile" style={{width: '50%'}}>
                      <div className="w3-pale-green">
                        <div className="w3-container w3-green w3-center" style={{height: '24px', width: completion}}> {completion} </div>
                      </div>
                    </div>
                  </div>
              )
            }) }
          </div>
          <div className="w3-text-grey w3-small" style={{display: !this.state.showDetailProgress? 'block': 'none'}}>
            <p style={{fontStyle: 'italic'}}> Detailed progress... </p>
          </div>
        </div>

        <hr />

        <h3> Test Results </h3>
        <Title  label={`Completion: ${this._calculateTestsCompletion()}`}
                onClick={show => this.setState({showDetailTestResults: show})}
        />
        <div>
          <div className="" style={{display: this.state.showDetailTestResults? 'block': 'none'}}>
            <table className="w3-table">
              <tbody>{
                content.tests.map( (test, index) => {
                  const testResults = this.props.progress.test
                  const score = (testResults && testResults[test.examId] && testResults[test.examId].result && testResults[test.examId].result.score) || null
                  const status = (testResults && testResults[test.examId] && testResults[test.examId].result && testResults[test.examId].result.status) || null
                  return (
                    <tr className="w3-border-bottom" key={index} >
                      <td className="w3-container">
                        <span className="w3-text-blue-grey w3-small" style={{fontStyle: 'italic'}} >{test.title} </span> <br />
                        <span className="w3-text-grey " > {test.description} </span> <br />
                        {/* <button className="w3-button w3-blue w3-small"> Take Test </button> */}
                      </td>
                      <td className="w3-container" style={{ verticalAlign: 'middle'}}>
                        {
                          status ?
                            <span className={`w3-text-${status === 'passed' ? 'green' : 'red'}`} >
                              {status.toUpperCase()}
                              <a href={`${this.props.env.urlExamBasePath}/result?r=${test.resultId}`} target="_blank" style={{textDecoration: 'none'}}> <i className="fa fa-info-circle" style={{fontWeight: 'lighter'}} /></a> <br />
                              <span className="w3-text-blue-grey w3-small " > {score}/{test.passScore} </span>
                            </span>
                          :
                          <a href={`${this.props.env.urlExamBasePath}/exam?t=${test.testId}`} className="w3-button w3-blue w3-small" target="_blank"> Take Test </a>
                        }
                      </td>

                    </tr>
                  )
                })
              }</tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="w3-text-grey w3-small" style={{display: !this.state.showDetailTestResults? 'block': 'none'}}>
            <p style={{fontStyle: 'italic'}}> Detailed results... </p>
          </div>
        </div>

      </div>
    )
  }

  _calculateTotalCompletion() {
    const progress = this.props.progress
    if (!progress) {
      return '0%'
    }
    const topics = this.props.content.topics
    let max = 0
    let completed = 0
    topics.forEach(topic => {
      max += topic.lessons.length
      if (progress[topic.id]) {
        const p = progress[topic.id]
        completed += Object.keys(p).filter(k => p[k]).length
      }
    })
    if (max) {
      return `${Math.round((completed/max)*100)}%`
    } else {
      return 'Error'
    }
  }

  _calculateTopicCompletion(topic) {
    if (!this.props.progress || !this.props.progress.study) {
      return  `0%`
    }
    const progress = this.props.progress.study
    if (progress && progress[topic.id]) {
      const max = topic.lessons.length
      const p = progress[topic.id]
      const completed = Object.keys(p).filter(k => p[k]).length
      return `${Math.round((completed/max)*100)}%`
    } else {
      return '0%'
    }
  }

  _calculateTestsCompletion() {
    if (!this.props.progress || !this.props.progress.test) {
      return  `0%`
    }
    const testResults = this.props.progress.test
    const tests = this.props.content.tests
    let completed = 0
    tests.forEach(test => {
      if (testResults[test.examId] && testResults[test.examId].resultId) {
        completed++
      }
    })
    return  `${Math.round((completed/tests.length)*100)}%`
  }

  _getUserAvata() {
    const user = this.props.user
    if (user.profile.picture) { return user.profile.picture }
    if (user.profile.gender === 'female') {
      return this.props.env.template.avata.female
    } else {
      return this.props.env.template.avata.male
    }
  }

}
