import React, { useState } from 'react';
import styled from 'styled-components';
import styles from './add-new-employee.style';
import { Card, CardActionArea, Checkbox, Fab, FormControlLabel, Grid, IconButton, TextField, withStyles } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import validator from 'validator';
import { UserProfile } from 'actions/employee/employee.types';
import { Roles as RoleEnums } from './add-new-employee';
import { useDispatch } from 'react-redux';
import { createTechnician, createAdministrator, createManager, createOfficeAdmin } from 'actions/employee/employee.action';
import { useLocation, useHistory } from "react-router-dom";
import { info, error, success } from 'actions/snackbar/snackbar.action';

export enum Roles {
  Technician = 'Technician',
  Administrator = 'Administrator',
  Manager = 'Manager',
  OfficeAdmin = 'OfficeAdmin'
}

interface Props {
  classes: any;
  children?: React.ReactNode;
}

function AdminAddNewEmployeePage({ classes, children }: Props) {
  const dispatch = useDispatch();

  const location = useLocation<any>();
  const history = useHistory();


  const renderGoBack = (location: any) => {
    const baseObj = location;

    const stateObj = baseObj && baseObj['currentPage'] !== undefined ? {
      prevPage: baseObj['currentPage']
    } : {}

    history.push({
      pathname: `/main/admin/employees`,
      state: stateObj
    });

  }

  const submit = async (firstName: string, lastName: string, email: string, phoneNumber: string, role: string, allLocation: boolean) => {
    const data: UserProfile = {
      firstName,
      lastName,
      email,
      phone: phoneNumber,
      canAccessAllLocations: allLocation
    };

    let response: any;
    response = await dispatch(createOfficeAdmin(data));
    if (response.status) {
      await renderGoBack(location.state)
      dispatch(success("Employee created successfully."));
    } else if (response.message === "Email address already registered. Please try with some other email address") {
      dispatch(info(response.message))
    }
  }

  const [firstName, setFirstName] = useState('');
  const [firstNameValid, setFirstNameValid] = useState(true);

  const firstNameChanged = (newValue: string) => {
    setFirstName(newValue);
    if (newValue === '') setFirstNameValid(false);
    else setFirstNameValid(true);
  }

  const [lastName, setLastName] = useState('');
  const [lastNameValid, setLastNameValid] = useState(true);

  const lastNameChanged = (newValue: string) => {
    setLastName(newValue);
    if (newValue === '') setLastNameValid(false);
    else setLastNameValid(true);
  }

  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);

  const emailChanged = (newValue: string) => {
    setEmail(newValue);
    if (newValue === '' || !validator.isEmail(newValue)) setEmailValid(false);
    else setEmailValid(true);
  }

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);

  const phoneNumberChanged = (newValue: string) => {
    setPhoneNumber(newValue);
    if (newValue === '' || !validator.isMobilePhone(newValue)) setPhoneNumberValid(false);
    else setPhoneNumberValid(true);
  }

  const next = () => {
    if (!firstNameValid || !lastNameValid || !emailValid || !phoneNumberValid) return;
    if (!firstName || !lastName || !email || !phoneNumber) return;
    else {
      submit(firstName, lastName, email, phoneNumber, Roles.OfficeAdmin, showAllLocation);
    }
  }

  const [showAllLocation, setShowLocation] = useState<boolean>(false);
  const handleShowAllLocation = (event: any) => {
    setShowLocation(event.target.checked);
  }

  const prev = () => {
    renderGoBack(location.state);
  }

  return (
    <>

      <div className={classes.pageMainContainer}>
        <div className={classes.pageContainer}>
          <div className={classes.pageContent}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <IconButton
                onClick={prev}
                className={classes.roundBackground}
                color={'primary'}>
                <ArrowBackIcon fontSize={'small'} />
              </IconButton>
              <div className={classes.mainPane}>
                <div className={classes.infoPane}>
                  <h2>Add New Employee</h2>
                  <h4 className={classes.required}><span className={classes.asterisk}>*</span>All fields are required</h4>
                  <TextField
                    id={'first-name'}
                    placeholder={'First Name'}
                    variant={'outlined'}
                    error={!firstNameValid}
                    value={firstName}
                    onChange={(e) => { firstNameChanged(e.target.value) }}
                    autoComplete='off'
                    style={{
                      width: '85%',
                      paddingTop: '15px',
                      paddingBottom: '15px'
                    }}
                  />
                  <TextField
                    id={'last-name'}
                    placeholder={'Last Name'}
                    variant={'outlined'}
                    error={!lastNameValid}
                    value={lastName}
                    onChange={(e) => { lastNameChanged(e.target.value) }}
                    autoComplete='off'
                    style={{
                      width: '85%',
                      paddingTop: '15px',
                      paddingBottom: '15px'
                    }}
                  />
                  <TextField
                    id={'email'}
                    placeholder={'Email'}
                    variant={'outlined'}
                    error={!emailValid}
                    value={email}
                    onChange={(e) => { emailChanged(e.target.value) }}
                    autoComplete='off'
                    style={{
                      width: '85%',
                      paddingTop: '15px',
                      paddingBottom: '15px'
                    }}
                  />
                  <TextField
                    id={'phone-number'}
                    placeholder={'Phone Number'}
                    variant={'outlined'}
                    error={!phoneNumberValid}
                    value={phoneNumber}
                    onChange={(e) => { phoneNumberChanged(e.target.value) }}
                    autoComplete='off'
                    style={{
                      width: '85%',
                      paddingTop: '15px',
                      paddingBottom: '15px'
                    }}
                  />
                  <Grid container item xs>
                    <FormControlLabel
                        control={
                          <Checkbox
                            color={'primary'}
                            checked={showAllLocation}
                            onChange={handleShowAllLocation}
                            name="ShowAllLocation"
                          />
                        }
                        label={"Access All Locations"}
                      />
                  </Grid>
                </div>
                <div className={classes.buttonPane}>
                  <Fab
                    aria-label={'new-ticket'}
                    classes={{
                      'root': classes.fabRoot
                    }}
                    color={'primary'}
                    style={{
                      width: '15%',
                    }}
                    onClick={next}
                    variant={'extended'}>
                    {'Save'}
                  </Fab>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding: 30px;
  width: 100%;
  padding-left: 65px;
  padding-right: 65px;
  margin: 0 auto;
`;


export default withStyles(
  styles,
  { 'withTheme': true }
)(AdminAddNewEmployeePage);
