import React from 'react'
import { Modal } from 'react-bootstrap'
import SignUpForm from './signUpForm.js'

export default class SignUp extends React.Component {

  render () {
    return (
      <Modal show={this.props.show} onHide={this.props.hideModal}>
        <Modal.Header closeButton>Sign up!</Modal.Header>
        <Modal.Body>
          <SignUpForm hideModal={this.props.hideModal}/>
        </Modal.Body>
      </Modal>
    )
  }
}
