import React from 'react'
import { withRouter } from "react-router-dom";
import { Card } from 'react-bootstrap'

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {post: null}
    this.getPostData = this.getPostData.bind(this)
  }

  getPostData() {
    fetch(`/api/posts/${this.props.match.params.id}`).then(response => response.json()).then(
      post => {
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
    if (!this.state.post) return null
    return (
        <Card>
          <Card.Body>
            <Card.Title>{this.state.post.title}</Card.Title>
            <Card.Text>{this.state.post.body}</Card.Text>
          </Card.Body>
        </Card>
    )
  }
}

export default withRouter(Post)
