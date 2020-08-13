import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../shared/Header';
import Dashboard from './Content';
import './style.scss';

export const Admin = () => {
    return (
        <React.Fragment>
            <div className="admin">
                <Header />
                <Switch>
                    <Route exact path="/pr" component={Dashboard} />
                </Switch>
            </div>
        </React.Fragment>
    )
}

export default Admin;