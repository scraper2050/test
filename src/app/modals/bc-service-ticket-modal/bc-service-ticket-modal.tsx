import BCDateTimePicker from 'app/components/bc-date-time-picker/bc-date-time-picker';
import BCInput from 'app/components/bc-input/bc-input';
import React, {useEffect, useRef, useState} from 'react';
import { formatDateYMD } from 'helpers/format';
import { refreshServiceTickets } from 'actions/service-ticket/service-ticket.action';
import styles from './bc-new-service-ticket-modal.styles';
import { useFormik } from 'formik';
import {
  Button,
  Chip,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core';
import moment from 'moment';
import { callCreateTicketAPI, callEditTicketAPI } from 'api/service-tickets.api';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch, useSelector } from 'react-redux';
import { clearJobSiteStore, getJobSites } from 'actions/job-site/job-site.action';
import '../../../scss/new-modals.scss';
import {
  clearJobLocationStore,
  getJobLocationsAction,
  setJobLocations
} from 'actions/job-location/job-location.action';
import styled from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getContacts } from 'api/contacts.api';
import { convertMilitaryTime, formatDate, formatToMilitaryTime } from 'helpers/format';
import {
  error as SnackBarError,
  success
} from 'actions/snackbar/snackbar.action';
import { getEmployeesForJobAction } from 'actions/employees-for-job/employees-for-job.action';
import { modalTypes } from '../../../constants';
import {refreshJobs} from "../../../actions/job/job.action";
import {stringSortCaseInsensitive} from "../../../helpers/sort";
import BCDragAndDrop from "../../components/bc-drag-drop/bc-drag-drop";
import {JobImage} from "../../models/job";


function BCServiceTicketModal({
  classes,
  ticket = {
    'customer': {
      '_id': ''
    },
    'source': 'blueclerk',
    'jobSite': '',
    'jobLocation': '',
    'jobType': '',
    'note': '',
    'updateFlag': '',
    'dueDate': new Date(),
    'customerContactId': '',
    'customerPO': '',
    'images': [],
    'postCode': ''
  },
  error = {
    'status': false,
    'message': ''
  },
  onSubmit,
  detail = false
}: any): JSX.Element {
  const dispatch = useDispatch();
  const [notesLabelState, setNotesLabelState] = useState(false);
  const [jobLocationValue, setJobLocationValue] = useState<any>([]);
  const [contactValue, setContactValue] = useState<any>([]);
  const [jobSiteValue, setJobSiteValue] = useState<any>([]);
  const [isLoadingDatas, setIsLoadingDatas] = useState(false);
  const [thumbs, setThumbs] = useState<any[]>([]);


  const { loading, data } = useSelector(({ employeesForJob }: any) => employeesForJob);
  const employeesForJob = [...data];
  const jobTypesInput = useRef<HTMLInputElement>(null);

  const handleCustomerChange = async (event: any, fieldName: any, setFieldValue: any, newValue: any) => {
    const customerId = newValue ? newValue._id : '';
    await setFieldValue(fieldName, '');
    await setFieldValue('jobLocationId', '');
    await setFieldValue('jobSiteId', '');
    await setFieldValue('customerContactId', '');
    await setJobLocationValue([]);
    await setContactValue([]);
    await setJobSiteValue([]);

    if (customerId !== '') {
      const data: any = {
        'type': 'Customer',
        'referenceNumber': customerId
      };

      await dispatch(getContacts(data));
      await dispatch(getJobLocationsAction({customerId, isActive: true}));
    }

    await setFieldValue(fieldName, customerId);
  };

  const handleContactChange = (event: any, fieldName: any, setFieldValue: any, newValue: any) => {
    const contactId = newValue ? newValue._id : '';
    setFieldValue(fieldName, contactId);
    setContactValue(newValue);
  };

  const handleLocationChange = async (event: any, fieldName: any, setFieldValue: any, getFieldMeta: any, newValue: any) => {
    const locationId = newValue ? newValue._id : '';

    const customerId = getFieldMeta('customerId').value;

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

  const handleJobSiteChange = (event: any, fieldName: any, setFieldValue: any, newValue: any) => {
    const jobSiteId = newValue ? newValue._id : '';
    setFieldValue(fieldName, jobSiteId);
    setJobSiteValue(newValue);
  };

  const handleJobTypeChange = (event: any, setFieldValue: any, newValue: any) => {
    let jobType = '';
    jobType = newValue.map((val:any) => ({ 'jobTypeId': val._id }));
    setFieldValue('jobTypes', jobType);
  };

  const isValidate = (requestObj: any) => {
    let validateFlag = true;
    if (requestObj.note === undefined || requestObj.note === '') {
      setNotesLabelState(true);
      validateFlag = false;
    } else {
      setNotesLabelState(false);
    }
    return validateFlag;
  };

  const formatRequestObj = (rawReqObj: any) => {
    for (const key in rawReqObj) {
      if (rawReqObj[key] === '' || rawReqObj[key] === null) {
        delete rawReqObj[key];
      }
    }
    return rawReqObj;
  };

  const openCancelTicketModal = async (ticket: any) => {
    dispatch(setModalDataAction({
      'data': {
        'ticket': ticket,
        'modalTitle': `Cancel Service Ticket`,
        'removeFooter': false
      },
      'type': modalTypes.CANCEL_SERVICE_TICKET_MODAL
    }));
  };

  useEffect(() => {
    if (!ticket.updateFlag) {
      dispatch(clearJobLocationStore());
      dispatch(clearJobSiteStore());
    }
  }, []);

  const mapTask = (tasks: any) => {
    if (tasks)
      return tasks.map((t: any) => { return ({ jobTypeId: t.jobType }) })
    else
      return '';
  }

  const {
    'values': FormikValues,
    'handleChange': formikChange,
    'handleSubmit': FormikSubmit,
    setFieldValue,
    getFieldMeta,
    isSubmitting
  } = useFormik({
    'initialValues': {
      'customerId': ticket?.customer?._id,
      'source': 'blueclerk',
      'jobSiteId': ticket.jobSite ? ticket.jobSite : '',
      'jobLocationId': ticket.jobLocation ? ticket.jobLocation : '',
      'jobTypes': ticket.tasks ? mapTask(ticket.tasks) : '',
      'note': ticket.note,
      'dueDate': ticket.dueDate,
      'updateFlag': ticket.updateFlag,
      'customerContactId': ticket.customerContactId !== undefined ? ticket.customerContactId : '',
      'customerPO': ticket?.customerPO !== undefined ? ticket?.customerPO : '',
      'images': ticket.images !== undefined ? ticket.images : []
    },
    'onSubmit': (values, { setSubmitting }) => {
      values.jobTypes = JSON.stringify(values.jobTypes);

      const tempData = {
        ...ticket,
        ...values
      };
      const editTicketObj = { ...values,
        'ticketId': '' };
      if (ticket._id) {
        editTicketObj.ticketId = ticket._id;
        // Delete editTicketObj.customerId;
        if (isValidate(editTicketObj)) {
          const formatedRequest = formatRequestObj(editTicketObj);
          if (formatedRequest.dueDate) {
            formatedRequest.dueDate = formatDateYMD(formatedRequest.dueDate);
          }

          callEditTicketAPI(formatedRequest).then((response: any) => {
            if (response.status === 0) {
              dispatch(SnackBarError(response.message));
              setSubmitting(false);
              return;
            }
            dispatch(refreshServiceTickets(true));
            dispatch(refreshJobs(true));
            dispatch(closeModalAction());
            setTimeout(() => {
              dispatch(setModalDataAction({
                'data': {},
                'type': ''
              }));
            }, 200);
            setSubmitting(false);

            if (response.message === 'Ticket updated successfully.') {
              dispatch(success(response.message));

              if (typeof onSubmit == 'function') {
                setTimeout(() => {
                  onSubmit(response);
                }, 500);
              }
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
        delete tempData.customer;
        const formatedRequest = { ...formatRequestObj(tempData) };
        callCreateTicketAPI(formatedRequest).then((response: any) => {
          if (response.status === 0) {
            dispatch(SnackBarError(response.message));
            setSubmitting(false);
            return;
          }
          dispatch(refreshServiceTickets(true));
          dispatch(closeModalAction());
          setTimeout(() => {
            dispatch(setModalDataAction({
              'data': {},
              'type': ''
            }));
          }, 200);
          setSubmitting(false);

          if (response.message === 'Service ticket created successfully.') {
            dispatch(success(response.message));
          }
        })
          .catch((err: any) => {
            setSubmitting(false);
            throw err;
          });
      }
    },
    'validate':  (values: any) => {
      const errors: any = {};

      if (moment().isAfter(values.dueDate, 'day')) {
        errors.dueDate = 'Cannot select a date that has already passed';
      }
      if (values.jobTypes.length === 0) {
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

  const customers = useSelector(({ customers }: any) => customers.data);
  const jobLocations = useSelector((state: any) => state.jobLocations.data);
  const jobSites = useSelector((state: any) => state.jobSites.data);
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
    dispatch(getEmployeesForJobAction());

    if (ticket.customer?._id !== '') {
      dispatch(getJobLocationsAction({customerId: ticket.customer?._id}));

      const data: any = {
        'type': 'Customer',
        'referenceNumber': ticket.customer?._id
      };
      dispatch(getContacts(data));
    }
  }, []);

  useEffect(() => {
    if (ticket.customer?._id) {
      const jobLocation = jobLocations.filter((jobLocation: any) => jobLocation._id === ticket.jobLocation)[0];
      if (jobLocation) {
        setJobLocationValue(jobLocation);
        if (jobLocation.isActive) {
          dispatch(getJobSites({
            'customerId': ticket.customer._id,
            'locationId': ticket.jobLocation
          }));
        }
        const activeJobLocations = jobLocations.filter((location: any) => location.isActive || location._id === jobLocation._id);
        if (activeJobLocations.length !== jobLocations.length) dispatch(setJobLocations(activeJobLocations)) ;
      }
    }
  }, [jobLocations]);

  useEffect(() => {
    if (ticket.customer?._id !== '') {
      if (contacts.length !== 0) {
        setContactValue(contacts.filter((contact: any) => contact._id === ticket.customerContactId)[0]);
      }
    }
  }, [contacts]);

  useEffect(() => {
    if (ticket.customer?._id !== '') {
      if (jobSites.length !== 0) {
        setJobSiteValue(jobSites.filter((jobSite: any) => jobSite._id === ticket.jobSite)[0]);
      }
    }
  }, [jobSites]);

  useEffect(() => {
    console.log(FormikValues.images)
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


  const formatSchedulingTime = (time: string) => {
    const timeAr = time.split('T');
    const timeWithSeconds = timeAr[1].substr(0, 5);
    const hours = timeWithSeconds.substr(0, 2);
    const minutes = timeWithSeconds.substr(3, 5);

    return { hours,
      minutes };
  };

  const getJobType = () => {
    if (jobTypes?.length !== 0) {
      if (ticket?.tasks?.length) {
        const ids = ticket.tasks.map((ticket:any) => ticket.jobType);
        return jobTypes.filter((job:any) => ids.includes(job._id));
      }
      if (ticket?.jobType) {
        return [jobTypes.filter((job:any) => job._id === ticket.jobType)[0]];
      }
    }
    return [];
  };

  const defaultJobTypeValue = getJobType();

  if (error.status) {
    return (
      <ErrorMessage>
        {error.message}
      </ErrorMessage>
    );
  }
  return (
    <DataContainer>
      <form onSubmit={FormikSubmit}>
        <Grid container className={classes.modalPreview} justify={'space-between'} spacing={4}>
          <Grid item xs={4}>
            <Typography variant={'caption'} className={classes.previewCaption}>customer</Typography>
                <Autocomplete
                  className={detail ? 'detail-only' : ''}
                  defaultValue={ticket.customer && customers.length !== 0 && customers.filter((customer: any) => customer?._id === ticket.customer?._id)[0]}
                  disabled={ticket.customer?.source === 'blueclerk' || isLoadingDatas || detail}
                  getOptionLabel={option => option.profile?.displayName ? option.profile.displayName : ''}
                  id={'tags-standard'}
                  onChange={(ev: any, newValue: any) => handleCustomerChange(ev, 'customerId', setFieldValue, newValue)}
                  options={customers && customers.length !== 0 ? customers.sort((a: any, b: any) => a.profile.displayName > b.profile.displayName ? 1 : b.profile.displayName > a.profile.displayName ? -1 : 0) : []}
                  renderInput={params =>
                    <TextField
                      required
                      {...params}
                      variant={'standard'}
                    />
                  }
                />
          </Grid>
          <Grid item xs={2}>
            <Typography variant={'caption'} className={classes.previewCaption}>due date</Typography>
            <BCDateTimePicker
              className={'serviceTicketLabel'}
              disabled={detail}
              disablePast
              handleChange={dateChangeHandler}
              name={'dueDate'}
              placeholder={'Date'}
              value={FormikValues.dueDate}
            />
          </Grid>
          <Grid item xs={6} />
        </Grid>

        <Grid container className={classes.modalContent} justify={'space-between'} spacing={4}>
          <Grid item xs>
            <Typography variant={'caption'} className={classes.previewCaption}>job location</Typography>
            <Autocomplete
              defaultValue={ticket.jobLocation !== '' && jobLocations.length !== 0 && jobLocations.filter((jobLocation: any) => jobLocation._id === ticket.jobLocation)[0]}
              disabled={FormikValues.customerId === '' || isLoadingDatas || detail}
              getOptionLabel={option => option.name ? option.name : ''}
              getOptionDisabled={(option) => !option.isActive}
              id={'tags-standard'}
              onChange={(ev: any, newValue: any) => handleLocationChange(ev, 'jobLocationId', setFieldValue, getFieldMeta, newValue)}
              options={jobLocations && jobLocations.length !== 0 ? jobLocations.sort((a: any, b: any) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0) : []}
              renderInput={params =>
                <TextField
                  {...params}
                  variant={'outlined'}
                />
              }
              value={jobLocationValue}
            />
          </Grid>
          <Grid item xs>
            <Typography variant={'caption'} className={classes.previewCaption}>job site</Typography>
            <Autocomplete
              className={detail ? 'detail-only' : ''}
              disabled={FormikValues.jobLocationId === '' || isLoadingDatas || detail}
              getOptionLabel={option => option.name ? option.name : ''}
              id={'tags-standard'}
              onChange={(ev: any, newValue: any) => handleJobSiteChange(ev, 'jobSiteId', setFieldValue, newValue)}
              options={jobSites && jobSites.length !== 0 ? jobSites.sort((a: any, b: any) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0) : []}
              renderInput={params =>
                <TextField
                  {...params}
                  variant={'outlined'}
                />
              }
              value={jobSiteValue}
            />
          </Grid>
          <Grid item xs>
            <Typography variant={'caption'} className={classes.previewCaption}>job type</Typography>
            <Autocomplete
              className={detail ? 'detail-only' : ''}
              defaultValue={defaultJobTypeValue}
              disabled={detail}
              getOptionLabel={option => {
                const {title, description} = option;
                return `${title}${description ? ' - '+description: ''}`
              }}
              id={'tags-standard'}
              multiple
              onChange={(ev: any, newValue: any) => handleJobTypeChange(ev, setFieldValue, newValue)}
              options={jobTypes && jobTypes.length !== 0 ? stringSortCaseInsensitive(jobTypes, 'title') : []}
              renderInput={params =>
                <TextField
                  {...params}
                  inputRef={jobTypesInput}
                  variant={'outlined'}
                />
              }
            />
          </Grid>
        </Grid>

        <Grid container className={classes.modalContent} justify={'space-between'} spacing={4}>
          <Grid container xs={8} spacing={4}>
            <Grid container xs={12} spacing={4}>
              <Grid item xs>
                <Typography variant={'caption'} className={classes.previewCaption}>contact associated</Typography>
                <Autocomplete
                  disabled={FormikValues.customerId === '' || isLoadingDatas || detail}
                  getOptionLabel={option => option.name ? option.name : ''}
                  id={'tags-standard'}
                  onChange={(ev: any, newValue: any) => handleContactChange(ev, 'customerContactId', setFieldValue, newValue)}
                  options={contacts && contacts.length !== 0 ? contacts.sort((a: any, b: any) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0) : []}
                  renderInput={params =>
                    <TextField
                      {...params}
                      variant={'outlined'}
                    />
                  }
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => {
                      return <Chip
                        label={`${option.title}${option.description ? ' - ' + option.description : ''}`}
                        {...getTagProps({index})}
                        // disabled={disabledChips.includes(option._id) || !job._id}
                      />;
                    })
                  }
                  value={contactValue}
                />
              </Grid>
              <Grid item xs>
                <Typography variant={'caption'} className={classes.previewCaption}>customer PO</Typography>
                <BCInput
                  disabled={detail}
                  handleChange={formikChange}
                  name={'customerPO'}
                  value={FormikValues.customerPO}
                />
              </Grid>
            </Grid>
            <Grid container xs={12}>
              <Grid item xs>
                <Typography variant={'caption'} className={classes.previewCaption}>notes / special instructions</Typography>
                <BCInput
                  className={'serviceTicketLabel'}
                  disabled={detail}
                  handleChange={formikChange}
                  multiline
                  name={'note'}
                  value={FormikValues.note}
                />
                <Label>
                  {notesLabelState ? ' Notes are required while updating the ticket.' : null}
                </Label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={4} style={{paddingTop: 0}}>
            <BCDragAndDrop images={thumbs} onDrop={(files) => setFieldValue('images', Array.from(files))} />
          </Grid>
        </Grid>

        <DialogActions>
          <Button disabled={isSubmitting || isLoadingDatas}
                  disableElevation={true}
                  onClick={() => closeModal()}
                  variant={'outlined'}>Close</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button color={'primary'}
                  disableElevation={true}
                  disabled={isSubmitting || isLoadingDatas}
                  type={'submit'}
                  variant={'contained'}>Submit</Button>
        </DialogActions>
      </form>
    </DataContainer >
  );
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
  *:not(.MuiGrid-container) > .MuiGrid-container {
    width: 100%;
    padding: 20px 40px;
  }
  .MuiGrid-spacing-xs-4 > .MuiGrid-spacing-xs-4 {
    margin: -16px 0;
  }
  .MuiGrid-grid-xs-true {
    padding: 16px;
  }
  .MuiOutlinedInput-root {
    border-radius: 8px;
    padding: 2px;
  }

  .MuiOutlinedInput-input {
    padding: 9.5px 4px;
  }

  .required > label:after {
    margin-left: 3px;
    content: "*";
    color: red;
  }
`;


export default withStyles(
  styles,
  { 'withTheme': true }
)(BCServiceTicketModal);
