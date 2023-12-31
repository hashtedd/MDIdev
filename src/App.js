import React from 'react';
import { connect } from 'react-redux';
import Navigation from './navigation';
import { getStore } from './utils';
import { ActionCreators } from './actions/profile';

class App extends React.Component {
  componentDidMount() {
    const user = getStore('user')
    if (user) {
      this.props.dispatch(ActionCreators.login(user));
    }
  }
  
  render() {
    return (
      <div>
        <Navigation />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(App);