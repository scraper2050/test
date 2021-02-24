import * as CONSTANTS from "../../../constants";
import BCTextField from "../../components/bc-text-field/bc-text-field";
import styles from './bc-service-ticket-modal.styles';
import {
  DialogActions,
  Fab,
  Grid,
  InputLabel,
  withStyles,
  FormGroup,
  Typography,
} from '@material-ui/core';
import { Form, Formik } from "formik";
import React, { useState } from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { callUpdateJobAPI } from "api/job.api";
import { callEditServiceTicket } from "api/service-tickets.api";
import { modalTypes } from "../../../constants";
import { refreshServiceTickets, } from 'actions/service-ticket/service-ticket.action';
import { refreshJobs } from 'actions/job/job.action';
import { success, error } from 'actions/snackbar/snackbar.action';

function BCCancelTicketModal({
  classes,
  props
}: any): JSX.Element {
  const dispatch = useDispatch();

  const { ticket } = props;
  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  const openEditTicketModal = (ticket: any) => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Edit Service Ticket',
        'removeFooter': false,
        'ticketData': ticket,
        'className': 'serviceTicketTitle',
        'maxHeight': '754px',
        'height': '100%'
      },
      'type': modalTypes.EDIT_TICKET_MODAL
    }));
  };

  const handleCancel = async () => {
    const requestTicketObj = {
      ticketId: ticket._id,
      status: 1,
    }

    const responseTicket: any = await callEditServiceTicket(requestTicketObj);

    if (responseTicket.status) {

      await dispatch(refreshServiceTickets(true));
      await closeModal();

      dispatch(success(`${ticket.ticketId} successfully canceled!`));
    } else {

      dispatch(error("Something went wrong!"));
    }


  }


  return (
    <>
      <DataContainer >
        <Grid container direction="column" alignItems="center">

          <Typography>{`Are you sure you want to cancel `}
            <strong>{ticket.ticketId}</strong>?
          </Typography>

        </Grid>
      </DataContainer>
      <DialogActions classes={{
        'root': classes.dialogActions
      }}>
        <Fab
          aria-label={'create-job'}
          classes={{
            'root': classes.fabRoot
          }}
          style={{
            marginRight: 40
          }}
          color={'secondary'}
          onClick={() => openEditTicketModal(ticket)}
          variant={'extended'}>
          {'Go Back Edit'}
        </Fab>
        <Fab
          aria-label={'create-job'}
          classes={{
            root: classes.deleteButton
          }}
          // classes={{
          //   'root': classes.fabRoot
          // }}
          style={{
          }}
          onClick={handleCancel}
          variant={'extended'}>
          {'Cancel'}
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
)(BCCancelTicketModal);
