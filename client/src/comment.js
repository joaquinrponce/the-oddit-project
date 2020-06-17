import React from 'react'
import CommentList from './commentList.js'
import { Card } from 'react-bootstrap'

export default class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {comment: null}
  }

  componentDidMount () {
    fetch(`/api/comments/${this.props.comment.id}`)
    .then(response => response.json())
    .then(comment => this.setState({comment: comment}))
  }

  render () {
    if (!this.state.comment) return null
    return (
      <Card>
        <Card.Body>
          <Card.Text>{this.state.comment.body}</Card.Text>
        </Card.Body>
        <CommentList comments={this.state.comment.replies}/>
      </Card>
    )
  }
}
