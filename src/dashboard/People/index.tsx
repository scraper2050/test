import React from 'react';
import SubHeader from './SubHeader'
import { Link, useLocation} from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Groups from './Groups'
import Tech from './Tech'
import Managers from './Managers'
import Office from './Office'

import './style.scoped.scss';

const People: () => JSX.Element = () =>{ 
    let location = useLocation();
    let pathName = location.pathname;

    return(
        <React.Fragment>
            {/* Main Container */}
            <SubHeader />
            
            {/* People Container */}
            <div className = "people-mainContainer">
                <div className="sidebar sidebar-custom">
                    <ul style={{fontSize: "16px", padding: 0}} className="sidebar-nav ps" role="nav">
                        <ul className="nav">
                            <li className="nav-item">
                                <Link to="/people/group" className={`nav-link${pathName === '/people/group' || pathName === '/people'? ' active' : ''}`}>Groups</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/people/technicians" className={`nav-link${pathName === '/people/technicians' ? ' active' : ''}`}>Technicians</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/people/manager"  className={`nav-link${pathName === '/people/manager' ? ' active' : ''}`}>Managers</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/people/officeadmin"  className={`nav-link${pathName === '/people/officeadmin' ? ' active' : ''}`}>Office Admin</Link>
                            </li>
                        </ul>                    
                    </ul>
                </div>
                <div className="container-fluid" >
                    <Switch>
                        <Route exact path="/people" component={Groups} />
                        <Route path="/people/group" component={Groups} />
                        <Route path="/people/technicians" component={Tech} />
                        <Route path="/people/manager" component={Managers} />
                        <Route path="/people/officeadmin" component={Office} />
                    </Switch>
                </div>
            </div>

        </React.Fragment>
    )
}
export default People;

