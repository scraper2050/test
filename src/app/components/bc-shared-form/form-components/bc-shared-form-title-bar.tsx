import React from 'react';
import styles from '../bc-shared-form.styles';
import { Fab, Typography, withStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';


interface Props {
    pageTitle: string;
    redirectUrl: string;
    classes: any;
    disabled: boolean;
    formData: any;
    handleSubmit: any;
    modalTitle: string;
    modalType: string;
}


function SharedFormTitleBar({ classes, pageTitle, redirectUrl, disabled, formData, handleSubmit, modalTitle, modalType }:Props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const openPreviewFormModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'detail': true,
        'formData': formData,
        'handleSubmit': handleSubmit,
        'modalTitle': modalTitle,
        'removeFooter': false

      },
      'type': modalType
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 10);
  };


  const cancelForm = () => {
    history.push(redirectUrl);
  };

  return <div className={classes.titleBar}>
    <Typography
      variant={'h5'}>
      {pageTitle}
    </Typography>
    <div className={classes.actionBar}>
      <Typography
        className={classes.cancelText}
        onClick={cancelForm}
        variant={'body1'}>
        {'Cancel'}
      </Typography>
      <Fab
        aria-label={'new-job'}
        classes={{
          'root': classes.fabRoot
        }}
        color={'primary'}
        disabled={disabled}
        onClick={openPreviewFormModal}
        variant={'extended'}>
        {'Preview'}
      </Fab>
    </div>
  </div>;
}


export default withStyles(styles, { 'withTheme': true })(SharedFormTitleBar);
