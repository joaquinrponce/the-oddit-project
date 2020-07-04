import React from 'react'
import CommentList from './commentList.js'
import { Container } from 'react-bootstrap'
import VoteController from '../controls/voteController.js'
import ContentControls from '../controls/contentControls.js'
import CreateComment from './createComment.js'
import EditComment from './editComment.js'
import { Link } from 'react-router-dom'

export default class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {newCommentBody: '', showCommentForm: false, showEditForm: false, newComments: []}
  }

  updateForNewComments = (comment) => {
    const comments = JSON.parse(JSON.stringify(this.state.newComments))
    comments.unshift(comment)
    this.setState({newCommentBody: this.newCommentBody, showEditForm: false, showCommentForm: false, newComments: comments})
  }

  renderNewComments = () => {
    const comments = []
    this.state.newComments.forEach(comment => {
      comments.push(<Comment className={`indent-${this.props.indent} mt-2 mb-2 mr-2`} indent={this.props.indent + 1} key={comment.id} comment={comment}/>)
    })
    return comments
  }

  updateForEdit = (comment) => {
    const newState = JSON.parse(JSON.stringify(this.state))
    newState.newCommentBody = comment.body
    newState.showEditForm = false
    this.setState(newState)
  }


  toggleCommentForm = (e) => {
    e.preventDefault()
    const newState = JSON.parse(JSON.stringify(this.state))
    newState.showEditForm = false
    newState.showCommentForm = !this.state.showCommentForm
    this.setState(newState)
  }

  toggleEditForm = (e) => {
    e.preventDefault()
    const newState = JSON.parse(JSON.stringify(this.state))
    newState.showEditForm = !this.state.showEditForm
    newState.showCommentForm = false
    this.setState(newState)
  }

  render () {
    return (<>
      <Container className={`comment-container`}>
      <div className={`${this.props.className} comment`}>
        <VoteController voteableId={this.props.comment.id} voteableType={'Comment'} score={this.props.comment.score}/>
        <div className='comment-content'>
          <div className='comment-info text-muted'>
            <Link to={`/users/${this.props.comment.user.name}`}>{this.props.comment.user.name}</Link>
            <span> says</span>
            </div>
            <div className='comment-body'>{this.state.newCommentBody || this.props.comment.body}</div>
            <ContentControls hallId={this.props.hallId} id={this.props.comment.user.id} path={`/comments/${this.props.comment.id}`}   type='comment' showCommentForm={this.toggleCommentForm} showEditForm={this.toggleEditForm}/>
            { this.state.showCommentForm && <CreateComment updateParent={this.updateForNewComments} commentableId={this.props.comment.id}  commentableType='Comment'/> }
            { this.state.showEditForm && <EditComment body={this.props.comment.body} updateParent={this.updateForEdit} commentableId={this.props.comment.id}  commentableType='Comment'/> }
            </div>
        </div>
      </Container>
      { this.renderNewComments() }
      { this.props.comment.replies && <CommentList hallId={this.props.hallId} indent={this.props.indent} comments={this.props.comment.replies}/> }
      </>
    )
  }
}
