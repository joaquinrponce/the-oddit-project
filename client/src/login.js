import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { userContext } from './userContext.js'
import LoginForm from './loginForm.js'

export default class Login extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    if (this.context.loggedIn) return <Redirect to="/"/>
    return(
      <Modal show={this.props.show} onHide={this.props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <LoginForm/>
          </Modal.Body>
      </Modal>
    )
  }
}

Login.contextType = userContext
