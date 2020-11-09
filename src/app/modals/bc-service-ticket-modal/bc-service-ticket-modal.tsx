// Import * as Yup from 'yup';
import BCDateTimePicker from 'app/components/bc-date-time-picker/bc-date-time-picker';
import BCInput from 'app/components/bc-input/bc-input';
import BCSelectOutlined from 'app/components/bc-select-outlined/bc-select-outlined';
import React from 'react';
import { formatDate } from 'helpers/format'
import { refreshServiceTickets } from 'actions/service-ticket/service-ticket.action';
import styles from './bc-service-ticket-modal.styles';
import { useFormik } from 'formik';
import { DialogActions, DialogContent, Fab, withStyles } from '@material-ui/core';
import { callCreateTicketAPI, callEditTicketAPI } from 'api/service-tickets.api';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch, useSelector } from 'react-redux';
import { getJobSites } from 'actions/job-site/job-site.action';


function BCServiceTicketModal({
  classes,
  ticket = {
    'customer': {
      '_id': ''
    },
    'jobSite': '',
    'note': '',
    'scheduleDate': new Date()
  }
}: any): JSX.Element {
  const dispatch = useDispatch();
  const handleCustomerChange = (event: any, fieldName: any, setFieldValue: any) => {
    const customerId = event.target.value;
    setFieldValue(fieldName, customerId);
    setFieldValue('jobSiteId', '');
    dispatch(getJobSites(customerId));
  }
 
  const {
    'values': FormikValues,
    'handleChange': formikChange,
    'handleSubmit': FormikSubmit,
    setFieldValue,
    isSubmitting
  } = useFormik({
    // 'enableReinitialize': true,
    'initialValues': {
      'customerId': ticket.customer._id,
      'jobSiteId': ticket.jobSite,
      'note': ticket.note,
      'scheduleDate': ticket.scheduleDate
    },
    'onSubmit': (values, { setSubmitting }) => {
      setSubmitting(true);
      const tempData = {
        ...ticket,
        ...values
      };
      tempData.scheduleDate = formatDate(tempData.scheduleDate);
      if (ticket._id) {
        tempData.ticketId = ticket._id;
        callEditTicketAPI(tempData).then((response: any) => {
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
        callCreateTicketAPI(tempData).then((response: any) => {
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
     *   // 'scheduleDate': Yup.string().required('Schedule date is required')
     * })
     */
  });
  const customers = useSelector(({ customers }: any) => customers.data);
  const jobSites = useSelector((state: any) => state.jobSites.data);
  const isLoading = useSelector((state: any) => state.jobSites.loading);
  
  const dateChangeHandler = (date: string) => {
    setFieldValue('scheduleDate', date);
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

  return (
    <form onSubmit={FormikSubmit}>
      <DialogContent classes={{ 'root': classes.dialogContent }}>
        <div>
          <BCSelectOutlined
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
              'valueKey': '_id'

            }}
            label={'Select Customer'}
            name={'customerId'}
            required
            value={FormikValues.customerId}
            handleChange={(event: any) => handleCustomerChange(event, 'customerId', setFieldValue)}
          />
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
                'valueKey': '_id'
              }}
              label={'Select Jobsite'}
              name={'jobSiteId'}
              value={FormikValues.jobSiteId}
            />}
          <BCInput
            handleChange={formikChange}
            label={'Notes / Special Instructions'}
            multiline
            name={'note'}
            value={FormikValues.note}
          />
          <BCDateTimePicker
            disablePast
            handleChange={dateChangeHandler}
            label={'Schedule Date'}
            name={'scheduleDate'}
            required
            value={FormikValues.scheduleDate}
          />
        </div>
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
          {ticket._id
            ? 'Edit'
            : 'Submit'}
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
export default withStyles(
  styles,
  { 'withTheme': true }
)(BCServiceTicketModal);
