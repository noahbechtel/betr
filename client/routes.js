import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Main from './components/main'

class Routes extends Component {
  render () {
    return (
      <div>
        <Route path='/' component={Main} />
      </div>
    )
  }
}

// const mapState = state => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
//     // Otherwise, state.user will be an empty object, and state.user.id will be falsey
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     loadInitialData () {
//       dispatch(me())
//     }
//   }
// }

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
// export default withRouter(
//   connect(
//     mapState,
//     mapDispatch
//   )(Routes)
// )
export default Routes

/**
 * PROP TYPES
 */
