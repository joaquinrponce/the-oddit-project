import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import {userContext} from '../userContext.js'
import PostModal from '../halls/posts/postModal.js'
import UserModal from './user/userModal.js'

export default class UserControls extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showPostModal: false, showUserModal: false, type: null }
  }

  toggleUserModal = (type) =>  {
    const newState = Object.assign(this.state)
    newState.showUserModal = !newState.showUserModal
    newState.showPostModal = false
    newState.type = type
    this.setState(newState)
  }

  togglePostModal = () => {
    const newState = Object.assign(this.state)
    newState.showPostModal = !newState.showPostModal
    newState.showUserModal = false
    this.setState(newState)
  }

  render() {
    return(
      <Nav variant='tabs' className='ml-auto justify-content-start'>
      { this.context.loggedIn &&
          <Nav.Link as='button' onClick={this.togglePostModal}>+ New Post</Nav.Link>
      }
      
        <UserModal show={this.state.showUserModal} type={this.state.type} hideModal={this.toggleUserModal}/>
        <PostModal show={this.state.showPostModal} hideModal={this.togglePostModal}/>
      </Nav>
    )
  }
}

UserControls.contextType = userContext
