import { SET_USER, SET_TOKEN, SET_IS_AUTHENTICATED } from '../../actions'

const INITIAL_STATE = {
  user: {},
  token: null,
  isAuthenticated: false
}

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      state.user = { ...action.user, ...action.payload.user }
      return state
    case SET_TOKEN:
      state.token = action.payload.token
      return state
    case SET_IS_AUTHENTICATED:
      state.isAuthenticated = action.payload.isAuthenticated
      return state
    default:
      return state
  }
}
