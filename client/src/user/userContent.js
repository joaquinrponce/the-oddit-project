import React from 'react'
import PostCard from '../halls/posts/postCard.js'
import ProfileComment from './profileComment.js'
import { Container } from 'react-bootstrap'

export default class UserContent extends React.Component {

  sortContent = () => {
    const content = new Array().concat(this.props.posts, this.props.comments)
    content.sort((a, b) => {
      return Date.parse(a.created_at) < Date.parse(b.created_at) ? -1 : 1
    })
    console.log(content)
    return content
  }


  renderContent = () => {
    const content = this.sortContent()
    const contentToRender = []
    content.forEach(thing => {
      if (thing.title) {
        contentToRender.unshift(<PostCard key={thing.id} post={thing} postURL={`/halls/${thing.hall.name}/posts/${thing.id}`} hallURL={`/halls/${thing.hall.name}`}/>)
      } else {
        console.log('this should be a comment')
        contentToRender.unshift(<ProfileComment userId={this.props.userId} key={thing.id} comment={thing}/>)
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
