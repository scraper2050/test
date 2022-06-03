import * as CONSTANTS from '../../../constants';
import {LIGHT_GREY, PRIMARY_BLUE} from '../../../constants';
import styles from './bc-company-location-modal.styles';
import {useFormik} from 'formik';
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core';
import React, {useState} from 'react';
import {
  closeModalAction,
  setModalDataAction
} from 'actions/bc-modal/bc-modal.action';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {
  Business as BusinessIcon,
  Cancel as CancelIcon
} from "@material-ui/icons";
import classnames from "classnames";
import BCSwitch from "../../components/bc-switch";
import '../../../scss/job-poup.scss';
import * as Yup from "yup";
import {emailRegExp, phoneRegExp, zipCodeRegExp} from "../../../helpers/format";
import {
  AddCompanyLocationAction,
  UpdateCompanyLocationAction
} from "../../../actions/user/user.action";
import {CompanyLocation} from "../../../actions/user/user.types";
import BCSent from "../../components/bc-sent";
import {allStates} from "../../../utils/constants";
import AutoComplete from "../../components/bc-autocomplete/bc-autocomplete_2";

const companyLocationSchema = Yup.object().shape({
  locationName: Yup.string().required('Required'),
  contactEmail: Yup.string().matches(emailRegExp, 'Email address is not valid'),
  contactNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  zipCode: Yup.string().matches(zipCodeRegExp, 'Zip code is not valid'),
});

interface API_PARAMS {
  companyLocationId?: string;
  name: string;
  isMainLocation: string;
  isActive: string;
  contactName?: string;
  email?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
}


function BCCompanyLocationModal({
                                  classes,
                                  companyLocation,
                                }: { classes: any, companyLocation: CompanyLocation }): JSX.Element {
  const [showWarning, setShowWarning] = useState(false);
  const dispatch = useDispatch();


  const form = useFormik({
    initialValues: {
      id: companyLocation?._id || '',
      locationName: companyLocation?.name || '',
      isMainLocation: companyLocation?.isMainLocation || false,
      divisionName: '',
      contactName: companyLocation?.contactName || '',
      contactNumber: companyLocation?.contact?.phone || '',
      contactEmail: companyLocation?.info?.companyEmail || '',
      fax: '',
      street: companyLocation?.address?.street || '',
      city: companyLocation?.address?.city || '',
      state: allStates.find((state) => state.name === companyLocation?.address?.state) ,
      zipCode: companyLocation?.address?.zipCode || '',
      isActive: companyLocation?.isActive || true,
    },
    onSubmit: (values: any, {setSubmitting}: any) => {
      const params: API_PARAMS = {
        companyLocationId: FormikValues.id,
        name: FormikValues.locationName,
        isMainLocation: FormikValues.isMainLocation.toString(),
        isActive: FormikValues.isActive.toString(),
        contactName: FormikValues.contactName,
        email: FormikValues.contactEmail,
        street: FormikValues.street,
        city: FormikValues.city,
        state: FormikValues.state?.name || '',
        zipCode: FormikValues.zipCode,
        phone: FormikValues.contactNumber,
      };

      Object.entries(params).forEach(([key, value]) => {
        if (typeof value === 'string' && value === '') {
          // @ts-ignore
          delete params[key]
        }
      })

      if (companyLocation) {
        dispatch(UpdateCompanyLocationAction(params, (status) => {
          if (status) closeModal();
          else {
            setSubmitting(false);
            setShowWarning(false);
          }
        }))
      } else {
        dispatch(AddCompanyLocationAction(params, (status) => {
          if (status) closeModal();
          else {
            setSubmitting(false);
            setShowWarning(false);
          }
        }))
      }
    },
    validationSchema: companyLocationSchema,
  });

  const {
    'errors': FormikErrors,
    'values': FormikValues,
    'handleChange': formikChange,
    'handleSubmit': FormikSubmit,
    setFieldValue,
    submitForm,
    isSubmitting,
    touched,
    setFieldTouched,
  } = form;

  const changeField = (name: string, value: any) => {
    setFieldValue(name, value);
    setFieldTouched(name, true);
  }

  const validateNumber = (field: string, value: string, max: number) => {
    if (value.length <= max) setFieldValue(field, value);
  }

  const handleSubmit = () => {
    if (touched.isMainLocation && FormikValues.isMainLocation && !showWarning) {
      setShowWarning(true);
      return;
    } else {
      submitForm();
    }
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

  return (
    <DataContainer className={'new-modal-design'} style={{marginTop: -20}}>
      {showWarning ?
        <BCSent
          title={`Are you sure you want to set ${FormikValues.locationName} as your Default Headquarters?`}
          type={'warning'}
          color={PRIMARY_BLUE}
        />
        :
        <form onSubmit={FormikSubmit}>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: 30
          }}>
            <BCSwitch
              isActive={FormikValues.isActive}
              onChange={() => changeField('isActive', !FormikValues.isActive)}
              activeText={'Active'}
              inactiveText={'Inactive'}
            />
          </div>

          <Typography
            className={classes.dialogTitle}
            variant={'h6'}>
            <strong>Add New Location</strong>
          </Typography>
          <Grid container className={classes.modalPreview}
                justify={'space-around'}>
            <Grid item xs={12}>
              <Grid container direction={'row'} spacing={1}>
                <Grid container item justify={'flex-end'} style={{marginTop: 8}}
                      xs={3}>
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
                    error={!!FormikErrors.locationName && touched.locationName}
                    helperText={FormikErrors.locationName}
                  />
                </Grid>
              </Grid>

              <Grid container direction={'row'} spacing={1}>
                <Grid container item justify={'flex-end'} alignItems={'center'} xs={3}>
                  <Typography variant={'button'}></Typography>
                </Grid>
                <Grid item xs={9}>
                  <Button
                    classes={{root: classnames(classes.hqButton, {[classes.hqButtonActive]: FormikValues.isMainLocation})}}
                    onClick={() => changeField('isMainLocation', true)}
                    variant={'outlined'}
                    startIcon={<BusinessIcon/>}
                    endIcon={FormikValues.isMainLocation ? <CancelIcon
                      style={{color: LIGHT_GREY}}
                      onClick={(e) => {
                        changeField('isMainLocation', false);
                        e.stopPropagation();
                      }}/> : null}
                  >Set as HQ</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <>
            <DialogContent classes={{'root': classes.dialogContent}}>
              <Grid container direction={'column'} spacing={1}>

                {/*<Grid item xs={12}>*/}
                {/*  <Grid container direction={'row'} spacing={1}>*/}
                {/*    <Grid container item justify={'flex-end'}*/}
                {/*          alignItems={'center'} xs={3}>*/}
                {/*      <Typography variant={'button'}>DIVISION NAME</Typography>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={9}>*/}
                {/*      <TextField*/}
                {/*        autoFocus*/}
                {/*        autoComplete={'off'}*/}
                {/*        className={classes.fullWidth}*/}
                {/*        id={'outlined-textarea'}*/}
                {/*        label={''}*/}
                {/*        name={'divisionName'}*/}
                {/*        onChange={(e: any) => formikChange(e)}*/}
                {/*        type={'text'}*/}
                {/*        value={FormikValues.divisionName}*/}
                {/*        variant={'outlined'}*/}
                {/*      />*/}
                {/*    </Grid>*/}
                {/*  </Grid>*/}
                {/*</Grid>*/}

                <Grid item xs={12}>
                  <Grid container direction={'row'} spacing={1}>
                    <Grid container item justify={'flex-end'}
                          alignItems={'center'} xs={3}>
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
                    <Grid container item justify={'flex-end'}
                          style={{marginTop: 8}} xs={3}>
                      <Typography variant={'button'}>CONTACT NUMBER</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        autoComplete={'off'}
                        className={classes.fullWidth}
                        id={'outlined-textarea'}
                        label={''}
                        name={'contactNumber'}
                        onChange={(e) => validateNumber('contactNumber', e.target.value, 10 )}
                        type={'number'}
                        value={FormikValues.contactNumber}
                        variant={'outlined'}
                        error={!!FormikErrors.contactNumber}
                        helperText={FormikErrors.contactNumber}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container direction={'row'} spacing={1}>
                    <Grid container item justify={'flex-end'}
                          style={{marginTop: 8}} xs={3}>
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
                        error={!!FormikErrors.contactEmail}
                        helperText={FormikErrors.contactEmail}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/*<Grid item xs={12}>*/}
                {/*  <Grid container direction={'row'} spacing={1}>*/}
                {/*    <Grid container item justify={'flex-end'}*/}
                {/*          alignItems={'center'} xs={3}>*/}
                {/*      <Typography variant={'button'}>FAX</Typography>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={9}>*/}
                {/*      <TextField*/}
                {/*        autoComplete={'off'}*/}
                {/*        className={classes.fullWidth}*/}
                {/*        id={'outlined-textarea'}*/}
                {/*        label={''}*/}
                {/*        name={'fax'}*/}
                {/*        onChange={formikChange}*/}
                {/*        type={'number'}*/}
                {/*        value={FormikValues.fax}*/}
                {/*        variant={'outlined'}*/}
                {/*      />*/}
                {/*    </Grid>*/}
                {/*  </Grid>*/}
                {/*</Grid>*/}

                <Grid item xs={12}>
                  <Grid container direction={'row'} spacing={1}>
                    <Grid container item justify={'flex-end'}
                          alignItems={'center'} xs={3}>
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
                    <Grid container item justify={'flex-end'}
                          alignItems={'center'} xs={3}>
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
                    <Grid container item justify={'flex-end'}
                         style={{marginTop: 8}} xs={3}>
                      <Typography variant={'button'}>STATE</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <AutoComplete
                        handleChange={formikChange}
                        name={"state"}
                        data={allStates}
                        value={FormikValues.state}
                        margin={"dense"}
                        //placeholder={'Select state'}
                      />
                    </Grid>

                    <Grid container item justify={'flex-end'}
                          style={{marginTop: 8}}  xs={2}>
                      <Typography variant={'button'}>ZIP</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        autoComplete={'off'}
                        className={classes.fullWidth}
                        id={'outlined-textarea'}
                        label={''}
                        name={'zipCode'}
                        onChange={(e) => validateNumber('zipCode', e.target.value, 5 )}
                        type={'number'}
                        value={FormikValues.zipCode}
                        variant={'outlined'}
                        error={!!FormikErrors.zipCode}
                        helperText={FormikErrors.zipCode}
                      />
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
            </DialogContent>
          </>
        </form>
      }
      <DialogActions classes={{'root': classes.dialogActions}}>
        <Button
          aria-label={'record-payment'}
          classes={{
            'root': classes.closeButton
          }}
          disabled={isSubmitting}
          onClick={() => showWarning ? setShowWarning(false) : closeModal()}
          variant={'outlined'}>
          Cancel
        </Button>

        <Button
          disabled={isSubmitting}
          aria-label={'create-job'}
          classes={{
            root: classes.submitButton,
            disabled: classes.submitButtonDisabled
          }}
          color="primary"
          onClick={handleSubmit}
          variant={'contained'}>
          {showWarning ? 'Confirm' : 'Submit'}
        </Button>

      </DialogActions>

    </DataContainer>
  );
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
  {'withTheme': true}
)(BCCompanyLocationModal);
