import React from 'react'
import {
  Link
} from 'react-router-dom'
import { Container } from 'react-bootstrap'

export default class PostCard extends React.Component {
  render () {
    return (
      <Container fluid className='hall-card'>
          <div className='hall-card-title'><Link to={`/halls/${this.props.hall.name}`}>{this.props.hall.name}</Link></div>
          <div className='hall-info'> {this.props.hall.member_count} members</div>
          <div className='hall-info'> {this.props.hall.post_count} posts</div>
      </Container>
    )
  }
}
