import React from 'react'
import PostCard from './postCard.js'
import { Container, Spinner } from 'react-bootstrap'
import { withRouter, Redirect } from 'react-router-dom'
import { userContext } from '../../userContext.js'
import PaginationControls from './controls/paginationControls'

class PostsList extends React.Component {
  _isMounted = false
  constructor (props) {
    super(props)
    this.state = { posts: null, page: 1, lastPage: false }
    this.getPosts = this.getPosts.bind(this)
    this.renderPosts = this.renderPosts.bind(this)
  }

  renderPosts () {
    const posts = []
    this.state.posts.forEach(post => {
      posts.push(<PostCard key={post.id} post={post} postURL={`/halls/${post.hall.name}/posts/${post.id}`} hallURL={`/halls/${post.hall.name}`}/>)
    })
    return posts
  }

  getPosts () {
    let url = `/api/posts?page=${this.state.page}`
    if (this.props.hall) {
      url = `/api/halls/${this.props.hall}/posts?page=${this.state.page}`
    }
    switch (this.props.location.pathname) {
      case '/feed':
          url =`/api/posts/feed?page=${this.state.page}`
          break
      default:
          break
    }
    fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.context.user.token }
    }).then(response => {
      if (response.ok) {
        return response.json()
    } else {
      return
      }
    }).then(data => {
      if (!this._isMounted) return
      if (!data) return
      this.setState({ posts: data.posts, lastPage: data.last_page })
    })
  }

  componentDidMount () {
    this._isMounted = true
    this.getPosts()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({posts: null, page: 1, last_page: false}, this.getPosts())
      window.scrollTo(0,0)
      return
    }
    if (this.state.page !== prevState.page) {
      this.getPosts()
      window.scrollTo(0,0)
      return
    }
  }

  updatePage = (value) => {
    this.setState({page: this.state.page + value})
  }

  componentWillUnmount () {
    this._isMounted = false
  }
  render () {
    if (this.props.location.pathname === '/feed' && this.context.loggedIn === false) return <Redirect to="/all"/>
    if (!this.state.posts) {
      return (
        <Container className='d-flex justify-content-center align-items-center' fluid>
          <Spinner animation='grow' variant='warning' role='status'>
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )
    }
    return (
      <Container fluid className='mt-2 post-list'>
          { this.renderPosts() }
          { this.state.posts.length === 0 && this.props.location.pathname === '/feed' && <div>Nothing to see here. Try Joining some halls so you'll see their posts in your feed!</div> }
          { this.state.posts.length === 0 && this.props.location.pathname !== '/feed' && <div>There aren't any posts to show here. Try making some yourself!</div> }
          <PaginationControls page={this.state.page} lastPage={this.state.lastPage} onClick={this.updatePage}/>
      </Container>
    )
  }
}

PostsList.contextType = userContext

export default withRouter(PostsList)
