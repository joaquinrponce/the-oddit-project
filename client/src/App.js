import React from 'react';
import './App.css';
import PostsList from './postsList.js'
import Post from './post.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import Navigation from './navigation.js'
import Container from 'react-bootstrap/Container'
import {userContext} from './userContext.js'
import Login from './login.js'
import Logout from './logout.js'
import NewPostForm from './newPostForm.js'
import * as jwtDecode from 'jwt-decode'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      user: {name: 'Guest'},
      logInUser: this.logInUser,
      logOutUser: this.logOutUser,
      loggedIn: false,
      showLoginModal: false,
      showPostModal: false,
      redirectToPost: false,
      postURL: null
    }
    this.logInUser = this.logInUser.bind(this)
    this.logOutUser = this.logOutUser.bind(this)
    this.showLoginModal = this.showLoginModal.bind(this)
    this.hideLoginModal = this.hideLoginModal.bind(this)
    this.showPostModal = this.showPostModal.bind(this)
    this.hidePostModal = this.hidePostModal.bind(this)
  }

  logInUser = (request) => {
    fetch('/api/user_token', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      const payload = jwtDecode(data.jwt)
      const user = payload.sub
      localStorage.setItem("currentUser", JSON.stringify({
        name: user.name,
        id: user.id,
        token: data.jwt,
      }))
      this.setState({user: {name: user.name, id: user.id,}, logInUser: this.logInUser, logOutUser: this.logOutUser, loggedIn: true, showLoginModal: false})
    })
    .catch(error => console.log('error', error))
  }

  logOutUser = () => {
    localStorage.removeItem('currentUser')
    this.setState({
      user: {name: 'Guest'},
      logInUser: this.logInUser,
      logOutUser: this.logOutUser,
      loggedIn: false,
      showLoginModal: false,
      showPostModal: false,
    })
  }

  componentDidMount() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser && currentUser.token) {
      this.setState({user: {name: currentUser.name, id: currentUser.id, token: currentUser.token}, logInUser: this.logInUser, logOutUser: this.logOutUser, loggedIn: true})
    }
  }

  showLoginModal() {
    if (!this.state.loggedIn) {
      this.setState({user: {name: 'Guest'}, logInUser: this.logInUser, logOutUser: this.logOutUser, loggedIn: false, showLoginModal: true})
    }
  }

  hideLoginModal() {
      this.setState({user: {name: 'Guest'}, logInUser: this.logInUser, logOutUser: this.logOutUser, loggedIn: false, showLoginModal: false})
  }

  showPostModal() {
    if (this.state.loggedIn) {
      this.setState({user: this.state.user, logInUser: this.logInUser, logOutUser: this.logOutUser, loggedIn: this.state.loggedIn, showLoginModal: this.state.showLoginModal, showPostModal: true})
    }
  }

  hidePostModal() {
      this.setState({user: this.state.user, logInUser: this.logInUser, logOutUser: this.logOutUser, loggedIn: this.state.loggedIn, showLoginModal: this.state.showLoginModal, showPostModal: false})
  }

  render() {
    return (
    <userContext.Provider value={this.state}>
      <Container fluid>
        <Router>
          <Navigation showPostModal={this.showPostModal} showLoginModal={this.showLoginModal}/>
          { !this.state.loggedIn && <Login show={this.state.showLoginModal} hideModal={this.hideLoginModal}/> }
          {  this.state.loggedIn && <NewPostForm userID={this.state.user.id} handleSubmit={this.submitPost} show={this.state.showPostModal} hideModal={this.hidePostModal}/>  }
          <Container fluid className='mt-5'>
          <Switch>
            <Route path="/all" render={(props) => <PostsList title={'all'}{...props}/>} />
            <Route path="/new" render={(props) => <PostsList title={'new'}{...props}/>} />
            <Route path="/top" render={(props) => <PostsList title={'top'}{...props}/>} />
            <Route path="/halls/:id" render={(props) =>
                                        <PostsList title={'woot'}{...props}/>
                                    }
                                    />
            <Route path="/logout"><Logout/></Route>
            <Route path={'/posts/:id'}>
              <Post />
            </Route>
            <Route path="/" render={(props) => <PostsList title={'feed'}{...props}/>} />
          </Switch>
          </Container>
        </Router>
      </Container>
    </userContext.Provider>
    )
  }
}

export default App;
