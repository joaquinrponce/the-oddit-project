import React from 'react';
import './App.css';
import PostsList from './postsList.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Navigation from './navigation.js'
import Container from 'react-bootstrap/Container'
import {userContext} from './userContext.js'
import Login from './login.js'
import Logout from './logout.js'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      user: {name: 'Guest'},
      logInUser: this.logInUser,
      logOutUser: this.logOutUser,
      loggedIn: false,
      showLogin: false
    }
    this.logInUser = this.logInUser.bind(this)
    this.logOutUser = this.logOutUser.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  logInUser = (request) => {
    fetch('/api/user_token', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("currentUser", JSON.stringify({
        name: request.auth.name,
        token: data.jwt,
      }))
      this.setState({user: {name: request.auth.name}, logInUser: this.logInUser, logOutUser: this.logOutUser, loggedIn: true, showModal: false})
    })
    .catch(error => console.log('error', error))
  }

  logOutUser = () => {
    localStorage.removeItem('currentUser')
    this.setState({
      user: {name: 'Guest'},
      logInUser: this.logInUser,
      logOutUser: this.logOutUser,
      loggedIn: false
    })
  }

  componentDidMount() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser && currentUser.token) {
      console.log(currentUser)
      this.setState({user: {name: currentUser.name, token: currentUser.token}, logInUser: this.logInUser, logOutUser: this.logOutUser, loggedIn: true})
    }
  }

  showModal() {
    if (!this.state.loggedIn){
      this.setState({user: {name: 'Guest'}, logInUser: this.logInUser, logOutUser: this.logOutUser, loggedIn: false, showModal: true})
    }
  }

  hideModal() {
      this.setState({user: {name: 'Guest'}, logInUser: this.logInUser, logOutUser: this.logOutUser, loggedIn: false, showModal: false})
  }

  render() {
    return (
    <userContext.Provider value={this.state}>
      <Container fluid>
        <Router>
          <Navigation showModal={this.showModal}/>
          <Login show={this.state.showModal} hideModal={this.hideModal}/>
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
