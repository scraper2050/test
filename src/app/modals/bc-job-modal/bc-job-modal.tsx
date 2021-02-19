// Import * as Yup from 'yup';
import * as CONSTANTS from "../../../constants";
import BCDateTimePicker from 'app/components/bc-date-time-picker/bc-date-time-picker';
import BCInput from 'app/components/bc-input/bc-input';
import BCSelectOutlined from 'app/components/bc-select-outlined/bc-select-outlined';
import { getInventory } from 'actions/inventory/inventory.action';
import { refreshJobs } from 'actions/job/job.action';
import { refreshServiceTickets, setOpenServiceTicket, setOpenServiceTicketLoading } from 'actions/service-ticket/service-ticket.action';
import styles from './bc-job-modal.styles';
import { useFormik } from 'formik';
import {
  DialogActions,
  DialogContent,
  Fab,
  Grid,
  withStyles,
  FormGroup,
  InputLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { callCreateJobAPI, callEditJobAPI, getAllJobTypesAPI } from 'api/job.api';
import { callEditTicketAPI } from 'api/service-tickets.api';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch, useSelector } from 'react-redux';
import { formatToMilitaryTime, formatDate } from 'helpers/format';
import styled from 'styled-components';
import { getEmployeesForJobAction } from 'actions/employees-for-job/employees-for-job.action';
import { getVendors } from 'actions/vendor/vendor.action';
import { getJobSites, clearJobSiteStore } from 'actions/job-site/job-site.action';
import { getJobLocationsAction, loadingJobLocations } from 'actions/job-location/job-location.action';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import "../../../scss/job-poup.scss";
import { getOpenServiceTickets } from 'api/service-tickets.api';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { success } from "actions/snackbar/snackbar.action";
import { getContacts } from 'api/contacts.api';


const initialJobState = {
  'customer': {
    '_id': ''
  },
  'description': '',
  'employeeType': false,
  'equipment': {
    '_id': ''
  },
  'dueDate': '',
  'scheduleDate': null,
  'scheduledEndTime': null,
  'scheduledStartTime': null,
  'technician': {
    '_id': ''
  },
  'contractor': {
    '_id': ''
  },
  'ticket': {
    '_id': ''
  },
  'type': {
    '_id': ''
  },
  'jobLocation': {
    '_id': ''
  },
  'jobSite': {
    '_id': ''
  }
}


function BCJobModal({
  classes,
  job = initialJobState
}: any): JSX.Element {
  const dispatch = useDispatch();

  const equipments = useSelector(({ inventory }: any) => inventory.data);
  const employeesForJob = useSelector(({ employeesForJob }: any) => employeesForJob.data);
  const vendorsList = useSelector(({ vendors }: any) => vendors.data);
  const jobTypes = useSelector(({ jobTypes }: any) => jobTypes.data);
  const jobLocations = useSelector((state: any) => state.jobLocations.data);
  const isLoading = useSelector((state: any) => state.jobLocations.loading);
  const jobSites = useSelector((state: any) => state.jobSites.data);
  const { contacts } = useSelector((state: any) => state.contacts);
  const [scheduledEndTimeMsg, setScheduledEndTimeMsg] = useState('');
  const [startTimeLabelState, setStartTimeLabelState] = useState(false);
  const [endTimeLabelState, setEndTimeLabelState] = useState(false);
  const [showVendorFlag, setShowVendorFlag] = useState(false);
  const [jobLocationValue, setJobLocationValue] = useState<any>([]);
  const [jobSiteValue, setJobSiteValue] = useState<any>([]);
  const openServiceTicketFilter = useSelector((state: any) => state.serviceTicket.filterTicketState);
  const [contactValue, setContactValue] = useState<any>([]);
  const [thumb, setThumb] = useState<any>(null);

  const { ticket = {} } = job;
  const { customer = {} } = ticket;

  const { profile: {
    displayName = ''
  } = {} } = customer

  const employeeTypes = [
    {
      '_id': '0',
      'name': 'Employee'
    },
    {
      '_id': '1',
      'name': 'Contractor'
    }
  ];

  const handleEmployeeTypeChange = (fieldName: string, data: any) => {

    let _id = data ? data._id : 0;
    if (_id === '0') {
      setFieldValue(fieldName, 0);
      setShowVendorFlag(false);
      setFieldValue('technicianId', '');
    } else if (_id === '1') {
      setFieldValue(fieldName, 1);
      setShowVendorFlag(true);
      setFieldValue('contractorId', '');
    }

  }

  const handleSelectChange = (fieldName: string, newValue: string, setState?: any) => {
    if (setState !== undefined) {
      setState()
    }
    setFieldValue(fieldName, newValue ? newValue : '')
  }

  // const handleLocationChange = (event: any, fieldName: any, setFieldValue: any) => {
  //   const locationId = event.target.value;
  //   const customerId = job.ticket.customer._id;
  //   setFieldValue(fieldName, locationId);
  //   setFieldValue('jobSiteId', '');
  //   if (locationId !== '') {
  //     dispatch(getJobSites({ customerId, locationId }));
  //   } else {
  //     dispatch(clearJobSiteStore());
  //   }

  // }


  const handleJobSiteChange = (event: any, fieldName: any, setFieldValue: any, newValue: any) => {
    const jobSiteId = newValue ? newValue._id : '';
    setFieldValue(fieldName, jobSiteId);
    setJobSiteValue(newValue);
  }

  const handleLocationChange = async (event: any, fieldName: any, setFieldValue: any, getFieldMeta: any, newValue: any) => {
    const locationId = newValue ? newValue._id : '';

    const customerId = job.ticket.customer._id;

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

  const dateChangeHandler = (date: string, fieldName: string) => setFieldValue(fieldName, date);

  const formatRequestObj = (rawReqObj: any) => {
    for (let key in rawReqObj) {
      if (rawReqObj[key] === '' || rawReqObj[key] === null) {
        delete rawReqObj[key];
      }
    }
    return rawReqObj;
  }

  useEffect(() => {
    const customerId = job.ticket.customer._id;
    dispatch(getInventory());
    dispatch(getEmployeesForJobAction());
    dispatch(getVendors());
    dispatch(getAllJobTypesAPI());
    dispatch(getJobLocationsAction(customerId));

    let data: any = {
      type: 'Customer',
      referenceNumber: customerId
    }
    dispatch(getContacts(data));
  }, []);


  useEffect(() => {
    if (ticket.customer._id !== '') {

      if (jobLocations.length !== 0) {
        setJobLocationValue(jobLocations.filter((jobLocation: any) => jobLocation._id === ticket.jobLocation)[0])

        if (ticket.jobLocation !== '' && ticket.jobLocation !== undefined) {
          dispatch(getJobSites({ customerId: ticket.customer._id, locationId: ticket.jobLocation }));
        }
      }
    }
  }, [jobLocations]);


  useEffect(() => {
    if (ticket.customer._id !== '') {

      if (jobSites.length !== 0) {
        setJobSiteValue(jobSites.filter((jobSite: any) => jobSite._id === ticket.jobSite)[0])
      }
    }
  }, [jobSites]);


  useEffect(() => {
    if (ticket.customer._id !== '') {

      if (contacts.length !== 0) {
        setContactValue(contacts.filter((contact: any) => contact._id === ticket.customerContactId)[0])
      }
    }
  }, [contacts]);

  const isValidate = (requestObj: any) => {
    let validateFlag = true;
    if (requestObj.scheduledStartTime === null && requestObj.scheduledEndTime !== null) {
      setScheduledEndTimeMsg('');
      setStartTimeLabelState(true);
      validateFlag = false;
    } else if (requestObj.scheduledStartTime !== null && requestObj.scheduledEndTime === null) {
      setScheduledEndTimeMsg('End time is required.');
      setEndTimeLabelState(true);
      validateFlag = false;
    } else if (requestObj.scheduledStartTime > requestObj.scheduledEndTime) {
      setScheduledEndTimeMsg('End time should be greater than start time.');
      setEndTimeLabelState(true);
      setStartTimeLabelState(false);
      validateFlag = false;
    } else {
      setScheduledEndTimeMsg('');
      setStartTimeLabelState(false);
      setEndTimeLabelState(false);
      validateFlag = true;
    }
    return validateFlag;
  }

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);

    const customerId = customer._id;
    let jobFromMapFilter = job.jobFromMap;

    const { image, customerPO, customerContactId } = values;
    const { note, _id } = ticket;

    let tempJobValues = { ...values };

    delete tempJobValues['customerContactId'];
    delete tempJobValues['customerPO'];
    delete tempJobValues['image'];

    let tempTicket = {
      ticketId: _id,
      note: note === undefined ? "Job Created" : note,
      image,
      customerPO,
      customerContactId
    }

    let formatedTicketRequest = formatRequestObj(tempTicket);

    const tempData = {
      ...job,
      ...values,
      customerId
    };

    const editJob = (tempData: any) => {
      tempData.jobId = job._id;
      return callEditJobAPI(tempData)
    }

    const createJob = (tempData: any) => {
      return callCreateJobAPI(tempData)
    }

    let request = null;

    if (job._id) {
      request = editJob;
    } else {
      request = createJob;
    }

    if (isValidate(tempData)) {
      const requestObj = formatRequestObj(tempData);
      if (requestObj.scheduledStartTime && requestObj.scheduledStartTime !== null)
        requestObj.scheduledStartTime = formatToMilitaryTime(requestObj.scheduledStartTime);
      if (requestObj.scheduledEndTime && requestObj.scheduledEndTime !== null)
        requestObj.scheduledEndTime = formatToMilitaryTime(requestObj.scheduledEndTime);
      if (requestObj.companyId)
        delete requestObj.companyId;
      delete requestObj.dueDate;

      request(requestObj)
        .then(async (response: any) => {
          if (response.message === "Job created successfully.") {
            await callEditTicketAPI(formatedTicketRequest)
          }
          dispatch(refreshServiceTickets(true));
          dispatch(refreshJobs(true));
          dispatch(closeModalAction());
          dispatch(setOpenServiceTicketLoading(false));
          //Executed only when job is created from Map View.
          if (jobFromMapFilter) {
            dispatch(setOpenServiceTicketLoading(true));
            getOpenServiceTickets({ ...openServiceTicketFilter, pageNo: 1, pageSize: 6 }).then((response: any) => {
              dispatch(setOpenServiceTicketLoading(false));
              dispatch(setOpenServiceTicket(response));
              dispatch(refreshServiceTickets(true));
              dispatch(closeModalAction());
              setTimeout(() => {
                dispatch(setModalDataAction({
                  'data': {},
                  'type': ''
                }));
              }, 200);
            })
              .catch((err: any) => {
                throw err;
              });
          }
          setTimeout(() => {
            dispatch(setModalDataAction({
              'data': {},
              'type': ''
            }));
          }, 200);

          if (response.message === "Job created successfully.") {
            dispatch(success(response.message))
          }
        })
        .catch((err: any) => {
          throw err;
        })
        .finally(() => { setSubmitting(false) });
    } else {
      setSubmitting(false);
    }
  }

  const form = useFormik({
    initialValues: {
      customerId: job.customer._id,
      description: job.ticket.note ? job.ticket.note : '',
      employeeType: !job.employeeType
        ? 0
        : 1,
      equipmentId: job.equipment && job.equipment._id
        ? job.equipment._id
        : '',
      jobTypeId: job.ticket.jobType ? job.ticket.jobType : '',
      dueDate: job.ticket.dueDate ? formatDate(job.ticket.dueDate) : '',
      scheduleDate: job.scheduleDate,
      scheduledEndTime: job.scheduledEndTime,
      scheduledStartTime: job.scheduledStartTime,
      technicianId: job.technician._id,
      contractorId: job.contractor ? job.contractor._id : '',
      ticketId: job.ticket._id,
      jobLocationId: job.ticket.jobLocation ? job.ticket.jobLocation : '',
      jobSiteId: job.ticket.jobSite ? job.ticket.jobSite : '',
      customerContactId: ticket.customerContactId !== undefined ? ticket.customerContactId : '',
      customerPO: ticket.customerPO !== undefined ? ticket.customerPO : '',
      image: ticket.image !== undefined ? ticket.image : ''

    },
    onSubmit
  });



  const {
    errors: FormikErrors,
    values: FormikValues,
    handleChange: formikChange,
    handleSubmit: FormikSubmit,
    setFieldValue,
    getFieldMeta,
    isSubmitting
  } = form;


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


  if (isLoading) {
    return <BCCircularLoader />
  } else {

    return (

      <DataContainer>
        <form onSubmit={FormikSubmit} className={`ticket_form__wrapper ${classes.formWrapper}`} >
          <DialogContent classes={{ 'root': classes.dialogContent }}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h6" className="modal_heading">{`Customer : ${displayName}`}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" className="modal_heading" id='dueDate'>{`Due Date : ${FormikValues.dueDate}`}</Typography>
              </Grid>
            </Grid>
            {/* <h4 className="MuiTypography-root MuiTypography-subtitle1 modal_heading"><span>{`Customer : ${displayName}`}</span>
              <span id='dueDate'>{`Due Date : ${FormikValues.dueDate}`}</span>
            </h4> */}
            {/* <h4 className="MuiTypography-root MuiTypography-subtitle1">{`Ticket ID : ${ticket.ticketId}`}</h4> */}
            <Grid
              container
              spacing={5}>
              <Grid item sm={4} xs={12}>
                <FormGroup className={`required ${classes.formGroup}`}>
                  <div className="search_form_wrapper">
                    <Autocomplete
                      id="tags-standard"
                      options={employeeTypes}
                      getOptionLabel={(option) => option.name}
                      onChange={(ev: any, newValue: any) => handleEmployeeTypeChange('employeeType', newValue)}
                      renderInput={(params) => (
                        <>
                          <InputLabel className={classes.label}>
                            <strong>{"Employee Type "}</strong>
                            <Typography display="inline" color="error" style={{ lineHeight: '1' }}>*</Typography>
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
                error={{
                  'isError': true,
                  'message': FormikErrors.employeeType
                }}
                handleChange={(event: any) => handleEmployeeTypeChange('employeeType', event.target.value)}
                items={{
                  'data': employeeTypes,
                  'displayKey': 'name',
                  'valueKey': '_id'
                }}
                label={'Employee Type'}
                name={'employeeType'}
                required
                value={FormikValues.employeeType}
              /> */}
                {/* <BCSelectOutlined
                handleChange={formikChange}
                items={{
                  'data': [
                    ...ticketData.map((o: any) => {
                      return {
                        '_id': o._id,
                        'ticketId': o.ticketId
                      };
                    })
                  ],
                  'displayKey': 'ticketId',
                  'valueKey': '_id'
                }}
                label={'Ticket No'}
                name={'ticketId'}
                required
                value={FormikValues.ticketId}
              /> */}
                {!showVendorFlag ?

                  <FormGroup className={`required ${classes.formGroup}`}>
                    <div className="search_form_wrapper">
                      <Autocomplete
                        id="tags-standard"
                        options={employeesForJob && employeesForJob.length !== 0 ? (employeesForJob.sort((a: any, b: any) => (a.profile.displayName > b.profile.displayName) ? 1 : ((b.profile.displayName > a.profile.displayName) ? -1 : 0))) : []}
                        getOptionLabel={(option) => option.profile.displayName}
                        onChange={(ev: any, newValue: any) => handleSelectChange('technicianId', newValue?._id)}
                        renderInput={(params) => (
                          <>
                            <InputLabel className={classes.label}>
                              <strong>{"Select Technician "}</strong>
                              <Typography display="inline" color="error" style={{ lineHeight: '1' }}>*</Typography>
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

                  // <BCSelectOutlined
                  //   handleChange={formikChange}
                  //   items={{
                  //     'data': [
                  //       ...employeesForJob.map((o: any) => {
                  //         return {
                  //           '_id': o._id,
                  //           'displayName': o.profile.displayName
                  //         };
                  //       })
                  //     ],
                  //     'displayKey': 'displayName',
                  //     'valueKey': '_id'
                  //   }}
                  //   label={'Select Technician'}
                  //   name={'technicianId'}
                  //   required
                  //   value={FormikValues.technicianId}
                  // />
                  : null
                }
                {
                  showVendorFlag ?
                    <FormGroup className={`required ${classes.formGroup}`}>
                      <div className="search_form_wrapper">
                        <Autocomplete
                          id="tags-standard"
                          options={vendorsList && vendorsList.length !== 0 ? (vendorsList.sort((a: any, b: any) => (a.contractor.info.companyName > b.contractor.info.companyName) ? 1 : ((b.contractor.info.companyName > a.contractor.info.companyName) ? -1 : 0))) : []}
                          getOptionLabel={(option) => option.contractor.info.companyName}
                          onChange={(ev: any, newValue: any) => handleSelectChange('contractorId', newValue.contractor._id)}
                          renderInput={(params) => (
                            <>
                              <InputLabel className={classes.label}>
                                <strong>{"Select Contractor "}</strong>
                                <Typography display="inline" color="error" style={{ lineHeight: '1' }}>*</Typography>
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
                    // <BCSelectOutlined
                    //   handleChange={formikChange}
                    //   items={{
                    //     'data': [
                    //       ...vendorsList.map((o: any) => {
                    //         return {
                    //           '_id': o.contractor._id,
                    //           'displayName': o.contractor.info.companyName
                    //         };
                    //       })
                    //     ],
                    //     'displayKey': 'displayName',
                    //     'valueKey': '_id'
                    //   }}
                    //   label={'Select Contractor'}
                    //   name={'contractorId'}
                    //   required
                    //   value={FormikValues.contractorId}
                    // />
                    : null
                }


                <FormGroup className={`required ${classes.formGroup}`}>
                  <div className="search_form_wrapper">
                    <Autocomplete
                      defaultValue={ticket.jobType && jobTypes.length !== 0 && jobTypes.filter((jobType: any) => jobType._id === ticket.jobType)[0]}
                      id="tags-standard"
                      options={jobTypes && jobTypes.length !== 0 ? (jobTypes.sort((a: any, b: any) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))) : []}
                      getOptionLabel={(option) => option.title}
                      disabled={ticket.jobType}
                      onChange={(ev: any, newValue: any) => handleSelectChange('jobTypeId', newValue?._id)}
                      renderInput={(params) => (
                        <>
                          <InputLabel className={classes.label}>
                            <strong>{"Job Type"}</strong>
                            <Typography display="inline" color="error" style={{ lineHeight: '1' }}>*</Typography>
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
                  handleChange={formikChange}
                  items={{
                    'data': [
                      ...jobTypes.map((o: any) => {
                        return {
                          '_id': o._id,
                          'title': o.title
                        };
                      })
                    ],
                    'displayKey': 'title',
                    'valueKey': '_id'
                  }}
                  label={'Select Job Type'}
                  name={'jobTypeId'}
                  required
                  disabled={job.ticket.jobType ? true : false}
                  value={FormikValues.jobTypeId}
                /> */}



                <FormGroup className={`required ${classes.formGroup}`}>
                  <div className="search_form_wrapper">
                    <Autocomplete
                      defaultValue={ticket.jobLocation !== '' && jobLocations.length !== 0 && jobLocations.filter((jobLocation: any) => jobLocation._id === ticket.jobLocation)[0]}
                      value={jobLocationValue}
                      disabled={ticket.jobLocation}
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
                          'name': o.name
                        };
                      })
                    ],
                    'displayKey': 'name',
                    'valueKey': '_id'
                  }}
                  label={'Select Job Location'}
                  name={'jobLocationId'}
                  disabled={job.ticket.jobLocation ? true : false}
                  value={FormikValues.jobLocationId}
                  handleChange={(event: any) => handleLocationChange(event, 'jobLocationId', setFieldValue)}
                /> */}

                <FormGroup className={`required ${classes.formGroup}`}>
                  <div className="search_form_wrapper">
                    <Autocomplete
                      value={jobSiteValue}
                      disabled={ticket.jobSite || FormikValues.jobLocationId === ''}
                      id="tags-standard"

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

                {/* <BCSelectOutlined
                  handleChange={formikChange}
                  items={{
                    'data': [
                      ...jobSites.map((o: any) => {
                        return {
                          '_id': o._id,
                          'name': o.name
                        };
                      })
                    ],
                    'displayKey': 'name',
                    'valueKey': '_id',
                  }}
                  label={'Select Job Site'}
                  name={'jobSiteId'}
                  disabled={job.ticket.jobSite ? true : false}
                  value={FormikValues.jobSiteId}
                /> */}


                <FormGroup className={`required ${classes.formGroup}`}>
                  <div className="search_form_wrapper">
                    <Autocomplete
                      id="tags-standard"
                      options={equipments && equipments.length !== 0 ? (equipments.sort((a: any, b: any) => (a.company > b.company) ? 1 : ((b.company > a.company) ? -1 : 0))) : []}
                      getOptionLabel={(option) => option.company}
                      onChange={(ev: any, newValue: any) => handleSelectChange('equipmentId', newValue?._id)}
                      renderInput={(params) => (
                        <>
                          <InputLabel className={classes.label}>
                            <strong>{"Select Equipment "}</strong>
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
                      ...equipments.map((o: any) => {
                        return {
                          '_id': o._id,
                          'displayName': o.company
                        };
                      })
                    ],
                    'displayKey': 'displayName',
                    'valueKey': '_id'
                  }}
                  label={'Select Equipment'}
                  name={'equipmentId'}
                  value={FormikValues.equipmentId}
                /> */}

              </Grid>

              <Grid item sm={4} xs={12}>

                <BCDateTimePicker
                  disablePast={!job._id}
                  handleChange={(e: any) => dateChangeHandler(e, 'scheduleDate')}
                  label={'Scheduled Date'}
                  name={'scheduleDate'}
                  required
                  value={FormikValues.scheduleDate}
                />

                <BCDateTimePicker
                  dateFormat={'HH:mm:ss'}
                  placeholder='Start Time'
                  disablePast={!job._id}
                  handleChange={(e: any) => dateChangeHandler(e, 'scheduledStartTime')}
                  label={'Start Time'}
                  name={'scheduledStartTime'}
                  pickerType={'time'}
                  value={FormikValues.scheduledStartTime}
                />
                {startTimeLabelState ? <Label>Start time is required.</Label> : ''}

                <BCDateTimePicker
                  dateFormat={'HH:mm:ss'}
                  placeholder='End Time'
                  disablePast={!job._id}
                  handleChange={(e: any) => dateChangeHandler(e, 'scheduledEndTime')}
                  label={'End Time'}
                  name={'scheduledEndTime'}
                  pickerType={'time'}
                  value={FormikValues.scheduledEndTime}
                />
                {endTimeLabelState ? <Label>{scheduledEndTimeMsg}</Label> : ''}

                <div style={{ marginTop: '.5rem' }} />
                <FormGroup>
                  <InputLabel className={classes.label}>
                    <strong>{"Description"}</strong>
                  </InputLabel>
                  <BCInput
                    handleChange={formikChange}
                    multiline
                    name={'description'}
                    value={FormikValues.description}
                  />
                </FormGroup>
              </Grid>

              <Grid item sm={4} xs={12}>

                <FormGroup className={`required ${classes.formGroup}`}>
                  <div className="search_form_wrapper">
                    <Autocomplete
                      value={contactValue}
                      id="tags-standard"
                      options={contacts && contacts.length !== 0 ? (contacts.sort((a: any, b: any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))) : []}
                      getOptionLabel={(option) => option.name}
                      onChange={(ev: any, newValue: any) => handleSelectChange('customerContactId', newValue?._id, setContactValue(newValue))}
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
                  <BCInput
                    handleChange={formikChange}
                    value={FormikValues.customerPO}
                    className='serviceTicketLabel'
                    name={"customerPO"}
                    placeholder={"Customer PO / Sales Order #"}
                  />
                </FormGroup>

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
            <Fab
              aria-label={'create-job'}
              classes={{
                'root': classes.fabRoot
              }}
              color={'secondary'}
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
              {job._id
                ? 'Edit'
                : 'Submit'}
            </Fab>
          </DialogActions>
        </form>

      </DataContainer >
    );
  }
}

const Label = styled.div`
  color: red;
  font-size: 15px;
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
)(BCJobModal);
