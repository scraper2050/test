import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  withStyles,
  Chip,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, {useState, useEffect} from 'react';
import {closeModalAction} from 'actions/bc-modal/bc-modal.action';
import styled from 'styled-components';
import styles from './bc-email-modal.styles';
import {useDispatch, useSelector} from 'react-redux';
import * as CONSTANTS from "../../../constants";
import {useFormik} from "formik";
import {CompanyProfileStateType} from "../../../actions/user/user.types";
import {sendEmailAction} from "../../../actions/email/email.action";
import BCCircularLoader from "../../components/bc-circular-loader/bc-circular-loader";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {getCustomersContact} from 'api/customer.api';
import {stringSortCaseInsensitive} from 'helpers/sort';
import { error as SnackBarError } from 'actions/snackbar/snackbar.action';

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

function EmailJobReportModal({classes, data: {id, customerEmail, customer, onClick, typeText, emailDefault, customerId}}: any) {
  const {sent, loading, error} = useSelector(({email}: any) => email);
  const profileState: CompanyProfileStateType = useSelector((state: any) => state.profile);
  const [customerContacts, setCustomerContacts] = useState<any[]>([]);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeModalAction());
  };

  
  useEffect(() => {
    if(customerId){
      getCustomersContact(customerId)
      .then(res => {
        if(res.status === 1){
          setCustomerContacts(res.contacts.filter((contact:any) => !!contact.email))
          if(res.contacts.length){
            const initialContact = res.contacts.filter((contact:any) => customerEmail === contact.email)
            if(initialContact){
              FormikSetFieldValue('to', initialContact)
            }
          }
        }
      })
      .catch(err=>{
        dispatch(SnackBarError('Something went wrong when fetching Customer\'s contacts. Please try again.'))
      })
    }
  }, [customerId]);

  useEffect(() => {
    if(error){
      dispatch(SnackBarError('Something went wrong'));
    }
  }, [error]);

  const handleRecipientChange = (fieldName: string, data: any) => {
    if(typeof data[data.length-1] === 'string'){
      const trimmedInput = data[data.length-1].trim();
      const test = trimmedInput
                  .toLowerCase()
                  .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  );
      if(!test){
        return 
      }
    }
    FormikSetFieldValue(fieldName, data.map((datum:any)=>{
      if(typeof datum === 'string'){
        return {email: datum.trim()}
      } else {
        return datum
      }
    }));
  };

  const emailSent = () => {
    return <div style={{textAlign: 'center', height: '20vh'}}>
      <CheckCircleIcon style={{color: '#50AE55', fontSize: 100}}/><br/>
      <span style={{color: '#4F4F4F', fontSize: 30, fontWeight: 'bold'}}>This invoice was sent</span>
    </div>
  }

  const form = useFormik({
    initialValues: {
      from: profileState.companyEmail,
      to: [{email: customerEmail}],
      subject: emailDefault.subject,
      message: emailDefault.message,
      sendToMe: false,
    },
    onSubmit: (values: any, {setSubmitting}: any) => {
      const params: any = {
        id: id,
        invoiceId: id,
        recipients: JSON.stringify(values.to.map((recipient:any) => recipient.email)),
        subject: values.subject,
        message: values.message,
        copyToMySelf: values.sendToMe,
        invoicePdf: true,
      };
      dispatch(sendEmailAction.fetch({
        'email': customer?.info?.email,
        data: params,
        type: 'invoice'
      }));
    }
  });


  const {
    'errors': FormikErrors,
    'values': FormikValues,
    'handleChange': formikChange,
    'handleSubmit': FormikSubmit,
    setFieldValue: FormikSetFieldValue,
    //getFieldMeta,
    //isSubmitting
  } = form;

  return <DataContainer>
    <hr style={{height: '1px', background: '#D0D3DC', borderWidth: '0px'}}/>

    <form onSubmit={FormikSubmit}>
      <DialogContent classes={{'root': classes.dialogContent}}>
        {loading ?
          <BCCircularLoader heightValue={'20vh'}/>
          :
          sent ?
            emailSent() :
            <Grid container direction={'column'} spacing={1}>
              <Grid item xs={12}>
                <Grid container direction={'row'} spacing={1}>
                  <Grid container item justify={'flex-end'} alignItems={'center'} xs={2}>
                    <Typography variant={'button'}>FROM</Typography>
                  </Grid>
                  <Grid item xs={10}>
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
                  <Grid container item justify={'flex-end'} alignItems={'center'} xs={2}>
                    <Typography variant={'button'}>TO</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    {!customerContacts.length ? (
                      <TextField
                        disabled
                        autoComplete={'off'}
                        className={classes.fullWidth}
                        id={'to'}
                        name={'to'}
                        onChange={(e: any) => formikChange(e)}
                        value={FormikValues.to[0].email}
                        variant={'outlined'}
                        placeholder='Select payment method'
                      />
                    ) : (
                      <Autocomplete
                        classes={{inputRoot: FormikValues.to.length > 1 ? classes.inputRoot : classes.inputRootSingle}}
                        freeSolo
                        clearOnBlur
                        fullWidth
                        getOptionLabel={(option) => {
                          const { name, email } = option;
                          return `${name}, ${email}`;
                        }}
                        multiple
                        onChange={(ev: any, newValue: any) => handleRecipientChange('to', newValue)}
                        options={
                          customerContacts && customerContacts.length !== 0
                            ? stringSortCaseInsensitive(customerContacts, 'name')
                            : []
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant={'outlined'}
                            required={!customerContacts.length}
                          />
                        )}
                        renderTags={(tagValue, getTagProps) =>
                          tagValue.map((option, index) => {
                            return (
                              <Chip
                                label={`${option.email}`}
                                {...getTagProps({ index })}
                              />
                            );
                          })
                        }
                        value={FormikValues.to}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container direction={'row'} spacing={1}>
                  <Grid container item justify={'flex-end'} alignItems={'center'} xs={2}>
                    <Typography variant={'button'}>SUBJECT</Typography>
                  </Grid>
                  <Grid item xs={10}>
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
                  <Grid container item justify={'flex-end'} alignItems={'flex-start'} xs={2}>
                    <Typography variant={'button'} style={{marginTop: '10px'}}>MESSAGE</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      autoComplete={'off'}
                      className={classes.fullWidth}
                      id={'outlined-textarea'}
                      name={'message'}
                      multiline={true}
                      rows={7}
                      onChange={(e: any) => formikChange(e)}
                      type={'text'}
                      value={FormikValues.message}
                      variant={'outlined'}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container direction={'row'} spacing={1}>
                  <Grid container item justify={'flex-end'} alignItems={'flex-start'} xs={2}>

                  </Grid>
                  <Grid item xs={10}>
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
        }
      </DialogContent>

      <hr style={{height: '1px', background: '#D0D3DC', borderWidth: '0px'}}/>
      <DialogActions classes={{
        'root': classes.dialogActions
      }}>
        <Grid
          container
          justify={'space-between'}>
          <Grid item>
            {!loading && !sent &&
            <Button
              aria-label={'record-payment'}
              classes={{
                'root': classes.closeButton
              }}
              onClick={() => closeModal()}
              variant={'outlined'}>
              Cancel
            </Button>
            }
          </Grid>
          <Grid item>
            {!loading && !sent ?
              <>
                < Button
                  aria-label={'record-payment'}
                  classes={{
                    'root': classes.closeButton
                  }}
                  variant={'outlined'}>
                  Preview as customer
                </Button>

                <Button
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
              </>
              :
              <Button
                disabled={loading}
                aria-label={'record-payment'}
                classes={{
                  'root': classes.closeButton
                }}
                onClick={() => closeModal()}
                variant={'outlined'}>
                Close
              </Button>
            }
          </Grid>


        </Grid>
      </DialogActions>
    </form>

  </DataContainer>;

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
  {'withTheme': true}
)(EmailJobReportModal);
