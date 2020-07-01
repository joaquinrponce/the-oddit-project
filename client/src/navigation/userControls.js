import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import {userContext} from '../userContext.js'
import Login from './user/login.js'
import PostModal from '../halls/posts/postModal.js'
import SignUp from './user/signUp.js'

export default class UserControls extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showPostModal: false, showLoginModal: false, showSignUpModal: false }
  }

  toggleLoginModal = () =>  {
    const newState = Object.assign(this.state)
    newState.showLoginModal = !newState.showLoginModal
    this.setState(newState)
  }

  togglePostModal = () => {
    const newState = Object.assign(this.state)
    newState.showPostModal = !newState.showPostModal
    this.setState(newState)
  }


  toggleSignUpModal = () => {
    const newState = Object.assign(this.state)
    newState.showSignUpModal = !newState.showSignUpModal
    this.setState(newState)
  }

  render() {
    return(
      <Nav variant='tabs' className='ml-auto justify-content-start'>
      { !this.context.loggedIn &&
          <Nav.Link as='div'>Guest</Nav.Link>
      }
      { this.context.loggedIn &&
          <Nav.Link as={Link} to={`/users/${this.context.user.name}`}>
          {this.context.user.name}
          </Nav.Link>
      }
      { this.context.loggedIn &&
          <Nav.Link as='button' onClick={this.togglePostModal}>+ New Post</Nav.Link>
      }
      { !this.context.loggedIn &&
          <Nav.Link onClick={this.toggleLoginModal}>
            Login
          </Nav.Link>
      }
      { !this.context.loggedIn &&
          <Nav.Link onClick={this.toggleSignUpModal}>
            Sign Up
          </Nav.Link>
      }
      { this.context.loggedIn &&
          <Nav.Link as={Link} to="/logout" onClick={this.context.logOutUser}>
            Logout
          </Nav.Link>
      }
        <Login show={this.state.showLoginModal} hideModal={this.toggleLoginModal}/>
        <PostModal show={this.state.showPostModal} hideModal={this.togglePostModal}/>
        <SignUp show={this.state.showSignUpModal} hideModal={this.toggleSignUpModal}/>
      </Nav>
    )
  }
}

UserControls.contextType = userContext
