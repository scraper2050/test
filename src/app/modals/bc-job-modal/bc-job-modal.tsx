import * as yup from 'yup';
import BCDateTimePicker from 'app/components/bc-date-time-picker/bc-date-time-picker';
import BCInput from 'app/components/bc-input/bc-input';
import { getInventory } from 'actions/inventory/inventory.action';
import { refreshJobs } from 'actions/job/job.action';
import {
  refreshServiceTickets,
  setOpenServiceTicket,
  setOpenServiceTicketLoading,
} from 'actions/service-ticket/service-ticket.action';
import styles from './bc-job-modal.styles';
import { useFormik } from 'formik';
import {
  Button,
  Chip,
  DialogActions,
  Grid, IconButton,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  callCreateJobAPI,
  callEditJobAPI,
  getAllJobTypesAPI,
} from 'api/job.api';
import { callEditTicketAPI } from 'api/service-tickets.api';
import {
  closeModalAction,
  openModalAction,
  setModalDataAction,
} from 'actions/bc-modal/bc-modal.action';
import { useDispatch, useSelector } from 'react-redux';
import {
  convertMilitaryTime,
  formatDate,
  formatISOToDateString,
  formatToMilitaryTime,
} from 'helpers/format';
import styled from 'styled-components';
import { getEmployeesForJobAction } from 'actions/employees-for-job/employees-for-job.action';
import { getVendors } from 'actions/vendor/vendor.action';
import { markNotificationAsRead } from 'actions/notifications/notifications.action';
import {
  clearJobSiteStore,
  getJobSites,
} from 'actions/job-site/job-site.action';
import {
  getJobLocationsAction,
  setJobLocations,
} from 'actions/job-location/job-location.action';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import { getOpenServiceTickets } from 'api/service-tickets.api';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  error,
  success,
} from 'actions/snackbar/snackbar.action';
import { getContacts } from 'api/contacts.api';
import { modalTypes } from '../../../constants';
import { useHistory } from 'react-router-dom';
import { stringSortCaseInsensitive } from '../../../helpers/sort';
import moment from 'moment';
import BCDragAndDrop from "../../components/bc-drag-drop/bc-drag-drop";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const initialTask = {
  employeeType: 0,
  contractorId: '',
  contractor: null,
  technicianId: '',
  employee: null,
  jobTypes: [],
}

const initialJobState = {
  customer: {
    _id: '',
  },
  description: '',
  employeeType: false,
  equipment: {
    _id: '',
  },
  dueDate: '',
  scheduleDate: null,
  scheduledEndTime: null,
  scheduledStartTime: null,
  technician: {
    _id: '',
  },
  contractor: {
    _id: '',
  },
  ticket: {
    _id: '',
  },
  type: {
    _id: '',
  },
  jobLocation: {
    _id: '',
  },
  jobSite: {
    _id: '',
  },
  jobRescheduled: false,
  tasks: [initialTask],
};


/**
 * Helper function to get job data from jobTypes
 */
const getJobData = (ids: any, jobTypes: any) => {
  if (!ids) {
    return;
  }
  return jobTypes.filter((job: any) => ids.includes(job._id));
};

/**
 * Helper function to get job tasks
 */
const getJobTasks = (job: any, jobTypes: any) => {
  if (job._id) {

  } else {
    return [{
      employeeType: 0,
      contractorId: '',
      contractor: null,
      technicianId: '',
      employee: null,
      jobTypes: getJobData(job.ticket.tasks.map((task: any) => task.jobType), jobTypes),
    }]
  }
};



function BCJobModal({
  classes,
  job = initialJobState,
  detail = false,
}: any): JSX.Element {
  const dispatch = useDispatch();
  const [thumbs, setThumbs] = useState<any[]>([]);
  // Selected variable with useSelector from the store
  const equipments = useSelector(({ inventory }: any) => inventory.data);
  const { loading, data } = useSelector(
    ({ employeesForJob }: any) => employeesForJob
  );
  const vendorsList = useSelector(({ vendors }: any) =>
    vendors.data.filter((vendor: any) => vendor.status <= 1)
  );
  const jobTypes = useSelector(({ jobTypes }: any) => jobTypes.data);
  const jobLocations = useSelector((state: any) => state.jobLocations.data);
  const isLoading = useSelector((state: any) => state.jobLocations.loading);
  const jobSites = useSelector((state: any) => state.jobSites.data);
  const { contacts } = useSelector((state: any) => state.contacts);
  const openServiceTicketFilter = useSelector(
    (state: any) => state.serviceTicket.filterTicketState
  );

  const employeesForJob = useMemo(() => [...data], [data]);

  // componenet usestate variables
  const [scheduledEndTimeMsg, setScheduledEndTimeMsg] = useState('');
  const [startTimeLabelState, setStartTimeLabelState] = useState(false);
  const [endTimeLabelState, setEndTimeLabelState] = useState(false);
  const [jobLocationValue, setJobLocationValue] = useState<any>([]);
  const [jobSiteValue, setJobSiteValue] = useState<any>([]);
  const [employeeValue, setEmployeeValue] = useState<any>(null);
  const [contractorValue, setContractorValue] = useState<any>(null);
  const [jobTypeValue, setJobTypeValue] = useState<any>([]);
  const [contactValue, setContactValue] = useState<any>([]);
  const [dateErr, setDateErr] = useState('Requires recent date');

  // ----------
  const history = useHistory();
  const jobTypesInput = useRef<HTMLInputElement>(null);

  const { ticket = {} } = job;
  const { customer = {} } = ticket;

  const { profile: { displayName = '' } = {} } = customer;

  const employeeTypes = [
    {_id: 0, name: 'Employee',},
    {_id: 1, name: 'Contractor'},
  ];

  /**
   * Handle employee type change field
   */
  const handleTaskChange = (fieldName: string, data: any, index: number) => {
    console.log({index})
    const tasks = [...FormikValues.tasks];
    switch (fieldName) {
      case 'employeeType':
        const _id = data ? data._id : 0;
        tasks[index].employeeType = _id;
        tasks[index].contractorId = '';
        tasks[index].contractor = null;
        tasks[index].technicianId = '';
        tasks[index].employee = null;
        break;
      case 'contractorId':
        tasks[index].contractorId = data._id;
        tasks[index].contractor = data;
        break;
      case 'technicianId':
        tasks[index].technicianId = data._id;
        tasks[index].employee = data;
        break;
      case 'jobTypes':
        tasks[index].jobTypes = data;
    }
    console.log({tasks});
    setFieldValue('tasks', tasks);
  };

  /**
   * Handle role field change
   */
  const handleSelectChange = (
    fieldName: string,
    newValue: string,
    setState?: any
  ) => {
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

  /**
   * Handle close job modal
   */
  const openCancelJobModal = async (job: any, jobOnly?: boolean) => {
    dispatch(
      setModalDataAction({
        data: {
          job: job,
          jobOnly,
          modalTitle: `Cancel Job`,
          removeFooter: false,
        },
        type: modalTypes.CANCEL_JOB_MODAL,
      })
    );
  };

  /**
   * Handle job site changes field
   */
  const handleJobSiteChange = (
    event: any,
    fieldName: any,
    setFieldValue: any,
    newValue: any
  ) => {
    const jobSiteId = newValue ? newValue._id : '';
    setFieldValue(fieldName, jobSiteId);
    setJobSiteValue(newValue);
  };

  /**
   * Handle Location field change
   */
  const handleLocationChange = async (
    event: any,
    fieldName: any,
    setFieldValue: any,
    getFieldMeta: any,
    newValue: any
  ) => {
    const locationId = newValue ? newValue._id : '';

    const customerId = job.ticket.customer?._id
      ? job.ticket.customer?._id
      : job.customer?._id;

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
  };

  /**
   * Handle date fields change
   */
  const dateChangeHandler = (date: string, fieldName: string) => {
    setFieldValue(fieldName, date);
  };

  /**
   * Format the request object
   */
  const formatRequestObj = (rawReqObj: any) => {
    for (const key in rawReqObj) {
      //check for property with empty string  or null as value
      if (rawReqObj[key] === '' || rawReqObj[key] === null) {
        delete rawReqObj[key];
      }
    }
    return rawReqObj;
  };

  useEffect(() => {
    const customerId =
      job.ticket.customer?._id !== undefined
        ? job.ticket.customer?._id
        : job.ticket.customer;
    dispatch(getInventory());
    dispatch(getEmployeesForJobAction());
    dispatch(getVendors());
    dispatch(getAllJobTypesAPI());
    dispatch(getJobLocationsAction({customerId: customerId}));

    const data: any = {
      type: 'Customer',
      referenceNumber: customerId,
    };
    dispatch(getContacts(data));
  }, []);

  useEffect(() => {
    if (job._id && !employeeValue) {
      if (employeesForJob.length !== 0 && !job.employeeType && job.technician) {
        setEmployeeValue(
          employeesForJob.filter(
            (employee: any) => employee._id === job.technician._id
          )[0]
        );
      }
    }
  }, [employeesForJob]);

  useEffect(() => {
    if (job._id && !contractorValue) {
      if (vendorsList.length !== 0 && job.employeeType && job.contractor) {
        setContractorValue(
          vendorsList.filter(
            (vendor: any) => vendor.contractor._id === job.contractor._id
          )[0]
        );
      }
    }
  }, [vendorsList]);

  useEffect(() => {
    const tasks = getJobTasks(job, jobTypes);
    setFieldValue('tasks', tasks);
  }, [jobTypes]);

  useEffect(() => {
    if (ticket.customer || ticket.customer._id) {
      const jobLocation = jobLocations.filter(
        (jobLocation: any) => jobLocation._id === (ticket.jobLocation ||  job.jobLocation?._id)
      )[0];

      if (jobLocation) {
        setJobLocationValue(jobLocation);
        if (jobLocation.isActive) {
          dispatch(
            getJobSites({
              customerId: ticket.customer._id || ticket.customer,
              locationId: jobLocation._id,
            })
          );
        }
        const activeJobLocations = jobLocations.filter((location: any) => location.isActive || location._id === jobLocation._id);
        if (activeJobLocations.length !== jobLocations.length) dispatch(setJobLocations(activeJobLocations)) ;
      }
    }
  }, [jobLocations]);

  useEffect(() => {
    if (ticket.customer?._id !== '') {
      if (jobSites.length !== 0) {
        if (ticket.jobSite) {
          setJobSiteValue(
            jobSites.filter((jobSite: any) => jobSite._id === ticket.jobSite)[0]
          );
        } else if (job.jobSite) {
          setJobSiteValue(
            jobSites.filter(
              (jobSite: any) => jobSite._id === job.jobSite._id
            )[0]
          );
        }
      }
    }
  }, [jobSites]);

  useEffect(() => {
    if (ticket.customer?._id !== '') {
      if (contacts.length !== 0) {
        setContactValue(
          contacts.find((contact: any) =>
            [
              job?.customerContactId?._id,
              ticket?.customerContactId?._id,
              ticket?.customerContactId,
              ticket?.customer,
            ].includes(contact._id)
          )
        );
      }
    }
  }, [contacts]);

  useEffect(() => {
    if (job?.jobRescheduled) {
      dispatch(
        markNotificationAsRead.fetch({ id: job?.jobRescheduled, isRead: true })
      );
    }
  }, [job?.jobRescheduled]);

  const addEmptyTask =() => {
    const tasks = [...FormikValues.tasks];
    tasks.push({...initialTask});
    console.log({tasks})
    setFieldValue('tasks', tasks);
  }

  const removeTask = (index: number) => {
    const tasks = [...FormikValues.tasks];
    tasks.splice(index, 1);
    setFieldValue('tasks', tasks);
  }

  /**
   * Handle schedule time validation
   */
  const isValidate = (requestObj: any) => {
    let validateFlag = true;
    if (
      requestObj.scheduledStartTime === null &&
      requestObj.scheduledEndTime !== null
    ) {
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
    } */ else {
      setScheduledEndTimeMsg('');
      setStartTimeLabelState(false);
      setEndTimeLabelState(false);
      validateFlag = true;
    }
    return validateFlag;
  };

  /**
   * Format schedule time handler
   */
  const formatSchedulingTime = (time: string) => {
    const timeAr = time.split('T');
    const timeWithSeconds = timeAr[1].substr(0, 5);
    const hours = timeWithSeconds.substr(0, 2);
    const minutes = timeWithSeconds.substr(3, 5);

    return { hours, minutes };
  };

  // validation schema object
  const schemaCheck = yup.object().shape({
    // customerId: yup.string(),
    // description: yup.string(),
    employeeType: yup.mixed().required('Please this field is required'),
    // equipmentId: yup.mixed(),
    jobTypes: yup.array().min(1, 'Select at least one (1) job'),
    // dueDate: yup.string(),
    scheduleDate: yup
      .mixed()
      .transform((value, originalValue): any => {
        if (value !== null) {
          const selectedDate = moment(new Date(originalValue)).format('LL');
          const todaysDate = moment(new Date()).format('LL');

          const diff: number = +new Date(selectedDate) - +new Date(todaysDate);

          return Math.round(diff);
        }

        return value;
      })
      .test(
        'validate-date',
        'Past date can not be selected',
        (value): boolean => {
          if (value !== null) {
            return value >= 0;
          }

          return value === null;
        }
      )
      .nullable(),
    // scheduledStartTime: yup.string().nullable(),
    // scheduledEndTime: yup.string().nullable(),
    // technicianId: yup.string().required(),
    // contractorId: yup.string().required(),
    // ticketId: yup.mixed(),
    // jobLocationId: yup.mixed(),
    // jobSiteId: yup.mixed(),
    // customerContactId: yup.mixed(),
    // customerPO: yup.mixed(),
    // image: yup.mixed(),
  });

  const jobValue = JSON.parse(JSON.stringify(job));

  /**
   * Formik form configuration
   */
  const form = useFormik({
    initialValues: {
      customerId: jobValue.customer?._id,
      description: jobValue.description || ticket.note,
      employeeType: !jobValue.employeeType ? 0 : 1,
      equipmentId:
        jobValue.equipment && jobValue.equipment._id
          ? jobValue.equipment._id
          : '',
      jobTypes: [],
      tasks: [{...initialTask}],
      dueDate: jobValue.ticket.dueDate
        ? formatDate(jobValue.ticket.dueDate)
        : '',
      scheduleDate: jobValue.scheduleDate,
      scheduledStartTime: jobValue?.scheduledStartTime
        ? formatISOToDateString(jobValue.scheduledStartTime)
        : null,
      scheduledEndTime: jobValue.scheduledEndTime
        ? formatISOToDateString(jobValue.scheduledEndTime)
        : null,
      technicianId: jobValue.technician ? jobValue.technician._id : '',
      contractorId: jobValue.contractor ? jobValue.contractor._id : '',
      ticketId: jobValue.ticket._id,
      jobLocationId: jobValue.jobLocation
        ? jobValue.jobLocation._id
        : jobValue.ticket.jobLocation
        ? jobValue.ticket.jobLocation
        : '',
      jobSiteId: jobValue.jobSite
        ? jobValue.jobSite._id
        : jobValue.ticket.jobSite
        ? jobValue.ticket.jobSite
        : '',
      //'customerContactId': ticket.customerContactId !== undefined ? ticket.customerContactId : '',
      customerContactId: jobValue.customerContactId
        ? jobValue.customerContactId._id
        : ticket.customerContactId || '',
      customerPO: jobValue.customerPO || ticket.customerPO,
      images: jobValue.images !== undefined ? jobValue.images : ticket.images,
    },
    validateOnMount: false,
    //validationSchema: schemaCheck,
    onSubmit: (values: any, { setSubmitting }: any) => {
      // if (new Date(`${values.scheduleDate}`) < new Date()) {
      //   dispatch(error('Past date can not be selected'));
      //   setSubmitting(false)
      //   return;
      // }
      console.log({values});
      return;

      setSubmitting(true);

      const customerId = customer?._id;
      const jobFromMapFilter = job.jobFromMap;

      const { image, customerPO, customerContactId } = values;
      const { note, _id } = ticket;

      const tempJobValues = { ...values };
      delete tempJobValues.customerContactId;
      delete tempJobValues.customerPO;
      // delete tempJobValues.image;

      const tempTicket = {
        ticketId: _id,
        note: note === undefined ? 'Job Created' : note,
        image,
        customerPO,
        customerContactId,
      };

      const formatedTicketRequest = formatRequestObj(tempTicket);

      const tempData = {
        //...job,
        ...values,
        customerId,
      };

      delete tempData.contractor;
      delete tempData.technician;

      if (
        values.employeeType &&
        values.contractorId &&
        values.contractorId !== ''
      ) {
        delete tempData.technicianId;
        tempData.employeeType = 1;
        tempData.contractorId = values.contractorId;
      }

      if (
        !values.employeeType &&
        values.technicianId &&
        values.technicianId !== ''
      ) {
        delete tempData.contractorId;
        tempData.technicianId = values.technicianId;
        tempData.employeeType = 0;
      }
      //setSubmitting(false);
      //return;

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

        if (
          requestObj.scheduledStartTime &&
          requestObj.scheduledStartTime !== null
        ) {
          requestObj.scheduledStartTime = formatToMilitaryTime(
            requestObj.scheduledStartTime
          );
        } else {
          requestObj.scheduledStartTime = '';
        }

        if (
          requestObj.scheduledEndTime &&
          requestObj.scheduledEndTime !== null
        ) {
          requestObj.scheduledEndTime = formatToMilitaryTime(
            requestObj.scheduledEndTime
          );
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
        }

        request(requestObj)
          .then(async (response: any) => {
            if (response.status === 0) {
              dispatch(error(response.message));
              return;
            }
            /*if (response.message === 'Job created successfully.' || response.message === 'Job edited successfully.') {
              await callEditTicketAPI(formatedTicketRequest);
            }*/
            await dispatch(refreshServiceTickets(true));
            await dispatch(refreshJobs(true));
            dispatch(closeModalAction());
            dispatch(setOpenServiceTicketLoading(false));

            // Executed only when job is created from Map View.
            if (jobFromMapFilter) {
              dispatch(setOpenServiceTicketLoading(true));
              getOpenServiceTickets({
                ...openServiceTicketFilter,
                pageNo: 1,
                pageSize: 4,
              })
                .then((response: any) => {
                  dispatch(setOpenServiceTicketLoading(false));
                  dispatch(setOpenServiceTicket(response));
                  dispatch(refreshServiceTickets(true));
                  dispatch(closeModalAction());
                  setTimeout(() => {
                    dispatch(
                      setModalDataAction({
                        data: {},
                        type: '',
                      })
                    );
                  }, 200);
                })
                .catch((err: any) => {
                  throw err;
                });
            }
            setTimeout(() => {
              dispatch(
                setModalDataAction({
                  data: {},
                  type: '',
                })
              );
            }, 200);

            if (
              response.message === 'Job created successfully.' ||
              response.message === 'Job edited successfully.'
            ) {
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
    // validate: (values: any) => {
    //   const errors: any = {};

    //   schemaCheck
    //     .validate(values)
    //     .then((res) => {
    //       const selectedDate = moment(new Date(values.scheduleDate));
    //       const todaysDate = moment(new Date());

    //       if (
    //         values.scheduleDate !== null &&
    //         selectedDate.diff(todaysDate, 'days') < 0
    //       ) {
    //         errors.scheduleDate = 'Past date can not be selected';
    //         return errors;
    //         // dispatch(error('Past date can not be selected'));
    //       }
    //     })
    //     .catch((err) => {
    //       const field = err.path;
    //       errors[field] = err.message;
    //       return errors;
    //     });

    // if (values.jobTypes.length === 0 && jobTypeValue.length === 0) {
    //   errors.jobTypes = 'Select at least one (1) job';
    //   if (jobTypesInput.current !== null) {
    //     jobTypesInput.current.setCustomValidity(
    //       'Select at least one (1) job'
    //     );
    //   }
    // } else {
    //   if (jobTypesInput.current !== null) {
    //     jobTypesInput.current.setCustomValidity('');
    //   }
    // }

    // const selectedDate = moment(new Date(values.scheduleDate));
    // const todaysDate = moment(new Date());

    // if (
    //   values.scheduleDate !== null &&
    //   selectedDate.diff(todaysDate, 'days') < 0
    // ) {
    //   errors.scheduleDate = 'Past date can not be selected';
    //   dispatch(error('Past date can not be selected'));
    // }
    // },
  });

  const {
    errors: FormikErrors,
    values: FormikValues,
    handleChange: formikChange,
    handleSubmit: FormikSubmit,
    setFieldValue,
    getFieldMeta,
    isSubmitting,
  } = form;

  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(
        setModalDataAction({
          data: {},
          type: '',
        })
      );
    }, 200);
  };

  const disabledChips = job?._id
    ? job.tasks.length
      ? job.tasks.map(({ jobType }: any) => jobType._id)
      : [job.type._id]
    : [];

  const goToJobs = () => {
    closeModal();
    history.push('/main/customers/schedule');
  };

  useEffect(() => {
    if (FormikValues.images) {
      const images: any[] = [];
      const prs: any[] = [];

      FormikValues.images.forEach((image: any) => {
        if (image.imageUrl) {
          images.push(image.imageUrl);
        } else {
          if (image.type.match('image.*')) prs.push(readImage(image))
        }
      });
      setThumbs(images);
      if (prs.length) {
        Promise.all(prs).then(images => {
          const temp = [...thumbs];
          temp.push(...images);
          setThumbs(temp);
        });
      }
    }
  }, [FormikValues.images]);

  const readImage = (image: File) => {
    return new Promise(function(resolve,reject){
      let fr = new FileReader();

      fr.onload = function(){
        resolve(fr.result);
      };

      fr.onerror = function(){
        reject(fr);
      };

      fr.readAsDataURL(image);
    });
  }

  if (isLoading) {
    return <BCCircularLoader />;
  }

  return (
    <DataContainer className={'new-modal-design'}>
      <form onSubmit={FormikSubmit}>
        <Grid container className={'modalPreview'} justify={'space-between'} spacing={4}>
          <Grid item xs={3}>
            <Typography variant={'caption'} className={'previewCaption'}>customer</Typography>
            <Typography variant={'h6'} className={'previewText'}>{job.customer.profile
              ? job.customer.profile.displayName
              : displayName}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant={'caption'} className={'previewCaption'}>due date</Typography>
            <Typography variant={'h6'} className={'previewText'}>{FormikValues.dueDate}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant={'caption'} className={'required previewCaption'}>schedule date</Typography>
            <BCDateTimePicker
              disablePast={true}
              handleChange={(e: any) =>
                dateChangeHandler(e, 'scheduleDate')
              }
              name={'scheduleDate'}
              minDateMessage={form.errors.scheduleDate}
              value={FormikValues.scheduleDate}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant={'caption'} className={'previewCaption'}>open time</Typography>
            <BCDateTimePicker
              dateFormat={'HH:mm:ss'}
              disablePast={!job._id}
              handleChange={(e: any) =>
                dateChangeHandler(e, 'scheduledStartTime')
              }
              name={'scheduledStartTime'}
              pickerType={'time'}
              placeholder={'Start Time'}
              minDateMessage={form?.errors?.scheduledStartTime || ''}
              value={FormikValues.scheduledStartTime}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant={'caption'} className={'previewCaption'}>close time</Typography>
            <BCDateTimePicker
              dateFormat={'HH:mm:ss'}
              disablePast={!job._id}
              handleChange={(e: any) =>
                dateChangeHandler(e, 'scheduledEndTime')
              }
              name={'scheduledEndTime'}
              pickerType={'time'}
              minDateMessage={form?.errors?.scheduledEndTime || ''}
              placeholder={'End Time'}
              value={FormikValues.scheduledEndTime}
            />
          </Grid>
        </Grid>

        {FormikValues.tasks.map((task: any, index) =>
          <Grid container className={`modalContent ${classes.relative}`} justify={'space-between'} spacing={4}>
            <Grid item xs>
              <Typography variant={'caption'} className={' required previewCaption'}>technician type</Typography>
              <Autocomplete
                defaultValue={employeeTypes[task.employeeType]}
                getOptionLabel={(option) =>
                  option.name ? option.name : ''
                }
                id={'tags-standard'}
                onChange={(ev: any, newValue: any) =>
                  handleTaskChange('employeeType', newValue, index)
                }
                options={employeeTypes}
                renderInput={(params) => (
                  <TextField
                    error={
                      form.touched.employeeType &&
                      Boolean(form.errors.employeeType)
                    }
                    helperText={
                      form.touched.employeeType &&
                      form.errors.employeeType
                    }
                    required
                    {...params}
                    variant={'outlined'}
                  />
                )}
              />
            </Grid>
            <Grid item xs>
              <Typography variant={'caption'} className={' required previewCaption'}>{task.employeeType ? 'contractor' : 'technician'}</Typography>
              {task.employeeType ?
                <Autocomplete
                  className={detail ? 'detail-only' : ''}
                  // DefaultValue={job._id && job.employeeType ? vendorsList.filter((vendor: any) => vendor.contrator._id === job.contractor._id) : null}
                  disabled={detail}
                  getOptionLabel={(option) =>
                    option?.contractor?.info?.companyName
                      ? option.contractor.info.companyName
                      : ''
                  }
                  id={'tags-standard'}
                  onChange={(ev: any, newValue: any) => handleTaskChange('contractorId', newValue, index)}
                  options={
                    vendorsList && vendorsList.length !== 0
                      ? vendorsList.sort((a: any, b: any) =>
                        a.contractor.info.companyName >
                        b.contractor.info.companyName
                          ? 1
                          : b.contractor.info.companyName >
                          a.contractor.info.companyName
                            ? -1
                            : 0
                      )
                      : []
                  }
                  renderInput={(params) => (
                    <TextField
                      error={
                        form.touched.contractorId &&
                        Boolean(form.errors.contractorId)
                      }
                      helperText={
                        form.touched.contractorId &&
                        form.errors.contractorId
                      }
                      required
                      {...params}
                      variant={'outlined'}
                    />
                  )}
                  value={task.contractor}
                />
                :
                <Autocomplete
                  getOptionLabel={(option) =>
                    option.profile ? option.profile.displayName : ''
                  }
                  id={'tags-standard'} // Options={employeesForJob && employeesForJob.length !== 0 ? (employeesForJob.sort((a: any, b: any) => (a.profile.displayName > b.profile.displayName) ? 1 : ((b.profile.displayName > a.profile.displayName) ? -1 : 0))) : []}
                  onChange={(ev: any, newValue: any) => handleTaskChange('technicianId', newValue, index)}
                  options={
                    employeesForJob && employeesForJob.length !== 0
                      ? employeesForJob.sort((a: any, b: any) =>
                        a.profile.displayName > b.profile.displayName
                          ? 1
                          : b.profile.displayName > a.profile.displayName
                            ? -1
                            : 0
                      )
                      : []
                  }
                  renderInput={(params) => (
                    <TextField
                      error={
                        form.touched.technicianId &&
                        Boolean(form.errors.technicianId)
                      }
                      helperText={
                        form.touched.technicianId &&
                        form.errors.technicianId
                      }
                      {...params}
                      required
                      variant={'outlined'}
                    />
                  )}
                  value={task.employee}
                />
              }
            </Grid>
            <Grid item xs>
              <Typography variant={'caption'} className={' required previewCaption'}>job type</Typography>
              <Autocomplete
                // getOptionDisabled={option => job._id ? disabledChips.includes(option._id) : null}
                getOptionLabel={(option) => {
                  const { title, description } = option;
                  return `${title}`;
                }}
                id={'tags-standard'}
                multiple
                onChange={(ev: any, newValue: any) => handleTaskChange('jobTypes', newValue, index)}
                options={
                  jobTypes && jobTypes.length !== 0
                    ? stringSortCaseInsensitive(jobTypes, 'title')
                    : []
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={
                      form.touched.jobTypes &&
                      Boolean(form.errors.jobTypes)
                    }
                    helperText={
                      form.touched.jobTypes && form.errors.jobTypes
                    }
                    variant={'outlined'}
                    //inputRef={jobTypesInput}
                    required={!task.jobTypes.length}
                    // error= {!!FormikErrors.jobTypes}
                    // helperText={FormikErrors.jobTypes}
                  />
                )}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => {
                    return (
                      <Chip
                        label={`${option.title}`}
                        {...getTagProps({ index })}
                        // disabled={disabledChips.includes(option._id) || !job._id}
                      />
                    );
                  })
                }
                value={task.jobTypes}
              />
            </Grid>
            {index > 0 &&
            <IconButton className={classes.removeJobTypeButton}
                        component="span"
                        onClick={() => removeTask(index)}
            >
              <RemoveCircleIcon/>
            </IconButton>
            }
          </Grid>
        )}
        <Grid container className={'modalContent'} justify={'space-between'} spacing={4}>
          <Grid item xs>
            <Button
              color={'primary'}
              classes={{root: classes.addJobTypeButton}}
              variant={'outlined'}
              onClick={addEmptyTask}
              startIcon={<AddCircleIcon />}
            >Add Technician</Button>

          </Grid>
        </Grid>
        <Grid container className={'modalContent'} justify={'space-between'} spacing={4}>
          <Grid item xs>
            <Typography variant={'caption'} className={' previewCaption'}>job location</Typography>
            <Autocomplete
              defaultValue={
                ticket.jobLocation !== '' &&
                jobLocations.length !== 0 &&
                jobLocations.filter(
                  (jobLocation: any) =>
                    jobLocation._id === ticket.jobLocation
                )[0]
              }
              disabled={ticket.jobLocation}
              getOptionLabel={(option) =>
                option.name ? option.name : ''
              }
              getOptionDisabled={(option) => !option.isActive}
              id={'tags-standard'}
              onChange={(ev: any, newValue: any) =>
                handleLocationChange(
                  ev,
                  'jobLocationId',
                  setFieldValue,
                  getFieldMeta,
                  newValue
                )
              }
              options={
                jobLocations && jobLocations.length !== 0
                  ? jobLocations.sort((a: any, b: any) =>
                    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                  )
                  : []
              }
              renderInput={(params) => (
                <TextField
                  error={
                    form.touched.jobLocationId &&
                    Boolean(form.errors.jobLocationId)
                  }
                  helperText={
                    form.touched.jobLocationId &&
                    form.errors.jobLocationId
                  }
                  {...params}
                  variant={'outlined'}
                />
              )}
              value={jobLocationValue}
            />
          </Grid>
          <Grid item xs>
            <Typography variant={'caption'} className={' previewCaption'}>job site</Typography>
            <Autocomplete
              defaultValue={
                ticket.jobSite !== '' &&
                jobSites.length !== 0 &&
                jobSites.filter(
                  (jobSite: any) => jobSite._id === ticket.jobSite
                )[0]
              }
              disabled={
                ticket.jobSite ||
                FormikValues.jobLocationId === '' ||
                detail
              }
              getOptionLabel={(option) =>
                option.name ? option.name : ''
              }
              id={'tags-standard'}
              onChange={(ev: any, newValue: any) =>
                handleJobSiteChange(
                  ev,
                  'jobSiteId',
                  setFieldValue,
                  newValue
                )
              }
              options={
                jobSites && jobSites.length !== 0
                  ? jobSites.sort((a: any, b: any) =>
                    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                  )
                  : []
              }
              renderInput={(params) => (
                <TextField
                  error={
                    form.touched.jobSiteId &&
                    Boolean(form.errors.jobSiteId)
                  }
                  helperText={
                    form.touched.jobSiteId && form.errors.jobSiteId
                  }
                  {...params}
                  variant={'outlined'}
                />
              )}
              value={jobSiteValue}
            />
          </Grid>
          <Grid item xs>
            <Typography variant={'caption'} className={'previewCaption'}>equipment</Typography>
            <Autocomplete
              className={detail ? 'detail-only' : ''}
              disabled={detail}
              getOptionLabel={(option) =>
                option.company ? option.company : ''
              }
              id={'tags-standard'}
              onChange={(ev: any, newValue: any) =>
                handleSelectChange('equipmentId', newValue?._id)
              }
              options={
                equipments && equipments.length !== 0
                  ? equipments.sort((a: any, b: any) =>
                    a.company > b.company
                      ? 1
                      : b.company > a.company
                        ? -1
                        : 0
                  )
                  : []
              }
              renderInput={(params) => (
                <TextField
                  error={
                    form.touched.equipmentId &&
                    Boolean(form.errors.equipmentId)
                  }
                  helperText={
                    form.touched.equipmentId && form.errors.equipmentId
                  }
                  {...params}
                  variant={'outlined'}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container className={'modalContent'} justify={'space-between'} spacing={4}>
          <Grid container xs={8} spacing={4}>
            <Grid container xs={12} spacing={4}>
              <Grid item xs>
                <Typography variant={'caption'} className={'previewCaption'}>contact associated</Typography>
                <Autocomplete
                  getOptionLabel={(option) =>
                    option.name ? option.name : ''
                  }
                  id={'tags-standard'}
                  onChange={(ev: any, newValue: any) =>
                    handleSelectChange(
                      'customerContactId',
                      newValue?._id,
                      setContactValue(newValue)
                    )
                  }
                  options={
                    contacts && contacts.length !== 0
                      ? contacts.sort((a: any, b: any) =>
                        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                      )
                      : []
                  }
                  renderInput={(params) => (
                    <TextField
                      error={
                        form.touched.customerContactId &&
                        Boolean(form.errors.customerContactId)
                      }
                      helperText={
                        form.touched.customerContactId &&
                        form.errors.customerContactId
                      }
                      {...params}
                      variant={'outlined'}
                    />
                  )}
                  value={contactValue}
                />
              </Grid>
              <Grid item xs>
                <Typography variant={'caption'} className={'previewCaption'}>customer po</Typography>
                <BCInput
                  className={'serviceTicketLabel'}
                  disabled={ticket.customerPO}
                  handleChange={formikChange}
                  name={'customerPO'}
                  placeholder={'Customer PO / Sales Order #'}
                  value={FormikValues.customerPO}
                  error={
                    form.touched.customerPO && Boolean(form.errors.customerPO)
                  }
                  helperText={
                    form.touched.customerPO && form.errors.customerPO
                  }
                />
              </Grid>
            </Grid>
            <Grid container xs={12}>
              <Grid item xs>
                <Typography variant={'caption'} className={'previewCaption'}>description</Typography>
                <BCInput
                  handleChange={formikChange}
                  multiline
                  name={'description'}
                  value={FormikValues.description}
                  error={
                    form.touched.description &&
                    Boolean(form.errors.description)
                  }
                  helperText={
                    form.touched.description && form.errors.description
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={4} style={{paddingTop: 16}}>
            <BCDragAndDrop images={thumbs} onDrop={(files) => setFieldValue('images', Array.from(files))} />
          </Grid>
        </Grid>

        <DialogActions>
          <Button
            disabled={isSubmitting}
            onClick={() => closeModal()}
            variant={'outlined'}
          >Close</Button>
          {job._id &&
            <>
              <Button
                color={'secondary'}
                disabled={isSubmitting}
                onClick={() => openCancelJobModal(job, true)}
                style={{}}
                variant={'contained'}
              >Cancel Job</Button>
              <Button
                color={'secondary'}
                disabled={isSubmitting}
                onClick={() => openCancelJobModal(job, false)}
                style={{}}
                variant={'contained'}
              >Cancel Job and Service Ticket</Button>
            </>
          }
          <Button
            color={'primary'}
            disabled={isSubmitting}
            type={'submit'}
            variant={'contained'}
          >{job._id ? 'Update' : 'Submit'}</Button>
        </DialogActions>
      </form>
    </DataContainer>
  );
}

const Label = styled.div`
  color: red;
  font-size: 15px;
`;

const DataContainer = styled.div`
  *:not(.MuiGrid-container) > .MuiGrid-container {
    width: 100%;
    padding: 0px 40px;
  }
  .MuiGrid-spacing-xs-4 > .MuiGrid-spacing-xs-4 {
    margin: 0;
  }
  .MuiGrid-grid-xs-12 {
    margin-top: -16px;
  }
  .MuiGrid-grid-xs-true {
    padding: 10px 16px;
  }
  .MuiOutlinedInput-root {
    border-radius: 8px;
    padding: 2px;
  }

  .MuiOutlinedInput-input {
    padding: 9.5px 4px;
  }

  span.required:after {
    margin-left: 3px;
    content: "*";
    color: red;
  }
`;

export default withStyles(styles, { withTheme: true })(BCJobModal);
