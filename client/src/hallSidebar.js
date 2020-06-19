import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Switch, Route, Link } from 'react-router-dom'
import TopCommunities from './topCommunities.js'
import TopPosts from './topPosts.js'
import SubscriptionButton from './subscriptionButton'

 export default class HallSidebar extends React.Component {

   constructor(props) {
     super(props)
     this.state = {hall: null}
   }

   getHallInfo = () => {
     fetch(`/api/halls/${this.props.match.params.id.toLowerCase()}`)
     .then(response => response.json())
     .then(hall => this.setState({hall: hall}))
     .catch(error => console.log(error))
   }

   componentDidMount() {
     this.getHallInfo()
   }

   componentDidUpdate(prevProps, prevState) {
     if (prevProps.match !== this.props.match) {
       this.getHallInfo()
     }
   }

  render () {
    if (!this.state.hall) return null
    return(
    <Container fluid className='mt-2'>
      <h2 className='hall-header'> {this.props.match.params.id}</h2>
      { this.props.match.params.id && <SubscriptionButton hall={this.props.match.params.id.toLowerCase()}/>}
      <h5>{this.state.hall.post_count} posts</h5>
      <h5>{this.state.hall.member_count} members</h5>
    </Container>
  )
  }
}
