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
  TextField,
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
import Autocomplete from '@material-ui/lab/Autocomplete';

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

  const handleSelect = (event: any, setFieldValue: any, newValue: any) => {
    event.preventDefault();

    let baseValue = newValue;


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

                    <FormGroup className={'required'}>
                      <div className="search_form_wrapper">
                        <Autocomplete

                          id="tags-standard"
                          options={contacts && contacts.length !== 0 ? contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)) : []}
                          getOptionLabel={(option) => option.name}
                          onChange={(ev: any, newValue: any) => handleSelect(ev, setFieldValue, newValue)}
                          renderInput={(params) => (
                            <>
                              <InputLabel className={classes.label}>
                                <strong>{"Select contacts from customer"}</strong>
                              </InputLabel>
                              <TextField
                                {...params}
                                variant="standard"
                              // label="Select Contacts from Customer"
                              // className={classes.textField}


                              />
                            </>
                          )}
                        />
                      </div>
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
