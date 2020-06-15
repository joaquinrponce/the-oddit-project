import React from 'react'
import {
  Link
} from 'react-router-dom'
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { userContext } from './userContext.js'

export default class Navigation extends React.Component {
  render () {
    return (
      <userContext.Consumer>
        {({ user, logInUser, logOutUser, loggedIn }) => {
          return (
            <Navbar expand='lg' bg='light' className='fixed-top'>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav variant="tabs">
                  <Nav.Link as={Link} to="/">
                      Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/all">
                        All
                  </Nav.Link>
                  <Nav.Link as={Link} to="/new">
                        New
                  </Nav.Link>
                  <Nav.Link as={Link} to="/top">
                      Best
                  </Nav.Link>
                </Nav>
                <Nav variant='tabs' className='ml-auto justify-content-start'>
                  { !loggedIn &&
                      <Nav.Link as='div'>Guest</Nav.Link>
                  }
                  { loggedIn &&
                      <Nav.Link as='div'>{user.name}</Nav.Link>
                  }
                  { loggedIn &&
                      <Nav.Link as='button' onClick={this.props.showPostModal}>+ New Post</Nav.Link>
                  }
                  { !loggedIn &&
                      <Nav.Link onClick={this.props.showLoginModal}>
                        Login
                      </Nav.Link>
                  }
                  { loggedIn &&
                      <Nav.Link as={Link} to="/logout" onClick={logOutUser}>
                        Logout
                      </Nav.Link>
                  }
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          )
        }
        }
      </userContext.Consumer>
    )
  }
}
