import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import PostsList from './halls/posts/postsList.js'
import MainSidebar from './mainSidebar.js'
import { Col, Row } from 'react-bootstrap'

class MainFeed extends React.Component {


  componentDidMount() {
    document.title = this.props.location.pathname + ' - oddit'
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps)
     {
       document.title = this.props.location.pathname + ' - oddit'
     }
  }

  render() {
    if (this.props.location.pathname === '/') return <Redirect to="/all"/>
    return(
      <Row className='feed-row'>
        <Col className='posts-list-col' md='9'>
          <PostsList/>
        </Col>
        <Col className='sidebar-col' >
          <MainSidebar/>
        </Col>
      </Row>
    )
  }
}

export default withRouter(MainFeed)
