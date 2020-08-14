import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scoped.scss';
import axios from '../../util/Api';

export const SignIn: () => JSX.Element = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const handleSubmit: (ev: any) => void = (ev) => {
        ev.preventDefault();
        const payload = {
            email, password
        };
        axios.post("/login", payload).then(({data}) => {
            console.log("response -> ", data);
        });
    }
    return (
        <div className="ng-star-inserted">
            <div className="app-body">
                <main className="d-flex align-items-center custom-height" style={{
                    flex: "1 1",
                    minWidth: 0
                }} >
                    <div className="row custom_row">
                        <div className="col-sm-12 col-md-6 col-md-offset-6 signin_col">
                            <div className="middle-form">
                                <div className="row Reg">
                                    <div className="col-md-8 mx-auto">
                                        <div className="card mx-6">
                                            <div className="card-body p-4 custom_card signin_card">
                                                <form className="form-validate mb-lg ng-untouched ng-pristine ng-invalid" name="loginForm" noValidate>
                                                    <img alt="Image" className="block-center img-rounded" src="assets/img/logo.jpg"
                                                        style={{ width: '90%', margin: '0 auto' }} />
                                                    <div className="row text-bottom">
                                                        <div className="col-md-12">
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fa fa-envelope" /></span>
                                                                </div>
                                                                <input autoComplete="off" className="form-control ng-untouched ng-pristine ng-invalid"
                                                                    name="email"
                                                                    placeholder="Email" required
                                                                    type="email"
                                                                    value={email}
                                                                    onChange={(ev) => setEmail(ev.target.value)}
                                                                />
                                                                {
                                                                    email === "" ? <span className="text-danger ng-star-inserted">*This field is required</span>
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fa fa-lock" /></span>
                                                                </div>
                                                                <div>
                                                                    <input
                                                                        className="form-control login-password-input mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-pristine ng-invalid"
                                                                        placeholder="Password" required
                                                                        id="mat-input-0"
                                                                        type="password"
                                                                        aria-invalid="false"
                                                                        aria-required="true"
                                                                        value={password}
                                                                        onChange={(ev) => setPassword(ev.target.value)}
                                                                    />
                                                                    {
                                                                        password === "" ? <span className="text-danger ng-star-inserted">*This field is required</span>
                                                                            : null
                                                                    }
                                                                    {/* <a className="password-visibity-icon" href="javascript:void(0);">
                                                                        <mat-icon className="mat-icon notranslate material-icons mat-icon-no-color"
                                                                            role="img" aria-hidden="true">visibility_off</mat-icon>
                                                                    </a> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row custom_remember">
                                                            <div className="col -6 checkbox c-checkbox pull-left mt0">
                                                                <label>
                                                                    <input
                                                                        name="account_remember"
                                                                        type="checkbox"
                                                                        className="ng-untouched ng-pristine ng-valid"
                                                                    />
                                                                    <span />Remember Me
                                                                </label>
                                                            </div>
                                                            <div className="col-6 pull-right password_div">
                                                                <span><Link className="text-muted" to="/recover" style={{ fontSize: 14 }}>Forgot your password?</Link></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <button className="btn btn-block btn-primary pt-3 pb-3" onClick={handleSubmit}>
                                                                    Login
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-12 mt-3 pr-md-2">
                                                        <button className="btn btn-block btn-primary pt-3 pb-3 px-md-0">
                                                            <span className="button-span-text">
                                                                <img className="social-login-logo"
                                                                    src="https://img.icons8.com/color/48/000000/google-logo.png" />
                                                                <span className="d-inline-block ml-2">Login with Google</span>
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12 mt-3 pl-md-2">
                                                        <button className="btn btn-block btn-primary pt-3 pb-3 px-md-0" style={{ overflow: 'hidden' }}>
                                                            <span className="button-span-text">
                                                                <img className="social-login-logo"
                                                                    src="https://img.icons8.com/color/48/000000/facebook-circled.png" />
                                                                <span className="d-inline-block ml-2">Login with Facebook</span>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 mt-3" style={{ textAlign: 'center' }}>
                                                        <p>
                                                            Don't have an account? <Link to="/signup">Register</Link>
                                                        </p>
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
        </div >
    )
}

export default SignIn;