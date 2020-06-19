import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { userContext } from './userContext'

export default class HallForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: '', redirect: false}
  }

  handleChange = (e) => {
    this.setState({name: e.target.value})
  }

  submitHall = (e) => {
    e.preventDefault()
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
          <Form.Control type='text' onChange={this.handleChange}/>
        </Form.Group>
        <Button type='submit'>Create</Button>
      </Form>
    )
  }
}

HallForm.contextType = userContext
