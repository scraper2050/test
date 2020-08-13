import React from 'react'
import './style.scoped.scss';
import { Link } from 'react-router-dom';

const SignUp: () => JSX.Element = () => {
    const [a, setA] = React.useState<string>('')
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
                                                <form className="form-validate mb-lg ng-untouched ng-pristine ng-invalid" name="loginForm" role="form">
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
                                                                <input className="form-control ng-pristine ng-invalid ng-touched" id="exampleInputFirstName" name="firstName" placeholder="First Name" required type="text" />
                                                                <span className="text-danger ng-star-inserted">*This field is required</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fa fa-user" /></span>
                                                                </div>
                                                                <input className="form-control ng-untouched ng-pristine ng-invalid" id="exampleLastName" name="lastName" placeholder="Last Name" required type="text" />
                                                                <span className="text-danger ng-star-inserted">*This field is required</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fa fa-envelope" /></span>
                                                                </div>
                                                                <input autoComplete="off" className="form-control ng-untouched ng-pristine ng-invalid" name="email" placeholder="Email" required type="email" />
                                                                <span className="text-danger ng-star-inserted">*This field is required</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fa fa-lock" /></span>
                                                                </div>
                                                                <input className="form-control mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-pristine ng-invalid" placeholder="Password" required type="password" id="mat-input-0" aria-invalid="false" aria-required="true" />
                                                                <a className="password-visibity-icon" href="javascript:void(0);">
                                                                    {/* <mat-icon className="mat-icon notranslate material-icons mat-icon-no-color" role="img" aria-hidden="true">visibility_off</mat-icon> */}
                                                                </a>
                                                                <span className="text-danger ng-star-inserted">*This field is required</span>
                                                                {/**/}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fa fa-phone" /></span>
                                                                </div>
                                                                <input autoComplete="off" className="form-control ng-untouched ng-pristine ng-invalid" id="exampleInputphoneNumber" name="phoneNumber" placeholder="Phone Number" type="text" />
                                                                <span className="text-danger ng-star-inserted">*This field is required</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fa fa-industry" /></span>
                                                                </div>
                                                                <select className="form-control ng-untouched ng-pristine ng-invalid" id="industry">
                                                                    <option disabled selected>Select Industry</option>
                                                                    {/**/}<option value="5e949bf9e265eb78266c761a" className="ng-star-inserted">HVAC</option><option value="5e949bfee265eb72f46c761b" className="ng-star-inserted">Roofing</option><option value="5e949c06e265eb8e766c761c" className="ng-star-inserted">Construction</option><option value="5e949c0ee265eb7faa6c761d" className="ng-star-inserted">Commercial Services</option><option value="5e949c16e265eb0aa66c761e" className="ng-star-inserted">Exercise Equipment</option>
                                                                </select>
                                                                <span className="text-danger ng-star-inserted">*This field is required</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fa fa-industry" /></span>
                                                            </div>
                                                            <div className="input-group mb-3">
                                                                <input className="form-control ng-untouched ng-pristine ng-invalid" id="exampleInputCompanyName" name="companyName" placeholder="Company Name" required type="text" />
                                                                <span className="text-danger ng-star-inserted">*This field is required</span>
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
                                                        <button className="btn btn-block btn-primary pt-3 pb-3" type="button">
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
                                                        <p>Already have an account? <Link to="/login"  style={{ fontSize: 14 }}>Login</Link></p>
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