import styles from './bc-job-modal.styles';
import {
  DialogActions,
  Grid,
  withStyles,
  Typography, Button,
} from '@material-ui/core';
import React, { useState } from 'react';
import {
  closeModalAction,
  openModalAction,
  setModalDataAction
} from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { callUpdateJobAPI } from "api/job.api";
import { callEditServiceTicket } from "api/service-tickets.api";
import { modalTypes } from "../../../constants";
import { refreshServiceTickets } from 'actions/service-ticket/service-ticket.action';
import { refreshJobRequests } from 'actions/job-request/job-request.action';
import { refreshJobs } from 'actions/job/job.action';
import { success, error } from 'actions/snackbar/snackbar.action';

function BCDeleteJobModal({
  classes,
  props
}: any): JSX.Element {
  const dispatch = useDispatch();
  const { job, jobOnly } = props;
  const canEdit = job.status === 0 || job.status === 4;
  const [isSubmitting, SetIsSubmitting] = useState(false);

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

  const handleCancel = async () => {
    SetIsSubmitting(true);
    const requestJobObj = {
      jobId: job._id,
      status: 3,
      comment: 'Cancelled Job'
    }

    const response: any = await callUpdateJobAPI(requestJobObj);

    if (response.status) {
      if (!jobOnly) {
        const requestTicketObj = {
          ticketId: job.ticket._id,
          status: 1,
        }

        const responseTicket: any = await callEditServiceTicket(requestTicketObj);
        if (responseTicket.status) {
          dispatch(refreshJobs(false));
          dispatch(refreshJobs(true));
          dispatch(refreshServiceTickets(true));
          dispatch(refreshJobRequests(true));
          await closeModal();
          dispatch(success(`${job.jobId} and ${job.ticket.ticketId} successfully canceled!`));
        } else {
          SetIsSubmitting(false);
          dispatch(error("Something went wrong!"));
        }
      } else {
        await dispatch(refreshServiceTickets(true));
        await dispatch(refreshJobs(false));
        await dispatch(refreshJobs(true));
        await dispatch(refreshJobRequests(true));
        await closeModal();
        dispatch(success(`${job.jobId} successfully canceled!`));
      }
      localStorage.setItem('afterCancelJob','true')
    } else {
      SetIsSubmitting(false);
      dispatch(error("Something went wrong!"));
    }
  }


  return (
    <DataContainer className={'new-modal-design'} >
      <Grid container className={'modalContent'} justify={'space-around'}>
        <Typography>{`Are you sure you want to cancel `}
          <strong>{job.jobId}</strong>
          {!jobOnly ? <>{` and `}<strong>{job.ticket.ticketId}</strong></> : ''}?
        </Typography>
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
          onClick={handleCancel}
          variant={'contained'}
        >Cancel</Button>
      </DialogActions>
    </DataContainer>
  );
}

const DataContainer = styled.div`
  margin: auto 0;
`;


export default withStyles(
  styles,
  { 'withTheme': true }
)(BCDeleteJobModal);
