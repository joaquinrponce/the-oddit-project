import React from 'react'
import {
  Link
} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { Nav, Navbar } from 'react-bootstrap'
import { userContext } from './userContext.js'

export default class Navigation extends React.Component {
  render () {
    return (
      <userContext.Consumer>
        {({ user, logInUser, logOutUser, loggedIn }) => {
          return (
            <Container fluid>
              <Navbar bg='light' className='fixed-top'>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link as={Link} to="/">
                    Home
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/all">
                    All
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/new">
                    New
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/top">
                    Best
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Nav variant='tabs' className='ml-auto justify-content-start'>
                  { loggedIn &&
                  <Nav.Item>
                    <Nav.Link onClick={this.props.showPostModal}>+ New Post</Nav.Link>
                  </Nav.Item>
                  }
                  <Nav.Item>
                    { !loggedIn &&
                      <Nav.Link disabled>Guest</Nav.Link>
                    }
                    { loggedIn &&
                      <Nav.Link disabled>{user.name}</Nav.Link>
                    }
                  </Nav.Item>
                  <Nav.Item>
                    { !loggedIn && <Nav.Link onClick={this.props.showLoginModal}>
                      Login
                    </Nav.Link>}
                    { loggedIn && <Nav.Link as={Link} to="/logout" onClick={logOutUser}>
                  Logout
                    </Nav.Link> }
                  </Nav.Item>
                </Nav>
              </Navbar>
            </Container>
          )
        }
        }
      </userContext.Consumer>
    )
  }
}
