import * as CONSTANTS from "../../../constants";
import BCDateTimePicker from 'app/components/bc-date-time-picker/bc-date-time-picker';
import BCInput from 'app/components/bc-input/bc-input';
import BCSelectOutlined from 'app/components/bc-select-outlined/bc-select-outlined';
import React, { useState, useEffect } from 'react';
import { formatDateYMD } from 'helpers/format';
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
  Grid,
  Typography
} from '@material-ui/core';
import { callCreateTicketAPI, callEditTicketAPI } from 'api/service-tickets.api';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch, useSelector } from 'react-redux';
import { getJobSites, clearJobSiteStore } from 'actions/job-site/job-site.action';
import "../../../scss/index.scss";
import { clearJobLocationStore, getJobLocationsAction } from 'actions/job-location/job-location.action';
import styled from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getContacts } from 'api/contacts.api';
import BCTextField from "../../components/bc-text-field/bc-text-field";
import { success } from "actions/snackbar/snackbar.action";
import './bc-service-ticket.scss'


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
    'dueDate': new Date(),
    'customerContactId': '',
    'customerPO': '',
    'image': ''
  },
  error = {
    'status': false,
    'message': ''
  },
  detail = false,
}: any): JSX.Element {
  const dispatch = useDispatch();
  const [notesLabelState, setNotesLabelState] = useState(false);
  const [jobLocationValue, setJobLocationValue] = useState<any>([]);
  const [contactValue, setContactValue] = useState<any>([]);
  const [jobSiteValue, setJobSiteValue] = useState<any>([]);
  const [jobTypeValue, setJobTypeValue] = useState<any>([]);
  const [isLoadingDatas, setIsLoadingDatas] = useState(false);
  const [thumb, setThumb] = useState<any>(null);

  console.log(detail)


  const handleCustomerChange = async (event: any, fieldName: any, setFieldValue: any, newValue: any) => {
    const customerId = newValue ? newValue._id : '';
    await setFieldValue(fieldName, '');
    await setFieldValue('jobLocationId', '');
    await setFieldValue('jobSiteId', '');
    await setFieldValue('customerContactId', '');
    await setJobLocationValue([]);
    await setContactValue([]);
    await setJobSiteValue([]);

    if (customerId !== "") {
      let data: any = {
        type: 'Customer',
        referenceNumber: customerId
      }

      await dispatch(getContacts(data));
      await dispatch(getJobLocationsAction(customerId));
    }

    await setFieldValue(fieldName, customerId);
  }

  const handleContactChange = (event: any, fieldName: any, setFieldValue: any, newValue: any) => {
    const contactId = newValue ? newValue._id : '';
    setFieldValue(fieldName, contactId);
    setContactValue(newValue);
  }

  const handleLocationChange = async (event: any, fieldName: any, setFieldValue: any, getFieldMeta: any, newValue: any) => {
    const locationId = newValue ? newValue._id : '';

    let customerId = getFieldMeta('customerId').value;

    await setFieldValue(fieldName, '');
    await setFieldValue('jobSiteId', '');
    await setJobSiteValue([]);
    await setJobLocationValue(newValue);
    if (locationId !== '') {
      await dispatch(getJobSites({ customerId, locationId }));
    } else {
      await dispatch(clearJobSiteStore());
    }
    await setFieldValue(fieldName, locationId);
  }

  const handleJobSiteChange = (event: any, fieldName: any, setFieldValue: any, newValue: any) => {
    const jobSiteId = newValue ? newValue._id : '';
    setFieldValue(fieldName, jobSiteId);
    setJobSiteValue(newValue);
  }

  const handleJobTypeChange = (event: any, fieldName: any, setFieldValue: any, newValue: any) => {
    const jobSiteId = newValue ? newValue._id : '';
    setFieldValue(fieldName, jobSiteId);
    setJobTypeValue(newValue);
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
  } = useFormik({
    // 'enableReinitialize': true,
    'initialValues': {
      'customerId': ticket.customer._id,
      'jobSiteId': ticket.jobSite ? ticket.jobSite : '',
      'jobLocationId': ticket.jobLocation ? ticket.jobLocation : '',
      'jobTypeId': ticket.jobType ? ticket.jobType : '',
      'note': ticket.note,
      'dueDate': ticket.dueDate,
      'updateFlag': ticket.updateFlag,
      'customerContactId': ticket.customerContactId !== undefined ? ticket.customerContactId : '',
      'customerPO': ticket.customerPO !== undefined ? ticket.customerPO : '',
      'image': ticket.image !== undefined ? ticket.image : ''
    },
    'onSubmit': (values, { setSubmitting }) => {
      setSubmitting(true);

      const tempData = {
        ...ticket,
        ...values
      };
      let editTicketObj = { ...values, ticketId: '' };
      //tempData.dueDate = formatDateYMD(tempData.dueDate);
      if (ticket._id) {
        editTicketObj.ticketId = ticket._id;
        delete editTicketObj.customerId;
        if (isValidate(editTicketObj)) {
          let formatedRequest = formatRequestObj(editTicketObj);
          if (formatedRequest.dueDate) {
            formatedRequest.dueDate = formatDateYMD(formatedRequest.dueDate);
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

            if (response.message === "Ticket updated successfully.") {
              dispatch(success(response.message));
            }
          })
            .catch((err: any) => {
              setSubmitting(false);
              throw err;
            });
        } else {
          setSubmitting(false);
        }
      } else {
        delete tempData['customer'];
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

          if (response.message === "Service ticket created successfully.") {
            dispatch(success(response.message));
          }
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
  const { contacts } = useSelector((state: any) => state.contacts);


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


  useEffect(() => {
    if (ticket.customer._id !== '') {
      dispatch(getJobLocationsAction(ticket.customer._id));

      let data: any = {
        type: 'Customer',
        referenceNumber: ticket.customer._id
      }
      dispatch(getContacts(data));
    }
  }, [])

  useEffect(() => {
    if (ticket.customer._id !== '') {

      if (jobLocations.length !== 0) {
        setJobLocationValue(jobLocations.filter((jobLocation: any) => jobLocation._id === ticket.jobLocation)[0])

        if (ticket.jobLocation !== '' && ticket.jobLocation !== undefined) {
          dispatch(getJobSites({ customerId: ticket.customer._id, locationId: ticket.jobLocation }));
        }
      }
    }

  }, [jobLocations])

  useEffect(() => {
    if (ticket.customer._id !== '') {

      if (contacts.length !== 0) {
        setContactValue(contacts.filter((contact: any) => contact._id === ticket.customerContactId)[0])
      }
    }
  }, [contacts])


  useEffect(() => {
    if (ticket.customer._id !== '') {

      if (jobSites.length !== 0) {
        setJobSiteValue(jobSites.filter((jobSite: any) => jobSite._id === ticket.jobSite)[0])
      }
    }
  }, [jobSites])


  useEffect(() => {

    let reader = new FileReader();


    if (FormikValues.image && FormikValues.image !== '' && FormikValues.image !== undefined) {


      if (typeof FormikValues.image === 'string') {
        setThumb(FormikValues.image)
      } else {
        reader.onloadend = () => {
          setThumb(reader.result)
        }
        reader.readAsDataURL(FormikValues.image);
      }
    }
  }, [FormikValues.image]);

  const detailCustomer = ticket.customer && customers.length !== 0 && customers.filter((customer: any) => customer._id === ticket.customer._id)[0];


  console.log(jobLocationValue)

  if (error.status) {
    return (
      <ErrorMessage>{error.message}</ErrorMessage>
    );
  } else {
    return (
      <DataContainer>
        <form onSubmit={FormikSubmit} className={`ticket_form__wrapper ${classes.formWrapper}`}>
          <DialogContent classes={{ 'root': classes.dialogContent }}>
            <Grid
              container
              spacing={5}>

              <Grid item xs={12} md={6}>
                <FormGroup className={`required ${classes.formGroup}`}>
                  <div className="search_form_wrapper">

                    <Autocomplete
                      disabled={ticket.customer._id !== '' || detail}
                      defaultValue={ticket.customer && customers.length !== 0 && customers.filter((customer: any) => customer._id === ticket.customer._id)[0]}
                      id="tags-standard"
                      className={detail ? "detail-only" : ""}
                      options={customers && customers.length !== 0 ? (customers.sort((a: any, b: any) => (a.profile.displayName > b.profile.displayName) ? 1 : ((b.profile.displayName > a.profile.displayName) ? -1 : 0))) : []}
                      getOptionLabel={(option) => option.profile.displayName}
                      onChange={(ev: any, newValue: any) => handleCustomerChange(ev, 'customerId', setFieldValue, newValue)}
                      renderInput={(params) => (
                        <>
                          <InputLabel className={classes.label}>
                            <strong>{"Customer "}</strong>
                            {!detail && <Typography display="inline" color="error" style={{ lineHeight: '1' }}>*</Typography>}
                          </InputLabel>
                          <TextField
                            required
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

                <FormGroup className={`required ${classes.formGroup}`}>
                  <div className="search_form_wrapper">
                    <Autocomplete
                      defaultValue={ticket.jobLocation !== '' && jobLocations.length !== 0 && jobLocations.filter((jobLocation: any) => jobLocation._id === ticket.jobLocation)[0]}
                      value={jobLocationValue}
                      disabled={FormikValues.customerId === '' || isLoadingDatas || detail}
                      className={detail ? "detail-only" : ""}
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
                <FormGroup className={`required ${classes.formGroup}`}>
                  <div className="search_form_wrapper">
                    <Autocomplete
                      value={jobSiteValue}
                      disabled={FormikValues.jobLocationId === '' || isLoadingDatas || detail}
                      id="tags-standard"
                      className={detail ? "detail-only" : ""}
                      options={jobSites && jobSites.length !== 0 ? (jobSites.sort((a: any, b: any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))) : []}
                      getOptionLabel={(option) => option.name}
                      onChange={(ev: any, newValue: any) => handleJobSiteChange(ev, 'jobSiteId', setFieldValue, newValue)}
                      renderInput={(params) => (
                        <>
                          <InputLabel className={classes.label}>
                            <strong>{"Job Site"}</strong>
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

                {/* {isLoading ? 'Loading Job Sites...' :
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
                  />} */}


                <FormGroup className={`required ${classes.formGroup}`}>
                  <div className="search_form_wrapper">
                    <Autocomplete
                      defaultValue={ticket.jobType && jobTypes.length !== 0 && jobTypes.filter((jobType: any) => jobType._id === ticket.jobType)[0]}
                      id="tags-standard"
                      disabled={detail}
                      className={detail ? "detail-only" : ""}
                      options={jobTypes && jobTypes.length !== 0 ? (jobTypes.sort((a: any, b: any) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))) : []}
                      getOptionLabel={(option) => option.title}
                      onChange={(ev: any, newValue: any) => handleJobTypeChange(ev, 'jobTypeId', setFieldValue, newValue)}
                      renderInput={(params) => (
                        <>
                          <InputLabel className={classes.label}>
                            <strong>{"Job Type"}</strong>
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
                /> */}

                <div className={detail ? 'input-detail-only' : ''}>
                  <BCInput
                    handleChange={formikChange}
                    label={'Notes / Special Instructions'}
                    multiline
                    name={'note'}
                    disabled={detail}
                    value={FormikValues.note}
                    className={'serviceTicketLabel'}
                  />
                </div>

                <Label>
                  {notesLabelState ? " Notes are required while updating the ticket." : null}
                </Label>


                <div className={detail ? 'input-detail-only' : ''}>

                  <BCDateTimePicker
                    disablePast
                    handleChange={dateChangeHandler}
                    className='serviceTicketLabel'
                    disabled={detail}
                    label={'Due Date'}
                    name={'dueDate'}
                    value={FormikValues.dueDate}
                  />


                </div>


              </Grid>
              <Grid item xs={12} md={6}>
                <FormGroup className={`required ${classes.formGroup}`}>
                  <div className="search_form_wrapper">
                    <Autocomplete
                      disabled={FormikValues.customerId === '' || isLoadingDatas || detail}
                      value={contactValue}
                      id="tags-standard"
                      className={detail ? "detail-only" : ""}
                      options={contacts && contacts.length !== 0 ? (contacts.sort((a: any, b: any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))) : []}
                      getOptionLabel={(option) => option.name}
                      onChange={(ev: any, newValue: any) => handleContactChange(ev, 'customerContactId', setFieldValue, newValue)}
                      renderInput={(params) => (
                        <>
                          <InputLabel className={classes.label}>
                            <strong>{"Contact Associated"}</strong>
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

                <FormGroup>
                  <InputLabel className={classes.label}>
                    <strong>{"Customer PO"}</strong>
                  </InputLabel>

                  <div className={detail ? 'input-detail-only' : ''}>
                    <BCInput
                      handleChange={formikChange}
                      value={FormikValues.customerPO}
                      className='serviceTicketLabel'
                      disabled={detail}
                      name={"customerPO"}
                      placeholder={"Customer PO / Sales Order #"}
                    />
                  </div>
                </FormGroup>

                {
                  !detail ?
                    <FormGroup>
                      <InputLabel className={classes.label}>
                        <strong>{"Add Photo"}</strong>
                      </InputLabel>
                      <BCInput
                        default
                        type={"file"}
                        handleChange={(event: any) => setFieldValue("image", event.currentTarget.files[0])}
                        name={"image"}
                      />
                    </FormGroup>
                    : <div style={{ marginTop: '2rem' }} />
                }

                <Grid container
                  direction="column"
                  spacing={3}
                  alignItems="center"
                  justify="center">
                  <div
                    className={classes.uploadImageNoData}
                    style={{
                      'backgroundImage': `url(${thumb ? thumb : ''})`,
                      'border': `${thumb ? '5px solid #00aaff' : '1px dashed #000000'}`,
                      'backgroundSize': 'cover',
                      'backgroundPosition': 'center',
                      'backgroundRepeat': 'no-repeat',
                    }}
                  />
                </Grid>

              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions classes={{
            'root': classes.dialogActions
          }}>
            {
              !detail ?
                <>
                  <Fab
                    aria-label={'create-job'}
                    classes={{
                      'root': classes.fabRoot
                    }}
                    className={'serviceTicketBtn'}
                    disabled={isSubmitting || isLoadingDatas}
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
                    disabled={isSubmitting || isLoadingDatas}
                    type={'submit'}
                    variant={'extended'}>
                    {ticket._id
                      ? 'Save Ticket'
                      : 'Generate Ticket'}
                  </Fab>
                </>
                : <Fab
                  aria-label={'create-job'}
                  classes={{
                    'root': classes.fabRoot
                  }}
                  onClick={() => closeModal()}
                  color={'primary'}
                  variant={'extended'}>
                  Close
                </Fab>

            }
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
      </DataContainer>
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


const DataContainer = styled.div`

  margin: auto 0;

  .MuiFormLabel-root {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    color: ${CONSTANTS.PRIMARY_DARK};
    /* margin-bottom: 6px; */
  }
  .MuiFormControl-marginNormal {
    margin-top: .5rem !important;
    margin-bottom: 1rem !important;
    /* height: 20px !important; */
  }
  .MuiInputBase-input {
    color: #383838;
    font-size: 16px;
    padding: 12px 14px;
  }
  .required > label:after {
    margin-left: 3px;
    content: "*";
    color: red;
  }
  .save-customer-button {
    color: ${CONSTANTS.PRIMARY_WHITE};
  }
`;


export default withStyles(
  styles,
  { 'withTheme': true }
)(BCServiceTicketModal);
