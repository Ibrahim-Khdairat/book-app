import React from 'react';
import Header from './Header';
import FavBook from './FavBook';
import Login from './Login';
import Profile from './components/User'
// import IsLoadingAndError from './IsLoadingAndError';
import { withAuth0 } from '@auth0/auth0-react';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css'

class App extends React.Component {

  render() {
    const { user, isAuthenticated } = this.props.auth0;
    console.log('Test : '+isAuthenticated);
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}

              {isAuthenticated ? <FavBook /> : <Login />}
            </Route>

            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}

            <Route exact path="/profile">
              <Profile />
            </Route>

          </Switch>
          <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
