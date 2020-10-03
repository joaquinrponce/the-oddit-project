import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { userContext } from '../../userContext.js'

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
      formInvalid: false,
      nameTaken: false,
    }
  }

  handleChange = (e) => {
    const newState = JSON.parse(JSON.stringify(this.state))
    newState[e.target.name] = e.target.name === 'username' ? e.target.value.toLowerCase() : e.target.value
    newState.errors = {username: false, password: false, passwordConfirmation: false}
    newState.formInvalid = false
    this.setState(newState, this.validateForm)
  }

  validateForm = () => {
    const newState = JSON.parse(JSON.stringify(this.state))
    const regex = new RegExp(/^\S[a-z0-9]+$/)
    if (!this.state.username.match(regex) || this.state.username.length > 30) {
      newState.errors.username = true
      newState.formInvalid = true
    }
    if (this.state.password.length > 50 || this.state.password.length < 8) {
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
        name: this.state.username.toLowerCase(),
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation
      }
    }
    fetch(`/api/users`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json'},
      body: JSON.stringify(request)
    }).then(response => {
      return response.json()
    }
    ).then(response => {
      if (response.id) {
        this.context.logInUser({name: response.name, id: response.id, role: response.role, token: response.signup_token})
        this.props.hideModal()
      } else {
        if (response.name) {
          this.setState({nameTaken: true, errors: { ...this.state.errors, username: true}})
        }
      }
    }).catch(error => console.log(error))
  }

  render () {
    return(
      <Form onSubmit={this.submitUser}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control isInvalid={this.state.errors.username} value={this.state.username} type='text' name='username' onChange={this.handleChange}/>
          { this.state.nameTaken && <div className='invalid-credentials'> This username has already been taken.</div> }
          <Form.Text className='text-muted'>Username cannot be longer than 20 characters, must be all lowercase, and must be only letters and/or numbers with no spaces.</Form.Text>
          <Form.Label>Password</Form.Label>
          <Form.Control isInvalid={this.state.errors.password} type='password' name='password' onChange={this.handleChange}/>
          <Form.Text className='text-muted'>Must be between 8 and 50 characters. IF YOU LOSE YOUR PASSWORD, YOU CANNOT RECOVER IT.</Form.Text>
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control isInvalid={this.state.errors.passwordConfirmation} type='password' name='passwordConfirmation' onChange={this.handleChange}/>
        </Form.Group>
        <Button disabled={this.state.formInvalid} type='submit'>Submit</Button>
      </Form>
    )
  }
}

SignUpForm.contextType = userContext
