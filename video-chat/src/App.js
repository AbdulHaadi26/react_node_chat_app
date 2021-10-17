import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { getCurrentUser } from './redux/actions/userActions';
import Private from './routes/private';
import Public from './routes/public';

function App({ profile, getCurrentUser }) {

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser])

  return (
    <div className="container-fluid">
      <div className="row">
        <Router>
          {profile ? <Private /> : <Public />}
        </Router>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    profile: state.Profile.data
  }
};

export default connect(mapStateToProps, { getCurrentUser })(App);
