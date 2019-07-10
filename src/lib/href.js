"use strict"

export default {
  _observers: [],
  _registeredEventListener: false,
  key: {
    bookmark: '__$_bookmark__'
  },
  getQuery() {
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
  },
  getBookmark() {
    const href = window.location.href.split('#')
    return href[1]
  },
  set(url) {
    location.href = url
  },
  observer(callback) {
    this._observers.push(callback)

    if (this._registeredEventListener) { return }

    window.addEventListener('hashchange',(evt) => {
      this._observers.forEach(handler => handler(evt))
    }, false)

    this._registeredEventListener = true
  }
}
