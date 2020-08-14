import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../shared/Header';
import Content from './Content';
import Dashboard from './Dashboard';
import Customers from './Customers';

import './style.scss';

export const Admin = () => {
    return (
        <React.Fragment>
            <div className="admin">
                <Header />
                <Switch>
                    <Route exact path="/pr" component={Content} />
                    <Route path="/pr/dashboard" component={Dashboard} />
                    <Route path="/pr/customers/customer-list" component={Customers} />
                </Switch>
            </div>
        </React.Fragment>
    )
}

export default Admin;