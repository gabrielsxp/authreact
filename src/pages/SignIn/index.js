import React, { useRef, useState, useEffect } from 'react'
import { Button, Form, FormGroup, Label, Container, Row, Col } from 'reactstrap'
import { authenticateUser, setItem } from '../../services'
import { Link, useHistory } from 'react-router-dom'
import { routes } from '../../constants'
import { useDispatch } from 'react-redux'
import { setUser, setToken, setIsAuthenticated } from '../../redux-local/actions'
import AnimatedToast from '../../components/AnimatedToast'

const SignIn = () => {
  const router = useHistory()
  const dispatch = useDispatch()

  const [displayToast, setDisplayToast] = useState(false)
  const [toastObject, setToastObject] = useState({ toggleCallback: setDisplayToast })

  const [isSubmiting, setIsSubmiting] = useState(false)

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  useEffect(() => {
    if (displayToast) {
      setTimeout(() => {
        setDisplayToast(false)
      }, 3000)
    }
  }, [displayToast])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = emailRef?.current?.value
    const password = passwordRef?.current?.value

    if (email === '') {
      const toast = {
        display: displayToast,
        type: 'danger',
        headerTitle: 'Error !',
        message: 'Yout must type the e-mail',
        toggleCallback: setDisplayToast
      }
      setToastObject(toast)
      setDisplayToast(true)

      return false
    }

    if (password === '') {
      const toast = {
        display: displayToast,
        type: 'danger',
        headerTitle: 'Error !',
        message: 'Yout must type the password',
        toggleCallback: setDisplayToast
      }
      setToastObject(toast)
      setDisplayToast(true)

      return false
    }

    const user = {
      email,
      password
    }
    let isAuthenticated = false
    try {
      const { user: loggedUser, token } = await authenticateUser(user, setIsSubmiting)
      dispatch(setUser(loggedUser))
      dispatch(setToken(token))
      dispatch(setIsAuthenticated(!!loggedUser))
      setItem('user', user)
      setItem('token', token)
      isAuthenticated = !!loggedUser

      if (isAuthenticated) {
        router.push(routes.profile)
      }
    } catch (error) {
      setDisplayToast(true)
    }
  }

  return (
    <Container>
      {
        displayToast && <AnimatedToast display={displayToast} {...toastObject} />
      }
      <Row style={{ padding: '80px 0' }}>
        <Col xs={12} sm={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='exampleEmail'>Email</Label>
              <input className='form-control' ref={emailRef} type='email' name='email' placeholder='Type your e-mail' />
            </FormGroup>
            <FormGroup>
              <Label for='exampleEmail'>Password</Label>
              <input className='form-control' ref={passwordRef} type='password' name='password' placeholder='Type your password' />
            </FormGroup>
            <Button disabled={isSubmiting}>{isSubmiting ? 'Sending' : 'Sign in'}</Button>
            <Link className='mx-4' to={routes.signUp}>Create an account</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default SignIn
