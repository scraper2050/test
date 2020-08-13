import React from 'react'
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className="main-header app-header navbar d-flex" style={{ fontSize: "16px" }}>
            <button type="button" className="navbar-toggler d-lg-none ng-star-inserted">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link to="" className="navbar-brand mt-auto h-100">
                <img src="/assets/img/logo.jpg" width="89" height="25" alt="Blueclerk Logo" className="navbar-brand-full" style={{
                    width: "100%",
                    height: "auto"
                }} />
                <img src="/assets/img/logo.jpg" width="30" height="30" alt="Blueclerk Logo" className="navbar-brand-minimized" style={{
                    width: "100%",
                    height: "auto"
                }} />
            </Link>
            <ul className="nav navbar-nav top-nav custommenu">
                <li className="px-3 nav-item"><Link className="nav-link" to="#/dashboard" aria-current="page">Dashboard</Link></li>
            </ul>
            <ul className="ml-auto navbar-nav">
                <li className="d-md-down-none dropdown nav-item">
                    <Link aria-haspopup="true" to="#" className="nav-link" aria-expanded="false">
                        <div className="d-flex" style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            backgroundColor: "rgb(93, 156, 236)",
                            marginRight: "20px"
                        }}>
                            <i className="fa fa-question fa-sm"
                                style={{
                                    color: "white",
                                    fontSize: "16px",
                                    margin: "auto"
                                }} />
                        </div>
                        {/* <span className="badge badge-danger badge-pill">5</span> */}
                    </Link>
                </li>
                <li className="d-md-down-none dropdown nav-item">
                    <Link aria-haspopup="true" to="#" className="nav-link" aria-expanded="false">
                        <div className="d-flex" style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            backgroundColor: "rgb(93, 156, 236)",
                            marginRight: "20px"
                        }}>
                            <i className="cui-settings icons" style={{
                                color: "white",
                                fontSize: "16px",
                                margin: "auto"
                            }} />
                        </div>
                    </Link>
                </li>
                <li className="d-md-down-none dropdown nav-item">
                    <Link aria-haspopup="true" to="#" className="nav-link" aria-expanded="false">
                        <div className="d-flex" style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            backgroundColor: "#C00707",
                            marginRight: "20px"
                        }}>
                            <i className="cui-bell" style={{
                                color: "white",
                                fontSize: "16px",
                                margin: "auto"
                            }} />
                        </div>
                    </Link>
                </li>
                <li className="dropdown nav-item">
                    <Link aria-haspopup="true" to="#" className="nav-link mr-2" aria-expanded="false">
                        {/* <img src="/assets/img/avatars/6.jpg" className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                        <img style={{
                            width: "33px",
                            height: "33px",
                            marginRight: "20px",
                            borderRadius: "50%",
                            cursor: "pointer"
                        }} src="https://blueclerknodeapibucket.s3.amazonaws.com/83b0230d-da3c-4aaf-946b-b4bbcd86bd85" />
                    </Link>
                </li>
                <li className="dropdown nav-item">
                    <span style={{
                        marginRight: "20px"
                    }}>J.Mactavish</span>
                </li>
            </ul>
        </header>
    )
}

export default Header;