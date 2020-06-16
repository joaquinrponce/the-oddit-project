import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Card, Col, Row } from 'react-bootstrap'
import VoteController from './voteController'

class Post extends React.Component {
  constructor (props) {
    super(props)
    this.state = { post: null }
    this.getPostData = this.getPostData.bind(this)
  }

  getPostData () {
    fetch(`/api/posts/${this.props.match.params.id}`).then(response => response.json()).then(
      post => {
        this.setState({ post: post })
      }
    )
  }

  componentDidMount () {
    this.getPostData()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps !== this.props) {
      this.getPostData()
    }
  }

  render () {
    if (!this.state.post) return null
    return (
      <Card>
        <Card.Body>
          <Row>
          <Col md='auto'>
          <VoteController voteableId={this.state.post.id} voteableType='Post' score={this.state.post.score}/>
          </Col>
          <Col>
          <Card.Subtitle className='post-info mt-2 mb-2 text-muted'>Posted in <Link to={`/halls/${this.state.post.hall.name}`}>{this.state.post.hall.name}</Link> by {this.state.post.user.name}
          </Card.Subtitle>
          <Card.Title>{this.state.post.title}</Card.Title>
          { this.state.post.image.url &&
          <Card.Img variant="bottom" src={this.state.post.image.url}/>}
          <Card.Text>{this.state.post.body}</Card.Text>
          <Card.Link>{this.state.post.url}</Card.Link>
          </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}

export default withRouter(Post)
