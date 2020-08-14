import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TopMenu from './TopMenu';
import Home from './Home';
import People from './People';

import './style.scss';
import Customers from './Customers';
import Invoicing from './Invoicing';
import Tags from './Tags';
import Inventory from './Inventory';
import Employees from './Employees';
import Vendors from './Vendors';
import Admin from './Admin';

export const Dashboard = () => {
    return (
        <React.Fragment>
            <div className="admin">
                <TopMenu />
                <Switch>
                    {/* <Route exact path="/pr" component={Home} /> */}
                    <Route exact path="/dashboard" component={Home} />
                    <Route path="/people" component={People} />
                    <Route path="/customers" component={Customers} />
                    <Route path="/invoicing" component={Invoicing} />
                    <Route path="/tags" component={Tags} />
                    <Route path="/inventory" component={Inventory} />
                    <Route path="/employees" component={Employees} />
                    <Route path="/vendors" component={Vendors} />
                    <Route path="/admin" component={Admin} />
                </Switch>
            </div>
        </React.Fragment>
    )
}

export default Dashboard;