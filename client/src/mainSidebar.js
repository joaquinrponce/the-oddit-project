import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TopCommunities from './topCommunities.js'
import TopPosts from './topPosts.js'

export default class MainSidebar extends React.Component {

  render () {
    return(
    <Container>
      <TopCommunities/>
      <TopPosts/>
    </Container>
  )
  }
}
