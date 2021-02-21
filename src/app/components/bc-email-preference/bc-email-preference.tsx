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

  let hrs = initialValues.emailTime && initialValues.emailTime.split('T')[1];
  let parseHrs = hrs && parseInt(hrs.split(':')[0]);
  let tempHrs = null;
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
  }

  const [time, setTime] = useState<any>(tempHrs ? `${tempHrs}` : null);
  const [ampm, setAmpm] = useState<any>(tempAmpm);

  const handleCheckbox = (setFieldValue: any, value: any) => {
    setFieldValue('emailPreferences', value);
    setDisabled(false);
    if (value === 1) {
      setDaily(true)
    } else {
      setDaily(false)
    }
  }

  const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const meridiem = ['AM', 'PM'];

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
              newTime = `${time}:00:00`
            }
          } else {
            if (time === '12') {
              newTime = `${time}:00:00`
            } else {
              let parseTime = parseInt(time);
              newTime = `${parseTime + 12}:00:00`
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
                          <Box className={classes.timePicker}>
                            <InputLabel className={classes.label}>
                              <strong>{"Email Time"}</strong>
                            </InputLabel>
                            <Grid container>
                              <Autocomplete
                                disabled={!daily}
                                value={time}
                                id="tags-standard"
                                options={hours}
                                onChange={(ev: any, newValue: any) => setTime(newValue)}
                                renderInput={(params) => (
                                  <>
                                    <TextField
                                      required
                                      placeholder={"HH"}
                                      {...params}
                                      variant="standard"
                                    />
                                  </>
                                )}
                              />
                              <Autocomplete
                                style={{ marginLeft: '2rem' }}
                                value={ampm}
                                disabled={!daily}
                                id="tags-standard"
                                options={meridiem}
                                onChange={(ev: any, newValue: any) => setAmpm(newValue)}
                                renderInput={(params) => (
                                  <>
                                    <TextField
                                      required
                                      {...params}
                                      placeholder={"AM"}
                                      variant="standard"
                                    />
                                  </>
                                )}
                              />
                            </Grid>
                          </Box>
                        </Grid>

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
