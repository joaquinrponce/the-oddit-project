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

function App() {
  return (
    <Container fluid>
    <Router>
      <Navigation/>
    <Switch>
      <Route path="/all" render={(props) => <PostsList title={'all'}{...props}/>} />
      <Route path="/new" render={(props) => <PostsList title={'new'}{...props}/>} />
      <Route path="/top" render={(props) => <PostsList title={'top'}{...props}/>} />
      <Route path="/halls/:id" render={(props) =>
                                        <PostsList title={'woot'}{...props}/>
                                    }
      />
      <Route path="/" render={(props) => <PostsList title={'feed'}{...props}/>} />
    </Switch>
    </Router>
    </Container>
  );
}

export default App;
