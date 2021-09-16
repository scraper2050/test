// Import * as Yup from 'yup';
import * as CONSTANTS from '../../../constants';
import BCDateTimePicker from 'app/components/bc-date-time-picker/bc-date-time-picker';
import BCInput from 'app/components/bc-input/bc-input';
import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import { getInventory } from 'actions/inventory/inventory.action';
import { refreshJobs } from 'actions/job/job.action';
import { refreshServiceTickets, setOpenServiceTicket, setOpenServiceTicketLoading } from 'actions/service-ticket/service-ticket.action';
import styles from './bc-job-modal.styles';
import { useFormik } from 'formik';
import {
  Chip,
  DialogActions,
  DialogContent,
  Fab,
  FormGroup,
  Grid,
  InputLabel,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import { callCreateJobAPI, callEditJobAPI, getAllJobTypesAPI } from 'api/job.api';
import { callEditTicketAPI } from 'api/service-tickets.api';
import { closeModalAction, openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch, useSelector } from 'react-redux';
import { convertMilitaryTime, formatDate, formatISOToDateString, formatToMilitaryTime } from 'helpers/format';
import styled from 'styled-components';
import { getEmployeesForJobAction } from 'actions/employees-for-job/employees-for-job.action';
import { getVendors } from 'actions/vendor/vendor.action';
import { markNotificationAsRead } from 'actions/notifications/notifications.action';
import { clearJobSiteStore, getJobSites } from 'actions/job-site/job-site.action';
import { getJobLocationsAction, loadingJobLocations } from 'actions/job-location/job-location.action';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import '../../../scss/job-poup.scss';
import { getOpenServiceTickets } from 'api/service-tickets.api';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { error as SnackBarError, success } from 'actions/snackbar/snackbar.action';
import { getContacts } from 'api/contacts.api';
import './bc-job-modal.scss';
import { modalTypes } from '../../../constants';
import { useHistory, useLocation } from 'react-router-dom';

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
  },
  'jobRescheduled': false
};


const getJobData = (ids:any, jobTypes:any) => {
  if (!ids) {
    return;
  }
  return jobTypes.filter((job:any) => ids.includes(job._id));
};


function BCJobModal({
  classes,
  job = initialJobState,
  detail = false
}: any): JSX.Element {
  const dispatch = useDispatch();

  const equipments = useSelector(({ inventory }: any) => inventory.data);
  // Const employeesForJob = useSelector(({ employeesForJob }: any) => employeesForJob.data);
  const { loading, data } = useSelector(({ employeesForJob }: any) => employeesForJob);
  const employeesForJob = useMemo(() => [...data], [data]);
  const vendorsList = useSelector(({ vendors }: any) => vendors.data.filter((vendor: any) => vendor.status <= 1));
  const jobTypes = useSelector(({ jobTypes }: any) => jobTypes.data);
  const jobLocations = useSelector((state: any) => state.jobLocations.data);
  const isLoading = useSelector((state: any) => state.jobLocations.loading);
  const jobSites = useSelector((state: any) => state.jobSites.data);
  const { contacts } = useSelector((state: any) => state.contacts);
  const [scheduledEndTimeMsg, setScheduledEndTimeMsg] = useState('');
  const [startTimeLabelState, setStartTimeLabelState] = useState(false);
  const [endTimeLabelState, setEndTimeLabelState] = useState(false);
  const [showVendorFlag, setShowVendorFlag] = useState(Boolean(job._id && job.employeeType));
  const [jobLocationValue, setJobLocationValue] = useState<any>([]);
  const [jobSiteValue, setJobSiteValue] = useState<any>([]);
  const [employeeValue, setEmployeeValue] = useState<any>([]);
  const [contractorValue, setContractorValue] = useState<any>([]);
  const [jobTypeValue, setJobTypeValue] = useState<any>([]);
  const openServiceTicketFilter = useSelector((state: any) => state.serviceTicket.filterTicketState);
  const [contactValue, setContactValue] = useState<any>([]);
  const [thumb, setThumb] = useState<any>(null);
  const history = useHistory();
  const jobTypesInput = useRef<HTMLInputElement>(null);

  const { ticket = {} } = job;
  const { customer = {} } = ticket;

  const { 'profile': {
    displayName = ''
  } = {} } = customer;

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
    const _id = data ? data._id : 0;
    setFieldValue('contractorId', '');
    setFieldValue('technicianId', '');
    if (_id === '0') {
      setFieldValue(fieldName, 0);
      setShowVendorFlag(false);
    } else if (_id === '1') {
      setFieldValue(fieldName, 1);
      setShowVendorFlag(true);
    }
  };

  const handleJobTypeChange = (newValue:any) => {
    if (newValue.length > 1) {
      const ids = newValue.map((jobType:any) => ({ 'jobTypeId': jobType?._id }));
      setFieldValue('jobTypes', ids);
    } else {
      setFieldValue('jobTypeId', newValue || []);
    }

    setJobTypeValue(newValue);
  };


  const handleSelectChange = (fieldName: string, newValue: string, setState?: any) => {
    if (fieldName === 'contractorId') {
      setFieldValue('technicianId', '');
    }
    if (fieldName === 'technicianId') {
      setFieldValue('contractorId', '');
    }


    if (setState !== undefined) {
      setState();
    }
    setFieldValue(fieldName, newValue ? newValue : '');
  };


  const openCancelJobModal = async (job: any, jobOnly?: boolean) => {
    dispatch(setModalDataAction({
      'data': {
        'job': job,
        jobOnly,
        'modalTitle': `Cancel Job`,
        'removeFooter': false
      },
      'type': modalTypes.CANCEL_JOB_MODAL
    }));
  };

  /*
   * Const handleLocationChange = (event: any, fieldName: any, setFieldValue: any) => {
   *   const locationId = event.target.value;
   *   const customerId = job.ticket.customer?._id;
   *   setFieldValue(fieldName, locationId);
   *   setFieldValue('jobSiteId', '');
   *   if (locationId !== '') {
   *     dispatch(getJobSites({ customerId, locationId }));
   *   } else {
   *     dispatch(clearJobSiteStore());
   *   }
   */

  // }


  const handleJobSiteChange = (event: any, fieldName: any, setFieldValue: any, newValue: any) => {
    const jobSiteId = newValue ? newValue._id : '';
    setFieldValue(fieldName, jobSiteId);
    setJobSiteValue(newValue);
  };

  const handleLocationChange = async (event: any, fieldName: any, setFieldValue: any, getFieldMeta: any, newValue: any) => {
    const locationId = newValue ? newValue._id : '';

    const customerId = job.ticket.customer?._id ? job.ticket.customer?._id : job.customer?._id;

    await setFieldValue(fieldName, '');
    await setFieldValue('jobSiteId', '');
    await setJobSiteValue([]);
    await setJobLocationValue(newValue);
    if (locationId !== '') {
      await dispatch(getJobSites({ customerId,
        locationId }));
    } else {
      await dispatch(clearJobSiteStore());
    }
    await setFieldValue(fieldName, locationId);
  };

  const dateChangeHandler = (date: string, fieldName: string) => setFieldValue(fieldName, date);

  const formatRequestObj = (rawReqObj: any) => {
    for (const key in rawReqObj) {
      if (rawReqObj[key] === '' || rawReqObj[key] === null) {
        delete rawReqObj[key];
      }
    }
    return rawReqObj;
  };

  useEffect(() => {
    const customerId = job.ticket.customer?._id !== undefined ? job.ticket.customer?._id : job.ticket.customer;
    dispatch(getInventory());
    dispatch(getEmployeesForJobAction());
    dispatch(getVendors());
    dispatch(getAllJobTypesAPI());
    dispatch(getJobLocationsAction(customerId));

    const data: any = {
      'type': 'Customer',
      'referenceNumber': customerId
    };
    dispatch(getContacts(data));
  }, []);

  useEffect(() => {
    if (job._id) {
      if (employeesForJob.length !== 0 && !job.employeeType && job.technician) {
        setEmployeeValue(employeesForJob.filter((employee: any) => employee._id === job.technician._id)[0]);
      }
    }
  }, [employeesForJob]);


  useEffect(() => {
    if (job._id) {
      if (vendorsList.length !== 0 && job.employeeType && job.contractor) {
        setContractorValue(vendorsList.filter((vendor: any) => vendor.contractor._id === job.contractor._id)[0]);
      }
    }
  }, [vendorsList]);

  useEffect(() => {
    if (jobTypes.length !== 0) {
      let tempJobValue = [];

      if (job._id) {
        tempJobValue = job.tasks && job.tasks.length > 0
          ? getJobData(job.tasks.map((job:any) => job.jobType._id), jobTypes)
          : getJobData([job.type?._id], jobTypes);
      } else {
        tempJobValue = ticket.tasks && ticket.tasks.length > 0
          ? getJobData(ticket.tasks.map((job:any) => job.jobType), jobTypes)
          : getJobData([ticket.jobType], jobTypes);
      }

      setJobTypeValue(tempJobValue);
    }
  }, [jobTypes]);

  useEffect(() => {
    if (ticket.customer?._id !== '') {
      if (jobLocations.length !== 0) {
        if (ticket.jobLocation !== '' && ticket.jobLocation !== undefined && ticket.jobLocation) {
          setJobLocationValue(jobLocations.filter((jobLocation: any) => jobLocation._id === ticket.jobLocation)[0]);
          dispatch(getJobSites({ 'customerId': ticket.customer?._id !== undefined ? ticket.customer?._id : ticket.customer,
            'locationId': ticket.jobLocation }));
        } else if (job.jobLocation) {
          dispatch(getJobSites({ 'customerId': ticket.customer?._id !== undefined ? ticket.customer?._id : ticket.customer,
            'locationId': job.jobLocation._id }));
          setJobLocationValue(jobLocations.filter((jobLocation: any) => jobLocation._id === job.jobLocation._id)[0]);
        }
      }
    }
  }, [jobLocations]);


  useEffect(() => {
    if (ticket.customer?._id !== '') {
      if (jobSites.length !== 0) {
        if (ticket.jobSite) {
          setJobSiteValue(jobSites.filter((jobSite: any) => jobSite._id === ticket.jobSite)[0]);
        } else if (job.jobSite) {
          setJobSiteValue(jobSites.filter((jobSite: any) => jobSite._id === job.jobSite._id)[0]);
        }
      }
    }
  }, [jobSites]);


  useEffect(() => {
    if (ticket.customer?._id !== '') {
      if (contacts.length !== 0) {
        setContactValue(contacts.filter((contact: any) => contact._id === ticket.customerContactId._id)[0]);
      }
    }
  }, [contacts]);

  useEffect(() => {
    if (job?.jobRescheduled) {
      dispatch(markNotificationAsRead.fetch({ 'id': job?.jobRescheduled,
        'isRead': true }));
    }
  }, [job?.jobRescheduled]);

  const isValidate = (requestObj: any) => {
    let validateFlag = true;
    if (requestObj.scheduledStartTime === null && requestObj.scheduledEndTime !== null) {
    //  SetScheduledEndTimeMsg('');
      setStartTimeLabelState(true);
      validateFlag = false;
    } /* Else if (requestObj.scheduledStartTime !== null && requestObj.scheduledEndTime === null) {
      setScheduledEndTimeMsg('End time is required.');
      setEndTimeLabelState(true);
      validateFlag = false;
    }
     else if (requestObj.scheduledStartTime > requestObj.scheduledEndTime) {
      setScheduledEndTimeMsg('End time should be greater than start time.');
      setEndTimeLabelState(true);
      setStartTimeLabelState(false);
      validateFlag = false;
    } */
    else {
      setScheduledEndTimeMsg('');
      setStartTimeLabelState(false);
      setEndTimeLabelState(false);
      validateFlag = true;
    }
    return validateFlag;
  };

  const formatSchedulingTime = (time: string) => {
    const timeAr = time.split('T');
    const timeWithSeconds = timeAr[1].substr(0, 5);
    const hours = timeWithSeconds.substr(0, 2);
    const minutes = timeWithSeconds.substr(3, 5);

    return { hours,
      minutes };
  };

  const form = useFormik({
    'initialValues': {
      'customerId': job.customer?._id,
      //'description': job.ticket.note ? job.ticket.note : '',
      'description': job.description ? job.description : '',
      'employeeType': !job.employeeType
        ? 0
        : 1,
      'equipmentId': job.equipment && job.equipment._id
        ? job.equipment._id
        : '',
      'jobTypeId': job.ticket.jobType ? job.ticket.jobType : '',
      'jobTypes': job.ticket.tasks ? job.ticket.tasks : [],
      'dueDate': job.ticket.dueDate ? formatDate(job.ticket.dueDate) : '',
      'scheduleDate': job.scheduleDate,
      'scheduledStartTime': job?.scheduledStartTime ? formatISOToDateString(job.scheduledStartTime) : null,
      'scheduledEndTime': job.scheduledEndTime ? formatISOToDateString(job.scheduledEndTime) : null,
      'technicianId': job.technician ? job.technician._id : '',
      'contractorId': job.contractor ? job.contractor._id : '',
      'ticketId': job.ticket._id,
      'jobLocationId': job.jobLocation ? job.jobLocation._id : job.ticket.jobLocation ? job.ticket.jobLocation : '',
      'jobSiteId': job.jobSite ? job.jobSite._id : job.ticket.jobSite ? job.ticket.jobSite : '',
      'customerContactId': ticket.customerContactId !== undefined ? ticket.customerContactId : '',
      'customerPO': ticket.customerPO !== undefined ? ticket.customerPO : '',
      'image': ticket.image !== undefined ? ticket.image : ''

    },
    'onSubmit': (values: any, { setSubmitting }: any) => {
      setSubmitting(true);

      if (jobTypeValue.length > 1) {
        delete values.jobTypeId;
      } else {
        values.jobTypes = [];
      }

      const customerId = customer?._id;
      const jobFromMapFilter = job.jobFromMap;

      const { image, customerPO, customerContactId } = values;
      const { note, _id } = ticket;

      const tempJobValues = { ...values };

      delete tempJobValues.customerContactId;
      delete tempJobValues.customerPO;
      delete tempJobValues.image;

      const tempTicket = {
        'ticketId': _id,
        'note': note === undefined ? 'Job Created' : note,
        image,
        customerPO,
        customerContactId
      };


      const formatedTicketRequest = formatRequestObj(tempTicket);

      const tempData = {
        ...job,
        ...values,
        customerId
      };

      delete tempData.contractor;
      delete tempData.technician;


      if (values.contractorId && values.contractorId !== '') {
        delete tempData.technicianId;
        tempData.employeeType = 1;
        tempData.contractorId = values.contractorId;
      }


      if (values.technicianId && values.technicianId !== '') {
        delete tempData.contractorId;
        tempData.technicianId = values.technicianId;
        tempData.employeeType = 0;
      }


      const editJob = (tempData: any) => {
        tempData.jobId = job._id;
        return callEditJobAPI(tempData);
      };

      const createJob = (tempData: any) => {
        return callCreateJobAPI(tempData);
      };

      let request = null;

      if (job._id) {
        request = editJob;
      } else {
        request = createJob;
      }

      if (isValidate(tempData)) {
        const requestObj = { ...formatRequestObj(tempData) };

        if (requestObj.scheduledStartTime && requestObj.scheduledStartTime !== null) {
          requestObj.scheduledStartTime = formatToMilitaryTime(requestObj.scheduledStartTime);
        } else {
          requestObj.scheduledStartTime = '';
        }

        if (requestObj.scheduledEndTime && requestObj.scheduledEndTime !== null) {
          requestObj.scheduledEndTime = formatToMilitaryTime(requestObj.scheduledEndTime);
        } else {
          requestObj.scheduledEndTime = '';
        }

        if (requestObj.companyId) {
          delete requestObj.companyId;
        }
        delete requestObj.dueDate;

        if (!job._id) {
          delete requestObj.customer;
          delete requestObj.equipment;
          delete requestObj.technician;
          delete requestObj.ticket;
          delete requestObj.type;
        } else {
          if (requestObj.jobTypeId) {
            requestObj.jobTypes = requestObj.jobTypeId.map((type: any) => ({jobTypeId: type._id}));
            delete requestObj.jobTypeId;
          } else if (requestObj.jobTypes){
            requestObj.jobTypes = requestObj.jobTypes.map((type: any) => {
              if (type.jobType?._id) return ({jobTypeId: type.jobType._id});
              else return type;
            })
          } else {
            requestObj.jobTypes = [];
          }
        }

        request(requestObj)

          .then(async (response: any) => {
            if (response.status === 0) {
              dispatch(SnackBarError(response.message));
              return;
            }
            if (response.message === 'Job created successfully.' || response.message === 'Job edited successfully.') {
              await callEditTicketAPI(formatedTicketRequest);
            }
            await dispatch(refreshServiceTickets(true));
            await dispatch(refreshJobs(true));
            dispatch(closeModalAction());
            dispatch(setOpenServiceTicketLoading(false));
            // Executed only when job is created from Map View.
            if (jobFromMapFilter) {
              dispatch(setOpenServiceTicketLoading(true));
              getOpenServiceTickets({ ...openServiceTicketFilter,
                'pageNo': 1,
                'pageSize': 4 }).then((response: any) => {
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

            if (response.message === 'Job created successfully.' || response.message === 'Job edited successfully.') {
              dispatch(success(response.message));
            }
          })
          .catch((err: any) => {
            throw err;
          })
          .finally(() => {
            setSubmitting(false);
          });
      } else {
        setSubmitting(false);
      }
    },
    'validate':  (values: any) => {
      const errors: any = {};

      if (values.jobTypeId && values.jobTypeId.length === 0) {
      // if (!jobTypeValue.length) {
        errors.jobTypes = 'Select at least one (1) job';
        if (jobTypesInput.current !== null) {
          jobTypesInput.current.setCustomValidity("Select at least one (1) job");
        }
      } else {
        if (jobTypesInput.current !== null) {
          jobTypesInput.current.setCustomValidity("");
        }
      }

      return errors;
    }
  });


  const {
    'errors': FormikErrors,
    'values': FormikValues,
    'handleChange': formikChange,
    'handleSubmit': FormikSubmit,
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


  const disabledChips = job?._id
    ? job.tasks.length
      ? job.tasks.map(({ jobType }:any) => jobType._id)
      : [job.type._id]
    : [];


  const goToJobs = () => {
    closeModal();
    history.push('/main/customers/schedule');
  };


  useEffect(() => {
    const reader = new FileReader();


    if (FormikValues.image && FormikValues.image !== '' && FormikValues.image !== undefined) {
      if (typeof FormikValues.image === 'string') {
        setThumb(FormikValues.image);
      } else {
        reader.onloadend = () => {
          setThumb(reader.result);
        };
        reader.readAsDataURL(FormikValues.image);
      }
    }
  }, [FormikValues.image]);

  const columns: any = [
    {
      'Header': 'User',
      'id': 'user',
      'sortable': true,
      Cell({ row }: any) {
        const user = employeesForJob.filter((employee: any) => employee._id === row.original.user)[0];
        const { displayName } = user?.profile || '';
        return (
          <div>
            {displayName}
          </div>
        );
      }
    },
    {
      'Header': 'Date',
      'id': 'date',
      'sortable': true,
      Cell({ row }: any) {
        const date = formatDate(row.original.date);
        let time;
        const formatedTime = formatSchedulingTime(row.original.date);
        time = convertMilitaryTime(`${formatedTime.hours}:${formatedTime.minutes}`);
        return (
          <div>
            <i>
              {' '}
              {`${date} ${time}`}
            </i>
          </div>
        );
      }
    },
    {
      'Header': 'Actions',
      'id': 'action',
      'sortable': true,
      Cell({ row }: any) {
        const splittedActions = row.original.action.split('|');
        const actions = splittedActions.filter((action: any) => action !== '');
        return (
          <>
            {
              actions.length === 0 ? <div />
                : <ul>
                  {actions.map((action: any) => <li>
                    {action}
                  </li>)}
                </ul>
            }
          </>

        );
      }
    }
  ];

  if (isLoading) {
    return <BCCircularLoader />;
  }

  return (

    <DataContainer>
      <form
        className={`ticket_form__wrapper ${classes.formWrapper}`}
        onSubmit={FormikSubmit} >
        <DialogContent classes={{ 'root': classes.dialogContent }}>
          <Grid
            container
            justify={'space-between'}>
            <Grid item>
              <Typography
                className={'modal_heading'}
                variant={'h6'}>
                {`Customer : ${job.customer.profile ? job.customer.profile.displayName : displayName}`}
              </Typography>
            </Grid>
            {
              !job._id &&
                <Grid item>
                  <Typography
                    className={'modal_heading'}
                    id={'dueDate'}
                    variant={'h6'}>
                    {`Due Date : ${FormikValues.dueDate}`}
                  </Typography>
                </Grid>
            }
          </Grid>
          {/* <h4 className="MuiTypography-root MuiTypography-subtitle1 modal_heading"><span>{`Customer : ${displayName}`}</span>
              <span id='dueDate'>{`Due Date : ${FormikValues.dueDate}`}</span>
            </h4> */}
          {/* <h4 className="MuiTypography-root MuiTypography-subtitle1">{`Ticket ID : ${ticket.ticketId}`}</h4> */}
          <Grid
            container
            spacing={5}>
            <Grid
              item
              sm={detail ? 2 : 4}
              xs={12}>
              <FormGroup className={`required ${classes.formGroup}`}>
                <div className={'search_form_wrapper'}>
                  <Autocomplete
                    className={detail ? 'detail-only' : ''}
                    defaultValue={job._id && job.employeeType ? employeeTypes[1] : employeeTypes[0]}
                    disabled={detail}
                    getOptionLabel={option => option.name ? option.name : ''}
                    id={'tags-standard'}
                    onChange={(ev: any, newValue: any) => handleEmployeeTypeChange('employeeType', newValue)}
                    options={employeeTypes}
                    renderInput={params =>
                      <>
                        <InputLabel className={classes.label}>
                          <strong>
                            {'Technician Type'}
                          </strong>
                          {!detail && <Typography
                            color={'error'}
                            display={'inline'}
                            style={{ 'lineHeight': '1' }}>
                            {'*'}
                          </Typography>}
                        </InputLabel>
                        <TextField
                          required
                          {...params}
                          variant={'standard'}
                        />
                      </>
                    }
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
              {!showVendorFlag

                ? <FormGroup className={`required ${classes.formGroup}`}>
                  <div className={'search_form_wrapper'}>
                    <Autocomplete
                      className={detail ? 'detail-only' : ''}
                      disabled={detail}
                      getOptionLabel={option => option.profile ? option.profile.displayName : ''}
                      id={'tags-standard'} // Options={employeesForJob && employeesForJob.length !== 0 ? (employeesForJob.sort((a: any, b: any) => (a.profile.displayName > b.profile.displayName) ? 1 : ((b.profile.displayName > a.profile.displayName) ? -1 : 0))) : []}
                      onChange={(ev: any, newValue: any) => handleSelectChange('technicianId', newValue?._id, () => setEmployeeValue(newValue))}
                      options={employeesForJob && employeesForJob.length !== 0 ? employeesForJob.sort((a: any, b: any) => a.profile.displayName > b.profile.displayName ? 1 : b.profile.displayName > a.profile.displayName ? -1 : 0) : []}
                      renderInput={params =>
                        <>
                          <InputLabel className={classes.label}>
                            <strong>
                              {'Technician '}
                            </strong>
                            {!detail && <Typography
                              color={'error'}
                              display={'inline'}
                              style={{ 'lineHeight': '1' }}>
                              {'*'}
                            </Typography>}
                          </InputLabel>
                          <TextField
                            {...params}
                            required
                            variant={'standard'}
                          />
                        </>
                      }
                      value={employeeValue}
                    />
                  </div>
                </FormGroup>

              // <BCSelectOutlined
              //   HandleChange={formikChange}
              //   Items={{
              //     'data': [
              //       ...employeesForJob.map((o: any) => {
              //         Return {
              //           '_id': o._id,
              //           'displayName': o.profile.displayName
              //         };
              //       })
              //     ],
              //     'displayKey': 'displayName',
              //     'valueKey': '_id'
              //   }}
              //   Label={'Select Technician'}
              //   Name={'technicianId'}
              //   Required
              //   Value={FormikValues.technicianId}
              // />
                : null
              }
              {
                showVendorFlag
                  ? <FormGroup className={`required ${classes.formGroup}`}>
                    <div className={'search_form_wrapper'}>
                      <Autocomplete
                        className={detail ? 'detail-only' : ''}
                        // DefaultValue={job._id && job.employeeType ? vendorsList.filter((vendor: any) => vendor.contrator._id === job.contractor._id) : null}
                        disabled={detail}
                        getOptionLabel={option => option?.contractor?.info?.companyName ? option.contractor.info.companyName : ''}
                        id={'tags-standard'}
                        onChange={(ev: any, newValue: any) => handleSelectChange('contractorId', newValue?.contractor?._id, () => setContractorValue(newValue))}
                        options={vendorsList && vendorsList.length !== 0 ? vendorsList.sort((a: any, b: any) => a.contractor.info.companyName > b.contractor.info.companyName ? 1 : b.contractor.info.companyName > a.contractor.info.companyName ? -1 : 0) : []}
                        renderInput={params =>
                          <>
                            <InputLabel className={classes.label}>
                              <strong>
                                {'Contractor '}
                              </strong>
                              {!detail && <Typography
                                color={'error'}
                                display={'inline'}
                                style={{ 'lineHeight': '1' }}>
                                {'*'}
                              </Typography>}
                            </InputLabel>
                            <TextField
                              required
                              {...params}
                              variant={'standard'}
                            />
                          </>
                        }
                        value={contractorValue}
                      />
                    </div>
                  </FormGroup>
                // <BCSelectOutlined
                //   HandleChange={formikChange}
                //   Items={{
                //     'data': [
                //       ...vendorsList.map((o: any) => {
                //         Return {
                //           '_id': o.contractor._id,
                //           'displayName': o.contractor.info.companyName
                //         };
                //       })
                //     ],
                //     'displayKey': 'displayName',
                //     'valueKey': '_id'
                //   }}
                //   Label={'Select Contractor'}
                //   Name={'contractorId'}
                //   Required
                //   Value={FormikValues.contractorId}
                // />
                  : null
              }

              <FormGroup className={`required ${classes.formGroup}`}>
                <div className={'search_form_wrapper'}>
                  <Autocomplete
                    className={detail ? 'detail-only' : ''}
                    disabled={detail}
                    // getOptionDisabled={option => job._id ? disabledChips.includes(option._id) : null}
                    getOptionLabel={option => option.title ? option.title : ''}
                    id={'tags-standard'}
                    multiple
                    onChange={(ev: any, newValue: any) => handleJobTypeChange(newValue)}
                    options={jobTypes && jobTypes.length !== 0 ? jobTypes.sort((a: any, b: any) => a.title > b.title ? 1 : b.title > a.title ? -1 : 0) : []}
                    renderInput={params =>
                      <>
                        <InputLabel className={classes.label}>
                          <strong>
                            {'Job Type'}
                          </strong>
                          {!detail && <Typography
                            color={'error'}
                            display={'inline'}
                            style={{ 'lineHeight': '1' }}>
                            {'*'}
                          </Typography>}
                        </InputLabel>
                        <TextField
                          {...params}
                          variant={'standard'}
                          inputRef={jobTypesInput}
                          // required={!jobTypeValue.length}
                          // error= {!!FormikErrors.jobTypes}
                          // helperText={FormikErrors.jobTypes}
                        />
                      </>
                    }
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => {
                        return <Chip
                          label={option.title}
                          {...getTagProps({ index })}
                          // disabled={disabledChips.includes(option._id) || !job._id}
                        />;
                      })
                    }
                    value={jobTypeValue}
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
                <div className={'search_form_wrapper'}>
                  <Autocomplete
                    className={detail ? 'detail-only' : ''}
                    defaultValue={ticket.jobLocation !== '' && jobLocations.length !== 0 && jobLocations.filter((jobLocation: any) => jobLocation._id === ticket.jobLocation)[0]}
                    disabled={ticket.jobLocation || detail}
                    getOptionLabel={option => option.name ? option.name : ''}
                    id={'tags-standard'}
                    onChange={(ev: any, newValue: any) => handleLocationChange(ev, 'jobLocationId', setFieldValue, getFieldMeta, newValue)}
                    options={jobLocations && jobLocations.length !== 0 ? jobLocations.sort((a: any, b: any) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0) : []}
                    renderInput={params =>
                      <>
                        <InputLabel className={classes.label}>
                          <strong>
                            {'Job Location'}
                          </strong>
                        </InputLabel>
                        <TextField
                          {...params}
                          variant={'standard'}
                        />
                      </>
                    }
                    value={jobLocationValue}
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
                <div className={'search_form_wrapper'}>
                  <Autocomplete
                    className={detail ? 'detail-only' : ''}

                    defaultValue={ticket.jobSite !== '' && jobSites.length !== 0 && jobSites.filter((jobSite: any) => jobSite._id === ticket.jobSite)[0]}
                    disabled={ticket.jobSite || FormikValues.jobLocationId === '' || detail}
                    getOptionLabel={option => option.name ? option.name : ''}
                    id={'tags-standard'}
                    onChange={(ev: any, newValue: any) => handleJobSiteChange(ev, 'jobSiteId', setFieldValue, newValue)}
                    options={jobSites && jobSites.length !== 0 ? jobSites.sort((a: any, b: any) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0) : []}
                    renderInput={params =>
                      <>
                        <InputLabel className={classes.label}>
                          <strong>
                            {'Job Site'}
                          </strong>
                        </InputLabel>
                        <TextField
                          {...params}
                          variant={'standard'}
                        />
                      </>
                    }
                    value={jobSiteValue}
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
                <div className={'search_form_wrapper'}>
                  <Autocomplete
                    className={detail ? 'detail-only' : ''}
                    disabled={detail}
                    getOptionLabel={option => option.company ? option.company : ''}
                    id={'tags-standard'}
                    onChange={(ev: any, newValue: any) => handleSelectChange('equipmentId', newValue?._id)}
                    options={equipments && equipments.length !== 0 ? equipments.sort((a: any, b: any) => a.company > b.company ? 1 : b.company > a.company ? -1 : 0) : []}
                    renderInput={params =>
                      <>
                        <InputLabel className={classes.label}>
                          <strong>
                            {'Equipment '}
                          </strong>
                        </InputLabel>
                        <TextField
                          {...params}
                          variant={'standard'}
                        />
                      </>
                    }
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

            <Grid
              item
              sm={detail ? 2 : 4}
              xs={12}>

              <div className={detail ? 'input-detail-only' : ''}>
                <BCDateTimePicker
                  disabled={detail}
                  disablePast={!job._id}
                  handleChange={(e: any) => dateChangeHandler(e, 'scheduleDate')}
                  label={'Scheduled Date'}
                  name={'scheduleDate'}
                  required={!detail}
                  value={FormikValues.scheduleDate}
                />
              </div>


              <div className={detail ? 'input-detail-only' : ''}>
                <BCDateTimePicker
                  dateFormat={'HH:mm:ss'}
                  disabled={detail}
                  disablePast={!job._id}
                  handleChange={(e: any) => dateChangeHandler(e, 'scheduledStartTime')}
                  label={'Start Time'}
                  name={'scheduledStartTime'}
                  pickerType={'time'}
                  placeholder={'Start Time'}
                  value={FormikValues.scheduledStartTime}
                />
              </div>
              {startTimeLabelState && !detail ? <Label>
                {'Start time is required.'}
              </Label> : ''}


              <div className={detail ? 'input-detail-only' : ''}>
                <BCDateTimePicker
                  dateFormat={'HH:mm:ss'}
                  disabled={detail}
                  disablePast={!job._id}
                  handleChange={(e: any) => dateChangeHandler(e, 'scheduledEndTime')}
                  label={'End Time'}
                  name={'scheduledEndTime'}
                  pickerType={'time'}
                  placeholder={'End Time'}
                  value={FormikValues.scheduledEndTime}
                />
              </div>
              {endTimeLabelState && !detail ? <Label>
                {scheduledEndTimeMsg}
              </Label> : ''}

              <div style={{ 'marginTop': '.5rem' }} />
              <FormGroup>
                <InputLabel className={classes.label}>
                  <strong>
                    {'Description'}
                  </strong>
                </InputLabel>

                <div className={detail ? 'input-detail-only' : ''}>
                  <BCInput
                    disabled={detail}
                    handleChange={formikChange}
                    multiline
                    name={'description'}
                    value={FormikValues.description}
                  />
                </div>
              </FormGroup>
            </Grid>

            <Grid
              item
              sm={detail ? 2 : 4}
              xs={12}>

              <FormGroup className={`required ${classes.formGroup}`}>
                <div className={'search_form_wrapper'}>
                  <Autocomplete
                    className={detail ? 'detail-only' : ''}
                    disabled={true}
                    getOptionLabel={option => option.name ? option.name : ''}
                    id={'tags-standard'}
                    onChange={(ev: any, newValue: any) => handleSelectChange('customerContactId', newValue?._id, setContactValue(newValue))}
                    options={contacts && contacts.length !== 0 ? contacts.sort((a: any, b: any) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0) : []}
                    renderInput={params =>
                      <>
                        <InputLabel className={classes.label}>
                          <strong>
                            {'Contact Associated'}
                          </strong>
                        </InputLabel>
                        <TextField
                          {...params}
                          variant={'standard'}
                        />
                      </>
                    }
                    value={contactValue}
                  />
                </div>
              </FormGroup>


              <FormGroup>
                <InputLabel className={classes.label}>
                  <strong>
                    {'Customer PO'}
                  </strong>
                </InputLabel>

                <div className={detail ? 'input-detail-only' : ''}>

                  <BCInput
                    className={'serviceTicketLabel'}
                    disabled={detail}
                    handleChange={formikChange}
                    name={'customerPO'}
                    placeholder={'Customer PO / Sales Order #'}
                    value={FormikValues.customerPO}
                  />
                </div>
              </FormGroup>

              {
                !detail
                  ? <FormGroup>
                    <InputLabel className={classes.label}>
                      <strong>
                        {'Add Photo'}
                      </strong>
                    </InputLabel>
                    <BCInput
                      default
                      handleChange={(event: any) => setFieldValue('image', event.currentTarget.files[0])}
                      name={'image'}
                      type={'file'}
                    />
                  </FormGroup>
                  : <div style={{ 'marginTop': '1.5rem' }} />
              }

              <Grid
                alignItems={'center'}
                container
                direction={'column'}
                justify={'center'}
                spacing={3}>
                <div
                  className={classes.uploadImageNoData}
                  style={{
                    'backgroundImage': `url(${thumb ? thumb : ''})`,
                    'border': `${thumb ? '5px solid #00aaff' : '1px dashed #000000'}`,
                    'backgroundSize': 'cover',
                    'backgroundPosition': 'center',
                    'backgroundRepeat': 'no-repeat'
                  }}
                />
              </Grid>
            </Grid>

            {detail &&
            <Grid
              item
              sm={6}
              xs={12} >

              <div className={`${classes.formGroup} search_form_wrapper`}>
                <Grid container>

                  <InputLabel className={classes.label}>
                    <strong>
                      {'Job History'}
                    </strong>
                  </InputLabel>
                  <div className={classes.historyContainer}>
                    {
                      loading ? <BCCircularLoader />
                        : employeesForJob.length !== 0 && job.track &&
                        <BCTableContainer
                          className={classes.tableContainer}
                          columns={columns}
                          initialMsg={'No history yet'}
                          isDefault
                          isLoading={loading}
                          onRowClick={() => { }}
                          pageSize={job.track.length}
                          pagination={false}
                          stickyHeader
                          tableData={job.track}
                        />
                    }
                  </div>
                </Grid>
              </div>
            </Grid>
            }
          </Grid>


        </DialogContent>

        <Grid
          alignItems={'center'}
          container
          justify={'space-between'} >
          <Grid
            className={classes.noteContainer}
            item
            sm={5}>
            {!detail && <Typography
              style={{ 'color': '#888f99' }}
              variant={'body2'}>
              <i>
                {`( Note: Some fields cannot be changed because they were selected in the service ticket. To change these, edit the service ticket.)`}
              </i>
            </Typography>}
          </Grid>
          <Grid
            item
            sm={7}>
            <DialogActions classes={{
              'root': classes.dialogActions
            }}>
              {
                !detail
                  ? <>
                    <Fab
                      aria-label={'create-job'}
                      classes={{
                        'root': classes.fabRoot
                      }}
                      color={'secondary'}
                      disabled={isSubmitting}
                      onClick={() => closeModal()}
                      variant={'extended'}>
                      {'Close'}
                    </Fab>
                    {
                      job._id &&
                        <>
                          <Fab
                            aria-label={'create-job'}
                            classes={{
                              'root': classes.deleteButton
                            }}
                            /*
                             * Classes={{
                             *   'root': classes.fabRoot
                             * }}
                             */
                            disabled={isSubmitting}
                            onClick={() => openCancelJobModal(job, true)}
                            style={{
                            }}
                            variant={'extended'}>
                            {'Cancel Job'}
                          </Fab>
                          <Fab
                            aria-label={'create-job'}
                            classes={{
                              'root': classes.deleteButton
                            }}
                            disabled={isSubmitting}
                            /*
                             * Classes={{
                             *   'root': classes.fabRoot
                             * }}
                             */
                            onClick={() => openCancelJobModal(job, false)}
                            style={{
                            }}
                            variant={'extended'}>
                            {'Cancel Job and Service Ticket'}
                          </Fab>
                        </>
                    }
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
                        ? 'Update'
                        : 'Submit'}
                    </Fab>
                  </>
                  : <Fab
                    aria-label={'create-job'}
                    classes={{
                      'root': classes.fabRoot
                    }}
                    color={'primary'}
                    onClick={() => closeModal()}
                    variant={'extended'}>
                    {'Close'}
                  </Fab>
              }
            </DialogActions>
          </Grid>
        </Grid>
      </form>

    </DataContainer >
  );
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
