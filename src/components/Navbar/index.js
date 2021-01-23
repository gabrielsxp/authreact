import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setToken, setIsAuthenticated } from '../../redux-local/actions'
import { clearStore } from '../../services'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { routes } from '../../constants'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  Button
} from 'reactstrap'

const MainNavbar = (props) => {
  const dispatch = useDispatch()
  const router = useHistory()
  const location = useLocation()
  const [isNavbarOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const user = useSelector(({ authReducer: state }) => state.user)
  const isAuthenticated = useSelector(({ authReducer: state }) => state.isAuthenticated)
  const toggleNavbar = () => setIsOpen(!isNavbarOpen)
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const getUsername = (email) => {
    return email.split('@')[0]
  }

  const signOutUser = () => {
    dispatch(setUser(null))
    dispatch(setToken(null))
    dispatch(setIsAuthenticated(false))

    if (location.pathname === '/profile') {
      router.push(routes.home)
    }
    clearStore()
  }

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <Link to={routes.home}><NavbarBrand>Home</NavbarBrand></Link>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={isNavbarOpen} navbar>
          <Nav className='mr-auto' navbar />
          {
            !!isAuthenticated && (
              <ButtonDropdown isOpen={isDropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>
                  Hey, {getUsername(user.email)}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Profile options</DropdownItem>
                  <Link to={routes.profile}><DropdownItem>Profile</DropdownItem></Link>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => signOutUser()}>Sign out</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            )
          }
          {
            !isAuthenticated && (
              <Link to={routes.signIn}>
                <Button color='primary'>Sign in</Button>
              </Link>
            )
          }
        </Collapse>
      </Navbar>
    </div>
  )
}

export default MainNavbar
