import React from 'react';
import logo from './logo.svg';
import Login from './Login';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }
  render() {
    return (
      <div className="App">
        <Router>

          <Navbar bg="dark" variant="dark">
            <Navbar.Brand >
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Da Navbar
    </Navbar.Brand>
            <Nav className="mr-auto">
             
                <Link to='/login'>
                  Login
                </Link>
            </Nav>
          </Navbar>
          <Switch>

            <Route path="/login">
              <Login />
            </Route>

          </Switch>
        </Router>
        <header className="App-header">
          Hello Every One !
        </header>
      </div>
    );
  }
}

export default App;
