import React, { useState } from 'react';
import styles from './bc-email-preference.style';
import {
  withStyles,
  Typography,
  Box, Grid,
  TextField,
  InputLabel,
  Fab,
  Checkbox
} from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { Form, Formik } from "formik";
import Autocomplete from '@material-ui/lab/Autocomplete';


function BCAdminProfile({ classes, initialValues, apply }: any) {
  const dispatch = useDispatch();
  const [daily, setDaily] = useState(initialValues.emailPreferences === 1 ? true : false);
  const [disabled, setDisabled] = useState(true);

  let hrs = initialValues.emailTime && initialValues.emailTime.includes('T') ? initialValues.emailTime.split('T')[1] : initialValues.emailTime;
  let parseHrs = hrs && parseInt(hrs.split(':')[0]);
  let tempHrs = null;
  let parseMins = hrs && hrs.split(':')[1];
  let tempMins = null;
  let tempAmpm = null;

  if (parseHrs !== undefined) {
    if (parseHrs === 0 || parseHrs === 12) {
      tempHrs = 12;
      if (parseHrs === 0) {
        tempAmpm = 'AM';
      } else {
        tempAmpm = 'PM';
      }
    } else if (parseHrs > 0 && parseHrs < 12) {
      tempHrs = parseHrs;
      tempAmpm = 'AM';
    } else {
      tempHrs = parseHrs - 12
      tempAmpm = 'PM';
    }
    tempMins = parseMins && parseMins.length === 1 ? `${parseMins}0` : parseMins;
  }

  const [time, setTime] = useState<any>(initialValues.emailTime && tempHrs ? `${tempHrs}:${tempMins}` : null);
  const [ampm, setAmpm] = useState<any>('PM');

  const handleCheckbox = (setFieldValue: any, value: any) => {
    setFieldValue('emailPreferences', value);
    setDisabled(false);
    if (value === 1) {
      setDaily(true)
    } else {
      setDaily(false)
    }
  }

  const hours = ['4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30'];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        let oldValues = { ...values };
        let newTime;
        if (daily) {
          if (ampm === 'AM') {
            if (time === '12') {
              newTime = '00:00:00'
            } else {
              newTime = `${time}:00`
            }
          } else {
            if (time === '12') {
              newTime = `${time}:00`
            } else {
              let parseTime = parseInt(time.split(':')[0]);
              newTime = `${parseTime + 12}:${time.split(':')[1]}:00`
            }
          }
          oldValues = {
            ...oldValues,
            emailTime: newTime
          }
        } else {
          setTime(null);
          setAmpm(null);
          delete oldValues['emailTime'];
        }
        const response = await apply(oldValues);
        if (response) {
          setDisabled(true)
        }
      }}>
      {
        ({
          handleChange,
          values,
          errors,
          isSubmitting,
          setFieldValue,
          handleBlur
        }) => {
          return (
            <Form>
              <div className={classes.profilePane}>
                <div className={classes.infoPane}>
                  <Grid container direction="column" className={classes.container}>
                    <Typography align="left" variant="h4" color="primary">
                      <strong>
                        Email Preferences
                      </strong>
                    </Typography>
                    <Grid item className={classes.contentContainer} >
                      <Grid container direction="column" justify="space-around" style={{ height: '100%' }}>

                        <Grid container spacing={5} alignItems="flex-start" className={classes.checkboxContainer}>
                          <Checkbox
                            color="primary"
                            onChange={() => handleCheckbox(setFieldValue, 0)}
                            onBlur={handleBlur}
                            checked={values.emailPreferences === 0}
                          />
                          <Box flexGrow={1} className={classes.boxContainer}>
                            <strong style={{ fontSize: '18px' }}>Each New Job Assignment</strong>
                            <p style={{ marginTop: '.4rem' }}>Email updates each time a new job is assigned to you.</p>
                          </Box>
                        </Grid>

                        <Grid container spacing={5} alignItems="flex-start" className={classes.checkboxContainer}>
                          <Checkbox
                            color="primary"
                            onChange={() => handleCheckbox(setFieldValue, 1)}
                            onBlur={handleBlur}
                            checked={values.emailPreferences === 1}
                          />
                          <Box className={classes.boxContainer}>
                            <strong style={{ fontSize: '18px' }}>Once Daily</strong>
                            <p style={{ marginTop: '.4rem' }}>Email updates once daily with a summary of assigned jobs.</p>
                          </Box>

                        </Grid>

                        <Box className={classes.timePicker}>

                          <Grid container>
                            <InputLabel className={classes.label} style={{ marginRight: '1rem', alignSelf: "center" }}>
                              <strong>{"Email Time"}</strong>
                            </InputLabel>

                            <Autocomplete
                              className={classes.autoComplete}
                              disabled={!daily}
                              value={time}
                              id="tags-standard"
                              options={hours}
                              disableClearable
                              onChange={(ev: any, newValue: any) => { setDisabled(false); setTime(newValue) }}
                              renderInput={(params) => (
                                <>
                                  <TextField
                                    required
                                    placeholder={"HH:MM"}
                                    {...params}
                                    variant="standard"
                                  />
                                </>
                              )}
                            />
                            <InputLabel className={classes.label} style={{ marginLeft: '1rem', alignSelf: "flex-end" }}>
                              {"PM"}
                            </InputLabel>

                          </Grid>
                        </Box>

                        <Grid container spacing={5} alignItems="flex-start" className={classes.checkboxContainer}>
                          <Checkbox
                            color="primary"
                            onChange={() => handleCheckbox(setFieldValue, 2)}
                            onBlur={handleBlur}
                            checked={values.emailPreferences === 2}
                          />
                          <Box flexGrow={1} className={classes.boxContainer} >
                            <strong style={{ fontSize: '18px' }}>Opt Out</strong>
                            <p style={{ marginTop: '.4rem' }}>Unsubscribe from all email updates.</p>
                          </Box>
                        </Grid>

                      </Grid>
                    </Grid>
                    <Grid item className={classes.contentAction}>
                      <Fab
                        aria-label={'create-job'}
                        classes={{
                          'root': classes.fabRoot
                        }}
                        color={'primary'}
                        disabled={isSubmitting || disabled}
                        type={'submit'}
                        variant={'extended'}>
                        {'Submit'}
                      </Fab>
                    </Grid>
                  </Grid>
                </div>
              </div >
            </Form>
          )
        }
      }
    </Formik>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCAdminProfile);
