import {
  DialogActions,
  Button, withStyles, CircularProgress,
} from '@material-ui/core';
import React, {useEffect} from 'react';
import {closeModalAction, setModalDataAction} from 'actions/bc-modal/bc-modal.action';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import styles from './bc-record-sync-modal.styles';
import BCSentSync from "../../components/bc-sent-sync";
import BCSpinner from "../../components/bc-spinner/bc-spinner";

function BcRecordSyncStatusModal({classes, }: any): JSX.Element {
  const dispatch = useDispatch();
  const {data} = useSelector(({modal}: any) => modal);
  const {progress, keyword, created, synced, closeAction} = data;

  const closeWithAction = () => {
    if (closeAction) closeAction();
    closeModal();
  }

  useEffect (() => {console.log({progress})}, [progress]);

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
      {progress ?
        <div className={classes.spinnerContainer}>
          <BCSpinner />
        </div>
        :
        <BCSentSync
          keyword={keyword}
          created={created}
          synced={synced}
          showLine={true}
          onTryAgain={closeModal}
        />
      }

      <DialogActions classes={{
        'root': classes.dialogActions
      }}>
        <Button
          aria-label={'record-payment'}
          classes={{
            'root': classes.closeButton
          }}
          disabled={progress}
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
