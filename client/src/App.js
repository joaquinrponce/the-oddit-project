import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Navigation from './navigation.js'
import {Container, Col, Row} from 'react-bootstrap'
import {userContext} from './userContext.js'
import Logout from './logout.js'
import Hall from './hall.js'
import HallsList from './hallsList.js'
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
    newState.user = {name: user.name, id: user.id, token: user.token, role: user.role}
    newState.loggedIn = true
    localStorage.setItem("currentUser", JSON.stringify({
      name: user.name,
      id: user.id,
      token: user.token,
      role: user.role
    }))
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
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser && currentUser.token) {
      if (!this.tokenIsExpired(currentUser.token)) {
        const newState = Object.assign(this.state)
        newState.user = {name: currentUser.name, id: currentUser.id, token: currentUser.token, role: currentUser.role}
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
          <Col>
          <Switch>
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
