import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Navigation from './navigation/navigation.js'
import {Container, Col, Row} from 'react-bootstrap'
import {userContext} from './userContext.js'
import Logout from './navigation/user/logout.js'
import Hall from './halls/hall.js'
import HallsList from './halls/hallsList.js'
import UserProfile from './user/userProfile.js'
import NotFound from './notFound.js'
import MainFeed from './mainFeed.js'
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

  logInUser = (user) => {
    const newState = Object.assign(this.state)
    newState.user = user
    newState.loggedIn = true
    localStorage.setItem("currentUser", JSON.stringify(user))
    this.setState(newState)
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
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser && currentUser.token) {
      if (!this.tokenIsExpired(currentUser.token)) {
        const newState = Object.assign(this.state)
        newState.user = currentUser
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
      <Container className='main' fluid>
        <Router>
            <Navigation/>
          <Container fluid className='main-posts-container mt-5'>
          <Row>
          <Col>
          <Switch>
          <Route path="/users/:id">
            <UserProfile/>
          </Route>
            <Route path="/halls/:id">
              <Hall/>
            </Route>
            <Route path="/halls">
              <HallsList/>
            </Route>
            <Route path="/logout">
              <Logout/>
            </Route>
            <Route exact path={["/all", "/new", "/top", "/feed", "/"] }>
              <MainFeed/>
            </Route>
            <Route component={NotFound}/>
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
