import React from 'react'
import CommentList from './commentList.js'
import { Container, Col, Row } from 'react-bootstrap'
import VoteController from './voteController.js'
import CommentForm from './commentForm.js'

export default class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showCommentForm: false, newComments: []}
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


  showCommentForm = () => {
    this.setState({showCommentForm: !this.state.showCommentForm, newComments: this.state.newComments})
  }

  render () {
    return (
      <Container className={`${this.props.className} h-auto comment`}>
        <Row>
          <Col className='vote-controller-container' xs='auto' sm='auto' md='auto' lg='auto'>
            <VoteController voteableId={this.props.comment.id} voteableType={'Comment'} score={this.props.comment.score}/>
          </Col>
          <Col className='comment-content'>
            <div className='comment-info mb-2 text-muted'>{this.props.comment.user.name} says</div>
            <div className='comment-body'>{this.props.comment.body}</div>
            <div className='comment-control' onClick={this.showCommentForm}>Reply</div>
          </Col>
        </Row>
        { this.state.showCommentForm && <CommentForm updateParent={this.updateForNewComments} commentableId={this.props.comment.id}  commentableType='Comment'/> }
        { this.renderNewComments() }
        <CommentList indent={this.props.indent}comments={this.props.comment.replies}/>
      </Container>
    )
  }
}
