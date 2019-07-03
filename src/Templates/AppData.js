"use strict"

import React, { Component } from 'react'

import { xhttp } from 'authenform-utils'

import href from '../lib/href'
import AppShell from './AppShell'
import Error from './Error'
import Loading from './Loading'

const query = href.getQuery()

export default class AppData extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, err: null, content: null }
  }
  componentDidMount() {
    this.loadContent().then( content => this.setState({loading: false, content})).catch(err => this.setState({loading: false, err}))
  }
  render() {
    if (!query || !query.c) {
      return (<Error code = '400' message = 'Invalid query' />)
    }
    if (this.props.user === null) { return null }
    if (this.props.user === undefined) {
      return (<Error code = '403' message = 'Forbidden' />)
    }
    if (this.state.loading) {
      return(<Loading />)
    }
    if (this.state.err) {
      return(<Error code = {this.state.err} message = 'Error found' />)
    }
    return (
      <AppShell user = {this.props.user}
                accountClient = {this.props.accountClient}
                template = {this.props.template}
                content = {this.state.content}
      />
    )
  }
  loadContent() {
    const urlBasePath = this.props.urlBasePath || ''
    return new Promise((resolve, reject) => {
      xhttp.get(`${urlBasePath}/content?c=${query.c}`,
        { authen: true },
        (status, response) => {
          if (status === 200) {
            const content = JSON.parse(response)
            resolve(content)
          } else {
            reject(status)
          }
        }
      )
    })
  }
}
