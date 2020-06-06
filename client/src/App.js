import React from 'react';
import './App.css';
import PostsList from './postsList.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom"
import Navigation from './navigation.js'
import Home from './home.js'
import Container from 'react-bootstrap/Container'

function App() {
  return (
    <Container fluid>
    <Router>
      <Navigation/>
    <Switch>
      <Route path="/" component={PostsList}/>
    </Switch>
    </Router>
    </Container>
  );
}

export default App;
