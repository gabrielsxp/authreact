/* globals localStorage */

function _has (key) {
  return !!localStorage.getItem(key)
}

export function set (key, payload) {
  localStorage.setItem(key, JSON.stringify(payload))
}

export function get (key) {
  if (_has(key)) {
    return JSON.parse(localStorage.getItem(key))
  }
  return undefined
}

export function clear () {
  localStorage.clear()
}
