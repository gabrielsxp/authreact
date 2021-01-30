function throttle (func, timeFrame) {
  let lastTime = 0
  return function () {
    const now = new Date()
    if (now - lastTime >= timeFrame) {
      func()
      lastTime = now
    }
  }
}

function buildSearch (term) {
  return {
    desc: term,
    name: term,
    race: term,
    archetype: term
  }
}

function getQuery (options) {
  return Object.keys(options).reduce((acc, option, index) => {
    acc += `${option}=${options[option]}${index !== (options.length - 1) ? '&' : ''}`
    return acc
  }, '?')
}

export {
  throttle,
  buildSearch,
  getQuery
}
