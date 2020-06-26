import React from 'react'
import PostCard from './postCard.js'
import { Container, Spinner } from 'react-bootstrap'
import { withRouter, Redirect } from 'react-router-dom'
import { userContext } from '../../userContext.js'

class PostsList extends React.Component {
  _isMounted = false
  constructor (props) {
    super(props)
    this.state = { posts: null }
    this.getPosts = this.getPosts.bind(this)
    this.renderPosts = this.renderPosts.bind(this)
  }

  renderPosts () {
    const posts = []
    this.state.posts.forEach(post => {
      posts.push(<PostCard user={this.props.user} key={post.id} post={post} postURL={`/halls/${post.hall.name}/posts/${post.id}`} hallURL={`/halls/${post.hall.name}`}/>)
    })
    return posts
  }

  getPosts () {
    let url = '/api/posts'
    if (this.props.hall) {
      url = `/api/halls/${this.props.hall}/posts`
    }
    switch (this.props.location.pathname) {
      case '/feed':
          url =`/api/posts/feed`
          break
      default:
          break
    }
    fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.context.user.token }
    }).then(response => {
      if (response.ok) {
        return response.json()
    } else {
      return
      }
    }).then(posts => {
      if (!this._isMounted) return
      if (!posts) return
      this.setState({ posts: posts })
    })
  }

  componentDidMount () {
    this._isMounted = true
    this.getPosts()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({posts: null}, this.getPosts())
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }
  render () {
    if (!this.context.loggedIn && this.props.location.pathname === '/feed' ) return <Redirect to="/all"/>
    if (!this.state.posts) {
      return (
        <Container className='d-flex justify-content-center align-items-center' fluid>
          <Spinner animation='grow' variant='warning' role='status'>
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )
    }
    return (
      <Container fluid className='mt-2 post-list'>
          { this.renderPosts() }
          { this.state.posts.length === 0 && <div>Nothing to see here</div> }
      </Container>
    )
  }
}

PostsList.contextType = userContext

export default withRouter(PostsList)
