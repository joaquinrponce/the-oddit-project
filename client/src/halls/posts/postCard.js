import React from 'react'
import {
  Link
} from 'react-router-dom'
import {  Row, Col, Container } from 'react-bootstrap'
import VoteController from './controls/voteController.js'
import ContentControls from './controls/contentControls.js'
import { ReactTinyLink } from 'react-tiny-link'

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
          <div className='post-card-link'> <a className='post-link' href={this.props.post.url}><span role='img' aria-label='link-emoji'>🔗</span> {this.props.post.url}</a></div>}
          { this.props.post.url &&
            <ReactTinyLink cardSize='small' header={''} showGraphic={true} maxLine={1} minLine={1} url={this.props.post.url}/>}
          { this.props.post.image.url &&
          <div>
            <img className='post-card-img' alt='post-attachment' src={this.props.post.image.url}/>
          </div>}
          <ContentControls id={this.props.post.user.id} type='post' path={this.props.postURL} comments_count={this.props.post.comments_count}/>
        </Col>
        </Row>
      </Container>
    )
  }
}
