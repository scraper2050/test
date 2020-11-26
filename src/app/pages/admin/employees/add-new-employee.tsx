import React, { useState } from 'react';
import styled from 'styled-components';
import styles from './add-new-employee.style';
import { Card, CardActionArea, Fab, IconButton, TextField, withStyles } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import validator from 'validator';

interface Props {
  classes: any;
  children?: React.ReactNode;
}

function AdminAddNewEmployeePage({ classes, children }: Props) {
  const [step, setStep] = useState(1);

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

  const [role, setRole] = useState(-1);

  const next = () => {
    if(!firstNameValid || !lastNameValid || !emailValid || !phoneNumberValid) return;
    if(!firstName || !lastName || !email || !phoneNumber) return;
    if (step === 1) setStep(2);
    else {
      if(role === -1) return;
      submit();
    }
  }

  const prev = () => {
    if(step === 2) setStep(1);
    else cancel();
  }

  const submit = () => {

  }
  
  const cancel = () => {

  }

  const technicianSelected = () => {
    setRole(1);
  }

  const administratorSelected = () => {
    setRole(2);
  }

  const managerSelected = () => {
    setRole(3);
  }

  const officeSelected = () => {
    setRole(4);
  }

  return (
    <>
      {/* <BCSubHeader title={'Admin'}>
        <BCToolBarSearchInput style={{
          'marginLeft': 'auto',
          'width': '321px'
        }}
        />
      </BCSubHeader> */}
      <div style={{display:'flex', flexDirection: 'row'}}>
        <IconButton
          onClick={prev}
          className={classes.roundBackground}
          color={'primary'}>
          <ArrowBackIcon fontSize={'small'} />
        </IconButton>
        <div className={classes.mainPane}>
          {step === 1 && <div className={classes.infoPane}>
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
          </div>}
          {step === 2 && <div className={classes.infoPane}>
            <h2>Roles</h2>
            <h4 className={classes.required}>Choose level of role for new user to view schedule and mark work complete</h4>
            <div className={classes.rolesRow}>
              <Card className={classes.card} style={{ backgroundColor: role !== 1 ? 'white' : '#00aaff' }}>
                <CardActionArea className={classes.cardActionArea} onClick={() => technicianSelected()}>
                  Technician
                </CardActionArea>
              </Card>
              <Card className={classes.card} style={{ backgroundColor: role !== 2 ? 'white' : '#00aaff' }}>
                <CardActionArea className={classes.cardActionArea} onClick={() => administratorSelected()}>
                  Administrator
                </CardActionArea>
              </Card>
            </div>
            <div className={classes.rolesRow}>
              <Card className={classes.card} style={{ backgroundColor: role !== 3 ? 'white' : '#00aaff' }}>
                <CardActionArea className={classes.cardActionArea} onClick={() => managerSelected()}>
                  Manager
                </CardActionArea>
              </Card>
              <Card className={classes.card} style={{ backgroundColor: role !== 4 ? 'white' : '#00aaff' }}>
                <CardActionArea className={classes.cardActionArea} onClick={() => officeSelected()}>
                  Office/Dispatch
                </CardActionArea>
              </Card>
            </div>
          </div>}
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
