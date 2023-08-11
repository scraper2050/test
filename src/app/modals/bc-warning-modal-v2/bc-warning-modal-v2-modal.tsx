import React, { useState } from "react";
import styles from "./bc-warning-modal-v2-modal.style";
import { useDispatch } from "react-redux";
import { setModalDataAction, closeModalAction, openModalAction } from "actions/bc-modal/bc-modal.action";
import { withStyles, DialogContent, Grid, DialogActions, Button } from "@material-ui/core";
import styled from "styled-components";
import WarningIcon from "@material-ui/icons/Warning";

interface Props {
  classes: any;
  actionText: string;
  action: any;
  closeAction: any;
  closeText: string;
  message: string;
}

function BCPORequestWarningModal({ classes, actionText, action, message, closeAction, closeText }: Props):JSX.Element {
  const dispatch = useDispatch();
  
  const closeModal = () => {
    if (closeAction) dispatch(closeAction)
    setTimeout(() => {
      dispatch(
        setModalDataAction({
          data: {},
          type: "",
        })
      );
    }, 200);
    dispatch(closeModalAction());
  }

  const onSubmit = () => {
    dispatch(action);
    setTimeout(() => {
      dispatch(closeModalAction());
      setTimeout(() => {
        dispatch(setModalDataAction({
          'data': {},
          'type': ''
        }));
      }, 200);
    }, 1000);
  }

  return (
    <DataContainer className={'new-modal-design'} >
      <DialogContent classes={{ 'root': classes.dialogContent }}>
        <Grid
          container 
          className={'modalContent'}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
          <Grid item>
            <WarningIcon />
          </Grid>
          <Grid item>
            <div style={{fontWeight: 'bold',  width: 430, fontSize: '18px', textAlign: 'center'}}>
              { message }
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeModal}
          variant={'outlined'}
        >{closeText || 'Cancel'}</Button>
        <Button
          color={'primary'}
          onClick={onSubmit}
          variant={'contained'}
        >{actionText || 'Confirm'}</Button>
      </DialogActions>
    </DataContainer>
  )
}

const DataContainer = styled.div`
  margin: auto 0;
`;

export default withStyles(styles, { withTheme: true })(BCPORequestWarningModal);
