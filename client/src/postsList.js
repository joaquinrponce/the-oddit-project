import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Post from './post.js'
import { Col, Row, Container } from 'react-bootstrap'

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
      posts.push(<Row>
                  <Col>Posted in <Link to={`/halls/${post.hall.name}`}>{post.hall.name}</Link> by {post.user.name}</Col>
                  <Col><Link to={`/posts/${post.id}`}>{post.title}</Link></Col>
                 </Row>)
    })
    return posts
  }

  getPosts() {
    let url = "/api/posts"
    if (this.props.match.params.id) {
      url = `/api/halls/${this.props.match.params.id.toLowerCase()}/posts`
      console.log(url)
    }
    fetch(url).then(response => response.json()).then(posts => {
      this.setState({posts: posts})
    })
  }

  componentDidMount() {
    this.getPosts()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
    this.getPosts()
    }
  }

  render () {
    console.log(this.props)
    if (!this.state.posts) return null
    return (
      <Container fluid>
      <Switch>
        <Route exact path={`${this.props.match.path}`}>
          <Container fluid>
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
