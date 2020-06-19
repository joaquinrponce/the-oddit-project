import React from 'react'
import CommentList from './commentList.js'
import { Container, Col, Row } from 'react-bootstrap'
import VoteController from './voteController.js'
import CommentForm from './commentForm.js'

export default class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {comment: null, showCommentForm: false, newComments: []}
  }

  componentDidMount () {
    this.getCommentData()
  }

  updateForNewComments = (comment) => {
    const comments = JSON.parse(JSON.stringify(this.state.newComments))
    comments.unshift(comment)
    this.setState({post: this.state.post, showCommentForm: false, newComments: comments})
  }

  renderNewComments = () => {
    const comments = []
    this.state.newComments.forEach(comment => {
      comments.push(<Comment className={`indent-${this.props.indent} mt-2 mb-2 mr-2`} indent={this.props.indent + 1} key={comment.id} comment={comment}/>)
    })
    return comments
  }

  getCommentData = () => {
    fetch(`/api/comments/${this.props.comment.id}`)
    .then(response => response.json())
    .then(comment => this.setState({comment: comment, showCommentForm: false, newComments: []}))
  }

  showCommentForm = () => {
    this.setState({comment: this.state.comment, showCommentForm: !this.state.showCommentForm, newComments: this.state.newComments})
  }

  render () {
    if (!this.state.comment) return null
    return (
      <Container className={`${this.props.className} h-auto comment`}>
        <Row>
          <Col className='vote-controller-container' xs='auto' sm='auto' md='auto' lg='auto'>
            <VoteController voteableId={this.state.comment.id} voteableType={'Comment'} score={this.state.comment.score}/>
          </Col>
          <Col className='comment-content'>
            <div className='comment-info mb-2 text-muted'>{this.state.comment.user.name} says</div>
            <div className='comment-body'>{this.state.comment.body}</div>
            <div className='comment-control' onClick={this.showCommentForm}>Reply</div>
          </Col>
        </Row>
        { this.state.showCommentForm && <CommentForm updateParent={this.updateForNewComments} commentableId={this.state.comment.id}  commentableType='Comment'/> }
        { this.renderNewComments() }
        <CommentList indent={this.props.indent}comments={this.state.comment.replies}/>
      </Container>
    )
  }
}
