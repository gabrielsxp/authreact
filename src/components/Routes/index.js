import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { routes } from '../../constants'

//
import Home from '../../pages/Home'
import Profile from '../../pages/Profile'
import SignIn from '../../pages/SignIn'
import SignUp from '../../pages/SignUp'
import Navbar from '../../components/Navbar'

import { setUser, setToken, setIsAuthenticated } from '../../redux-local/actions'
import { getItem } from '../../services'
import { useDispatch } from 'react-redux'

const routesArray = [
  { name: 'Home', path: routes.home, component: Home },
  { name: 'Profile', path: routes.profile, component: Profile },
  { name: 'SignIn', path: routes.signIn, component: SignIn },
  { name: 'SignUp', path: routes.signUp, component: SignUp }
]

const Routes = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (getItem('user')) {
      const user = getItem('user')
      dispatch(setUser(user))
      dispatch(setIsAuthenticated(!!user))
    }
    if (getItem('token')) {
      const token = getItem('token')
      dispatch(setToken(token))
    }
  })
  return (
    <Router>
      <Navbar />
      <Switch>
        {
          routesArray.map(({ name, path, component: Component }) =>
            <Route exact path={path} key={name}>
              <Component />
            </Route>
          )
        }
      </Switch>
    </Router>
  )
}

export default Routes
