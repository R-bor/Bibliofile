import React, { Fragment, useState } from "react";

import {
BrowserRouter as Router,
Switch,
Route,
Redirect
} from "react-router-dom";

//Components 
//import Header from "./components/Header";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard"; 
import Navbar from "./components/NavBar"; 
import Search from "./components/SearchBar";

//App 
function App() {
  const [isAuth, setAuth] = useState(false);  

  const setAuthenticated = (boolean) => 
  { 
    setAuth(boolean);
  } 

  return (
    <Fragment>
      <Router>
        <div className="container"> 
          <Switch>
            <Route exact path='/' render={props => !isAuth ? <SignIn {...props} setAuthenticated={setAuthenticated}/> : <Redirect to='/dashboard' />} />
            <Route exact path='/register' render={props => <Register {...props} />} />
            <Route exact path='/dashboard' render={props => isAuth ? <><Navbar /><Dashboard {...props} /></> : <Redirect to='/' />} />
            <Route exact path='/search' render={props => isAuth ? <><Navbar /><Search {...props} /></> : <Redirect to='/' />} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
