import {
  Button, Checkbox,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core';
import React from 'react';
import { closeModalAction } from 'actions/bc-modal/bc-modal.action';
import styled from 'styled-components';
import styles from './bc-email-modal.styles';
import { useDispatch, useSelector } from 'react-redux';
import * as CONSTANTS from "../../../constants";
import {useFormik} from "formik";
import {CompanyProfileStateType} from "../../../actions/user/user.types";
import {sendEmailAction} from "../../../actions/email/email.action";


const EmailJobReportModalContainer = styled.div`
display: flex;
flex-direction: column;
padding: 40px 40px 10px;
text-align: center;
svg {
  margin: 0 auto;
  width: 50%;
  height: 150px;
}

p {
  line-height: 30px;
  font-weight: 400;
  font-size: 18px;
  span {
    font-weight: 800;
    font-size: 22px;
  }
} 
> div {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    .MuiButton-containedPrimary {
      color: white;
    }
    button {
      width: 50%;
    }
}
`;

function EmailJobReportModal({ classes, data: {id, customerEmail, customer, onClick, typeText, emailDefault} }:any) {
  const { sent, loading, error } = useSelector(({ email }:any) => email);
  const profileState: CompanyProfileStateType = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(closeModalAction());
  };

  const variant = sent
    ? 'outlined'
    : 'contained';

  const text = sent
    ? 'Send Again'
    : 'Send';

  const form = useFormik({
    initialValues: {
      from: profileState.companyEmail,
      to: customerEmail,
      subject: emailDefault.subject,
      message: emailDefault.message,
      sendToMe: false,
    },
    onSubmit: (values: any, { setSubmitting }: any) => {
      setSubmitting(true);

      const params: any = {
        id: id,
        invoiceId : id,
        subject: values.subject,
        message: values.message,
        //invoicePdf
      }

      dispatch(sendEmailAction.fetch({ 'email': customer?.info?.email,
        data: params,
        type: 'invoice'
      }));
      closeModal();
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

  return <DataContainer >
      <hr style={{height: '1px', background: '#D0D3DC', borderWidth: '0px'}}/>

      <form onSubmit={FormikSubmit} >
        <DialogContent classes={{ 'root': classes.dialogContent }}>
          <Grid container direction={'column'} spacing ={1}>
            <Grid item xs={12}>
              <Grid container direction={'row'} spacing={1}>
                <Grid container item justify={'flex-end'} alignItems={'center'} xs={3}>
                  <Typography variant={'button'}>FROM</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    disabled
                    autoComplete={'off'}
                    className={classes.fullWidth}
                    id={'outlined-textarea'}
                    name={'from'}
                    onChange={(e: any) => formikChange(e)}
                    value={FormikValues.from}
                    variant={'outlined'}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction={'row'} spacing={1}>
                <Grid container item justify={'flex-end'} alignItems={'center'} xs={3}>
                  <Typography variant={'button'}>TO</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    disabled
                    autoComplete={'off'}
                    className={classes.fullWidth}
                    id={'to'}
                    name={'to'}
                    onChange={(e: any) => formikChange(e)}
                    value={FormikValues.to}
                    variant={'outlined'}
                    placeholder='Select payment method'
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction={'row'} spacing={1}>
                <Grid container item justify={'flex-end'} alignItems={'center'} xs={3}>
                  <Typography variant={'button'}>SUBJECT</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    autoFocus
                    autoComplete={'off'}
                    className={classes.fullWidth}
                    id={'outlined-textarea'}
                    name={'subject'}
                    onChange={formikChange}
                    type={'text'}
                    value={FormikValues.subject}
                    variant={'outlined'}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction={'row'} spacing={1}>
                <Grid container item justify={'flex-end'} alignItems={'flex-start'} xs={3}>
                  <Typography variant={'button'} style={{marginTop: '10px'}}>MESSAGE</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    autoComplete={'off'}
                    className={classes.fullWidth}
                    id={'outlined-textarea'}
                    name={'message'}
                    multiline={true}
                    rows={10}
                    onChange={(e: any) => formikChange(e)}
                    type={'text'}
                    value={FormikValues.message}
                    variant={'outlined'}
                  />
{/*                  <div
                    style={{
                      maxHeight:200,
                      overflow: 'scroll',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderStyle: 'solid',
                      borderRadius: 10
                    }}
                    dangerouslySetInnerHTML={{ __html: FormikValues.message }} />*/}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction={'row'} spacing={1}>
                <Grid container item justify={'flex-end'} alignItems={'flex-start'} xs={3}>

                </Grid>
                <Grid item xs={9}>
                  <FormControlLabel
                    classes={{label: classes.checkboxLabel}}
                    control={
                      <Checkbox
                        color={'primary'}
                        checked={FormikValues.sendToMe}
                        onChange={formikChange}
                        name="sendToMe"
                        classes={{root: classes.checkboxInput}}
                      />
                    }
                    label={`Send copy to myself at ${FormikValues.from}`}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>

        <hr style={{height: '1px', background: '#D0D3DC', borderWidth: '0px'}}/>
        <DialogActions classes={{
          'root': classes.dialogActions
        }}>
        <Grid
          container
          justify={'space-between'}>
          <Grid
            item
            >
              <Button
                aria-label={'record-payment'}
                classes={{
                  'root': classes.closeButton
                }}
                disabled={isSubmitting}
                onClick={() => closeModal()}
                variant={'outlined'}>
                Cancel
              </Button>

          </Grid>
          <Grid
            item
            >
              <Button
                aria-label={'record-payment'}
                classes={{
                  'root': classes.closeButton
                }}
                disabled={isSubmitting}
                //onClick={() => closeModal()}
                variant={'outlined'}>
                Preview as customer
              </Button>

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
          </Grid>

        </Grid>
        </DialogActions>
      </form>

    </DataContainer >;

}


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
  .MuiInputAdornment-positionStart {
    margin-right: 0;
  }
  .MuiInputAdornment-root + .MuiInputBase-input {
    padding: 12px 14px 12px 0;
  }
  .MuiOutlinedInput-multiline {
    padding: 5px 14px;
    align-items: flex-start;
  }
  .required > label:after {
    margin-left: 3px;
    content: "*";
    color: red;
  }
  .save-customer-button {
    color: ${CONSTANTS.PRIMARY_WHITE};
  }
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(EmailJobReportModal);
