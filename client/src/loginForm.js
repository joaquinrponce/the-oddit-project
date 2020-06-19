import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { userContext } from './userContext'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {username: '', password: ''}
  }

  handleChange = (e) => {
    e.preventDefault()
    e.persist()
    const newState = JSON.parse(JSON.stringify(this.state))
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }


  render() {
    if (this.context.loggedIn) return <Redirect to="/feed"/>
    return(
      <Form onSubmit={(e) => {
        e.preventDefault()
        this.context.logInUser({ auth: { name: this.state.username, password: this.state.password } })
      }}>
        <Form.Group controlId='loginForm'>
          <Form.Label>Username</Form.Label>
          <Form.Control name='username' type='text' placeholder='XxOdinxX' value={this.state.username} onChange={this.handleChange}/>
          <Form.Label>Password</Form.Label>
          <Form.Control name='password' type='password' value={this.state.password} onChange={this.handleChange}/>
        </Form.Group>
        <Button variant='primary' type='submit'>Login</Button>
      </Form>
    )
  }
}

LoginForm.contextType = userContext
