import React from 'react'
import {
  Link
} from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import VoteController from './voteController.js'

export default class PostCard extends React.Component {
  render () {
    return (
      <Card className='mt-2'>
        <Card.Body>
        <Row>
        <Col md='auto'>
          <VoteController voteableId={this.props.post.id} score={this.props.post.score} voteableType='Post'/>
        </Col>
        <Col>
          <Card.Subtitle className='post-info mt-2 mb-2 text-muted'>Posted in <Link to={this.props.hallURL}>{this.props.post.hall.name}</Link> by {this.props.post.user.name}
          </Card.Subtitle>
          <Card.Title><Link to={this.props.postURL}>{this.props.post.title}</Link></Card.Title>
          { this.props.post.image.url &&
          <Card.Img src={this.props.post.image.url}/>}
          { this.props.post.url &&
          <Card.Link href={this.props.post.url}>{this.props.post.url}</Card.Link>}
        </Col>
        </Row>
        </Card.Body>
      </Card>
    )
  }
}
