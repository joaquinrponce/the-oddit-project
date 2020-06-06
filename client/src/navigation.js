import React from 'react'
import {
  Link
} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

export default class Navigation extends React.Component {
  render() {
    return (
      <Container>
        <Nav className='justify-content-center'>
          <Nav.Item>
            <Nav.Link>
              <Link to="#">Home</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/posts">List of Posts</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
     )
  }
}
