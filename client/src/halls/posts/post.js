import React from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { Col, Row, Container } from 'react-bootstrap'
import VoteController from './controls/voteController.js'
import CommentList from './comments/commentList.js'
import CommentForm from './comments/commentForm.js'
import Comment from './comments/comment.js'
import CreateComment from './comments/createComment.js'

class Post extends React.Component {
  _isMounted = false
  constructor (props) {
    super(props)
    this.state = { post: null, newComments: [] }
    this.getPostData = this.getPostData.bind(this)
  }

  getPostData () {
    fetch(`/api` + this.props.location.pathname)
    .then(response =>
      response.json())
    .then( post => {
        if (!this._isMounted) return
        this.setState({ post: post, newComment: false })
      }
    )
  }

  componentDidMount () {
    this._isMounted = true
    this.getPostData()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps !== this.props) {
      this.getPostData()
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  updateForNewComments = (comment) => {
    const comments = JSON.parse(JSON.stringify(this.state.newComments))
    comments.unshift(comment)
    this.setState({post: this.state.post, newComments: comments})
  }

  renderNewComments = () => {
    const comments = []
    this.state.newComments.forEach(comment => {
      comments.push(<Comment className={`indent-1 mt-2 mb-2 mr-2`} indent={2} key={comment.id} comment={comment}/>)
    })
    return comments
  }

  render () {
    if (!this.state.post) return null
    if (this.state.post.status === 404) return(
      <Redirect to="/404"/>
    )
    return (
      <Container>
          <Row>
          <Col className='vote-controller-container vote-post-controller' xs='auto' sm='auto' md='auto' lg='auto'>
          <VoteController voteableId={this.state.post.id} voteableType='Post' score={this.state.post.score}/>
          </Col>
          <Col>
          <div className='post-info mt-2 mb-2 text-muted'>Posted in <Link to={`/halls/${this.state.post.hall.name}`}>{this.state.post.hall.name}</Link> by {this.state.post.user.name}
          </div>
          <div className='post-title'>{this.state.post.title}</div>
          { this.state.post.image.url &&
          <img alt='post-attachment' className='post-image' src={this.state.post.image.url}/>}
          <div className='post-body'>{this.state.post.body}</div>
          <a className='post-link' href={this.state.post.url}>{this.state.post.url}</a>
          </Col>
          </Row>
      <CreateComment updateParent={this.updateForNewComments} commentableId={this.state.post.id} commentableType='Post'/>
      { this.renderNewComments() }
      <CommentList indent={1} comments={this.state.post.comments}/>
      </Container>
    )
  }
}

export default withRouter(Post)
