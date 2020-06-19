import React from 'react'
import {
  Link
} from 'react-router-dom'
import {  Row, Col, Container } from 'react-bootstrap'
import VoteController from './voteController.js'

export default class PostCard extends React.Component {
  render () {
    return (
      <Container fluid className='post-card'>
        <Row>
        <Col className='vote-controller-container' xs='auto' sm='auto' md='auto' lg='auto'>
          <VoteController voteableId={this.props.post.id} score={this.props.post.score} voteableType='Post'/>
        </Col>
        <Col>
          <div className='post-card-info mt-2 mb-2 text-muted'>Posted in <Link to={this.props.hallURL}>{this.props.post.hall.name}</Link> by {this.props.post.user.name}
          </div>
          <div className='post-card-title'><Link to={this.props.postURL}>{this.props.post.title}</Link></div>

          { this.props.post.url &&
          <div> <a href={this.props.post.url}>🔗 {this.props.post.url}</a></div>}
          { this.props.post.image.url &&
          <div>
            <img className='post-card-img' src={this.props.post.image.url}/>
          </div>}
          <Link className='post-card-comments-link' to={this.props.postURL}>{this.props.post.comments.length} comments</Link>
        </Col>
        </Row>
      </Container>
    )
  }
}
