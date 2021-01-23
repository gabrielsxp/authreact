import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, FormGroup, Label, Container, Row, Col } from 'reactstrap'
import { createAccount, setItem } from '../../services'
import { Link, useHistory } from 'react-router-dom'
import { routes } from '../../constants'
import { useDispatch } from 'react-redux'
import { setUser, setToken, setIsAuthenticated } from '../../redux-local/actions'
import AnimatedToast from '../../components/AnimatedToast'

const SignUp = () => {
  const router = useHistory()
  const dispatch = useDispatch()

  const [displayToast, setDisplayToast] = useState(false)
  const [toastObject, setToastObject] = useState({ toggleCallback: setDisplayToast, display: false })

  const [isSubmiting, setIsSubmiting] = useState(false)

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  useEffect(() => {
    if (displayToast) {
      setTimeout(() => {
        setDisplayToast(false)
      }, 3000)
    }
  }, [displayToast])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const name = nameRef?.current?.value
    const email = emailRef?.current?.value
    const password = passwordRef?.current?.value
    const passwordConfirmation = confirmPasswordRef?.current?.value

    if (password !== passwordConfirmation) {
      const toast = {
        display: displayToast,
        type: 'danger',
        headerTitle: 'Error !',
        message: 'Passwords do not match',
        toggleCallback: setDisplayToast
      }
      setToastObject(toast)
      setDisplayToast(true)

      return false
    }

    if (name === '') {
      const toast = {
        display: displayToast,
        type: 'danger',
        headerTitle: 'Error !',
        message: 'Yout must type yout name',
        toggleCallback: setDisplayToast
      }
      setToastObject(toast)
      setDisplayToast(true)

      return false
    }

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

    const user = {
      name,
      email,
      password
    }
    let isAuthenticated = false
    try {
      const { user: loggedUser, token } = await createAccount(user, setIsSubmiting)
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
              <Label for='exampleEmail'>Name</Label>
              <input className='form-control' ref={nameRef} type='text' name='name' placeholder='Type your name' />
            </FormGroup>
            <FormGroup>
              <Label for='exampleEmail'>Email</Label>
              <input className='form-control' ref={emailRef} type='email' name='email' placeholder='Type your e-mail' />
            </FormGroup>
            <FormGroup>
              <Label for='exampleEmail'>Password</Label>
              <input className='form-control' ref={passwordRef} type='password' name='password' placeholder='Type your password' />
            </FormGroup>
            <FormGroup>
              <Label for='exampleEmail'>Password Confirmation</Label>
              <input className='form-control' ref={confirmPasswordRef} type='password' name='password' placeholder='Type your password again' />
            </FormGroup>
            <Button disabled={isSubmiting}>{isSubmiting ? 'Sending' : 'Create account'}</Button>
            <Link className='mx-4' to={routes.signUp}>Sign in</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUp
