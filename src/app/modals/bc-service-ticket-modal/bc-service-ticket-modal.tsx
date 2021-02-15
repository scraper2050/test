// Import * as Yup from 'yup';
import BCDateTimePicker from 'app/components/bc-date-time-picker/bc-date-time-picker';
import BCInput from 'app/components/bc-input/bc-input';
import BCSelectOutlined from 'app/components/bc-select-outlined/bc-select-outlined';
import React, { useState, useEffect } from 'react';
import { formatDate } from 'helpers/format';
import { refreshServiceTickets } from 'actions/service-ticket/service-ticket.action';
import styles from './bc-service-ticket-modal.styles';
import { useFormik } from 'formik';
import {
  DialogActions,
  DialogContent,
  Fab,
  withStyles,
  FormGroup,
  InputLabel,
  TextField,
  Grid
} from '@material-ui/core';
import { callCreateTicketAPI, callEditTicketAPI } from 'api/service-tickets.api';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch, useSelector } from 'react-redux';
import { getJobSites, clearJobSiteStore } from 'actions/job-site/job-site.action';
import "../../../scss/index.scss";
import { clearJobLocationStore, getJobLocationsAction } from 'actions/job-location/job-location.action';
import styled from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';


function BCServiceTicketModal({
  classes,
  ticket = {
    'customer': {
      '_id': ''
    },
    'jobSite': '',
    'jobLocation': '',
    'jobType': '',
    'note': '',
    'updateFlag': '',
    'dueDate': new Date()
  },
  error = {
    'status': false,
    'message': ''
  }
}: any): JSX.Element {
  const dispatch = useDispatch();
  const [notesLabelState, setNotesLabelState] = useState(false);
  const handleCustomerChange = (event: any, fieldName: any, setFieldValue: any, newValue: any) => {
    const customerId = newValue ? newValue._id : '';


    setFieldValue(fieldName, customerId);
    setFieldValue('jobLocationId', '');
    // if (customerId !== '') {
    dispatch(getJobLocationsAction(customerId));
    // }
  }

  const handleLocationChange = (event: any, fieldName: any, setFieldValue: any, getFieldMeta: any, newValue: any) => {
    console.log(newValue._id)

    // const locationId = event.target.value;

    // let customerId = getFieldMeta('customerId').value;
    // setFieldValue(fieldName, locationId);
    // setFieldValue('jobSiteId', '');
    // if (locationId !== '') {
    //   dispatch(getJobSites({ customerId, locationId }));
    // } else {
    //   dispatch(clearJobSiteStore());
    // }

  }

  const isValidate = (requestObj: any) => {
    let validateFlag = true;
    if (requestObj.note === undefined || requestObj.note === '') {
      setNotesLabelState(true);
      validateFlag = false;
    } else {
      setNotesLabelState(false);
    }
    return validateFlag;
  }

  const formatRequestObj = (rawReqObj: any) => {
    for (let key in rawReqObj) {
      if (rawReqObj[key] === '' || rawReqObj[key] === null) {
        delete rawReqObj[key];
      }
    }
    return rawReqObj;
  }

  useEffect(() => {
    if (!ticket.updateFlag) {
      dispatch(clearJobLocationStore());
      dispatch(clearJobSiteStore());
    }
  }, [])

  const {
    'values': FormikValues,
    'handleChange': formikChange,
    'handleSubmit': FormikSubmit,
    setFieldValue,
    getFieldMeta,
    isSubmitting,
    values
  } = useFormik({
    // 'enableReinitialize': true,
    'initialValues': {
      'customerId': ticket.customer._id,
      'jobSiteId': ticket.jobSite,
      'jobLocationId': ticket.jobLocation,
      'jobTypeId': ticket.jobType,
      'note': ticket.note,
      'dueDate': ticket.dueDate,
      'updateFlag': ticket.updateFlag
    },
    'onSubmit': (values, { setSubmitting }) => {
      setSubmitting(true);
      const tempData = {
        ...ticket,
        ...values
      };
      let editTicketObj = { ...values, ticketId: '' };
      //tempData.dueDate = formatDate(tempData.dueDate);
      if (ticket._id) {
        editTicketObj.ticketId = ticket._id;
        delete editTicketObj.customerId;
        if (isValidate(editTicketObj)) {
          let formatedRequest = formatRequestObj(editTicketObj);
          if (formatedRequest.dueDate) {
            formatedRequest.dueDate = formatDate(formatedRequest.dueDate);
          }
          callEditTicketAPI(formatedRequest).then((response: any) => {
            dispatch(refreshServiceTickets(true));
            dispatch(closeModalAction());
            setTimeout(() => {
              dispatch(setModalDataAction({
                'data': {},
                'type': ''
              }));
            }, 200);
            setSubmitting(false);
          })
            .catch((err: any) => {
              setSubmitting(false);
              throw err;
            });
        } else {
          setSubmitting(false);
        }
      } else {
        let formatedRequest = formatRequestObj(tempData);
        callCreateTicketAPI(formatedRequest).then((response: any) => {
          dispatch(refreshServiceTickets(true));
          dispatch(closeModalAction());
          setTimeout(() => {
            dispatch(setModalDataAction({
              'data': {},
              'type': ''
            }));
          }, 200);
          setSubmitting(false);
        })
          .catch((err: any) => {
            setSubmitting(false);
            throw err;
          });

      }
    }

    /*
     * 'validationSchema': Yup.object({
     *   'customer': Yup.string()
     *     .required('Customer is required'),
     *   'notes': Yup.string()
     *   // 'dueDate': Yup.string().required('Schedule date is required')
     * })
     */
  });
  const customers = useSelector(({ customers }: any) => customers.data);
  const jobLocations = useSelector((state: any) => state.jobLocations.data);
  const jobSites = useSelector((state: any) => state.jobSites.data);
  const isLoading = useSelector((state: any) => state.jobSites.loading);
  const jobTypes = useSelector((state: any) => state.jobTypes.data);


  const dateChangeHandler = (date: string) => {
    setFieldValue('dueDate', date);
  };

  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };


  if (error.status) {
    return (
      <ErrorMessage>{error.message}</ErrorMessage>
    );
  } else {
    return (
      <form onSubmit={FormikSubmit} className={`ticket_form__wrapper ${classes.formWrapper}`}>
        <DialogContent classes={{ 'root': classes.dialogContent }}>
          <Grid
            container
            spacing={2}>

            <Grid item xs={12} md={6}>
              <FormGroup className={`required ${classes.formGroup}`}>
                <div className="search_form_wrapper">
                  <Autocomplete
                    id="tags-standard"
                    options={customers && customers.length !== 0 ? (customers.sort((a: any, b: any) => (a.profile.displayName > b.profile.displayName) ? 1 : ((b.profile.displayName > a.profile.displayName) ? -1 : 0))) : []}
                    getOptionLabel={(option) => option.profile.displayName}
                    onChange={(ev: any, newValue: any) => handleCustomerChange(ev, 'customerId', setFieldValue, newValue)}
                    renderInput={(params) => (
                      <>
                        <InputLabel className={classes.label}>
                          <strong>{"Customer"}</strong>
                        </InputLabel>
                        <TextField
                          {...params}
                          variant="standard"
                        />
                      </>
                    )}
                  />
                </div>
              </FormGroup>
              {/* <BCSelectOutlined
              items={{
                'data': [
                  ...customers.map((o: any) => {
                    return {
                      '_id': o._id,
                      'displayName': o.profile.displayName
                    };
                  })
                ],
                'displayKey': 'displayName',
                'valueKey': '_id',
                'className': 'serviceTicketLabel',
              }}
              label={'Customer'}
              name={'customerId'}
              disabled={FormikValues.updateFlag === true}
              required
              value={FormikValues.customerId}
              handleChange={(event: any) => handleCustomerChange(event, 'customerId', setFieldValue)}
            /> */}

              <FormGroup className={'required'}>
                <div className="search_form_wrapper">
                  <Autocomplete
                    id="tags-standard"
                    options={jobLocations && jobLocations.length !== 0 ? (jobLocations.sort((a: any, b: any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))) : []}
                    getOptionLabel={(option) => option.name}
                    onChange={(ev: any, newValue: any) => handleLocationChange(ev, 'jobLocationId', setFieldValue, getFieldMeta, newValue)}
                    renderInput={(params) => (
                      <>
                        <InputLabel className={classes.label}>
                          <strong>{"Job Location"}</strong>
                        </InputLabel>
                        <TextField
                          {...params}
                          variant="standard"
                        />
                      </>
                    )}
                  />
                </div>
              </FormGroup>


              {/* <BCSelectOutlined
                items={{
                  'data': [
                    ...jobLocations.map((o: any) => {
                      return {
                        '_id': o._id,
                        'name': o.name,
                      };
                    })
                  ],
                  'displayKey': 'name',
                  'valueKey': '_id',
                  'className': 'serviceTicketLabel'
                }}
                label={'Job Location'}
                name={'jobLocationId'}
                value={FormikValues.jobLocationId}
                handleChange={(event: any) => handleLocationChange(event, 'jobLocationId', setFieldValue, getFieldMeta)}
              /> */}


              {isLoading ? 'Loading Job Sites...' :
                <BCSelectOutlined
                  handleChange={formikChange}
                  items={{
                    'data': [
                      ...jobSites.map((o: any) => {
                        return {
                          '_id': o._id,
                          'name': o.name,
                        };
                      })
                    ],
                    'displayKey': 'name',
                    'valueKey': '_id',
                    'className': 'serviceTicketLabel'
                  }}
                  label={'Job Site'}
                  name={'jobSiteId'}
                  value={FormikValues.jobSiteId}
                />}
              <BCSelectOutlined
                handleChange={formikChange}
                items={{
                  'data': [
                    ...jobTypes.map((o: any) => {
                      return {
                        '_id': o._id,
                        'title': o.title,
                      };
                    })
                  ],
                  'displayKey': 'title',
                  'valueKey': '_id',
                  'className': 'serviceTicketLabel'
                }}
                label={'Job Type'}
                name={'jobTypeId'}
                value={FormikValues.jobTypeId}
              />

              <BCInput
                handleChange={formikChange}
                label={'Notes / Special Instructions'}
                multiline
                name={'note'}
                value={FormikValues.note}
                className='serviceTicketLabel'
              />
              {notesLabelState ? <Label>Notes are required while updating the ticket.</Label> : null}
              <BCDateTimePicker
                disablePast
                handleChange={dateChangeHandler}
                className='serviceTicketLabel'
                label={'Due Date'}
                name={'dueDate'}
                value={FormikValues.dueDate}
              />


            </Grid>
            <Grid item xs={12} md={6}>
              <div />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions classes={{
          'root': classes.dialogActions
        }}>
          <Fab
            aria-label={'create-job'}
            classes={{
              'root': classes.fabRoot
            }}
            className={'serviceTicketBtn'}
            disabled={isSubmitting}
            onClick={() => closeModal()}
            variant={'extended'}>
            {'Cancel'}
          </Fab>
          <Fab
            aria-label={'create-job'}
            classes={{
              'root': classes.fabRoot
            }}
            color={'primary'}
            disabled={isSubmitting}
            type={'submit'}
            variant={'extended'}>
            {ticket._id
              ? 'Save Ticket'
              : 'Generate Ticket'}
          </Fab>
          {/* <Fab
            aria-label={'create-job'}
            classes={{
              'root': classes.fabRoot
            }}
            color={'primary'}
            disabled={isSubmitting}
            variant={'extended'}>
            {'Generate Job'}
          </Fab> */}
        </DialogActions>
      </form>
    );
  }
}
const Label = styled.div`
  color: red;
  font-size: 15px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 18px;
  padding: 5px;
  text-align: center;
`;
export default withStyles(
  styles,
  { 'withTheme': true }
)(BCServiceTicketModal);
