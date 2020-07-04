import React from 'react'
import { Container, Button } from 'react-bootstrap'
import HallModal from './halls/hallModal.js'
import {userContext} from './userContext'
import { withRouter } from 'react-router-dom'

class MainSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showHallModal: false}
  }

  toggleHallModal = () => {
    this.setState({showHallModal: !this.state.showHallModal})
  }

  render () {
      if (!this.context.loggedIn) {
        return (<Container className='main-sidebar mt-3'>
          <h2 className='path-header'>Viewing {this.props.location.pathname}</h2>
          <h5 className='invitation-header'>Log in to participate in our communities!</h5>
        </Container>)
      }
      if (this.context.loggedIn) { return (
      <Container className='main-sidebar mt-3'>
        <h2 className='path-header'>Viewing {this.props.location.pathname}</h2>
        <h5 className='invitation-header'>Create your own community!</h5>
        <Button type='button' onClick={this.toggleHallModal} className='create-hall-button' >Create Hall</Button>
        <HallModal toggle={this.toggleHallModal} show={this.state.showHallModal}/>
      </Container>
      )
    }
  }
}

MainSidebar.contextType = userContext

export default withRouter(MainSidebar)
