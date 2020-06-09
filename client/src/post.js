import React from 'react'
import { withRouter } from "react-router-dom";
import {Col, Row, Container} from 'react-bootstrap'

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {post: null}
    this.getPostData = this.getPostData.bind(this)
  }

  getPostData() {
    fetch(`/api/posts/${this.props.match.params.id}`).then(response => response.json()).then(
      post => {
        console.log(post)
        this.setState({post: post})
      }
    )
  }

  componentDidMount() {
      this.getPostData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.getPostData()
    }
  }

  render () {
    console.log(this.state)
    if (!this.state.post) return null
    return (
      <Container>
        <Row>
          <Col>
            <Row>{this.state.post.score}</Row>
          </Col>
          <Col>
            <Row>{this.state.post.title}</Row>
            <Row>{this.state.post.body}</Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(Post)
