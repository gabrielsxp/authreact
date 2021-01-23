
export const SET_USER = 'SET_USER'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED'

export function setUser (user) {
  return {
    type: SET_USER,
    payload: { user }
  }
}

export function setToken (token) {
  return {
    type: SET_TOKEN,
    payload: { token }
  }
}

export function setIsAuthenticated (isAuthenticated) {
  return {
    type: SET_IS_AUTHENTICATED,
    payload: { isAuthenticated }
  }
}
