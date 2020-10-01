// Import * as Yup from 'yup';
import BCDateTimePicker from 'app/components/bc-date-time-picker/bc-date-time-picker';
import BCInput from 'app/components/bc-input/bc-input';
import BCSelectOutlined from 'app/components/bc-select-outlined/bc-select-outlined';
import { getInventory } from 'actions/inventory/inventory.action';
import { getTechnicians } from 'actions/technicians/technicians.action';
import moment from 'moment';
import { refreshJobs } from 'actions/job/job.action';
import { refreshServiceTickets } from 'actions/service-ticket/service-ticket.action';
import styles from './bc-job-modal.styles';
import { useFormik } from 'formik';
import { DialogActions, DialogContent, Fab, Grid, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { callCreateJobAPI, callEditJobAPI, getAllJobTypesAPI } from 'api/job.api';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch, useSelector } from 'react-redux';

function BCJobModal({
  classes,
  job = {
    'customer': {
      '_id': ''
    },
    'description': '',
    'employeeType': false,
    'equipment': {
      '_id': ''
    },
    'scheduleDate': new Date(),
    'scheduledEndTime': new Date(),
    'scheduledStartTime': new Date(),
    'technician': {
      '_id': ''
    },
    'ticket': {
      '_id': ''
    },
    'type': {
      '_id': ''
    }
  }
}: any): JSX.Element {
  const dispatch = useDispatch();
  const {
    'errors': FormikErrors,
    'values': FormikValues,
    'handleChange': formikChange,
    'handleSubmit': FormikSubmit,
    setFieldValue,
    isSubmitting
  } = useFormik({
    // 'enableReinitialize': true,
    'initialValues': {
      'customerId': job.customer._id,
      'description': job.description,
      'employeeType': !job.employeeType
        ? 0
        : 1,
      'equipmentId': job.equipment && job.equipment._id
        ? job.equipment._id
        : '',
      'jobTypeId': job.type._id,
      'scheduleDate': job.scheduleDate,
      'scheduledEndTime': job.scheduledEndTime,
      'scheduledStartTime': job.scheduledStartTime,
      'technicianId': job.technician._id,
      'ticketId': job.ticket._id
    },
    'onSubmit': (values, { setSubmitting }) => {
      setSubmitting(true);
      for (let i = 0; i < ticketData.length; i += 1) {
        if (ticketData[i]._id === values.ticketId) {
          values.customerId = ticketData[i]._id;
          break;
        }
      }
      const tempData = {
        ...job,
        ...values
      };
      tempData.scheduleDate = moment(tempData.scheduleDate).format('YYYY-MM-DD');
      tempData.scheduledEndTime = moment(tempData.scheduledEndTime).format('HH:mm:ss');
      tempData.scheduledStartTime = moment(tempData.scheduledStartTime).format('HH:mm:ss');
      console.log(tempData);
      if (job._id) {
        tempData.jobId = job._id;
        callEditJobAPI(tempData).then((response: any) => {
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
        callCreateJobAPI(tempData).then((response: any) => {
          dispatch(refreshJobs(true));
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
  });
  const equipments = useSelector(({ inventory }: any) => inventory.data);
  const tickets = useSelector(({ serviceTicket }: any) => serviceTicket.tickets);
  const technicians = useSelector(({ technicians }: any) => technicians.data);
  const jobTypes = useSelector(({ jobTypes }: any) => jobTypes.data);
  const [ticketData, setTicketData] = useState<any>([]);
  const employeeTypes = [
    {
      '_id': '0',
      'name': 'Employee'
    },
    {
      '_id': '1',
      'name': 'Vendor'
    }
  ];
  const dateChangeHandler = (date: string, fieldName: string) => {
    console.log(date);
    setFieldValue(fieldName, date);
  };

  useEffect(() => {
    dispatch(getInventory());
    dispatch(getTechnicians());
    dispatch(getAllJobTypesAPI());
  }, []);

  useEffect(() => {
    let ticketData = tickets;
    if (!job._id) {
      ticketData = tickets.filter((o: any) => { // eslint-disable-line
        if (!o.jobCreated) {
          if (o.status !== 1) {
            return o;
          }
        }
      });
    }
    setTicketData(ticketData);
  }, [tickets]);

  return (
    <form onSubmit={FormikSubmit}>
      <DialogContent classes={{ 'root': classes.dialogContent }}>
        <Grid
          container
          spacing={2}>
          <Grid
            item
            sm={6}
            xs={12}
          >
            <BCSelectOutlined
              error={{
                'isError': true,
                'message': FormikErrors.employeeType
              }}
              handleChange={formikChange}
              items={{
                'data': employeeTypes,
                'displayKey': 'name',
                'valueKey': '_id'
              }}
              label={'Employee Type'}
              name={'employeeType'}
              required
              value={FormikValues.employeeType}
            />
            <BCSelectOutlined
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
            />
            <BCSelectOutlined
              handleChange={formikChange}
              items={{
                'data': [
                  ...technicians.map((o: any) => {
                    return {
                      '_id': o._id,
                      'displayName': o.profile.displayName
                    };
                  })
                ],
                'displayKey': 'displayName',
                'valueKey': '_id'
              }}
              label={'Select Technician'}
              name={'technicianId'}
              required
              value={FormikValues.technicianId}
            />
            <BCSelectOutlined
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
              value={FormikValues.jobTypeId}
            />
            <BCSelectOutlined
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
            />
            <BCInput
              handleChange={formikChange}
              label={'Description'}
              multiline
              name={'description'}
              value={FormikValues.description}
            />
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}>
            <BCDateTimePicker
              disablePast={!job._id}
              handleChange={(e: any) => dateChangeHandler(e, 'scheduleDate')}
              label={'Schedule Date'}
              name={'scheduleDate'}
              required
              value={FormikValues.scheduleDate}
            />
            <BCDateTimePicker
              dateFormat={'HH:mm:ss'}
              disablePast={!job._id}
              handleChange={(e: any) => dateChangeHandler(e, 'scheduledStartTime')}
              label={'Start Time'}
              name={'scheduledStartTime'}
              pickerType={'time'}
              value={FormikValues.scheduledStartTime}
            />
            <BCDateTimePicker
              dateFormat={'HH:mm:ss'}
              disablePast={!job._id}
              handleChange={(e: any) => dateChangeHandler(e, 'scheduledEndTime')}
              label={'End Time'}
              name={'scheduledEndTime'}
              pickerType={'time'}
              value={FormikValues.scheduledEndTime}
            />
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
  );
}
export default withStyles(
  styles,
  { 'withTheme': true }
)(BCJobModal);
