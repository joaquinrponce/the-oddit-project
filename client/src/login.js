import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { userContext } from './userContext.js'

export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = { username: '', password: '', redirect: false }
    this.handleChange = this.handleChange.bind(this)
    this.setRedirect = this.setRedirect.bind(this)
  }

  handleChange (e) {
    e.preventDefault()
    e.persist()
    const newState = JSON.parse(JSON.stringify(this.state))
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  setRedirect () {
    this.setState({ username: '', password: '', redirect: true })
  }

  render () {
    return (
      <userContext.Consumer>
        {({ user, logInUser, logOutUser, loggedIn }) => {
          return (
            <Modal show={this.props.show} onHide={this.props.hideModal}>
              { loggedIn && <Redirect to="/"/> }
              <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={(e) => {
                  e.preventDefault()
                  logInUser({ auth: { name: this.state.username, password: this.state.password } })
                }}>
                  <Form.Group controlId='loginForm'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control name='username' type='text' placeholder='XxOdinxX' value={this.state.username} onChange={this.handleChange}/>
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type='password' value={this.state.password} onChange={this.handleChange}/>
                  </Form.Group>
                  <Button variant='primary' type='submit'>Login</Button>
                </Form>
              </Modal.Body>
            </Modal>
          )
        }}
      </userContext.Consumer>
    )
  }
}
