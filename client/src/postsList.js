import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom"
import Post from './post.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

class PostsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {posts: null}
    this.getPosts = this.getPosts.bind(this)
    this.renderPosts = this.renderPosts.bind(this)
  }

  renderPosts() {
    let posts = []
    this.state.posts.forEach( post => {
      posts.push(<Row><Link to={`${this.props.match.url}posts/${post.id}`}>{post.title}</Link></Row>)
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
      <Container>
      <Switch>
        <Route exact path={`${this.props.match.path}`}>
          <Container>
          <Row>Click on a link to see details</Row>
          { this.renderPosts() }
          </Container>
        </Route>
        <Route path={`${this.props.match.path}posts/:id`}>
          <Post />
        </Route>
      </Switch>
      </Container>
    )
  }
}

export default withRouter(PostsList)
