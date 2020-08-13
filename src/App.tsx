import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import configureStore, { history } from "./store";
import './App.scss';
import Admin from './Admin';
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
                        <Redirect exact path="/" to="/pr" />
                        {/* <RestrictedRoute path='/dashboard' token={token} component={Dashboard} /> */}
                        <Route path='/pr' component={Admin} />
                        <Route path="/login" component={SignIn} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/recover" component={Recover} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;