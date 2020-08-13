import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
    return (
        <div className="left-navbar sidebar" id="left-navbar">
            <ul className="nav navbar-nav response-nav">
                <li className="nav-item active">
                    <Link to="/" className="nav-item">Dashboard</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/" className="nav-item">Dashboard</Link>
                </li>
                <li className="dropdown nav-item active" tabIndex={0}>
                    <a className="dropdown-toggle nav-item" data-toggle="dropdown" aria-expanded="false">Customers</a>
                    <ul className="dropdown-menu ng-start-inserted">
                        <li><Link to="">Page 1-1</Link></li>
                        <li><Link to="">Page 1-2</Link></li>
                        <li><Link to="">Page 1-3</Link></li>
                    </ul>
                </li>
                <li className="nav-item active">
                    <Link to="/" className="nav-item">Tags</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/" className="nav-item">inventory</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/" className="nav-item">Admin</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/" className="nav-item">Integrations</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/" className="nav-item">Invoicing</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar