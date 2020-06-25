import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { userContext } from '../../../userContext.js'

export default class CommentForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {comment: ''}
  }

  handleChange = (e) => {
    this.setState({comment: e.target.value})
  }

  render() {
    if (!this.context.loggedIn) return null
    return(
      <Form onSubmit={(e) => {
        e.preventDefault()
        this.props.handleSubmit(this.state.comment)
      }}>
        <Form.Group>
          <Form.Label>{this.props.header}</Form.Label>
          <Form.Control as='textarea' value={this.state.comment || this.props.body} onChange={this.handleChange}/>
        </Form.Group>
        <Button variant='primary' type='submit'>Submit</Button>
      </Form>
    )
  }
}

CommentForm.contextType = userContext
