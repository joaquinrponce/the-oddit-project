import React from 'react'
import { Container } from 'react-bootstrap'
import SubscriptionButton from './subscriptionButton'
import Marked from 'marked'
import DOMPurify from 'dompurify'
import ContentControls from './posts/controls/contentControls.js'
import ModeratorModal from './posts/controls/ModeratorModal.js'
import EditSidebar from './posts/controls/editSidebar.js'
import { userContext } from '../userContext.js'

export default class HallSidebar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {showModal: false, modalType: 'add', showEditForm: false}
  }

   makeDescription = () => {
     const description = Marked(DOMPurify.sanitize(this.props.hall.description))
     return {__html: description}
   }

   renderModerators = () => {
     const mods = []
     this.props.hall.moderationships.forEach(mod => {
       mods.push(<div key={mod.moderator.id} className='moderator-name'>{mod.moderator.name}</div>)
     })
     return mods
   }

   toggleModal = (type = 'add') => {
     this.setState({showModal: !this.state.showModal, modalType: type, showEditForm: this.state.showEditForm})
   }

   toggleEditForm = () => {
     this.setState({showModal: this.state.showModal, modalType: this.state.modalType, showEditForm: !this.state.showEditForm})
   }
   moderationships = () => {
     return this.props.hall.moderationships.map(mod => {
       return {id: mod.id, name: mod.moderator.name}
     })
   }

   handleSubmit = (description) => {
     const request = { hall: { description: description } }
     fetch(`/api/halls/${this.props.hall.name}`, {
       method: 'PATCH',
       headers: {'content-type': 'application/json', Authorization: 'Bearer ' + this.context.user.token},
       body: JSON.stringify(request)
     })
     .then(response => {
       if (response && response.ok) {
         window.location.reload()
       } else {
         console.log(response)
       }
     }).catch(error => console.log(error))
   }

  render () {
    return(
    <Container fluid className='mt-2 sidebar-container'>
      <h2 className='hall-header'> {this.props.hall.name}</h2>
      <SubscriptionButton hall={this.props.hall.name}/>
      <div className='hall-stats'>
      <div><span>{this.props.hall.post_count}</span> posts</div>
      <div><span>{this.props.hall.member_count}</span> members</div>
      </div>
      <div className='hall-description' dangerouslySetInnerHTML={this.makeDescription()}/>
      <h5 className='hall-sidebar-mod-header'>Moderators</h5>
      <div className='moderators-list'>
      {this.renderModerators()}
      </div>
      <ContentControls
      path={`/halls/${this.props.hall.name}`}
      toggleModal={this.toggleModal}
      toggleEditForm={this.toggleEditForm}
      type='hall' hallId={this.props.hall.id} id={this.props.hall.owner.id}/>
      { this.state.showEditForm && <EditSidebar body={this.props.hall.description} handleSubmit={this.handleSubmit}/> }
      <ModeratorModal
      hallId={this.props.hall.id}
      type={this.state.modalType}
      moderationships={this.moderationships()}
      show={this.state.showModal} hideModal={this.toggleModal}/>
    </Container>
  )
  }
}

HallSidebar.contextType = userContext
