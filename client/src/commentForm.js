import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { userContext } from './userContext.js'

export default class CommentForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {comment: ''}
  }

  handleChange = (e) => {
    this.setState({comment: e.target.value})
  }

  handleSubmit = () => {
    const request = {
      comment: {
        user_id: this.context.user.id,
        commentable_id: this.props.commentableId,
        commentable_type: this.props.commentableType,
        body: this.state.comment
      }
    }
    fetch(`/api/comments`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.context.user.token },
      body: JSON.stringify(request)
    }).then(response => {
      if (response && response.ok) {
        return response.json()
      } else {
        console.log('error')
      }
    }).then(response => {
      this.props.updateParent(response)
      this.setState({comment: ''})
    }
    )
      .catch(error => console.log(error))
  }

  render() {
    if (!this.context.loggedIn) return null
    return(
      <Form onSubmit={(e) => {
        e.preventDefault()
        this.handleSubmit()
      }}>
        <Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Control as='textarea' value={this.state.comment} onChange={this.handleChange}/>
        </Form.Group>
        <Button variant='primary' type='submit'>Submit</Button>
      </Form>
    )
  }
}

CommentForm.contextType = userContext
