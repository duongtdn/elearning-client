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
      query[splitted[0]] = splitted[1] || undefined
    }
  })
  return query
}

export default {
  getQuery
}
