import React from 'react';
<<<<<<< HEAD
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import configureStore, { history } from "./store";
import './App.scss';
import Dashboard from './dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Recover from './pages/Recover';
import TempPage from './dashboard/Customers/tempPage';
=======
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './app/Components/Header';
>>>>>>> c5649243c69371c1556c10a778b4bf7f49015437

import GroupPage from './app/Pages/People/Group';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signup" />
          <Route path="/recover" />
          <Route path="/">
            <Header />
            <div className="main-container">
              <Switch>
                <Route path="/people" component={GroupPage} />
              </Switch>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

<<<<<<< HEAD
function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="app">
                    <Switch>
                        <Route exact path="/" component={SignIn} />
                        <Route path="/customers/schedule" component={TempPage} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/recover" component={Recover} />

                        {/* <RestrictedRoute path='/dashboard' token={token} component={Dashboard} /> */}
                        <Route path='/' component={Dashboard} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
=======
export default App;
>>>>>>> c5649243c69371c1556c10a778b4bf7f49015437
