import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { userContext } from './userContext.js'

export default class SignUpForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errors: {
        username: false,
        password: false,
        passwordConfirmation: false
      },
      formInvalid: false
    }
  }

  handleChange = (e) => {
    const newState = JSON.parse(JSON.stringify(this.state))
    newState[e.target.name] = e.target.value
    newState.errors = {username: false, password: false, passwordConfirmation: false}
    newState.formInvalid = false
    this.setState(newState, this.validateForm)
  }

  validateForm = () => {
    const newState = JSON.parse(JSON.stringify(this.state))
    const regex = new RegExp(/^\S+$/)
    if (!this.state.username.match(regex) || this.state.username.length > 30) {
      newState.errors.username = true
      newState.formInvalid = true
    }
    if (this.state.password.length > 50) {
      newState.errors.password = true
      newState.formInvalid = true
    }
    if (this.state.password !== this.state.passwordConfirmation) {
      newState.errors.passwordConfirmation = true
      newState.formInvalid = true
    }
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
        return
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
          <Form.Control isInvalid={this.state.errors.username} type='text' name='username' onChange={this.handleChange}/>
          <Form.Label>Password</Form.Label>
          <Form.Control isInvalid={this.state.errors.password} type='password' name='password' onChange={this.handleChange}/>
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control isInvalid={this.state.errors.passwordConfirmation} type='password' name='passwordConfirmation' onChange={this.handleChange}/>
        </Form.Group>
        <Button disabled={this.state.formInvalid} type='submit'>Submit</Button>
      </Form>
    )
  }
}

SignUpForm.contextType = userContext
