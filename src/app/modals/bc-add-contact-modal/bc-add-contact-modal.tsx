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
import React, { useState, useEffect } from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import * as Yup from 'yup';
import { phoneRegExp } from 'helpers/format';
import { success, error } from 'actions/snackbar/snackbar.action';
import request from 'utils/http.service';

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

  const [contacts, setContacts] = useState<any[]>([]);


  const {
    apply,
    initialValues,
    newContact,
    customerId,
    onEdit,
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

  useEffect(() => {
    if (initialValues.type !== 'Customer' && !onEdit) {
      let data = {
        type: 'Customer',
        referenceNumber: customerId
      }


      request('/getContacts', 'OPTIONS', data, false)
        .then((res: any) => {
          try {
            setContacts(res.data.result)
          } catch (err) {
            console.log(err)
          }
        })
    }

  }, [])

  const [initValues, setInitValues] = useState<any>(null);

  const handleSelect = (event: any, setFieldValue: any) => {
    event.preventDefault();

    let baseValue = event.target.value;


    try {
      setInitValues(true)
      setFieldValue('contactId', baseValue._id);
      setFieldValue('name', baseValue.name);
      setFieldValue('email', baseValue.email);
      setFieldValue('phone', baseValue.phone);
    } catch (err) {
      setInitValues(null)

      setFieldValue('contactId', null);
      setFieldValue('name', initialValues.name);
      setFieldValue('email', initialValues.email);
      setFieldValue('phone', initialValues.phone);
    }
  }


  return (
    <Formik
      initialValues={initValues ? initValues : initialValues}
      onSubmit={
        async (values, { setSubmitting }) => {
          let data = values;

          if (initValues) {
            delete data['name'];
            delete data['email'];
            delete data['phone'];
          } else {
            delete data['contactId'];
          }
          await setSubmitting(true);
          try {
            const response = await apply(data);
            if (response.status <= 400 && response.status !== 0 || response.success === 201) {
              dispatch(success(`${newContact ? "Adding New" : "Update"} Contact Successful!`));
            } else {
              if (response.message === "Contact already added") {

                dispatch(error(response.message))
              } else {
                console.log('dito sa apply')

                dispatch(error("Something went wrong!"))
              }
            }
          } catch (err) {
            if (err.message === "Contact already added") {

              dispatch(error(err.message))
            } else {
              dispatch(error("Something went wrong!"))
              console.log(err)
            }
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

                {
                  initialValues.type !== 'Customer' && !onEdit &&
                  <Grid
                    className={classes.paper}
                    item
                    sm={12}>
                    <FormGroup>
                      <InputLabel className={classes.label}>
                        <strong>{"Select Contacts from Customer"}</strong>
                      </InputLabel>
                      <Field
                        as={Select}
                        enableReinitialize
                        onChange={(ev: any) => handleSelect(ev, setFieldValue)}
                        name={'customer.name'}
                        // onChange={(e: any) => {
                        //   handleChange(e);
                        // }}
                        type={'select'}
                        variant={'outlined'}>
                        <MenuItem >
                          New Contact
                          </MenuItem>

                        {contacts.map((contact: any, id: number) =>
                          <MenuItem
                            key={id}
                            value={contact}>
                            {contact.name}
                          </MenuItem>)
                        }
                      </Field>
                    </FormGroup>
                  </Grid>
                }


                <Grid item className={classes.paper} sm={12}>
                  <FormGroup>
                    <InputLabel className={classes.label}>
                      <strong>{"Name"}</strong>
                    </InputLabel>
                    <BCTextField
                      disabled={initValues !== null}
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
                      disabled={initValues !== null}
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
                      disabled={initValues !== null}
                      name={"phone"}
                      placeholder={"Phone Number"}
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
