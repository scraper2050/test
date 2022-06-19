import {
  DialogActions,
  Button, withStyles,
} from '@material-ui/core';
import React from 'react';
import {closeModalAction, setModalDataAction} from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import BCSent from "../../components/bc-sent";
import styles from './bc-warning-modal.styles';

function BcWarningModal({classes, message, subMessage, action, closeAction}: any): JSX.Element {
  const dispatch = useDispatch();

  const closeModal = () => {
    if(closeAction) {
      dispatch(closeAction);
    } else {
      dispatch(closeModalAction());
      setTimeout(() => {
        dispatch(setModalDataAction({
          'data': {},
          'type': ''
        }));
      }, 200);
    }
  };

  const confirm = () => {
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
    <DataContainer className={'new-modal-design'}>
      <BCSent title={message} type={'warning'} subtitle={subMessage} showLine={false}/>

      <DialogActions classes={{
        'root': classes.dialogActions
      }}>
        <Button
          aria-label={'record-payment'}
          classes={{
            'root': classes.closeButton
          }}
          onClick={() => closeModal()}
          variant={'outlined'}>
          Close
        </Button>

        <Button
          aria-label={'create-job'}
          classes={{
            root: classes.submitButton,
            disabled: classes.submitButtonDisabled
          }}
          color="primary"
          onClick={() => confirm()}
          variant={'contained'}>
          Confirm
        </Button>

      </DialogActions>
    </DataContainer >
  );
}

const DataContainer = styled.div`
  margin: auto 0;
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(BcWarningModal);
