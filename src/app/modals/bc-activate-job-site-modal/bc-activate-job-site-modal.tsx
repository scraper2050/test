import styles from './bc-activate-job-site-modal.style';
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
import { updateJobSiteAction, getJobSites } from 'actions/job-site/job-site.action';
import { success, error } from 'actions/snackbar/snackbar.action';

function BCActivateJobSiteModal({
  classes,
  jobSiteInfo
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
      jobSiteId: jobSiteInfo._id,
      address: {
        city: jobSiteInfo.address?.city || '',
        state: jobSiteInfo.address?.state || '',
        street: jobSiteInfo.address?.street || '',
        zipcode: jobSiteInfo.address?.zipcode || '',
      },
      name: jobSiteInfo.name,
      location: {
        lat: jobSiteInfo.location?.coordinates?.[1] || 0,
        long: jobSiteInfo.location?.coordinates?.[0] || 0,
      },
      customerId: jobSiteInfo.customerId,
      locationId: jobSiteInfo.locationId,
      isActive: !jobSiteInfo.isActive,
    };
    try {
      await dispatch(updateJobSiteAction(requestObj, () => {
        closeModal();
        dispatch(success("Update Job Address Successful!"));
        dispatch(getJobSites(requestObj));
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
          <WarningIcon classes={{root: jobSiteInfo.isActive ? classes.activeWarning : classes.inactiveWarning}} />
        </Grid>
        <Grid item>
          <div style={{fontWeight: 'bold', fontSize: 25, width: 300, textAlign: 'center'}}>
            {`Are you sure you want to ${jobSiteInfo.isActive ? 'deactivate' : 'activate'} ${jobSiteInfo.name}?`}
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
          classes={{root: isSubmitting ? classes.submittingButton : jobSiteInfo.isActive ? classes.activeButton : classes.inactiveButton}}
          color={'primary'}
          disabled={isSubmitting}
          onClick={handleActivation}
          variant={'contained'}
        >{jobSiteInfo.isActive ? 'Deactivate' : 'Activate'}</Button>
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
)(BCActivateJobSiteModal);
