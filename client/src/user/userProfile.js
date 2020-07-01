import React from 'react'
import { withRouter } from 'react-router-dom'
import UserSidebar from './userSidebar.js'
import UserContent from './userContent.js'
import { Row, Col } from 'react-bootstrap'

class UserProfile extends React.Component {

  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {user: null}
  }

  getUserData = () => {
    fetch(`/api/users/${this.props.match.params.id.toLowerCase()}`)
    .then(response => {
      if (response && response.ok) {
        return response.json()
      } else {
        console.log(response)
        return
      }
    })
    .then(user => {
      if (user && this._isMounted) {
        this.setState({user: user})
      } else {
        return
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  componentDidMount = () => {
    this._isMounted = true
    this.getUserData()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) {
      this.getUserData()
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  render() {
    if (!this.state.user) return null
    return(
      <Row>
        <Col md='9' className='user-profile-content'>
          <UserContent userId={this.state.user.id} posts={this.state.user.posts} comments={this.state.user.comments}/>
        </Col>
        <Col className='user-profile-sidebar'>
          <UserSidebar name={this.state.user.name} postCount={this.state.user.posts.length} commentCount={this.state.user.comments.length} moderatedHalls={this.state.user.moderated_halls} ownedHalls={this.state.user.owned_halls}/>
        </Col>
      </Row>
    )
  }

}

export default withRouter(UserProfile)
