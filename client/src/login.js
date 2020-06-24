import React from 'react'
import { Modal } from 'react-bootstrap'
import { userContext } from './userContext.js'
import LoginForm from './loginForm.js'

export default class Login extends React.Component {

  render () {
    return(
      <Modal show={this.props.show} onHide={this.props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <LoginForm hideModal={this.props.hideModal}/>
          </Modal.Body>
      </Modal>
    )
  }
}

Login.contextType = userContext
