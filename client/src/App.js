import React, {Fragment, useState} from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

//Components

import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Register from "./components/register";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //toggle true and false
  const setAuth = (boolean) => {

    setIsAuthenticated(boolean);

  }

  return (

    //if they are authenticated they can go to dashboard if not they go to login page
  <Fragment>
    <Router>
      <div className="Container">
      <Switch>
     
      <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />} />
      <Route exact path="/register" render={props => !isAuthenticated ? <Register {...props} setAuth={setAuth} /> : <Redirect to="/login" />} />
      <Route exact path="/dashboard" render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to="/login"/>} />

      </Switch>

      </div>
      
    </Router>
  </Fragment>
  );
}

export default App;
