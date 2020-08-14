import React, { Component } from 'react'
import SubHeader from './SubHeader'
import { Link } from 'react-router-dom'

import './style.scoped.scss';

class People extends Component {
    render()
    {
        return(
        <React.Fragment>
            {/* Main Container */}
            <SubHeader />

            {/* People Container */}
            <div className="sidebar sidebar-custom ng-star-inserted">
                <ul style={{fontSize: "16px"}} className="sidebar-nav ps" role="nav">
                    <ul className="nav">
                        <li className="nav-item ng-star-inserted">
                            <Link to="/people/group" className="nav-link ng-star-inserted active">Groups</Link>
                        </li>
                        <li className="nav-item ng-star-inserted">
                            <Link to="/people/technicians" className="nav-link ng-star-inserted">Technicians</Link>
                        </li>
                        <li className="nav-item ng-star-inserted">
                            <Link to="/people/manager" className="nav-link ng-star-inserted">Managers</Link>
                        </li>
                        <li className="nav-item ng-star-inserted">
                            <Link to="/people/officeadmin" className="nav-link ng-star-inserted">Office Admin</Link>
                        </li>
                    </ul>                    
                </ul>
            </div>

        </React.Fragment>
        )
    }
}
export default People;