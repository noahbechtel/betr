import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_USERS = 'GET_USERS'

/**
 * INITIAL STATE
 */
const defaultUser = []

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const getUsers = users => ({ type: GET_USERS, users })

const removeUser = () => ({ type: REMOVE_USER })

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}
export const fetchUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/')
    dispatch(getUsers(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}
export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, { email, password })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
     case GET_USERS:
      return action.users
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
