import React from 'react'
import { Container } from 'react-bootstrap'
import SubscriptionButton from './subscriptionButton'

 export default class HallSidebar extends React.Component {

   constructor(props) {
     super(props)
     this.state = {hall: null}
   }


  render () {
    return(
    <Container fluid className='mt-2'>
      <h2 className='hall-header'> {this.props.hall.name}</h2>
      <SubscriptionButton hall={this.props.hall.name}/>
      <h5>{this.props.hall.post_count} posts</h5>
      <h5>{this.props.hall.member_count} members</h5>
      <div className='hall-description'>
      {this.props.hall.description}
      </div>
    </Container>
  )
  }
}
