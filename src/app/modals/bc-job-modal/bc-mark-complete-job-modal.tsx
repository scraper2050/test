import styles from './bc-job-modal.styles';
import {
  DialogActions,
  Grid,
  withStyles,
  Typography, Button,
} from '@material-ui/core';
import React from 'react';
import { useFormik } from 'formik';
import {
  closeModalAction,
  openModalAction,
  setModalDataAction
} from 'actions/bc-modal/bc-modal.action';
import BCInput from 'app/components/bc-input/bc-input';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { callEditJobAPI, callUpdateJobAPI } from "api/job.api";
import { modalTypes } from "../../../constants";
import { refreshServiceTickets, } from 'actions/service-ticket/service-ticket.action';
import { refreshJobs } from 'actions/job/job.action';
import { success, error } from 'actions/snackbar/snackbar.action';


function BCMarkCompleteJobModal({
  classes,
  props,
}: any): JSX.Element {
  const dispatch = useDispatch();
  const { job, jobRequest } = props;
  const canEdit = job.status === 0 || job.status === 4;

  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  const openEditJobModal = (job: any) => {
    dispatch(
      setModalDataAction({
        data: {
          job: job,
          modalTitle: "Edit Job",
          removeFooter: false,
        },
        type: modalTypes.EDIT_JOB_MODAL,
      })
    );
  };

  const openDetailJobModal = (job: any) => {
    dispatch(
      setModalDataAction({
        data: {
          job: job,
          removeFooter: false,
          maxHeight: '100%',
        },
        type: modalTypes.VIEW_JOB_MODAL,
      })
    );
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const {
    'values': FormikValues,
    'handleChange': formikChange,
    'handleSubmit': FormikSubmit,
    isSubmitting
  } = useFormik({
    'initialValues': {
      jobId: job._id,
      status: 2,
      comment: 'Job Marked as Complete',
      'note': ''
    },
    'onSubmit': async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        if (jobRequest){
          await callEditJobAPI(jobRequest)
            .catch((err: any) => {
              dispatch(error("The job property update failed due to some reason!"));
            })
        }
        
        const response: any = await callUpdateJobAPI(values);
        if (response.status) {
            await dispatch(refreshServiceTickets(true));
            await dispatch(refreshJobs(true));
            await closeModal();
            dispatch(success(`${job.jobId} marked as complete!`));
        } else {
          setSubmitting(false);
          dispatch(error("Something went wrong!"));
        }
      } catch (err) {
        setSubmitting(false);
        dispatch(error("Something went wrong!"));
      }
      
    },
    'validate':  (values: any) => {
      const errors: any = {};
      if (values.note.length === 0) {
        errors.note = 'Notes are required';
        dispatch(error('Notes are required'));
      }
      return errors;
    }
  });


  return (
    <DataContainer className={'new-modal-design'} >
      <form onSubmit={FormikSubmit}>
        <Grid container className={'modalContent'} justify={'space-around'}>
          <Typography>{`Are you sure you want to mark `}
            <strong>{job.jobId}</strong>
            {` as Complete?`}
          </Typography>
          <Typography variant={'caption'} className={`required ${'previewCaption'}`}>notes</Typography>
          <BCInput
            autoFocus
            className={'serviceTicketLabel'}
            handleChange={formikChange}
            multiline
            name={'note'}
            value={FormikValues.note}
          />
        </Grid>
        <DialogActions classes={{
          'root': classes.dialogActions
        }}>
          <Button
            disabled={isSubmitting}
            onClick={() => canEdit ? openEditJobModal(job) : openDetailJobModal(job)}
            variant={'outlined'}
          >Go Back</Button>
          <Button
            color={'primary'}
            disabled={isSubmitting}
            type={'submit'}
            variant={'contained'}
          >Mark as Complete</Button>
        </DialogActions>
      </form>
    </DataContainer>
  );
}

const DataContainer = styled.div`
  margin: auto 0;
  .MuiOutlinedInput-input {
    padding: 9.5px 4px;
  }
  span.required:after {
    margin-left: 3px;
    content: "*";
    color: red;
  }
`;


export default withStyles(
  styles,
  { 'withTheme': true }
)(BCMarkCompleteJobModal);
