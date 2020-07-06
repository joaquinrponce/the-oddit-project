import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { userContext } from '../../userContext.js'

export default class UpdatePasswordForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {password: '', passwordConfirmation: '', formInvalid: false, errors: {password: false, passwordConfirmation: false}}
  }

  handleChange = (e) => {
    e.preventDefault()
    const newState = JSON.parse(JSON.stringify(this.state))
    newState[e.target.name] = e.target.value
    newState.formInvalid = false
    newState.errors = {password: false, passwordConfirmation: false}
    this.setState(newState, this.validateForm)
  }

  validateForm = () => {
    const newState = JSON.parse(JSON.stringify(this.state))
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

  handleSubmit = () => {
    const request = {
      user: {
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation
      }
    }
    fetch(`/api/users/${this.context.user.id}`, {
      method: 'PATCH',
      body: JSON.stringify(request),
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.context.user.token }
    })
    .then(response => {
      if (response.ok && response.status === 200) {
        return response.json()
      } else if (response.status === 404) {
        alert('Something went wrong. Please contact the site admin.')
      }}
    )
    .then(data => {
      if (!data) return
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
          <Form.Label>New Password</Form.Label>
          <Form.Control isInvalid={this.state.errors.password} name='password' type='password' placeholder='XxOdinxX' value={this.state.password} onChange={this.handleChange}/>
          { this.state.errors.password && <div className='invalid-credentials'>Password length must be within 8 to 50 characters.</div>}
          <Form.Label>New Password Confirmation</Form.Label>
          <Form.Control isInvalid={this.state.errors.passwordConfirmation} name='passwordConfirmation' type='password' value={this.state.passwordConfirmation} onChange={this.handleChange}/>
          { this.state.errors.passwordConfirmation && <div className='invalid-credentials'>Password confirmation does not match password.</div>}
        </Form.Group>
        <Button variant='primary' disabled={this.state.formInvalid} type='submit'>Change Password</Button>
      </Form>
    )
  }
}

UpdatePasswordForm.contextType = userContext
