import React from 'react'
import { Container, Col, Row, Button, Modal } from 'react-bootstrap'
import HallForm from './hallForm.js'
import HallModal from './hallModal.js'
import {userContext} from './userContext'

export default class MainSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showHallModal: false}
  }

  toggleHallModal = () => {
    this.setState({showHallModal: !this.state.showHallModal})
  }

  render () {
      if (!this.context.loggedIn) {
        return (<Container className='mt-3'>
          <h2>Viewing {this.props.location.pathname}</h2>
          <h5>Log in to participate in our communities!</h5>
        </Container>)
      }
      if (this.context.loggedIn) { return (
      <Container className='mt-3'>
        <h2>Viewing {this.props.location.pathname}</h2>
        <h5>Create your own community!</h5>
        <Button type='button' onClick={this.toggleHallModal} variant='primary'>Create Hall</Button>
        <HallModal toggle={this.toggleHallModal} show={this.state.showHallModal}/>
      </Container>
      )
    }
  }
}

MainSidebar.contextType = userContext