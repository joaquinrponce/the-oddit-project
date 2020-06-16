import React from 'react'
import {
  Link
} from 'react-router-dom'
import { Card } from 'react-bootstrap'
import VoteController from './vote.js'

export default class PostCard extends React.Component {
  render () {
    return (
      <Card className='mt-2'>
        <Card.Body>
          <VoteController voteableId={this.props.post.id} score={this.props.post.score} type='Post'/>
          <Card.Text>Posted in <Link to={this.props.hallURL}>{this.props.post.hall.name}</Link> by {this.props.post.user.name}
          </Card.Text>
          <Card.Title><Link to={this.props.postURL}>{this.props.post.title}</Link></Card.Title>
          { this.props.post.image.url &&
          <Card.Img src={this.props.post.image.url}/>}
          { this.props.post.url &&
          <Card.Link href={this.props.post.url}>{this.props.post.url}</Card.Link>}
        </Card.Body>
      </Card>
    )
  }
}
