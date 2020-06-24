import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { userContext } from './userContext'

export default class HallForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: '', redirect: false, errors: false}
  }

  handleChange = (e) => {
    this.setState({name: e.target.value}, this.validateForm)
  }

  validateForm = () => {
    const newState = JSON.parse(JSON.stringify(this.state))
    const regex = new RegExp(/^([a-z0-9]*)$/)
    newState.errors = false
    if (!this.state.name.match(regex) || this.state.name.length > 30) {
      newState.errors = true
    }
    this.setState(newState)
  }

  submitHall = (e) => {
    e.preventDefault()
    if (this.state.errors) return
    fetch('/api/halls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.context.user.token },
      body: JSON.stringify({hall: {name: this.state.name}})
    }).then(response => {
      if (response.ok) {
        response.json()
      } else {
        alert('Something went wrong. Contact the site admin pls')
      }
    }).then(response => {
      this.setState({name: this.state.name, redirect: true})
    }
    )
    .catch(error => console.log(error))
  }

  render () {
    if (this.state.redirect) {
      return (<Redirect to={`/halls/${this.state.name.toLowerCase()}`}/>)
    }
    return (
      <Form onSubmit={this.submitHall}>
        <Form.Group>
          <Form.Label>Name your hall</Form.Label>
          <Form.Control type='text' isInvalid={this.state.errors} onChange={this.handleChange}/>
          <Form.Text className='text-muted'>Must contain no spaces, no caps, and must not be longer than 30 characters.</Form.Text>
        </Form.Group>
        <Button disabled={this.state.errors} type='submit'>Create</Button>
      </Form>
    )
  }
}

HallForm.contextType = userContext
