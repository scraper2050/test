import styles from './bc-activate-job-location-modal.style';
import {
  DialogActions,
  Grid,
  withStyles,
  Button,
} from '@material-ui/core';
import WarningIcon from "@material-ui/icons/Warning";
import React, { useState } from 'react';
import {
  closeModalAction,
  setModalDataAction,
} from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { updateJobLocationAction, refreshJobLocation } from 'actions/job-location/job-location.action';
import { success, error } from 'actions/snackbar/snackbar.action';

function BCActivateJobLocationModal({
  classes,
  jobLocationInfo
}: any): JSX.Element {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  const handleActivation = async () => {
    setIsSubmitting(true);
    const requestObj = {
      city: jobLocationInfo.address?.city || '',
      state: jobLocationInfo.address?.state || '',
      street: jobLocationInfo.address?.street || '',
      zipcode: jobLocationInfo.address?.zipcode || '',
      name: jobLocationInfo.name,
      locationLat: jobLocationInfo.location?.coordinates?.[1] || 0,
      locationLong: jobLocationInfo.location?.coordinates?.[0] || 0,
      customerId: jobLocationInfo.customerId,
      jobLocationId: jobLocationInfo._id,
      isActive: !jobLocationInfo.isActive,
    };
    try {
      await dispatch(updateJobLocationAction(requestObj, ({status, message}: { status: number, message: string }) => {
        if (status === 1) {
          dispatch(success(message));
          dispatch(refreshJobLocation(true));
          closeModal();
        } else {
          dispatch(error(message));
        }
        setIsSubmitting(false);
      }))
    } catch (err) {
      dispatch(error("Something's wrong"));
      setIsSubmitting(false);
    }
  }


  return (
    <DataContainer className={'new-modal-design'} >
      <Grid 
        container 
        className={'modalContent'}
        direction={'column'}
        justify={'center'}
        alignItems={'center'}
      >
        <Grid item>
          <WarningIcon classes={{root: jobLocationInfo.isActive ? classes.activeWarning : classes.inactiveWarning}} />
        </Grid>
        <Grid item>
          <div style={{fontWeight: 'bold', fontSize: 25, width: 300, textAlign: 'center'}}>
            {`Are you sure you want to ${jobLocationInfo.isActive ? 'deactivate' : 'activate'} ${jobLocationInfo.name}?`}
          </div>
        </Grid>
      </Grid>
      <DialogActions>
        <Button
          disabled={isSubmitting}
          onClick={closeModal}
          variant={'outlined'}
        >Cancel</Button>
        <Button
          classes={{root: isSubmitting ? classes.submittingButton : jobLocationInfo.isActive ? classes.activeButton : classes.inactiveButton}} 
          color={'primary'}
          disabled={isSubmitting}
          onClick={handleActivation}
          variant={'contained'}
        >{jobLocationInfo.isActive ? 'Deactivate' : 'Activate'}</Button>
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
)(BCActivateJobLocationModal);
