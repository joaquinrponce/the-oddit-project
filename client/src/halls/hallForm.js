import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { userContext } from '../userContext.js'

export default class HallForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: '', description: '', redirect: false, formInvalid: false, errors: { name: false, description: false}}
  }

  handleChange = (e) => {
    const newState = JSON.parse(JSON.stringify(this.state))
    newState[e.target.name] = e.target.name === 'name' ? e.target.value.toLowerCase() : e.target.value
    this.setState(newState, this.validateForm)
  }

  validateForm = () => {
    const newState = JSON.parse(JSON.stringify(this.state))
    const regex = new RegExp(/^([a-z0-9]*)$/)
    newState.errors = {name: false, description: false}
    newState.formInvalid = false
    if (!this.state.name.match(regex) || this.state.name.length > 30 || this.state.name.length < 5) {
      newState.errors.name = true
      newState.formInvalid = true
    }
    if (this.state.description.length > 500) {
      newState.errors.description = true
      newState.formInvalid = true
    }
    this.setState(newState)
  }

  submitHall = (e) => {
    e.preventDefault()
    if (this.state.formInvalid) return
    fetch('/api/halls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.context.user.token },
      body: JSON.stringify({hall: {name: this.state.name, description: this.state.description, owner_id: this.context.user.id}})
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
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' value={this.state.name} name='name' isInvalid={this.state.errors.name} onChange={this.handleChange}/>
          <Form.Text className='text-muted'>Must contain no spaces, be only lowercase letters and/or numbers, and must be between 5 and 30 characters.</Form.Text>
          <Form.Label>Description</Form.Label>
          <Form.Control as='textarea' name='description' isInvalid={this.state.errors.description} onChange={this.handleChange}/>
          <Form.Text className='text-muted'>A description of what your hall is about. Will be shown on the sidebar of your hall's page. You can add formatting following <a href='https://marked.js.org/demo/'>this demo.</a></Form.Text>
        </Form.Group>
        <Button disabled={this.state.formInvalid} type='submit'>Create</Button>
      </Form>
    )
  }
}

HallForm.contextType = userContext
