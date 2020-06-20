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
import {Container, Col, Row} from 'react-bootstrap'
import {userContext} from './userContext.js'
import Logout from './logout.js'
import HallSidebar from './hallSidebar.js'
import MainSidebar from './mainSidebar.js'
import HallsList from './hallsList.js'
import NotFound from './notFound.js'
import * as jwtDecode from 'jwt-decode'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {name: 'Guest'},
      logInUser: this.logInUser,
      logOutUser: this.logOutUser,
      tokenIsExpired: this.tokenIsExpired,
      loggedIn: false,
    }
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
      const newState = Object.assign(this.state)
      newState.user = {name: user.name, id: user.id, token: data.jwt}
      newState.loggedIn = true
      this.setState(newState)
    })
    .catch(error => console.log('error', error))
  }

  logOutUser = () => {
    localStorage.removeItem('currentUser')
    const newState = Object.assign(this.state)
    newState.loggedIn = false
    newState.user = {name: 'Guest'}
    this.setState(newState)
  }

  tokenIsExpired = (token) => {
    const payload = jwtDecode(token)
    const expiry = parseInt(payload.exp)
    const time = Date.now().valueOf() / 1000
    if (time >= expiry) return true
  }

  componentDidMount() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser && currentUser.token) {
      if (!this.tokenIsExpired(currentUser.token)) {
        const newState = Object.assign(this.state)
        newState.user = {name: currentUser.name, id: currentUser.id, token: currentUser.token}
        newState.loggedIn = true
        this.setState(newState)
    } else {
        localStorage.removeItem('currentUser')
      }
    }
  }


  render() {
    return (
      <userContext.Provider value={this.state}>
      <Container fluid>
        <Router>
            <Navigation/>
          <Container fluid className='mt-5'>
          <Row>
          <Col md='9'>
          <Switch>
            <Route path="/all" render={(props) => <PostsList title={'all'}{...props}/>} />
            <Route path="/new" render={(props) => <PostsList title={'new'}{...props}/>} />
            <Route path="/top" render={(props) => <PostsList title={'top'}{...props}/>} />
            <Route path="/halls/:id" render={(props) =>
                                        <PostsList title={'woot'}{...props}/>
                                    }
                                    />
            <Route path="/halls"><HallsList/></Route>
            <Route path="/logout"><Logout/></Route>
            <Route path={'/posts/:id'}>
              <Post />
            </Route>
            { this.state.loggedIn && <Route path="/feed" user={this.state.user} render={(props) => <PostsList token={this.state.user.token} title={'feed'}{...props}/>} /> }
            <Route path="/*" render={(props) => <PostsList title={'all'}{...props}/>} />
          </Switch>
          </Col>
          <Col>
            <Switch>
              <Route path="/halls/:id" render={(props) => <HallSidebar {...props}/>} />
            </Switch>
          </Col>
          </Row>
          </Container>
        </Router>
      </Container>
      </userContext.Provider>
    )
  }
}

export default App;
