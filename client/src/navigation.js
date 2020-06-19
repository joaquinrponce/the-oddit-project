import React from 'react'
import {
  Link
} from 'react-router-dom'
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { userContext } from './userContext.js'
import UserControls from './userControls.js'
import PageControls from './pageControls.js'

export default class Navigation extends React.Component {
  render () {
    return (
      <userContext.Consumer>
        {({ user, logInUser, logOutUser, loggedIn }) => {
          return (
            <Navbar expand='lg' bg='light' className='fixed-top'>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id='basic-navbar-nav'>
                <PageControls/>
                <UserControls/>
              </Navbar.Collapse>
            </Navbar>
          )
        }
        }
      </userContext.Consumer>
    )
  }
}
