import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export const TopMenu = () => {
    let location = useLocation();
    console.log("location.pathname => ", location.pathname);
    let pathName = location.pathname;
    return (
        <div className="main-header app-header navbar d-flex" style={{ fontSize: "16px", marginBottom: 0 }}>
            <button type="button" className="navbar-toggler d-lg-none ng-star-inserted">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link to="/dashboard" className="navbar-brand mt-auto h-100">
                <img src="/assets/img/logo.jpg" width="89" height="25" alt="Blueclerk Logo" className="navbar-brand-full" style={{
                    width: "100%",
                    height: "auto"
                }} />
                <img src="/assets/img/logo.jpg" width="30" height="30" alt="Blueclerk Logo" className="navbar-brand-minimized" style={{
                    width: "100%",
                    height: "auto"
                }} />
            </Link>
            {/* Left Top Menu */}
            <ul className="nav navbar-nav top-nav customMenu">
                <li className={`nav-item${pathName === '/people' ? ' active' : ''}`} tabIndex={0} ng-reflect-router-link="/dashboard" ng-reflect-router-link-active="active">
                    <Link to="/people" className="nav-item">People</Link>
                </li>
                <li className={`dropdown nav-item${pathName === '/customers' ? ' active' : ''}`} tabIndex={0}>
                    {/* <Link to="/customers" className="dropdown-toggle nav-item" data-toggle="dropdown">Customers</Link> */}
                    <Link to="/customers" className="dropdown-toggle nav-item">Customers</Link>
                </li>
                <li className={`nav-item${pathName === '/invoicing' ? ' active' : ''}`} tabIndex={0}>
                    <Link to="/invoicing" className="nav-item">Invoicing</Link>
                </li>
                <li className={`nav-item${pathName === '/tags' ? ' active' : ''}`} tabIndex={0}>
                    <Link to="/tags" className="nav-item">Tags</Link>
                </li>
                <li className={`nav-item${pathName === '/inventory' ? ' active' : ''}`} tabIndex={0}>
                    <Link to="/inventory" className="nav-item">Inventory</Link>
                </li>
                <li className={`nav-item${pathName === '/employees' ? ' active' : ''}`} tabIndex={0}>
                    <Link to="/employees" className="nav-item">Employees</Link>
                </li>
                <li className={`nav-item${pathName === '/vendors' ? ' active' : ''}`} tabIndex={0}>
                    <Link to="/vendors" className="nav-item">Vendors</Link>
                </li>
                <li className={`nav-item${pathName === '/admin' ? ' active' : ''}`} tabIndex={0}>
                    <Link to="/admin" className="nav-item">Admin</Link>
                </li>
            </ul>

            <div className="search-container"></div>
            {/* Right Top Menu */}
            <div className="headerSupport">
                <a href="https://blueclerk.com/support/" target="_blank">
                    <i aria-hidden="true" className="fa fa-question-circle" style={{ fontSize: 22, marginRight: 20 }}>
                    </i>
                </a>
            </div>

            <div className="headerUserInfo">
                <a className="dropdown-toggle" role="button" aria-haspopup="true">
                    <img style={{ width: 33, height: 33, marginRight: 20, borderRadius: '50%', cursor: 'pointer' }}
                        src="https://blueclerknodeapibucket.s3.amazonaws.com/83b0230d-da3c-4aaf-946b-b4bbcd86bd85" />
                </a>
                <span style={{ marginRight: 20 }}>Chris Norton</span>
            </div>
        </div >
    )
}

export default TopMenu;