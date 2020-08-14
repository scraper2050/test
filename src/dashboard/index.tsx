import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TopMenu from './TopMenu';
import ToggleSidebar from './ToggleSidebar';
import Home from './Home';
import People from './People';

import './style.scss';

export const Dashboard = () => {
    return (
        <React.Fragment>
            <div className="admin">
                <TopMenu />
                <ToggleSidebar />
                <Switch>
                    {/* <Route exact path="/pr" component={Home} /> */}
                    <Route exact path="/pr" component={Home} />
                    <Route path="/pr/people" component={People} />
                </Switch>
            </div>
        </React.Fragment>
    )
}

export default Dashboard;