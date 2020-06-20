import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { userContext } from './userContext.js'
import { Redirect } from 'react-router-dom'

export default class SignUpForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = (e) => {
    const newState = JSON.parse(JSON.stringify(this.state))
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  submitUser = (e) => {
    e.preventDefault()
    const request = {
      user: {
        name: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation
      }
    }
    fetch(`/api/users`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json'},
      body: JSON.stringify(request)
    }).then( response => {
      if (response.ok) {
        return response.json()
      } else {
        console.log(response)
      }
    }
    ).then(response => {
      if (response.id) {
        this.props.hideModal()
        this.context.logInUser({auth: {name: this.state.username, password: this.state.password}})
        this.setState({username: '', password: '', passwordConfirmation: ''})
      }
    }).catch(error => console.log(error))
  }

  render () {
    return(
      <Form onSubmit={this.submitUser}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' name='username' onChange={this.handleChange}/>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' onChange={this.handleChange}/>
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control type='password' name='passwordConfirmation' onChange={this.handleChange}/>
        </Form.Group>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

SignUpForm.contextType = userContext
