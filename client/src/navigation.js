import React from 'react'
import {
  Link
} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

export default class Navigation extends React.Component {
  render() {
    return (
      <Container fluid>
        <Nav variant="tabs" className='justify-content-start'>
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
      </Container>
     )
  }
}
