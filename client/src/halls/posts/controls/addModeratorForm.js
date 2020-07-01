import React from 'react'
import {Form, Button} from 'react-bootstrap'
import { userContext } from '../../../userContext.js'

export default class AddModeratorForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: '', errors: {notFound: false, alreadyMod: false}}
  }

  handleChange = (e) => {
    this.setState({name: e.target.value, errors: {notFound: false, alreadyMod: false}})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const request = { moderationship: {hall_id: this.props.hallId, name: this.state.name}}
    fetch(`/api/moderationships`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.context.user.token },
      body: JSON.stringify(request),
    })
    .then(response => {
      if (response && response.ok) {
        return response.json()
      } else {
        console.log(response)
        this.setState({name: this.state.name, errors: {notFound: response.status === 404, alreadyMod: response.status === 409}})
        return
      }
    })
    .then(response => {
      if (response) {
        window.location.reload()
        return
      } else {
        return
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return(
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' name='name' onChange={this.handleChange}/>
          <Form.Text className='text-muted'>Name of the moderator you wish to add.</Form.Text>
          { this.state.errors.notFound && <div className='invalid-credentials'> The user was not found. Please check your spelling and try again. </div>}
          { this.state.errors.alreadyMod && <div className='invalid-credentials'> That user is already a moderator of this hall. </div>}
        </Form.Group>
        <Button disabled={!this.state.name} type='submit'>Add</Button>
      </Form>
    )
  }
}

AddModeratorForm.contextType = userContext
