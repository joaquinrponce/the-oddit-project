import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Dropdown } from 'react-bootstrap'
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
      { this.context.loggedIn &&
        <Dropdown>
          <Dropdown.Toggle as={Nav.Link}>
            {this.context.user.name}
            </Dropdown.Toggle>
          <Dropdown.Menu alignRight id='user-actions-dropdown' title={this.context.user.name}>
            <Dropdown.Item as={Link} to={`/users/${this.context.user.name}`}>
              My Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {this.toggleUserModal('password')}}>
              Change Password
            </Dropdown.Item>
            <Dropdown.Item as={Link} to='/logout' onClick={this.context.logOutUser}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      }
      { !this.context.loggedIn &&
        <Dropdown>
          <Dropdown.Toggle as={Nav.Link}>
            {this.context.user.name}
            </Dropdown.Toggle>
          <Dropdown.Menu alignRight id='user-actions-dropdown' title='Guest'>
            <Dropdown.Item onClick={() => {this.toggleUserModal('login')}}>
              Login
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {this.toggleUserModal('signup')}}>
              Sign Up
              </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      }
        <UserModal show={this.state.showUserModal} type={this.state.type} hideModal={this.toggleUserModal}/>
        <PostModal show={this.state.showPostModal} hideModal={this.togglePostModal}/>
      </Nav>
    )
  }
}

UserControls.contextType = userContext
