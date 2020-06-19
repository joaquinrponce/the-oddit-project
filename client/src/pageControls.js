import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { userContext } from './userContext.js'

export default class PageControls extends React.Component {
  
  render () {
    return ( <Nav variant="tabs">
      { this.context.loggedIn &&
      <Nav.Link as={Link} to="/feed">
          Home
      </Nav.Link>
      }
      <Nav.Link as={Link} to="/all">
            All
      </Nav.Link>
      <Nav.Link as={Link} to="/new">
            New
      </Nav.Link>
      <Nav.Link as={Link} to="/top">
          Top
      </Nav.Link>
    </Nav>
    )
  }
}

PageControls.contextType = userContext