import React from 'react'
import { withRouter } from 'react-router-dom'
import PostsList from './postsList.js'
import MainSidebar from './mainSidebar.js'
import { Col, Row } from 'react-bootstrap'

class MainFeed extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    return(
      <Row>
        <Col md='9'>
          <PostsList/>
        </Col>
        <Col>
          <MainSidebar/>
        </Col>
      </Row>
    )
  }
}

export default withRouter(MainFeed)
