import React from 'react';
import { Link } from 'react-router-dom';
import './style.scoped.scss';

export const SignIn = () => {
    return (
        <div className="ng-star-inserted">
            <div className="app-body">
                <main className="d-flex align-items-center custom-height" style={{
                    flex: "1 1",
                    minWidth: 0
                }} >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 mx-auto">
                                <div className="card-group">
                                    <div className="card p-4">
                                        <img alt="Image" className="block-center img-rounded" src="assets/img/logo.jpg" style={{
                                            width: "75%",
                                            paddingTop: "20px",
                                            margin: "0 auto",
                                        }} />
                                        <div className="card-body">
                                            <p className="text-center pv">PASSWORD RESET</p>
                                            <form className="form-validate ng-untouched ng-pristine ng-invalid" name="recoverForm" noValidate role="form"
                                                ng-reflect-form="[object Object]">
                                                <p className="text-center">
                                                    Please enter login email to receive a password reset link.
                                                </p>
                                                <div className="form-group has-feedback">
                                                    <label className="text-muted">Email address</label>
                                                    <input autoComplete="off" className="form-control ng-untouched ng-pristine ng-invalid"
                                                        name="email" placeholder="Enter email" type="email" ng-reflect-name="email" />
                                                    <span className="fa fa-envelope form-control-feedback text-muted" />
                                                </div>
                                                <button className="btn btn-danger btn-block" type="submit">
                                                    Reset
                                                </button>
                                                <p className="pt-lg text-center" />
                                                <a className="btn btn-block btn-primary" ng-reflect-router-link="/login" href="/login">Login</a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div >
    )
}

export default SignIn;