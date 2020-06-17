import React from 'react'
import CommentList from './commentList.js'
import { Card, Col, Row } from 'react-bootstrap'
import VoteController from './voteController.js'
import CommentForm from './commentForm.js'

export default class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {comment: null}
  }

  componentDidMount () {
    this.getCommentData()
  }

  updateForNewComments = () => {
    this.getCommentData()
  }

  getCommentData = () => {
    fetch(`/api/comments/${this.props.comment.id}`)
    .then(response => response.json())
    .then(comment => this.setState({comment: comment}))
  }

  render () {
    if (!this.state.comment) return null
    return (
      <Card className={`${this.props.className} h-auto`}>
        <Card.Body className='h-auto'>
        <Row className='h-auto'>
        <Col className='h-auto' md='auto'>
        <VoteController voteableId={this.state.comment.id} voteableType={'Comment'} score={this.state.comment.score}/>
        </Col>
        <Col className='h-auto'>
          <Card.Text>{this.state.comment.body}</Card.Text>
        </Col>
        </Row>
        <CommentForm updateParent={this.updateForNewComments} commentableId={this.state.comment.id} commentableType='Comment'/>
        </Card.Body>
        <CommentList indent={this.props.indent}comments={this.state.comment.replies}/>
      </Card>
    )
  }
}
