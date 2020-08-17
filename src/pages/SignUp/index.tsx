import React, { useState, useEffect } from 'react'
import './style.scoped.scss';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import axios from '../../util/Api';
import { string } from 'prop-types';

const SignUp: () => JSX.Element = () => {


    const [hide, setHide] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [industry, setIndustry] = useState("");
    const [industries, setIndustries] = useState<[{_id: string, title: string}]>([{ _id: "", title: "" }]);
    const [companyName, setCompanyName] = useState("");
    useEffect(() => {
        axios.post('/getIndustries').then(({ data }) => {
            console.log(" get industries api res => ", data);
            setIndustries(data.industries);
        });
    }, []);
    return (
        <div className="ng-star-inserted">
            <div className="app-body">
                <main className="d-flex align-items-center custom-height" style={{
                    flex: "1 1",
                    minWidth: 0
                }}>
                    <div className="row custom_row">
                        <div className="col-sm-12 col-md-6 col-md-offset-6 signin_col">
                            <div className="middle-form">
                                <div className="row Reg">
                                    <div className="col-md-10 mx-auto">
                                        <div className="card mx-6">
                                            <div className="card-body p-4 custom_card">
                                                <form className="form-validate mb-lg" name="loginForm" role="form">
                                                    <h1 className="sign-up-plans" style={{ textAlign: "center" }}>
                                                        Create An Account
                                                    </h1>
                                                    <p className="text-muted" style={{ textAlign: "center" }}>Please fill in below form to create an account with us</p>
                                                    <div className="row text-bottom">
                                                        <div className="col-md-12">
                                                            <h4>
                                                                <span style={{ color: 'red' }}>*</span> All fields required.
                                                            </h4>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fa fa-user" /></span>
                                                                </div>
                                                                <input
                                                                    className="form-control"
                                                                    id="exampleInputFirstName"
                                                                    name="firstName"
                                                                    placeholder="First Name" required
                                                                    type="text"
                                                                    value={firstName}
                                                                    onChange={(ev: any) => { setFirstName(ev.target.value); }} />
                                                                {
                                                                    firstName === "" ?
                                                                        <span className="text-danger ng-star-inserted">*This field is required</span>
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fa fa-user" /></span>
                                                                </div>
                                                                <input
                                                                    className="form-control"
                                                                    id="exampleLastName"
                                                                    name="lastName"
                                                                    placeholder="Last Name" required
                                                                    type="text"
                                                                    value={lastName}
                                                                    onChange={(ev: any) => { setLastName(ev.target.value); }} />
                                                                {
                                                                    lastName === "" ?
                                                                        <span className="text-danger ng-star-inserted">*This field is required</span>
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fa fa-envelope" /></span>
                                                                </div>
                                                                <input
                                                                    autoComplete="off"
                                                                    className="form-control"
                                                                    name="email"
                                                                    placeholder="Email" required
                                                                    type="email"
                                                                    value={email}
                                                                    onChange={(ev: any) => { setEmail(ev.target.value); }} />
                                                                {
                                                                    email === "" ?
                                                                        <span className="text-danger ng-star-inserted">*This field is required</span>
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fa fa-lock" /></span>
                                                                </div>
                                                                <input className="form-control mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored"
                                                                    placeholder="Password" required
                                                                    type={hide ? "text" : "password"}
                                                                    id="mat-input-0"
                                                                    aria-invalid="false"
                                                                    aria-required="true"
                                                                    value={password}
                                                                    onChange={(ev: any) => { setPassword(ev.target.value); }} />
                                                                <Link className="password-visibity-icon" to="" onClick={
                                                                    (ev: any) => {
                                                                        ev.preventDefault();
                                                                        setHide(!hide);
                                                                    }
                                                                }>
                                                                    {
                                                                        hide ? <VisibilityIcon style={{ fontSize: 20 }} /> : <VisibilityOffIcon style={{ fontSize: 20 }} />
                                                                    }
                                                                </Link>
                                                                {
                                                                    password === "" ?
                                                                        <span className="text-danger ng-star-inserted">*This field is required</span>
                                                                        : null
                                                                }
                                                                {/**/}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fa fa-phone" /></span>
                                                                </div>
                                                                <input
                                                                    autoComplete="off"
                                                                    className="form-control"
                                                                    id="exampleInputphoneNumber"
                                                                    name="phoneNumber"
                                                                    placeholder="Phone Number"
                                                                    type="text"
                                                                    value={phoneNum}
                                                                    onChange={(ev: any) => { setPhoneNum(ev.target.value); }} />
                                                                {
                                                                    phoneNum === "" ?
                                                                        <span className="text-danger ng-star-inserted">*This field is required</span>
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fa fa-industry" /></span>
                                                                </div>
                                                                <select
                                                                    className="form-control"
                                                                    id="industry"
                                                                    value={industry}
                                                                    onChange={(ev: any) => { setIndustry(ev.target.value); }}
                                                                >

                                                                    <option disabled>Select Industry</option>
                                                                    {
                                                                        industries.map((item, index) => (
                                                                            <option value={item._id} className="ng-star-inserted" key={item._id}>{item.title}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                                {
                                                                    industry === "" ?
                                                                        <span className="text-danger ng-star-inserted">*This field is required</span>
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fa fa-industry" /></span>
                                                            </div>
                                                            <div className="input-group mb-3">
                                                                <input
                                                                    className="form-control"
                                                                    id="exampleInputCompanyName"
                                                                    name="companyName"
                                                                    placeholder="Company Name" required
                                                                    type="text"
                                                                    value={companyName}
                                                                    onChange={(ev: any) => { setCompanyName(ev.target.value); }}
                                                                />
                                                                {
                                                                    companyName === "" ?
                                                                        <span className="text-danger ng-star-inserted">*This field is required</span>
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div style={{ marginBottom: 16 }}>
                                                        <div style={{ marginLeft: 15, marginRight: 15 }}>
                                                            <input type="checkbox" />
                                                            &nbsp;<a href="#" style={{ fontSize: 14 }}>Agree with terms of use and privacy</a>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            {/* Card Footer */}
                                            <div className="card-footer p-4">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <button className="btn btn-block btn-primary pt-3 pb-3">
                                                            Sign Up Now
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-12 mt-3 pr-md-2">
                                                        <button className="btn btn-block btn-primary pt-3 pb-3" type="button">
                                                            <span className="button-span-text">
                                                                <img className="social-login-logo" src="https://img.icons8.com/color/48/000000/google-logo.png" />
                                                                <span className="d-inline-block ml-2">Sign Up with Google</span>
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12 mt-3 pl-md-2">
                                                        <button className="btn btn-block btn-primary pt-3 pb-3" type="button" >
                                                            <span className="button-span-text">
                                                                <img className="social-login-logo"
                                                                    src="https://img.icons8.com/color/48/000000/facebook-circled.png" />
                                                                <span className="d-inline-block ml-2">Sign Up with Facebook</span>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 mt-3" style={{ textAlign: 'center' }}>
                                                        <p>Already have an account? <Link to="/login" style={{ fontSize: 14 }}>Login</Link></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div className="app-footer">
                <span>
                    <a href="https://www.blueclerk.com" style={{ fontSize: 14 }}>BlueClerk</a> © 2020</span>
                <span className="ml-auto" style={{ textAlign: 'center' }}>Phone:512-846-6035 </span>
                <span className="ml-auto" style={{ marginRight: 130 }}>
                    <a href="mailto:chris.norton1@blueclerk.com" style={{ fontSize: 14 }}>BlueClerkSupport</a>
                </span>
            </div>
        </div>
    )
}

export default SignUp;