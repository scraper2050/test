// Import * as Yup from 'yup';
import BCDateTimePicker from 'app/components/bc-date-time-picker/bc-date-time-picker';
import BCInput from 'app/components/bc-input/bc-input';
import BCSelectOutlined from 'app/components/bc-select-outlined/bc-select-outlined';
import React, { useState, useEffect } from 'react';
import { formatDate } from 'helpers/format';
import { refreshServiceTickets } from 'actions/service-ticket/service-ticket.action';
import styles from './bc-service-ticket-modal.styles';
import { useFormik } from 'formik';
import { DialogActions, DialogContent, Fab, withStyles } from '@material-ui/core';
import { callCreateTicketAPI, callEditTicketAPI } from 'api/service-tickets.api';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch, useSelector } from 'react-redux';
import { getJobSites, clearJobSiteStore } from 'actions/job-site/job-site.action';
import "../../../scss/index.scss";
import { clearJobLocationStore, getJobLocationsAction } from 'actions/job-location/job-location.action';


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
  }
}: any): JSX.Element {
  const dispatch = useDispatch();
  const handleCustomerChange = (event: any, fieldName: any, setFieldValue: any) => {
    const customerId = event.target.value;
    setFieldValue(fieldName, customerId);
    setFieldValue('jobLocationId', '');
    dispatch(getJobLocationsAction(customerId));
  }

  const handleLocationChange = (event: any, fieldName: any, setFieldValue: any, getFieldMeta:any) => {
    const locationId = event.target.value;
    let customerId = getFieldMeta('customerId').value;
    setFieldValue(fieldName, locationId);
    setFieldValue('jobSiteId', '');
    if(locationId !== ''){
      dispatch(getJobSites({customerId, locationId}));
    }else {
      dispatch(clearJobSiteStore());
    }
    
  }

  const formatRequestObj = (rawReqObj: any) => {
    for ( let key in rawReqObj ) {
        if(rawReqObj[key] === '' || rawReqObj[key] === null){
          delete rawReqObj[key];
        }
    }
    return rawReqObj;
  }

  useEffect(() => {
    if(!ticket.updateFlag){
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
    isSubmitting
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
      let editTicketObj = {...values, ticketId: ''};
      //tempData.dueDate = formatDate(tempData.dueDate);
      if (ticket._id) {
        editTicketObj.ticketId = ticket._id;
        delete editTicketObj.customerId;
        let formatedRequest = formatRequestObj(editTicketObj);
        if(formatedRequest.dueDate){
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
  const jobLocations = useSelector((state : any) => state.jobLocations.data);
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
  
  return (
    <form onSubmit={FormikSubmit} className="ticket_form__wrapper">
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
              'valueKey': '_id',
              'className': 'serviceTicketLabel',
            }}
            label={'Customer'}
            name={'customerId'}
            disabled={FormikValues.updateFlag === true}
            required
            value={FormikValues.customerId}
            handleChange={(event: any) => handleCustomerChange(event, 'customerId', setFieldValue)}
          />
            <BCSelectOutlined
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
          <BCDateTimePicker
            disablePast
            handleChange={dateChangeHandler}
            className='serviceTicketLabel'
            label={'Due Date'}
            name={'dueDate'}
            value={FormikValues.dueDate}
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

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCServiceTicketModal);
