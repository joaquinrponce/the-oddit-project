import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { userContext } from '../userContext.js'

export default class PageControls extends React.Component {

  render () {
    return ( <Nav variant="tabs">
      { this.context.loggedIn &&
      <Nav.Link as={Link} to="/feed">
          My Halls
      </Nav.Link>
      }
      <Nav.Link as={Link} to="/all">
            All
      </Nav.Link>
      <Nav.Link as={Link} to="/halls">
          List of Halls
      </Nav.Link>
    </Nav>
    )
  }
}

PageControls.contextType = userContext
