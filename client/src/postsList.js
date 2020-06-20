import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import PostCard from './postCard.js'
import { Container, Spinner } from 'react-bootstrap'

export default class PostsList extends React.Component {
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
      posts.push(<PostCard user={this.props.user} key={post.id} post={post} postURL={`/posts/${post.id}`} hallURL={`/halls/${post.hall.name}`}/>)
    })
    return posts
  }

  getPosts () {
    let url = '/api/posts'
    if (this.props.match.params.id) {
      url = `/api/halls/${this.props.match.params.id.toLowerCase()}/posts`
    }
    switch (this.props.title) {
      case 'feed':
          url =`/api/posts/feed`
          break
      default:
          break
    }
    fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.props.token }
    }).then(response => response.json()).then(posts => {
      if (!this._isMounted) return
      this.setState({ posts: posts })
    })
  }

  componentDidMount () {
    this._isMounted = true
    this.getPosts()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.title !== prevProps.title) {
      this.getPosts()
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }
  render () {
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
        <Switch>
          <Route exact path={`${this.props.match.path}`}>
            <Container fluid>
              { this.renderPosts() }
              { this.state.posts.length === 0 && <div>Nothing to see here</div> }
            </Container>
          </Route>
        </Switch>
      </Container>
    )
  }
}
