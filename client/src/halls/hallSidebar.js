import React from 'react'
import { Container } from 'react-bootstrap'
import SubscriptionButton from './subscriptionButton'
import Marked from 'marked'
import DOMPurify from 'dompurify'

 export default class HallSidebar extends React.Component {

   makeDescription = () => {
     const description = Marked(DOMPurify.sanitize(this.props.hall.description))
     return {__html: description}
   }


  render () {
    return(
    <Container fluid className='mt-2'>
      <h2 className='hall-header'> {this.props.hall.name}</h2>
      <SubscriptionButton hall={this.props.hall.name}/>
      <h5>{this.props.hall.post_count} posts</h5>
      <h5>{this.props.hall.member_count} members</h5>
      <div className='hall-description' dangerouslySetInnerHTML={this.makeDescription()}>
      </div>
    </Container>
  )
  }
}
