import {
  DialogActions,
  Button, withStyles,
} from '@material-ui/core';
import React from 'react';
import {closeModalAction, setModalDataAction} from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import styles from './bc-record-sync-modal.styles';
import BCSentSync from "../../components/bc-sent-sync";

function BcRecordSyncStatusModal({classes, data: {keyword, created, synced, closeAction}}: any): JSX.Element {
  const dispatch = useDispatch();

  const closeWithAction = () => {
    if (closeAction) closeAction();
    closeModal();
  }

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
    <DataContainer className={'new-modal-design'}>
      <BCSentSync
        keyword={keyword}
        created={created}
        synced={synced}
        showLine={true}
        onTryAgain={closeModal}
      />

      <DialogActions classes={{
        'root': classes.dialogActions
      }}>
        <Button
          aria-label={'record-payment'}
          classes={{
            'root': classes.closeButton
          }}
          onClick={() => closeWithAction()}
          variant={'outlined'}>
          Close
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
)(BcRecordSyncStatusModal);
