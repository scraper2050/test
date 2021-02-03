import * as CONSTANTS from "../../../constants";
import BCTextField from "../../components/bc-text-field/bc-text-field";
import styles from './bc-add-contact-modal.styles';
import { useFormik } from 'formik';
import {
  DialogActions,
  DialogContent,
  Fab,
  Grid,
  InputLabel,
  withStyles,
  FormGroup,
} from '@material-ui/core';
import { Field, Form, Formik } from "formik";
import React, { useState } from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { info, error } from 'actions/snackbar/snackbar.action';
import { useDispatch } from 'react-redux';
import { saveBrandType } from 'api/brands.api';
import { getBrands, loadingBrands } from 'actions/brands/brands.action';
import styled from "styled-components";

function BCAddContactModal({
  classes
}: any): JSX.Element {
  const dispatch = useDispatch();

  const onSubmit = (values: any, { setSubmitting }: any) => {
    closeModal();
    // setSubmitting(true);
    // const brandType = new Promise(async (resolve, reject) => {
    //   const title = values.title;
    //   const savingBrandType = await saveBrandType({ title });
    //   savingBrandType.status === 1 ? resolve(savingBrandType) : reject(savingBrandType);
    //   if (savingBrandType.status === 0) {
    //     dispatch(error(savingBrandType.message));
    //   } else {
    //     dispatch(info(savingBrandType.message));
    //   }
    // });

    // brandType
    //   .then(res => onSuccess())
    //   .catch(err => console.log(err))
    //   .finally(() => setSubmitting(false));
  }

  const initialValues = {
    name: '',
    email: '',
    phone: ''
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

  const onSuccess = () => {
    dispatch(closeModalAction());
    dispatch(getBrands());
    dispatch(loadingBrands());
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={
        (values, { setSubmitting }) => {
          closeModal();
        }
      }
      validateOnChange>
      {
        ({
          handleChange,
          values,
          errors,
          isSubmitting,
          setFieldValue,
        }) => (
          <>
            <DataContainer >
              <Grid container direction="column" alignItems="center" spacing={2}>

                <Grid item className={classes.paper} sm={12}>
                  <FormGroup>
                    <InputLabel className={classes.label}>
                      <strong>{"Name"}</strong>
                    </InputLabel>
                    <BCTextField
                      name={"name"}
                      placeholder={"Name"}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Grid>


                <Grid item className={classes.paper} sm={12}>
                  <FormGroup>
                    <InputLabel className={classes.label}>
                      <strong>{"Email"}</strong>
                    </InputLabel>
                    <BCTextField
                      name={"email"}
                      placeholder={"Email"}
                      type={"email"}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Grid>


                <Grid item className={classes.paper} sm={12}>
                  <FormGroup>
                    <InputLabel className={classes.label}>
                      <strong>{"Phone Number"}</strong>
                    </InputLabel>
                    <BCTextField
                      name={"number"}
                      placeholder={"Phone Number"}
                      type={"number"}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Grid>

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
                disabled={isSubmitting}
                onClick={() => closeModal()}
                variant={'extended'}>
                {'Cancel'}
              </Fab>
              <Fab
                aria-label={'create-job'}
                classes={{
                  'root': classes.fabRoot
                }}
                color={'primary'}
                disabled={isSubmitting}
                type={'submit'}
                variant={'extended'}>
                {'Submit'}
              </Fab>
            </DialogActions>
          </>
        )
      }
    </Formik>
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
)(BCAddContactModal);
