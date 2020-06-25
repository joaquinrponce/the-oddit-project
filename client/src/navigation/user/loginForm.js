import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { userContext } from '../../userContext.js'
import * as jwtDecode from 'jwt-decode'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {username: '', password: '', errors: false}
  }

  handleChange = (e) => {
    e.preventDefault()
    e.persist()
    const newState = JSON.parse(JSON.stringify(this.state))
    newState[e.target.name] = e.target.value
    newState.errors = false
    this.setState(newState)
  }

  handleSubmit = () => {
    const request = {
      auth: {
        name: this.state.username,
        password: this.state.password
      }
    }
    fetch('/api/user_token', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok && response.status === 201) {
        return response.json()
      } else if (response.status === 404) {
        const newState = JSON.parse(JSON.stringify(this.state))
        newState.errors = true
        this.setState(newState)
        return
      }}
    )
    .then(data => {
      if (!data) return
      const payload = jwtDecode(data.jwt)
      const userInfo = payload.sub
      const user = {name: userInfo.name, id: userInfo.id, token: data.jwt, role: userInfo.role}
      this.context.logInUser(user)
      this.props.hideModal()
      window.location.reload()
    })
    .catch(error => console.log('error', error))
  }


  render() {
    return(
      <Form onSubmit={(e) => {
        e.preventDefault()
        this.handleSubmit()
      }}>
        <Form.Group controlId='loginForm'>
          <Form.Label>Username</Form.Label>
          <Form.Control name='username' type='text' placeholder='XxOdinxX' value={this.state.username} onChange={this.handleChange}/>
          <Form.Label>Password</Form.Label>
          <Form.Control name='password' type='password' value={this.state.password} onChange={this.handleChange}/>
          { this.state.errors && <div className='invalid-credentials'> Invalid login credentials. Please check your spelling and re-enter your password.</div>}
        </Form.Group>
        <Button variant='primary' type='submit'>Login</Button>
      </Form>
    )
  }
}

LoginForm.contextType = userContext
