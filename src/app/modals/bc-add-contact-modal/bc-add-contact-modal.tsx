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
  Select,
  MenuItem,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { useState  , useEffect} from 'react';
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

function BCAddContactModal({
  classes,
  props
}: any): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('call api here ')
  })

  const {
    apply,
    initialValues,
    newContact,
    contacts
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={
        async (values, { setSubmitting }) => {

          await setSubmitting(true);
          try {
            const response = await apply(values);
            if (response.status <= 400 && response.status !== 0) {
              dispatch(success(`${newContact ? "Adding New" : "Update"} Contact Successful!`));
            } else {
              dispatch(error("Something went wrong!"))
            }
          } catch (err) {
            dispatch(error("Something went wrong!"))
            console.log(err)
          } finally {
            await setSubmitting(false);
            closeModal();
          }
        }
      }
      validationSchema={contactSchema}
      validateOnChange>
      {
        ({
          handleChange,
          values,
          errors,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form>
            <DataContainer >
              <Grid container direction="column" alignItems="center" spacing={2}>

                <Grid
                  className={classes.paper}
                  item
                  sm={12}>
                  <FormGroup>
                    <InputLabel className={classes.label}>
                      <strong>{"Select Name"}</strong>
                    </InputLabel>
                    <Field
                      as={Select}
                      enableReinitialize
                      name={'customer.name'}
                      // onChange={(e: any) => {
                      //   handleChange(e);
                      // }}
                      type={'select'}
                      variant={'outlined'}>
                      {/* {contacts.map((contact, id) =>
                        <MenuItem
                          key={id}
                          value={id}>
                          {contact.name }
                        </MenuItem>)
                      } */}
                    </Field>
                  </FormGroup>
                </Grid>

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
                      name={"phone"}
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
          </Form>
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
