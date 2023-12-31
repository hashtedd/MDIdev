import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Edit from '../screens/Edit';
import Register from '../screens/Register';
import Confirmation from '../screens/Confirmation';
import { AuthContext } from '../context/auth';
import { getStore } from '../utils';

function AuthenticatedRoute ({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => getStore('user') ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

class Navigation extends Component {
  render() {
    return (
      <AuthContext.Provider>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/confirm" component={Confirmation} />
            <AuthenticatedRoute exact path='/home' component={Home} />
            <AuthenticatedRoute exact path='/edit' component={Edit} />
            <Route exact path='*' component={Login} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    )
  }
}

export default Navigation;