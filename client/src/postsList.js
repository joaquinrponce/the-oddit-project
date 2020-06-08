import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Post from './post.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export default class PostsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {posts: null}
    this.getPosts = this.getPosts.bind(this)
    this.renderPosts = this.renderPosts.bind(this)
  }

  renderPosts() {
    let posts = []
    this.state.posts.forEach( post => {
      posts.push(<Row><Link to={`/posts/${post.id}`}>{post.title}</Link></Row>)
    })
    return posts
  }

  getPosts() {
    fetch('/api/posts').then(response => response.json()).then(posts => {
      this.setState({posts: posts})
    })
  }

  componentDidMount() {
    this.getPosts()
  }

  render () {
    if (!this.state.posts) return null
    return (
      <Container fluid>
      <Switch>
        <Route path={`/`}>
          <Container fluid>
          <Row>Click on a link to see details</Row>
          { this.renderPosts() }
          </Container>
        </Route>
        <Route path={`/posts/:id`}>
          <Post />
        </Route>
      </Switch>
      </Container>
    )
  }
}
