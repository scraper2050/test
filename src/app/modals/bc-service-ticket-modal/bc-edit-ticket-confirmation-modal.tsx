import * as CONSTANTS from "../../../constants";
import styles from './bc-service-ticket-modal.styles';
import {
  DialogActions,
  Grid,
  withStyles,
  Typography,
  Button
} from '@material-ui/core';
import classNames from "classnames";
import React from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { modalTypes } from "../../../constants";

function BCEditTicketConfirmationModal({
  classes,
  props,
}: any): JSX.Element {
  const dispatch = useDispatch();

  const { ticket } = props;
  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': '',
      }));
    }, 200);
  };

  const handleConfirmEditTicket = () => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Edit Service Ticket',
        'removeFooter': false,
        'ticketData': ticket,
        'className': 'serviceTicketTitle',
        'maxHeight': '754px',
        'height': '100%',
        'allowEditWithJob': true,
      },
      'type': modalTypes.EDIT_TICKET_MODAL,
    }));
  };

  return (
    <>
      <DataContainer >
        <Grid container direction="column" alignItems="center">

          <Typography align={'center'}>
            {`A job has been scheduled from this ticket and changing the information may affect the job details.`}
            <br/>
            {`Do you want to proceed?`}
          </Typography>

        </Grid>
      </DataContainer>
      <DialogActions classes={{
        'root': classes.dialogActionsConfirmation
      }}>
        <Button
          variant="contained"
          color="default"
          onClick={() => closeModal()}
          className={classNames(classes.cancelButton)}
        >
          Cancel
        </Button>
        <Button
          aria-label={'create-job'}
          color={'primary'}
          onClick={() => handleConfirmEditTicket()}
          className={classNames(classes.proceedButton)}
          variant={'contained'}
        >
          Proceed to Edit
        </Button>
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
  { 'withTheme': true },
)(BCEditTicketConfirmationModal);
