import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import Post from './post.js'
import PostCard from './postCard.js'
import { Container, Spinner } from 'react-bootstrap'

export default class PostsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { posts: null }
    this.getPosts = this.getPosts.bind(this)
    this.renderPosts = this.renderPosts.bind(this)
  }

  renderPosts () {
    const posts = []
    this.state.posts.forEach(post => {
      posts.push(<PostCard key={post.id} post={post} postURL={`/posts/${post.id}`} hallURL={`/halls/${post.hall.name}`}/>)
    })
    return posts
  }

  getPosts () {
    let url = '/api/posts'
    if (this.props.match.params.id) {
      url = `/api/halls/${this.props.match.params.id.toLowerCase()}/posts`
    }
    fetch(url).then(response => response.json()).then(posts => {
      this.setState({ posts: posts })
    })
  }

  componentDidMount () {
    this.getPosts()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.title !== prevProps.title) {
      this.getPosts()
    }
  }

  render () {
    if (!this.state.posts) {
      return(
        <Container className='d-flex justify-content-center align-items-center' fluid>
        <Spinner animation='grow' variant='warning' role='status'>
          <span className="sr-only">Loading...</span>
        </Spinner>
        </Container>
      )
    }
    return (
      <Container fluid className='mt-2'>
        <Switch>
          <Route exact path={`${this.props.match.path}`}>
            <Container fluid>
              { this.props.match.params.id && <h1>{this.props.match.params.id}</h1>}
              { this.renderPosts() }
            </Container>
          </Route>
        </Switch>
      </Container>
    )
  }
}
