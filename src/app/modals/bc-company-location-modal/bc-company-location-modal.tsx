// Import * as Yup from 'yup';
import * as CONSTANTS from '../../../constants';
import BCDateTimePicker from 'app/components/bc-date-time-picker/bc-date-time-picker';
import BCSent from '../../components/bc-sent';
import { recordPayment, updatePayment } from '../../../api/payment.api';
import styles from './bc-company-location-modal.styles';
import { useFormik } from 'formik';
import AttachMoney from '@material-ui/icons/AttachMoney';
import {
  DialogActions,
  DialogContent,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core';
import React, { useState } from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import InputAdornment from "@material-ui/core/InputAdornment";
import { error } from "../../../actions/snackbar/snackbar.action";
import {LIGHT_GREY, modalTypes} from "../../../constants";
import {
  Business as BusinessIcon,
  Cancel as CancelIcon
} from "@material-ui/icons";
import classnames from "classnames";
import BCSwitch from "../../components/bc-switch";

interface ApiProps {
  customerId: string,
  invoiceId?:string,
  paymentId?:string,
  amount?: number,
  paidAt: Date,
  referenceNumber?: string,
  paymentType?: string,
  note?: string
  line?: string,
}

function BCCompanyLocationModal({
  classes,
  companyLocation,
}: any): JSX.Element {
  const [sent, setSent] = useState(false);
  const [isHQ, setHQ] = useState(false);
  const dispatch = useDispatch();


  const form = useFormik({
    initialValues: {
      locationName: '',
      isHeadQuarter: false,
      divisionName: '',
      contactName: '',
      contactNumber: '',
      contactEmail: '',
      fax: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      isActive: false,
    },
    onSubmit: (values: any, { setSubmitting }: any) => {
      setSubmitting(true);

    //   const params: ApiProps = {
    //     customerId: invoice.customer._id,
    //     amount: FormikValues.amount ?? 0,
    //     paidAt: FormikValues.paymentDate,
    //     note: FormikValues.notes,
    //   }
    //
    //   if (payment) {
    //     params.paymentId = payment._id;
    //     params.line = payment?.line?.length ? JSON.stringify(payment.line.map((paymentObj:any) => {
    //       const newPaymentObj = {...paymentObj};
    //       newPaymentObj.invoiceId = newPaymentObj.invoice;
    //       delete newPaymentObj._id;
    //       delete newPaymentObj.invoice;
    //       if(paymentObj.invoice === invoice._id){
    //         newPaymentObj.amountPaid = params.amount;
    //       }
    //       return newPaymentObj;
    //     })) : '[]';
    //     if(params.line !== '[]'){
    //       delete params.amount;
    //     }
    //   } else {
    //     params.invoiceId= invoice._id;
    //   }
    //
    //   if (FormikValues.referenceNumber)
    //     params.referenceNumber = FormikValues.referenceNumber;
    //
    //   if (FormikValues.paymentMethod >= 0)
    //     params.paymentType = paymentTypes.filter((type) => type._id == FormikValues.paymentMethod)[0].name;
    //
    //   let request;
    //
    //   if (payment) {
    //     request = updatePayment;
    //   } else {
    //     request = recordPayment;
    //   }
    //
    //   dispatch(request(params)).then((response: any) => {
    //     if (response.status === 1) {
    //       setSent(true);
    //       setSubmitting(false);
    //       //closeModal()
    //     } else {
    //       console.log(response.message);
    //       dispatch(error(response.message))
    //     }
    //   }).catch((e: any) => {
    //     console.log(e.message);
    //     dispatch(error(e.message));
    //     setSubmitting(false);
    //   })
    }
  });


  const {
    'errors': FormikErrors,
    'values': FormikValues,
    'handleChange': formikChange,
    'handleSubmit': FormikSubmit,
    setFieldValue,
    getFieldMeta,
    isSubmitting
  } = form;

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
    <DataContainer className={'new-modal-design'} style={{marginTop: -20}}>
      {/*{sent ?*/}
      {/*  <BCSent title={companyLocation ? 'The payment was updated.' : 'The payment was recorded.'}/>*/}
      {/*  :*/}
      <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 30}}>
        <BCSwitch
          isActive={FormikValues.isActive}
          onChange={() => setFieldValue('isActive', !FormikValues.isActive)}
          activeText={'Active'}
          inactiveText={'Inactive'}
        />
      </div>

        <Typography
          className={classes.dialogTitle}
          variant={'h6'}>
          <strong>Add New Location</strong>
        </Typography>
        <Grid container className={classes.modalPreview} justify={'space-around'}>
          <Grid item xs={12}>
            <Grid container direction={'row'} spacing={1}>
              <Grid container item justify={'flex-end'} alignItems={'center'} xs={3}>
                <Typography variant={'button'}>LOCATION NAME</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  autoFocus
                  autoComplete={'off'}
                  className={classes.fullWidth}
                  id={'outlined-textarea'}
                  label={''}
                  name={'locationName'}
                  onChange={(e: any) => formikChange(e)}
                  type={'text'}
                  value={FormikValues.locationName}
                  variant={'outlined'}
                />
              </Grid>
            </Grid>

            <Grid container direction={'row'} spacing={1}>
              <Grid container item justify={'flex-end'} alignItems={'center'} xs={3}>
                <Typography variant={'button'}></Typography>
              </Grid>
              <Grid item xs={9}>
                <Button
                  classes={{root: classnames(classes.hqButton, {[classes.hqButtonActive]: isHQ})}}
                  onClick={() => setHQ(true)}
                  variant={'outlined'}
                  startIcon={<BusinessIcon />}
                  endIcon={isHQ ?<CancelIcon
                    style={{color: LIGHT_GREY}}
                    onClick={(e) => {
                      setHQ(false);
                      e.stopPropagation();
                    }}/>: null}
                >Set as HQ</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      <form onSubmit={FormikSubmit}>
        {!sent &&
          <>
            <DialogContent classes={{'root': classes.dialogContent}}>
            <Grid container direction={'column'} spacing={1}>

              <Grid item xs={12}>
                <Grid container direction={'row'} spacing={1}>
                  <Grid container item justify={'flex-end'} alignItems={'center'} xs={3}>
                    <Typography variant={'button'}>DIVISION NAME</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      autoFocus
                      autoComplete={'off'}
                      className={classes.fullWidth}
                      id={'outlined-textarea'}
                      label={''}
                      name={'divisionName'}
                      onChange={(e: any) => formikChange(e)}
                      type={'text'}
                      value={FormikValues.divisionName}
                      variant={'outlined'}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container direction={'row'} spacing={1}>
                  <Grid container item justify={'flex-end'} alignItems={'center'} xs={3}>
                    <Typography variant={'button'}>CONTACT NAME</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      autoComplete={'off'}
                      className={classes.fullWidth}
                      id={'outlined-textarea'}
                      label={''}
                      name={'contactName'}
                      onChange={formikChange}
                      type={'text'}
                      value={FormikValues.contactName}
                      variant={'outlined'}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container direction={'row'} spacing={1}>
                  <Grid container item justify={'flex-end'} alignItems={'center'} xs={3}>
                    <Typography variant={'button'}>CONTACT NUMBER</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      autoComplete={'off'}
                      className={classes.fullWidth}
                      id={'outlined-textarea'}
                      label={''}
                      name={'contactNumber'}
                      onChange={formikChange}
                      type={'number'}
                      value={FormikValues.contactNumber}
                      variant={'outlined'}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container direction={'row'} spacing={1}>
                  <Grid container item justify={'flex-end'} alignItems={'center'} xs={3}>
                    <Typography variant={'button'}>CONTACT EMAIL</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      autoComplete={'off'}
                      className={classes.fullWidth}
                      id={'outlined-textarea'}
                      label={''}
                      name={'contactEmail'}
                      onChange={formikChange}
                      type={'email'}
                      value={FormikValues.contactEmail}
                      variant={'outlined'}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container direction={'row'} spacing={1}>
                  <Grid container item justify={'flex-end'} alignItems={'center'} xs={3}>
                    <Typography variant={'button'}>FAX</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      autoComplete={'off'}
                      className={classes.fullWidth}
                      id={'outlined-textarea'}
                      label={''}
                      name={'fax'}
                      onChange={formikChange}
                      type={'number'}
                      value={FormikValues.fax}
                      variant={'outlined'}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container direction={'row'} spacing={1}>
                  <Grid container item justify={'flex-end'} alignItems={'center'} xs={3}>
                    <Typography variant={'button'}>STREET</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      autoComplete={'off'}
                      className={classes.fullWidth}
                      id={'outlined-textarea'}
                      label={''}
                      name={'street'}
                      onChange={formikChange}
                      type={'text'}
                      value={FormikValues.street}
                      variant={'outlined'}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container direction={'row'} spacing={1}>
                  <Grid container item justify={'flex-end'} alignItems={'center'} xs={3}>
                    <Typography variant={'button'}>CITY</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      autoComplete={'off'}
                      className={classes.fullWidth}
                      id={'outlined-textarea'}
                      label={''}
                      name={'city'}
                      onChange={formikChange}
                      type={'text'}
                      value={FormikValues.city}
                      variant={'outlined'}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container direction={'row'} spacing={1}>
                  <Grid container item justify={'flex-end'} alignItems={'center'} xs={3}>
                    <Typography variant={'button'}>STATE</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      autoComplete={'off'}
                      className={classes.fullWidth}
                      id={'outlined-textarea'}
                      label={''}
                      name={'state'}
                      onChange={formikChange}
                      type={'text'}
                      value={FormikValues.state}
                      variant={'outlined'}
                    />
                  </Grid>

                  <Grid container item justify={'flex-end'} alignItems={'center'} xs={2}>
                    <Typography variant={'button'}>ZIP</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      autoComplete={'off'}
                      className={classes.fullWidth}
                      id={'outlined-textarea'}
                      label={''}
                      name={'zip'}
                      onChange={formikChange}
                      type={'number'}
                      value={FormikValues.zip}
                      variant={'outlined'}
                    />
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </DialogContent>
          </>
        }
        <DialogActions classes={{
          'root': classes.dialogActions
        }}>
          <Button
            aria-label={'record-payment'}
            classes={{
              'root': classes.closeButton
            }}
            disabled={isSubmitting}
            onClick={() => closeModal()}
            variant={'outlined'}>
            Close
          </Button>

          {!sent &&
          <Button
            disabled={isSubmitting}
            aria-label={'create-job'}
            classes={{
              root: classes.submitButton,
              disabled: classes.submitButtonDisabled
            }}
            color="primary"
            type={'submit'}
            variant={'contained'}>
            Submit
          </Button>
          }

        </DialogActions>
      </form>

    </DataContainer >
  );
}

const Label = styled.div`
  color: red;
  font-size: 15px;
`;

const DataContainer = styled.div`

  margin: auto 0;

  .MuiFormLabel-root {
    font-style: normal;
    font-weight: normal;
    width: 800px;
    font-size: 20px;
    color: ${CONSTANTS.PRIMARY_DARK};
    /* margin-bottom: 6px; */
  }
  .MuiFormControl-marginNormal {
    margin-top: .5rem !important;
    margin-bottom: 1rem !important;
    /* height: 20px !important; */
  }
  .MuiInputBase-input {
    color: #383838;
    font-size: 16px;
    padding: 12px 14px;
  }
  .MuiOutlinedInput-root{
    border-radius: 8px;
  }
  .MuiInputAdornment-positionStart {
    margin-right: 0;
  }
  .MuiInputAdornment-root + .MuiInputBase-input {
    padding: 12px 14px 12px 0;
  }
  .MuiOutlinedInput-multiline {
    padding: 0;
  }
  .required > label:after {
    margin-left: 3px;
    content: "*";
    color: red;
  }
  .save-customer-button {
    color: ${CONSTANTS.PRIMARY_WHITE};
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCCompanyLocationModal);
