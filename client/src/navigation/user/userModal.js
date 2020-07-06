import React from 'react'
import { Modal } from 'react-bootstrap'
import LoginForm from './loginForm.js'
import SignUpForm from './signUpForm.js'
import UpdatePasswordForm from './updatePasswordForm.js'

export default class SignUp extends React.Component {

  render () {
    let form = null
    let title = ''
    switch (this.props.type) {
      case 'login':
        form = <LoginForm hideModal={this.props.hideModal}/>
        title = 'Login'
        break;
      case 'signup':
        form = <SignUpForm hideModal={this.props.hideModal}/>
        title = 'Sign up'
        break;
      case 'password':
        form = <UpdatePasswordForm hideModal={this.props.hideModal}/>
        title = 'Update Password'
        break;
      default:
        break;
    }
    return (
      <Modal show={this.props.show} onHide={this.props.hideModal}>
        <Modal.Header closeButton>{title}</Modal.Header>
        <Modal.Body>
          { form }
        </Modal.Body>
      </Modal>
    )
  }
}
