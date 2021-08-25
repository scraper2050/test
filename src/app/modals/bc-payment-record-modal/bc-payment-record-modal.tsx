// Import * as Yup from 'yup';
import * as CONSTANTS from '../../../constants';
import BCDateTimePicker from 'app/components/bc-date-time-picker/bc-date-time-picker';
import BCInput from 'app/components/bc-input/bc-input';
import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import { getInventory } from 'actions/inventory/inventory.action';
import { refreshJobs } from 'actions/job/job.action';
import { refreshServiceTickets, setOpenServiceTicket, setOpenServiceTicketLoading } from 'actions/service-ticket/service-ticket.action';
import styles from './bc-payment-record-modal.styles';
import { useFormik } from 'formik';
import AttachMoney from '@material-ui/icons/AttachMoney';
import {
  DialogActions,
  DialogContent,
  Button,
  Grid,
  Fab, MenuItem,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
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
import { getOpenServiceTickets } from 'api/service-tickets.api';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { error as SnackBarError, success } from 'actions/snackbar/snackbar.action';
import { getContacts } from 'api/contacts.api';
import { modalTypes } from '../../../constants';
import { useHistory, useLocation } from 'react-router-dom';
import {KeyboardDatePicker} from "@material-ui/pickers";
import moment from "moment";
import {TextFieldProps} from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import EventIcon from "@material-ui/icons/Event";
import classNames from "classnames";
import FormControl from "@material-ui/core/FormControl";
import BCSelectOutlined from "../../components/bc-select-outlined/bc-select-outlined";
import {CSButton} from "../../../helpers/custom";

function BcPaymentRecordModal({
  classes,
  invoice,
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
  const [jobLocationValue, setJobLocationValue] = useState<any>([]);
  const [jobSiteValue, setJobSiteValue] = useState<any>([]);
  const [employeeValue, setEmployeeValue] = useState<any>([]);
  const [contractorValue, setContractorValue] = useState<any>([]);
  const [jobTypeValue, setJobTypeValue] = useState<any>([]);
  const openServiceTicketFilter = useSelector((state: any) => state.serviceTicket.filterTicketState);
  const [contactValue, setContactValue] = useState<any>([]);
  const [thumb, setThumb] = useState<any>(null);
  const history = useHistory();
  const [datePickerOpen, setDatePickerOpen] = useState(false);



  const paymentTypes = [
    {
      '_id': '0',
      'name': 'ACH'
    },
    {
      '_id': '1',
      'name': 'Bank Wire'
    },
    {
      '_id': '2',
      'name': 'Credit Card/Debit Card'
    },
    {
      '_id': '3',
      'name': 'Check'
    },
    {
      '_id': '2',
      'name': 'Cash'
    }
  ];


  useEffect(() => {

  }, []);


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
    initialValues: {
      paymentDate: new Date(),
      amount: invoice.total,
      paymentMethod: -1,
      referenceNumber: '',
      notes: ''
    },
    onSubmit: (values: any, { setSubmitting }: any) => {
      setSubmitting(true);
      console.log('SUBMIT');
      setSubmitting(false);
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

  if (isLoading) {
    return <BCCircularLoader />;
  }

  const {customer, dueDate} = invoice;
  const formatedDueDate = (new Date(dueDate)).toLocaleDateString('en-us',{ year: 'numeric', month: 'short', day: 'numeric' })
  return (
    <DataContainer >
      <Grid container className={classes.modalPreview} justify={'space-around'}>
        <Grid item xs={4}>
          <Typography variant={'caption'} className={classes.previewCaption}>BILL TO</Typography>
          <Typography variant={'h6'} className={classes.previewText}>{customer.profile.displayName}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant={'caption'} className={classes.previewCaption}>AMOUNT DUE</Typography>
          <Typography variant={'h6'} className={classes.previewText}>${invoice.total}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid container direction={'column'}>
            <Typography variant={'caption'} align={'right'} className={classes.previewCaption2}>INVOICE #:</Typography>
            <Typography variant={'caption'} align={'right'} className={classes.previewCaption2}>CUSTOMER P.O.:</Typography>
            <Typography variant={'caption'} align={'right'} className={classes.previewCaption2}>DUE DATE:</Typography>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Grid container direction={'column'}>
            <Typography variant={'caption'} align={'right'} className={classes.previewTextSm}>{invoice.invoiceId}</Typography>
            <Typography variant={'caption'} align={'right'} className={classes.previewTextSm}>{customer.address.zipCode}</Typography>
            <Typography variant={'caption'} align={'right'} className={classes.previewTextSm}>{formatedDueDate}</Typography>
          </Grid>
        </Grid>

      </Grid>
      <form  onSubmit={FormikSubmit} >
        <DialogContent classes={{ 'root': classes.dialogContent }}>


          <Grid container direction={'column'} spacing ={1}>

            <Grid item xs={12}>
              <Grid container direction={'row'} spacing={1}>
                <Grid container item justify={'flex-end'} alignItems={'center'} xs={4}>
                  <Typography>PAYMENT DATE</Typography>
                </Grid>
                <Grid item xs={8}>
                  <div style={{width: '70%'}}>
                    <BCDateTimePicker
                      handleChange={(e: any) => setFieldValue('paymentDate', e)}
                      name={'paymentDate'}
                      value={FormikValues.paymentDate}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction={'row'} spacing={1}>
                <Grid container item justify={'flex-end'} alignItems={'center'} xs={4}>
                  <Typography>AMOUNT</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    autoComplete={'off'}
                    className={classes.fullWidth}
                    id={'outlined-textarea'}
                    label={''}
                    name={'amount'}
                    onChange={(e: any) => formikChange(e)}
                    type={'text'}
                    value={FormikValues.amount}
                    variant={'outlined'}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoney style={{ color: '#BDBDBD' }}/>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction={'row'} spacing={1}>
                <Grid container item justify={'flex-end'} alignItems={'center'} xs={4}>
                  <Typography>PAYMENT METHOD</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    autoComplete={'off'}
                    className={classes.fullWidth}
                    id={'outlined-textarea'}
                    name={'paymentMethod'}
                    onChange={(e: any) => formikChange(e)}
                    select
                    value={FormikValues.paymentMethod}
                    variant={'outlined'}
                    placeholder='Select payment method'
                  >
                    <MenuItem value="-1" disabled>
                      Select payment method
                    </MenuItem>
                    {paymentTypes.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction={'row'} spacing={1}>
                <Grid container item justify={'flex-end'} alignItems={'center'} xs={4}>
                  <Typography>REFERENCE NO.</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    autoComplete={'off'}
                    className={classes.fullWidth}
                    id={'outlined-textarea'}
                    label={''}
                    name={'referenceNumber'}
                    onChange={formikChange}
                    type={'text'}
                    value={FormikValues.referenceNumber}
                    variant={'outlined'}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction={'row'} spacing={1}>
                <Grid container item justify={'flex-end'} alignItems={'flex-start'} xs={4}>
                  <Typography style={{marginTop: '10px'}}>NOTES</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    autoComplete={'off'}
                    className={classes.fullWidth}
                    id={'outlined-textarea'}
                    label={''}
                    name={'notes'}
                    multiline={true}
                    onChange={(e: any) => formikChange(e)}

                    type={'text'}
                    value={FormikValues.notes}
                    variant={'outlined'}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>

        <hr/>

        <Grid
          alignItems={'center'}
          container
          justify={'flex-end'} >
          <Grid
            item
            sm={7}>
            <DialogActions classes={{
              'root': classes.dialogActions
            }}>
              <Button
                aria-label={'create-job'}
                classes={{
                  'root': classes.closeButton
                }}
                disabled={isSubmitting}
                onClick={() => closeModal()}
                variant={'outlined'}>
                {'Close'}
              </Button>

              <Button
                aria-label={'create-job'}
                classes={{
                  'root': classes.submitButton
                }}
                disabled={isSubmitting}
                color="primary"
                //type={'submit'}
                variant={'contained'}>
                  Submit
              </Button>

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
    width: 800px;
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
)(BcPaymentRecordModal);
