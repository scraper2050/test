import * as CONSTANTS from "../../../constants";
import styles from './bc-integration-modal.styles';
import {
  DialogActions,
  Fab,
  Grid,
  withStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { quickbooksDisconnect } from "api/quickbooks.api";
import { error, success } from 'actions/snackbar/snackbar.action';
import {setQuickbooksConnection} from "../../../actions/quickbooks/quickbooks.actions";

function BCQbDisconnectModal({
  classes,
  props
}: any): JSX.Element {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  const disconnect = async() => {
    const response = await quickbooksDisconnect();
    if (response.data.status === 1) {
      dispatch(setQuickbooksConnection({qbAuthorized:false}));
      dispatch(success('Please logout manually from Quickbooks on the popup window if you want to reconnect using different Quickbooks Account'));
      let parameters = ` "location=1,width=800,height=650"`;
      parameters +=
        ",left=" +
        (window.screen.width - 800) / 2 +
        ",top=" +
        (window.screen.height - 650) / 2;
      
      const win: any = window.open('https://quickbooks.intuit.com/app/apps/home/', "logoutPopup", parameters);
      const script = document.createElement('script');
      script.textContent = `
        alert('please logout manually from here')
      `;
      win.document.head.appendChild(script);
    } else {
      dispatch(error(response.data.message));
    }
    closeModal();
  };

  const handleCancel = async () => {
    await closeModal();
  }


  return (
    <>
      <DataContainer >
        <Grid container direction="column" alignItems="center">

          <Typography>{`Are you sure you want to disconnect from QuickBooks? `}
          </Typography>

        </Grid>
      </DataContainer>
      <DialogActions classes={{
        'root': classes.dialogActions
      }}>
        <Fab
          aria-label={'cancel'}
          classes={{
            'root': classes.fabRoot
          }}
          style={{
            marginRight: 40
          }}
          color={'secondary'}
          onClick={() => handleCancel()}
          variant={'extended'}>
          {'Cancel'}
        </Fab>
        <Fab
          aria-label={'disconnect'}
          classes={{
            root: classes.deleteButton
          }}
          // classes={{
          //   'root': classes.fabRoot
          // }}
          style={{
          }}
          onClick={disconnect}
          variant={'extended'}>
          {'Disconnect'}
        </Fab>
      </DialogActions>
    </>
  );
}

const DataContainer = styled.div`
  display: flex;
  height: 100px;
  justify-content: center;
  flex-direction: column;
  padding: 12px;
  margin-top: 12px;
  border-radius: 10px;
  background-color: ${CONSTANTS.PRIMARY_WHITE};

  .MuiFormLabel-root {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 30px;
    color: ${CONSTANTS.PRIMARY_DARK};
    margin-bottom: 6px;
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
    margin-right: 16px;
    color: ${CONSTANTS.PRIMARY_WHITE};
  }
`;


export default withStyles(
  styles,
  { 'withTheme': true }
)(BCQbDisconnectModal);
