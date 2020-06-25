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

export default withRouter(MainSidebar)
