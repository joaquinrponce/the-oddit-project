import React from 'react'
import { Container } from 'react-bootstrap'
import SubscriptionButton from './subscriptionButton'
import Marked from 'marked'
import DOMPurify from 'dompurify'
import ContentControls from './posts/controls/contentControls.js'

 export default class HallSidebar extends React.Component {

   makeDescription = () => {
     const description = Marked(DOMPurify.sanitize(this.props.hall.description))
     return {__html: description}
   }
   
   renderModerators = () => {
     const mods = []
     this.props.hall.moderators.forEach(mod => {
       mods.push(<div className='moderator-name'>{mod.name}</div>)
     })
     return mods
   }

  render () {
    return(
    <Container fluid className='mt-2 sidebar-container'>
      <h2 className='hall-header'> {this.props.hall.name}</h2>
      <SubscriptionButton hall={this.props.hall.name}/>
      <h5>{this.props.hall.post_count} posts</h5>
      <h5>{this.props.hall.member_count} members</h5>
      <div className='hall-description' dangerouslySetInnerHTML={this.makeDescription()}>
      </div>
      <h5>Moderators</h5>
      <div className='moderators-list'>
      {this.renderModerators()}
      </div>
      <ContentControls type='hall' hallId={this.props.hall.id} ownerId={this.props.hall.owner.id}/>
    </Container>
  )
  }
}
