import React from 'react'
import {
  Link
} from 'react-router-dom'
import { Card } from 'react-bootstrap'

export default class PostCard extends React.Component {
  render () {
    return (
      <Card className='mt-2'>
        <Card.Body>
          <Card.Text>Posted in <Link to={this.props.hallUrl}>{this.props.post.hall.name}</Link> by {this.props.post.user.name}
          </Card.Text>
          <Card.Title><Link to={this.props.postUrl}>{this.props.post.title}</Link></Card.Title>
        </Card.Body>
      </Card>
    )
  }
}
