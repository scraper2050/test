import * as CONSTANTS from '../../../constants';
import BCInput from 'app/components/bc-input/bc-input';
import { allStates } from 'utils/constants';
import classNames from 'classnames';
import styled from 'styled-components';
import styles from './bc-customer-info-modal.style';
import Geocode from 'react-geocode';
import Config from '../../../config';
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Checkbox,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  TextField,
} from '@material-ui/core';
import {
  useFormik
} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {
  closeModalAction,
  setModalDataAction
} from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import {
  getCustomerDetailAction,
  loadingSingleCustomers,
  updateCustomerAction
} from 'actions/customer/customer.action';
import '../../../scss/index.scss';
import BCMapWithMarker from '../../components/bc-map-with-marker/bc-map-with-marker';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {error, success} from 'actions/snackbar/snackbar.action';
import { loadTierListItems } from 'actions/invoicing/items/items.action';

interface AllStateTypes {
  abbreviation: string,
  name: string,
}

function BCEditCutomerInfoModal({ classes, customerInfo }: any) {
  const dispatch = useDispatch();
  const [nameLabelState, setNameLabelState] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutID = useRef<NodeJS.Timeout|null>(null);

  const [positionValue, setPositionValue] = useState({
    'lang':
      customerInfo &&
      customerInfo.location &&
      customerInfo.location.coordinates.length > 1
        ? customerInfo.location.coordinates[0]
        : 0,
    'lat':
      customerInfo &&
      customerInfo.location &&
      customerInfo.location.coordinates.length > 1
        ? customerInfo.location.coordinates[1]
        : 0
  });

  const initialValues = {
    'name':
      customerInfo &&
      customerInfo.customerName &&
      customerInfo.customerName !== 'N/A'
        ? customerInfo.customerName
        : '',
    'contactName':
      customerInfo &&
      customerInfo.contactName &&
      customerInfo.contactName !== 'N/A'
        ? customerInfo.contactName
        : '',
    'phone':
      customerInfo && customerInfo.phone && customerInfo.phone
        ? customerInfo.phone
        : '',
    'email':
      customerInfo &&
      customerInfo.email &&
      customerInfo.email &&
      customerInfo.email !== 'N/A'
        ? customerInfo.email
        : '',
    'city':
      customerInfo &&
      customerInfo.customerAddress &&
      customerInfo.customerAddress.city
        ? customerInfo.customerAddress.city
        : '',
    'state': {
      'id':
        customerInfo &&
        customerInfo.customerAddress &&
        customerInfo.customerAddress.state
          ? allStates.findIndex(x => x.name === customerInfo.customerAddress.state)
          : -1
    },
    'unit':
      customerInfo?.customerAddress?.unit
        ? customerInfo.customerAddress.unit
        : '',
    'street':
      customerInfo?.customerAddress?.street
        ? customerInfo.customerAddress.street
        : '',

    'zipCode':
      customerInfo &&
      customerInfo.customerAddress &&
      customerInfo.customerAddress.zipCode
        ? customerInfo.customerAddress.zipCode
        : '',
    'latitude':
      customerInfo &&
      customerInfo.location &&
      customerInfo.location.coordinates.length > 1
        ? customerInfo.location.coordinates[1]
        : 0,
    'longitude':
      customerInfo &&
      customerInfo.location &&
      customerInfo.location.coordinates.length > 1
        ? customerInfo.location.coordinates[0]
        : 0,
    'customerId':
      customerInfo && customerInfo.customerId ? customerInfo.customerId : '',
    'vendorId':
      customerInfo &&
      customerInfo.vendorId &&
      customerInfo.vendorId !== ''
        ? customerInfo.vendorId
        : '',
    "isActive": customerInfo?.isActive ?? true,
  };

  const filterOptions = createFilterOptions({
    'stringify': (option: AllStateTypes) => option.abbreviation + option.name
  });

  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  const updateMapFromLatLng = (name: string, value: any): void => {
    if (name === 'lat') {
      setPositionValue({
        'lang': positionValue.lang,
        'lat': parseFloat(value)
      });
    } else {
      setPositionValue({
        'lang': parseFloat(value),
        'lat': positionValue.lat
      });
    }
  };

  useEffect(
    () => {
      Geocode.setApiKey(Config.REACT_APP_GOOGLE_KEY);
      dispatch(loadTierListItems.fetch());
    }
    , []
  );

  const isValidate = (requestObj: any) => {
    let validateFlag = true;
    if (requestObj.name === '') {
      setNameLabelState(true);
      validateFlag = false;
    } else {
      setNameLabelState(false);
    }
    return validateFlag;
  };

  const handleSelectState = (value: AllStateTypes) => {
    const index = allStates.findIndex((state: AllStateTypes) => state === value);
    setFieldValue('state.id', index);
  };

  const renderWarnModal = () => {
    return (
      <div>
        <Dialog
          open={isOpen}
          //onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Warning"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will make the Customer and all their Subdivisions <b>Inactive</b> in BlueClerk,
              but the customer will remain <b>active</b> in QuickBooks Online.<br/>
              Click yes if you would like to make this change.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.warnNoButton}
              color={'secondary'}
              variant={'contained'}
              onClick={() => setIsOpen(false)} autoFocus>No</Button>
            <Button
              className={classes.warnYesButton}
              variant={'contained'}
              onClick={() => {
              setFieldValue('isActive', false);
              setIsOpen(false)
            }}>Yes</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const {
    'values': FormikValues,
    'handleChange': formikChange,
    'handleSubmit': FormikSubmit,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const val = values?.phone;
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

      const updateCustomerrequest = {
        ...values,
        'state': ''
      };

      if (values.state.id !== -1) {
        updateCustomerrequest.state =
          allStates[values.state.id].name;
      }

      updateCustomerrequest.latitude = positionValue.lat;
      updateCustomerrequest.longitude = positionValue.lang;

      if (isValidate(updateCustomerrequest)) {
        await dispatch(updateCustomerAction(updateCustomerrequest, () => {
          closeModal();
          dispatch(loadingSingleCustomers());
          dispatch(getCustomerDetailAction(updateCustomerrequest));
        }));
        dispatch(success('Update Customer Info Successful!'));
      }
    }
  })

  const updateMap = (): void => {
    const {street, city, state, zipCode} = FormikValues;

    let stateVal: any = '';
    if (state?.id !== undefined) {
      stateVal = allStates[state.id].name;
    }

    let fullAddr = '';
    fullAddr = fullAddr.concat(
      street !== undefined ? street : '',
      ' ',
      city !== undefined ? city : '',
      ' ',
      stateVal,
      ' ',
      zipCode !== undefined ? zipCode : '',
      ' ',
      'USA'
    );

    Geocode.fromAddress(fullAddr).then(
      (response: {
        results: { geometry: { location: { lat: any; lng: any } } }[];
      }) => {
        const { lat, lng } = response.results[0].geometry.location;
        setPositionValue({
          'lang': lng,
          'lat': lat
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
  };


  useEffect(() => {
    if (timeoutID.current) {
      clearTimeout(timeoutID.current);
      timeoutID.current = setTimeout(() => updateMap(), 500);
    } else {
      timeoutID.current = setTimeout(() => null, 0);
    }

  }, [FormikValues.street, FormikValues.city, FormikValues.state, FormikValues.zipCode])


  const getMaskString = (str: string): string => {
    const x = str
      .replace(
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
    <MainContainer>
      <PageContainer>
        <DataContainer
          className={'editCustomerContainer'}
          id={'0'}>
          <Grid container>
            <Grid
              item
              lg={6}
              sm={12}>
                  <form className={'editCustomerForm'} onSubmit={FormikSubmit}>
                    <Grid
                      className={classes.paper}
                      item
                      sm={12}
                    />

                    <Grid
                      className={classes.paper}
                      item
                      sm={12}>
                      <FormGroup className={'required'}>
                        <InputLabel className={classes.label}>
                          {'Name'}
                        </InputLabel>

                        <BCInput
                          name={'name'}
                          handleChange={formikChange}
                          placeholder={'Name'}
                          required
                          dense={true}
                          value={FormikValues.name}
                        />
                        {nameLabelState ? <label>
                          {'Required'}
                        </label> : ''}
                      </FormGroup>
                    </Grid>

                    <Grid
                      className={classes.paper}
                      item
                      sm={12}>
                      <FormGroup>
                        <InputLabel className={classes.label}>
                          {'Email'}
                        </InputLabel>
                        <BCInput
                          name={'email'}
                          handleChange={formikChange}
                          placeholder={'Email'}
                          dense={true}
                          type={'email'}
                          value={FormikValues.email}
                        />
                      </FormGroup>
                    </Grid>

                    <Grid container>
                      <Grid
                        className={classes.paper}
                        item
                        sm={6}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'Contact Name'}
                          </InputLabel>
                          <BCInput
                            name={'contactName'}
                            handleChange={formikChange}
                            placeholder={'Contact Name'}
                            value={FormikValues.contactName}
                            dense={true}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid
                        className={classes.paper}
                        item
                        sm={6}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'Phone Number'}
                          </InputLabel>
                          <BCInput
                            name={'phone'}
                            handleChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                              event.target.value = getMaskString(event.target.value);
                              formikChange(event);
                            }}
                            type={"text"}
                            placeholder={'Phone Number'}
                            value={getMaskString(FormikValues.phone)}
                            dense={true}
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid
                        className={classes.paper}
                        item
                        sm={12}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'Street'}
                          </InputLabel>
                          <BCInput
                            name={'street'}
                            handleChange={(e: any) => {
                              setFieldValue('street', e.target.value);
                              //(FormikValues, e.target.value);
                            }}
                            placeholder={'Street'}
                            value={FormikValues.street}
                            dense={true}
                          />
                        </FormGroup>

                      </Grid>
                      <Grid
                        className={classes.paper}
                        item
                        sm={6}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'Unit # / House #'}
                          </InputLabel>
                          <BCInput
                            name={'unit'}
                            onChange={(e: any) => setFieldValue('unit', e.target.value)}
                            placeholder={'Unit #'}
                            value={FormikValues.unit}
                            dense={true}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid
                        className={classes.paper}
                        item
                        sm={6}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'City'}
                          </InputLabel>
                          <BCInput
                            name={'city'}
                            onChange={(e: any) => setFieldValue('city', e.target.value)}
                            placeholder={'City'}
                            value={FormikValues.city}
                            dense={true}
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid
                        className={classes.paper}
                        item
                        sm={6}>
                        <FormGroup>
                          <div className={'search_form_wrapper'}>
                            <Autocomplete
                              autoHighlight
                              defaultValue={allStates[FormikValues.state.id]}
                              filterOptions={filterOptions}
                              getOptionLabel={option => option.name}
                              id={'tags-standard'}
                              onChange={(ev: any, newValue: any) => handleSelectState(
                                newValue,
                              )}
                              options={allStates}
                              renderInput={params =>
                                <>
                                  <InputLabel className={`${classes.label} state-label`}>
                                    {'State'}
                                  </InputLabel>
                                  <TextField
                                    {...params}
                                    variant={'standard'}
                                  />
                                </>
                              }
                            />
                          </div>
                        </FormGroup>
                      </Grid>

                      <Grid
                        className={classes.paper}
                        item
                        sm={6}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'Zip Code'}
                          </InputLabel>
                          <BCInput
                            name={'zipCode'}
                            handleChange={(e: any) => setFieldValue('zipCode', e.target.value)}
                            placeholder={'Zip Code'}
                            type={'number'}
                            value={FormikValues.zipCode}
                            dense={true}
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>

                      <Grid
                        className={classes.paper}
                        item
                        sm={12}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'Vendor Number'}
                          </InputLabel>
                          <BCInput
                            name={'vendorId'}
                            handleChange={formikChange}
                            placeholder={'Vendor Number'}
                            value={FormikValues.vendorId}
                            dense={true}
                          />
                        </FormGroup>
                      </Grid>
                    {customerInfo?.customerId &&
                    <Grid
                      className={classes.paper}
                      item
                      sm={12}>
                      <FormControlLabel control={
                        <Checkbox
                          onChange={(e: any) => {
                            if (!e.target.checked && customerInfo.isActive) setIsOpen(true);
                            else setFieldValue('isActive', e.target.checked)
                          }}
                          name={'isActive'}
                          color={'primary'}
                          checked={FormikValues.isActive}
                        />
                      } label=""/>
                      <span
                        style={{color: '#383838', fontSize: '1rem', marginLeft: -15}}>
                            Active</span>
                    </Grid>
                    }

                    <Grid
                      className={classNames(
                        classes.paper,
                        'form_button_wrapper-desktop'
                      )}
                      item
                      md={12}>
                      <Box mt={2}>
                        <Button
                          disabled={isSubmitting}
                          className={'save-customer-button'}
                          color={'primary'}
                          type={'submit'}
                          variant={'contained'}>
                          {customerInfo && customerInfo.update
                            ? 'Update'
                            : 'Save'}
                        </Button>
                        <Button
                          disabled={isSubmitting}
                          className={'cancel-customer-button'}
                          color={'secondary'}
                          onClick={() => closeModal()}
                          variant={'contained'}>
                          {'Cancel'}
                        </Button>
                      </Box>
                    </Grid>
                  </form>
            </Grid>

            <Grid
              className={classNames(classes.paper, classes.mapLocation)}
              item
              sm={6}>
              <Grid container>
                <Grid
                  className={classes.paper}
                  item
                  sm={6}>
                  <FormGroup>
                    <InputLabel className={classes.label}>
                      {'Latitude'}
                    </InputLabel>
                    <BCInput
                      onChange={(e: any) => updateMapFromLatLng('lat', e.target.value)}
                      placeholder={'Longitude'}
                      type={'number'}
                      value={positionValue.lat}
                      variant={'outlined'}
                    />
                  </FormGroup>
                </Grid>
                <Grid
                  className={classes.paper}
                  item
                  sm={6}>
                  <FormGroup>
                    <InputLabel className={classes.label}>
                      {'Longitude'}
                    </InputLabel>
                    <BCInput
                      onChange={(e: any) => updateMapFromLatLng('lng', e.target.value)}
                      placeholder={'Longitude'}
                      type={'number'}
                      value={positionValue.lang}
                      variant={'outlined'}
                    />
                  </FormGroup>
                </Grid>
              </Grid>

              <div className={classNames(classes.paper, classes.mapWrapper)}>
                <BCMapWithMarker
                  lang={positionValue.lang}
                  lat={positionValue.lat}
                  reactAppGoogleKeyFromConfig={Config.REACT_APP_GOOGLE_KEY}
                />
              </div>
            </Grid>
          </Grid>
        </DataContainer>
      </PageContainer>
      {renderWarnModal()}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding: 30px;
  width: 100%;
  padding-left: 65px;
  padding-right: 65px;
  margin: 0 auto;
`;

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
  .MuiAutocomplete-inputRoot {
    height: 40px;
  }
  .state-label {
    color: #383838;
    font-size: 18px !important;
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

export default withStyles(styles, { 'withTheme': true })(BCEditCutomerInfoModal);
