import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class NotFound extends React.Component {
  render () {
    return(
      <Container>
        <h1>404 Not Found</h1>
        <h5>Seems you've lost your way, brave warrior. You may want to go back home.</h5>
        <div>If you believe you should see content here, please contact the site admin.</div>
        <Link to='/'>Go back</Link>
      </Container>
    )
  }
}
