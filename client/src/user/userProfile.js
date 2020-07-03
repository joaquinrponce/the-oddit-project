import React from 'react'
import { withRouter } from 'react-router-dom'
import UserSidebar from './userSidebar.js'
import UserContent from './userContent.js'
import { Row, Col } from 'react-bootstrap'
import PaginationControls from '../halls/posts/controls/paginationControls.js'

class UserProfile extends React.Component {

  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {user: null, page: 1}
  }

  getUserData = () => {
    fetch(`/api/users/${this.props.match.params.id.toLowerCase()}?page=${this.state.page}`)
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
    if ((this.props !== prevProps) || this.state.page !== prevState.page) {
      this.getUserData()
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  updatePage = (value) => {
    this.setState({page: this.state.page + value})
  }

  render() {
    console.log(this.state.user)
    if (!this.state.user) return null
    return(
      <Row>
        <Col md='9' className='user-profile-content'>
          <UserContent userId={this.state.user.id} content={this.state.user.content}/>
          <PaginationControls page={this.state.page} lastPage={this.state.last_page} onClick={this.updatePage}/>
        </Col>
        <Col className='user-profile-sidebar'>
          <UserSidebar upvotes={this.state.user.score} name={this.state.user.name} postCount={this.state.user.post_count} commentCount={this.state.user.comment_count} moderatedHalls={this.state.user.moderated_halls} ownedHalls={this.state.user.owned_halls}/>
        </Col>
      </Row>
    )
  }

}

export default withRouter(UserProfile)
