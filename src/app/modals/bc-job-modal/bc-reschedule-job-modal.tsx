import styles from './bc-job-modal.styles';
import {
  DialogActions,
  Grid,
  withStyles,
  Button,
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
import { modalTypes } from "../../../constants";
import { refreshJobs } from 'actions/job/job.action';
import {error, success} from 'actions/snackbar/snackbar.action';
import BCInput from "../../components/bc-input/bc-input";

function BCRescheduleJobModal({
  classes,
  props
}: any): JSX.Element {
  const dispatch = useDispatch();
  const { job } = props;
  const [note, setNote] = useState(job.comment);
  const [isSubmitting, SetIsSubmitting] = useState(false);

  const rescheduleJob= () => {
    SetIsSubmitting(true);
    const data = {jobId: job._id, status: 4, note};
    callUpdateJobAPI(data).then((response: any) => {
      if (response.status !== 0) {
        dispatch(refreshJobs(true));
        dispatch(success(`Job rescheduled successfully!`));
        dispatch(closeModalAction());
        setTimeout(() => {
          dispatch(
            setModalDataAction({
              data: {},
              type: '',
            })
          );
        }, 200);
      } else {
        dispatch(error(response.message));
        SetIsSubmitting(false);
      }
    }).catch(e => {
      dispatch(error(e.message));
      SetIsSubmitting(false);
    })
  }

  const openDetailJobModal = () => {
    dispatch(
      setModalDataAction({
        data: {
          job,
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

  return (
    <DataContainer className={'new-modal-design'} >
      <Grid container className={'modalContent'} justify={'space-around'}>
        <BCInput
          required={true}
          handleChange={(e: any) => setNote(e.target.value)}
          label={'Comment'}
          multiline
          name={'note'}
          placeholder={'Add comment here'}
          value={note}
        />
      </Grid>

      <DialogActions classes={{
        'root': classes.dialogActions
      }}>
        <Button
          disabled={isSubmitting}
          onClick={openDetailJobModal}
          variant={'outlined'}
        >Go Back</Button>
        <Button
          color={'primary'}
          disabled={isSubmitting || !note}
          onClick={rescheduleJob}
          variant={'contained'}
        >Reschedule</Button>

      </DialogActions>
    </DataContainer>
  );
}

const DataContainer = styled.div`
  margin: auto 0;

  .MuiInputBase-input {
    color: #383838;
    font-size: 16px;
    padding: 12px 14px;
  }
`;


export default withStyles(
  styles,
  { 'withTheme': true }
)(BCRescheduleJobModal);
