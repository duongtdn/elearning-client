"use strict"

import React from 'react'
import { render } from 'react-dom'

import AccountClient from 'account-realm-client'
import { UserProvider } from 'react-user'

import env from './env'

const acc = new AccountClient({
  realm: env.realm,
  app: env.app,
  baseurl: env.urlAccount
})
acc.sso( (status, user) => {
  console.log('SSO finished')
  console.log(status)
  console.log(user)
})

import AppData from '../Templates/AppData'

render(
  <UserProvider accountClient = {acc} >
    <AppData env = {env} />
  </UserProvider>,
  document.getElementById('root')
)
