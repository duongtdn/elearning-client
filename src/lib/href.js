"use strict"

function getQuery() {
  const href = window.location.href.split('?')
  if (!href[1]) {
    return undefined
  }
  const query = {}
  const params = href[1].split('&')
  params.forEach( param => {
    const splitted = param.split('=')
    if (splitted[0]) {
      query[splitted[0]] = (splitted[1] && splitted[1].replace(/#.*$/,'')) || undefined
    }
  })
  return query
}

function getBookmark() {
  const href = window.location.href.split('#')
  return href[1]
}

function set(url) {
  location.href = url
}

export default {
  getQuery,
  getBookmark,
  set
}
