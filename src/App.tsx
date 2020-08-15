import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import configureStore, { history } from "./store";
import './App.scss';
import Dashboard from './dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Recover from './pages/Recover';

const store = configureStore({});


function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="app">
                    <Switch>
                        <Redirect exact path="/" to="/dashboard" />
                        {/* <RestrictedRoute path='/dashboard' token={token} component={Dashboard} /> */}
                        <Route path="/login" component={SignIn} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/recover" component={Recover} />
                        <Route path='/' component={Dashboard} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;