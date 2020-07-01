import React from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { Col, Row, Container } from 'react-bootstrap'
import LinkPreview from './linkPreview.js'
import VoteController from './controls/voteController.js'
import CommentList from './comments/commentList.js'
import Comment from './comments/comment.js'
import CreateComment from './comments/createComment.js'
import ContentControls from './controls/contentControls.js'
import EditPostForm from './controls/editPostForm.js'
import Marked from 'marked'
import DOMPurify from 'dompurify'
import { userContext } from '../../userContext.js'

class Post extends React.Component {
  _isMounted = false
  constructor (props) {
    super(props)
    this.state = {showEditForm: false, post: null, newComments: [] }
    this.getPostData = this.getPostData.bind(this)
  }

  getPostData () {
    fetch(`/api` + this.props.location.pathname)
    .then(response =>
      response.json())
    .then( post => {
        if (!this._isMounted) return
        this.setState({showEditForm: false, post: post, newComments: this.state.newComments })
      }
    )
  }

  makePostBody = () =>  {
    const description = Marked(DOMPurify.sanitize(this.state.post.body))
    return {__html: description}
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

  showEditForm = () => {
    const newState = JSON.parse(JSON.stringify(this.state))
    newState.showEditForm = !this.state.showEditForm
    this.setState(newState)
  }

  handleSubmit = (post) => {
    const data = new FormData()
    data.append('body', post)
    fetch(`/api/posts/${this.state.post.id}`, {
      method: 'PATCH',
      headers: { Authorization: 'Bearer ' + this.context.user.token },
      body: data
    }).then(response => {
      if (response && response.ok) {
        return response.json()
      } else {
        console.log(response)
        console.log('error')
      }
    }).then(response => {
      console.log(response)
      this.getPostData()
    }
    )
      .catch(error => console.log(error))
  }

  render () {
    if (!this.state.post) return null
    if (this.state.post.status === 404) return(
      <Redirect to="/404"/>
    )
    return (
      <Container className='post-container'>
          <Row className='post'>
          <Col className='vote-controller-container vote-post-controller' xs='auto' sm='auto' md='auto' lg='auto'>
          <VoteController voteableId={this.state.post.id} voteableType='Post' score={this.state.post.score}/>
          </Col>
          <Col xs='auto' sm='auto' md='auto' lg='auto' className='post-preview-container'>
          { !this.state.post.url && !this.state.post.image.url && <img alt='oddit-icon' className='post-card-img' src="/favicon.ico"/>}
          { this.state.post.url && <LinkPreview url={this.state.post.url}/> }
          </Col>
          <Col>
          <div className='post-info mt-2 mb-2 text-muted'>Posted in <Link to={`/halls/${this.state.post.hall.name}`}>{this.state.post.hall.name}</Link> by <Link to={`/users/${this.state.post.user.name}`}>{this.state.post.user.name}</Link>
          </div>
          <div className='post-title'>{this.state.post.title}</div>
          { this.state.post.image.url &&
          <img alt='post-attachment' className='post-image' src={this.state.post.image.url}/>}
          <div className='post-body' dangerouslySetInnerHTML={this.makePostBody()}/>
          <a className='post-link' href={this.state.post.url}>{this.state.post.url}</a>
          <ContentControls hallId={this.state.post.hall.id} id={this.state.post.user.id} type='post' showEditForm={this.showEditForm}/>
          </Col>
          </Row>
      <Row>
      <Col>
      { this.state.showEditForm && <EditPostForm body={this.state.post.body} handleSubmit={this.handleSubmit}/>}
      <CreateComment updateParent={this.updateForNewComments} commentableId={this.state.post.id} commentableType='Post'/>
      { this.renderNewComments() }
      <h4 className='comments-header'>Comments</h4>
      </Col>
      </Row>
      <CommentList hallId={this.state.post.hall.id} indent={1} comments={this.state.post.replies}/>

      </Container>
    )
  }
}

Post.contextType = userContext
export default withRouter(Post)
