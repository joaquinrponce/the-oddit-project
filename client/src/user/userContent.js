import React from 'react'
import PostCard from '../halls/posts/postCard.js'
import ProfileComment from './profileComment.js'
import { Container } from 'react-bootstrap'

export default class UserContent extends React.Component {

  sortContent = () => {
    this.props.content.sort((a, b) => {
      return Date.parse(a.created_at) < Date.parse(b.created_at) ? -1 : 1
    })
    return this.props.content
  }


  renderContent = () => {
    const content = this.sortContent()
    const contentToRender = []
    content.forEach(thing => {
      if (thing.title) {
        contentToRender.unshift(<PostCard key={'post-id: ' + thing.id} post={thing} postURL={`/halls/${thing.hall.name}/posts/${thing.id}`} hallURL={`/halls/${thing.hall.name}`}/>)
      } else {
        contentToRender.unshift(<ProfileComment userId={this.props.userId} key={'comment-id' + thing.id} comment={thing}/>)
      }
    })
    return contentToRender
  }



  render () {
    return(
      <Container fluid className='mt-2 post-list'>
      {this.renderContent()}
      </Container>
    )
  }
}
