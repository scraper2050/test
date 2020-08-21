import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import configureStore, { history } from "./store";
import './App.scss';
import Dashboard from './dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Recover from './pages/Recover';
import TempPage from './dashboard/Customers/tempPage';

const store = configureStore({});


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