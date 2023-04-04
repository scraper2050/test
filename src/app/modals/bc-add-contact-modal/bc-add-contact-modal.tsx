import * as CONSTANTS from "../../../constants";
import styles from './bc-add-contact-modal.styles';
import {
  DialogActions,
  Grid,
  InputLabel,
  withStyles,
  TextField, createStyles, Button,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import * as Yup from 'yup';
import { phoneMaskedRegExp } from 'helpers/format';
import { success, error } from 'actions/snackbar/snackbar.action';
import request from 'utils/http.service';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBase from "@material-ui/core/InputBase";
import classNames from "classnames";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {updateContact} from "../../../api/contacts.api";

const contactSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email'),
  phone: Yup.string().matches(phoneMaskedRegExp, 'Phone number is not valid'),
});



const contactModalStyles = makeStyles((theme: Theme) =>
  createStyles({
    bcButton: {
      border: '1px solid #4F4F4F',
      borderRadius: '8px',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      color: '#4F4F4F',
      padding: '8px 16px',
    },
    // custom input
    formField: {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '62%'
    },
    formFieldFullWidth: {
      margin: theme.spacing(1),
      width: '100%'
    },
    formFieldRow: {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: '62%',
      justifyContent: 'center',
    },
    bootstrapRoot: {
      'label + &': {
        marginTop: 0,
        display: 'flex',
        minWidth: '100%'
      },
      '&': {
        marginTop: 0,
        display: 'flex',
        minWidth: '50%'
      },
    },
    bootstrapTextAreaRoot: {
      'label + &': {
        marginTop: 0,
        display: 'flex',
        minWidth: '100%'
      },
    },
    bootstrapRootError: {
      borderRadius: 8,
      border: `1px solid ${CONSTANTS.PRIMARY_ORANGE}`,
    },
    noBorder: {
      border: 'none'
    },
    bootstrapInput: {
      color: '#4F4F4F!important',
      fontWeight: 'normal',
      borderRadius: 8,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #E0E0E0',
      fontSize: 14,
      width: '100%',
      padding: '12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 8,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },

    bootstrapAutoComplete: {
      color: '#4F4F4F!important',
      fontWeight: 'normal',
      borderRadius: 8,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #E0E0E0',
      fontSize: 14,
      width: '64%',
      padding: '12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 8,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
    bootstrapFormLabel15: {
      fontSize: 14,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      transform: 'none',
      marginRight: 60,
      color: CONSTANTS.PRIMARY_DARK_GREY,
      paddingTop: '15px',
    },
    bootstrapFormLabel: {
      fontSize: 14,
      textTransform: 'uppercase',
      transform: 'none',
      marginRight: 20,
      color: CONSTANTS.INVOICE_HEADING,
      position: 'relative',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '16px',
      textAlign: 'right',
      minWidth: '32%'
    },
    bootstrapFormAutoCompleteLabel: {
      fontSize: 14,
      textTransform: 'uppercase',
      transform: 'none',
      marginRight: 20,
      color: CONSTANTS.INVOICE_HEADING,
      position: 'relative',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '16px',
      textAlign: 'right',

    },
    searchFormWrapper: {
      width: '100%',
      height: 91,
      left: 0,
      top: 103,
      background: '#EAECF3',
      paddingTop: 9,
      marginBottom: 30
    },
    'MuiDialogTitle-root': {
      padding: '150px 0px'
    }
  }),
);

function BCAddContactModal({
  classes,
  props
}: any): JSX.Element {
  const contactStyles = contactModalStyles();
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
            const unSelectedContacts = res?.data?.result?.filter((selectedContact: Record<string, string>) => !props?.contacts?.find((unSelectedContact: Record<string, string>) => selectedContact._id === unSelectedContact._id ));
            setContacts(unSelectedContacts.filter((contact: Record<string, string>) => contact?.isActive ))
          } catch (err) {
            console.log(err)
          }
        })
    }

  }, [])

  const [initValues, setInitValues] = useState<any>(null);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  const handleSelect = (event: any, setFieldValue: any, newValue: any) => {
    event.preventDefault();

    let baseValue = newValue;
    setSelectedContact(baseValue);

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

  const getMaskString = (str: string): string => {
    const x = str?.replace(
        /\D/gu,
        ''
      )
      .match(/(\d{0,3})(\d{0,3})(\d{0,4})/u);
    if (!x) {
      return '';
    }
    return !x[2]
      ? x[1]
      : `(${x[1]}) ${x[2]}${x[3]
        ? `-${x[3]}`
        : ''}`;
  };

  return (
    <Formik
      initialValues={initValues ? initValues : initialValues}
      onSubmit={
        async (values, { setSubmitting }) => {
          let data = values;

          const val = values.phone;
          let count = 0;
          for (let i = 0; i < val.length; i++)
            if (val.charAt(i) in [0,1,2,3,4,5,6,7,8,9])
              count++
          const isValid = (count === 0 || count === 10) ? true : false;

          if(!isValid) {
            dispatch(error('Please enter a valid phone number.'));
            return;
          }

          if(count === 0) {
            values.phone = '';
          }

          if (initValues) {
            if(selectedContact?.name !== data?.name || selectedContact?.email !== data?.email || selectedContact?.phone !== data?.phone) {
              await dispatch(updateContact({
                _id: data?.contactId,
                email: data?.email,
                name: data?.name,
                phone: data?.phone
              }));
            }
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

                dispatch(error("Something went wrong!"))
              }
            }
          } catch (err) {
            if (err.message === "Contact already added") {

              dispatch(error(err.message))
            } else {
              dispatch(error("Something went wrong!"))
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
                  <div className={contactStyles.searchFormWrapper}>
                    <FormControl className={classNames(contactStyles.formField)}>
                      <InputLabel disableAnimation htmlFor="tags-standard"
                                  className={contactStyles.bootstrapFormAutoCompleteLabel}>
                        SELECT CONTACT
                      </InputLabel>
                      <Autocomplete
                        className={contactStyles.bootstrapAutoComplete}
                        id="tags-standard"
                        options={contacts && contacts.length !== 0 ? contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)) : []}
                        getOptionLabel={(option) => option.name}
                        onChange={(ev: React.ChangeEvent<Record<string, unknown>>, newValue: string) => handleSelect(ev, setFieldValue, newValue)}
                        renderInput={(params) => (
                          <>
                            <TextField
                              {...params}
                              variant="standard"
                              // label="Select Contacts from Customer"
                              // className={classes.textField}
                            />
                          </>
                        )}
                      />
                    </FormControl>
                  </div>
                }
                <FormControl className={classNames(contactStyles.formField, 'required')}>
                  <InputLabel disableAnimation htmlFor="name" className={contactStyles.bootstrapFormLabel}>
                    Name
                  </InputLabel>
                  <InputBase
                    id="name"
                    name="name"
                    disabled={initialValues.type !== 'Customer' && !onEdit}
                    value={values.name}
                    placeholder={'Name'}
                    error={!!errors.name}
                    onChange={handleChange}
                    classes={{
                      root: classNames(contactStyles.bootstrapRoot, {
                        [contactStyles.bootstrapRootError]: !!errors.name
                      }),
                      input: classNames(contactStyles.bootstrapInput),
                    }}
                  />
                </FormControl>
                <FormControl className={contactStyles.formField}>
                  <InputLabel disableAnimation htmlFor="email" className={contactStyles.bootstrapFormLabel}>
                    Email
                  </InputLabel>
                  <InputBase
                    id="email"
                    name="email"
                    disabled={initialValues.type !== 'Customer' && !onEdit}
                    value={values.email}
                    placeholder={'Email'}
                    error={!!errors.email}
                    onChange={handleChange}
                    classes={{
                      root: classNames(contactStyles.bootstrapRoot, {
                        [contactStyles.bootstrapRootError]: !!errors.email
                      }),
                      input: classNames(contactStyles.bootstrapInput),
                    }}
                  />
                </FormControl>
                <FormControl className={contactStyles.formField}>
                  <InputLabel disableAnimation htmlFor="phone"
                              className={contactStyles.bootstrapFormLabel}>
                    Phone Number
                  </InputLabel>
                  <InputBase
                    id="phone"
                    name="phone"
                    disabled={initialValues.type !== 'Customer' && !onEdit}
                    value={getMaskString(values.phone)}
                    placeholder={'Phone'}
                    error={!!errors.phone}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                      event.target.value = getMaskString(event.target.value);
                      handleChange(event);
                    }}
                    classes={{
                      root: classNames(contactStyles.bootstrapRoot, {
                        [contactStyles.bootstrapRootError]: !!errors.phone
                      }),
                      input: classNames(contactStyles.bootstrapInput),
                    }}
                  />
                </FormControl>
              </Grid>
            </DataContainer>
            <DialogActions classes={{
              'root': classes.dialogActions
            }}>
              <Button
                variant="contained"
                color="default"
                onClick={() => closeModal()}
                className={classNames(classes.deleteButton)}
              >Cancel
              </Button>
              <Button
                aria-label={'create-job'}
                color={'primary'}
                disabled={isSubmitting}
                type={'submit'}
                className={classNames(classes.saveButton)}
                variant={'contained'}>Save</Button>
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
  max-width: 96%;
  background-color: ${CONSTANTS.PRIMARY_WHITE};

  .MuiInput-underline:before,
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: none;
  }
  .MuiDialogTitle-root {
    padding-top: 100px;
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
