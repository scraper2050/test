import * as CONSTANTS from "../../../constants";
import BCTextField from "../../components/bc-text-field/bc-text-field";
import styles from './bc-add-contact-modal.styles';
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
import * as Yup from 'yup';
import { phoneRegExp } from 'helpers/format';
import { success, error } from 'actions/snackbar/snackbar.action';

const contactSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

function BCDeleteContactModal({
  classes,
  props
}: any): JSX.Element {
  const dispatch = useDispatch();

  const {
    contact,
    apply,
  } = props

  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  const handleDelete = async () => {
    try {
      const response = await apply({
        contactId: contact._id,
        type: contact.type,
        referenceNumber: contact.referenceNumber,
      });
      if (response.status <= 400 && response.status !== 0) {
        dispatch(success(`${contact.name} successfully deleted!`));
      } else {
        dispatch(error("Something went wrong!"));
      }
    } catch (err) {
      dispatch(error("Something went wrong!"));
      console.log(err)
    } finally {
      closeModal();
    }
  }


  return (
    <>
      <DataContainer >
        <Grid container direction="column" alignItems="center" spacing={2}>

          <Typography variant={"h6"}>{`Are you sure you want to delete "${contact.name}"?`}</Typography>

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
          onClick={() => closeModal()}
          variant={'extended'}>
          {'Cancel'}
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
          onClick={handleDelete}
          variant={'extended'}>
          {'Delete'}
        </Fab>
      </DialogActions>
    </>
  );
}

const DataContainer = styled.div`
  display: flex;
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
)(BCDeleteContactModal);
