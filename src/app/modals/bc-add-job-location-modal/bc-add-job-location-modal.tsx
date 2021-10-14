import * as CONSTANTS from '../../../constants';
import BCMapWithMarker from '../../components/bc-map-with-marker/bc-map-with-marker';
import BCTextField from '../../components/bc-text-field/bc-text-field';
import Config from '../../../config';
import Geocode from 'react-geocode';
import {allStates} from 'utils/constants';
import classNames from 'classnames';
import styled from 'styled-components';
import styles from './bc-add-job-location-modal.style';
import {withStyles} from '@material-ui/core/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  TextField,
  Typography
} from '@material-ui/core';
import {Form, Formik} from 'formik';
import React, {useState} from 'react';
import {closeModalAction, setModalDataAction} from 'actions/bc-modal/bc-modal.action';
import {useDispatch} from 'react-redux';
import {
  createJobLocationAction,
  refreshJobLocation,
  updateJobLocationAction
} from 'actions/job-location/job-location.action';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import {error, success} from 'actions/snackbar/snackbar.action';
import {useHistory, useLocation} from 'react-router-dom';
import debounce from 'lodash.debounce';

import '../../../scss/index.scss';

interface Props {
  classes: any
}


interface AllStateTypes {
  abbreviation: string,
  name: string,
}


function BCAddJobLocationModal({classes, jobLocationInfo}: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<any>();

  const [positionValue, setPositionValue] = useState({
    'long': jobLocationInfo?.location?.coordinates?.[0] ?? 0,
    'lat': jobLocationInfo.location?.coordinates?.[1] ?? 0
  });
  const [nameLabelState, setNameLabelState] = useState(false);
  const [latLabelState, setLatLabelState] = useState(false);
  const [longLabelState, setLongLabelState] = useState(false);
  const initialValues = {
    "name": jobLocationInfo?.name,
    "contact": {
      "name": jobLocationInfo?.contacts?.[0]?.name,
      "phone": jobLocationInfo?.contacts?.[0]?.phone,
      "email": jobLocationInfo?.contacts?.[0]?.email,
    },
    "locationLat": 0,
    "locationLong": 0,
    "address": {
      "city": jobLocationInfo?.address?.city,
      'state': {
        'id': jobLocationInfo?.address?.state ? allStates.findIndex(x => x.name === jobLocationInfo.address.state || x.abbreviation === jobLocationInfo.address.state) : -1
      },
      "street": jobLocationInfo?.address?.street,
      "zipcode": jobLocationInfo?.address?.zipcode,
    },
    "customerId": jobLocationInfo?.customerId ?? '',
    "jobLocationId": jobLocationInfo?._id,
    "isActive": jobLocationInfo?.isActive ?? true,
  }

  const inActiveMessage= jobLocationInfo?.isActive ? 'Your are about to make this location inactive' : 'This location is inactive';

  const filterOptions = createFilterOptions({
    stringify: (option: AllStateTypes) => option.abbreviation + option.name,
  });

  const updateMap = (values: any, street?: any, city?: any, zipCode?: number, state?: number): void => {
    let stateVal: any = '';
    Geocode.setApiKey(Config.REACT_APP_GOOGLE_KEY);
    if (state !== undefined && state >=0 ) {
      stateVal = allStates[state].name;
    }

    let fullAddr = '';
    fullAddr = fullAddr.concat(street ? street : values.address.street, ' ', city ? city : values.address.city, ' ', stateVal, ' ', zipCode ? zipCode : values.address.zipcode, ' ', 'USA');

    Geocode.fromAddress(fullAddr).then(
      (response: { results: { geometry: { location: { lat: any; lng: any; }; }; }[]; }) => {
        const {lat, lng} = response.results[0].geometry.location;
        setPositionValue({
          'long': lng,
          'lat': lat
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
  };

  const updateMapFromLatLng = (name: string, value: any): void => {
    Geocode.setApiKey(Config.REACT_APP_GOOGLE_KEY);
    if (name === 'lat') {
      setPositionValue({
        'long': positionValue.long,
        'lat': parseFloat(value === '' ? 0 : value)
      });

    } else {
      setPositionValue({
        'long': parseFloat(value === '' ? 0 : value),
        'lat': positionValue.lat
      });
    }
  };

  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  const isValidate = (requestObj: any) => {
    let validateFlag = true;
    if (requestObj.name === '') {
      setNameLabelState(true);
      validateFlag = false;
    } else {
      setNameLabelState(false);
    }

    if (requestObj.locationLat === 0) {
      setLatLabelState(true);
      validateFlag = false;
    } else {
      setLatLabelState(false);

    }

    if (requestObj.locationLong === 0) {
      setLongLabelState(true);
      validateFlag = false;
    } else {
      setLongLabelState(false);

    }
    return validateFlag;
  }

  const handleSelectState = (value: AllStateTypes, updateMap: any, setFieldValue: any, values: any) => {
    const index = allStates.findIndex((state: AllStateTypes) => state === value);
    updateMap(values, undefined, undefined, undefined, index);
    setFieldValue("address.state.id", index);
  }

  const refreshPage = (jobLocationUpdated: any) => {
    const obj = {...jobLocationUpdated, customerId: jobLocationInfo.customerId}
    const {name: locationName} = jobLocationUpdated;
    const locationNameLink = locationName !== undefined ? locationName.replace(/ /g, '') : 'locationName';
    const {currentPage, customerName} = location.state;
    const state = {...obj, currentPage, customerName};
    history.replace({
      'pathname': `/main/customers/location/${locationNameLink}`,
      'state': state,
    });
  }
  return (
    <>
      <MainContainer>
        <PageContainer className="map_modal__wrapper">
          <DataContainer
            id={'0'}>
            <Formik
              initialValues={initialValues}
              onSubmit={debounce(async (values, {setSubmitting}) => {
                let state = values.address.state.id;
                values.locationLat = positionValue.lat;
                values.locationLong = positionValue.long;
                const requestObj: any = {
                  ...values,
                  city: '',
                  state: '',
                  street: '',
                  zipcode: ''

                };
                requestObj.city = values.address.city;
                requestObj.state = state >= 0 ? allStates[state].name : '';
                requestObj.street = values.address.street;
                requestObj.zipcode = values.address.zipcode;
                requestObj.contact = JSON.stringify(values.contact);
                delete requestObj.address;

                if (isValidate(requestObj)) {
                  if (jobLocationInfo._id) {
                    delete requestObj.contact;
                    await dispatch(updateJobLocationAction(requestObj,
                      ({status, message, jobLocation}: { status: number, message: string, jobLocation: any }) => {
                        if (status === 1) {
                          refreshPage(jobLocation);
                          dispatch(success(message));
                          dispatch(refreshJobLocation(true));
                          closeModal();
                        } else {
                          dispatch(error(message));
                        }
                        setSubmitting(false);
                      }
                    ));
                  } else {
                    delete requestObj.jobLocationId;
                    await dispatch(createJobLocationAction(requestObj,
                      ({status, message}: { status: number, message: string }) => {
                        if (status === 1) {
                          dispatch(success(message));
                          dispatch(refreshJobLocation(true));
                          closeModal();
                        } else {
                          dispatch(error(message));
                        }
                        setSubmitting(false);
                      }))
                  }
                }
              }, 400)}
              validateOnChange>
              {({handleChange, values, errors, isSubmitting, setFieldValue}) =>
                <Form>
                  <Grid container spacing={2}>
                    <Grid container item xs={6}>
                      <Grid
                        className={classes.paper}
                        item
                        sm={12}>
                        <FormGroup className={'required'}>
                          <InputLabel className={classes.label}>
                            {'Job Location Name'}
                          </InputLabel>

                          <BCTextField
                            name={'name'}
                            placeholder={'Job Location Name'}
                            required={true}
                            onChange={(e: any) => {
                              setFieldValue('name', e.target.value)
                            }}
                          />
                          {nameLabelState ? <label>Required</label> : ''}
                        </FormGroup>
                      </Grid>
                      <>
                        <Grid
                          className={classes.paper}
                          item
                          sm={12}>
                          <FormGroup>
                            <InputLabel className={classes.label}>
                              {'Email'}
                            </InputLabel>
                            <BCTextField
                              name={'contact.email'}
                              placeholder={'Email'}
                              disabled={jobLocationInfo?._id}
                              type={'email'}
                              onChange={(e: any) => {
                                setFieldValue('contact.email', e.target.value)
                              }}

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
                              <BCTextField
                                name={'contact.name'}
                                placeholder={'Contact Name'}
                                disabled={jobLocationInfo?._id}
                                onChange={(e: any) => {
                                  setFieldValue('contact.name', e.target.value)
                                }}
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
                              <BCTextField
                                name={'contact.phone'}
                                placeholder={'Phone Number'}
                                disabled={jobLocationInfo?._id}
                                type={'number'}
                                onChange={(e: any) => {
                                  setFieldValue('contact.phone', e.target.value)
                                }}
                              />
                            </FormGroup>
                          </Grid>
                        </Grid>
                      </>

                      <Grid container>
                        <Grid
                          className={classes.paper}
                          item
                          sm={6}>
                          <FormGroup>
                            <InputLabel className={classes.label}>
                              {'Street'}
                            </InputLabel>
                            <BCTextField
                              onChange={(e: any) => {
                                setFieldValue('address.street', e.target.value)
                                updateMap(values, e.target.value);
                              }}
                              name={'address.street'}
                              placeholder={'Street'}
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
                            <BCTextField
                              onChange={(e: any) => {
                                setFieldValue('address.city', e.target.value)
                                updateMap(values, undefined, e.target.value)
                              }}
                              name={'address.city'}
                              placeholder={'City'}
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
                            {/* <InputLabel className={classes.label}>
                                  {'State'}
                                </InputLabel>
                                <Field
                                  as={Select}
                                  enableReinitialize
                                  name={'address.state.id'}
                                  onChange={(e: any) => {
                                    updateMap(values, undefined, undefined, undefined, e.target.value);
                                    handleChange(e);
                                  }}
                                  type={'select'}
                                  variant={'outlined'}>
                                  {allStates.map((state, id) =>
                                    <MenuItem
                                      key={id}
                                      value={id}>
                                      {state.name}
                                    </MenuItem>)
                                  }
                                </Field> */}


                            <div className="search_form_wrapper">

                              <Autocomplete
                                id="tags-standard"
                                defaultValue={jobLocationInfo?._id && allStates[values.address.state.id]}
                                options={allStates}
                                getOptionLabel={(option) => option.name}
                                autoHighlight
                                filterOptions={filterOptions}
                                onChange={(ev: any, newValue: any) => handleSelectState(
                                  newValue,
                                  updateMap,
                                  setFieldValue,
                                  values
                                )}
                                renderInput={(params) => (
                                  <>
                                    <InputLabel className={`${classes.label} state-label`}>
                                      {"State"}
                                    </InputLabel>
                                    <TextField
                                      {...params}
                                      variant="standard"
                                    />
                                  </>
                                )}
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
                            <BCTextField
                              onChange={(e: any) => {
                                setFieldValue('address.zipcode', e.target.value)
                                updateMap(values, '', '', e.target.value)
                              }}
                              name={'address.zipcode'}
                              placeholder={'Zip Code'}
                              type={'number'}
                            />
                          </FormGroup>
                        </Grid>
                        {jobLocationInfo?._id &&
                        <Grid
                          className={classes.paper}
                          item
                          sm={12}>
                            <FormControlLabel control={
                              <Checkbox
                                onChange={(e: any) => {
                                  setFieldValue('isActive', e.target.checked)
                                }}
                                name={'isActive'}
                                color={'primary'}
                                checked={values.isActive}
                              />
                            } label=""/>
                          <span
                            style={{color: '#383838', fontSize: '1rem', marginLeft: -15}}>
                            Active</span>
                            {!values.isActive &&
                            <Typography
                              variant={'subtitle1'}
                              style={{color: 'red', marginTop: -5}}>
                              {inActiveMessage}</Typography>
                            }
                        </Grid>
                        }
                      </Grid>

                      <Grid
                        className={classNames(classes.paper, 'form_button_wrapper-desktop')}
                        item
                        md={12}>
                        <Box mt={2}>
                          <Button
                            className={'save-customer-button'}
                            disabled={isSubmitting}
                            color={'primary'}
                            type={'submit'}
                            variant={'contained'}>
                            {jobLocationInfo && jobLocationInfo.update ? 'Update' : 'Save'}
                          </Button>
                          <Button
                            className={'cancel-customer-button'}
                            disabled={isSubmitting}
                            onClick={() => closeModal()}
                            color={'secondary'}
                            variant={'contained'}>
                            {'Cancel'}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container item xs={6}>
                      <Grid
                        className={classNames(classes.paper, classes.mapLocation)}
                        item>
                        <Grid container>
                          <Grid
                            className={classes.paper}
                            item
                            sm={6}>
                            <FormGroup className={'required'}>
                              <InputLabel className={classes.label}>
                                {'Latitude'}
                              </InputLabel>
                              <TextField
                                name={'location.lat'}
                                required
                                onChange={(e: any) => updateMapFromLatLng('lat', e.target.value)}
                                placeholder={'Latitude'}
                                variant={'outlined'}
                                type={'number'}
                                value={positionValue.lat}
                              />
                              {latLabelState ? <label>Required</label> : ''}
                            </FormGroup>
                          </Grid>
                          <Grid
                            className={classes.paper}
                            item
                            sm={6}>
                            <FormGroup className={'required'}>
                              <InputLabel className={classes.label}>
                                {'Longitude'}
                              </InputLabel>
                              <TextField
                                name={'location.long'}
                                onChange={(e: any) => {
                                  updateMapFromLatLng('lng', e.target.value)
                                }}
                                type={'number'}
                                required
                                placeholder={'Longitude'}
                                variant={'outlined'}
                                value={positionValue.long}
                              />
                              {longLabelState ? <label>Required</label> : ''}
                            </FormGroup>

                          </Grid>
                        </Grid>

                        <div className="modal_map__wrapper">
                          <div className={classNames(classes.paper, classes.mapWrapper)}>
                            <BCMapWithMarker
                              lang={positionValue.long}
                              lat={positionValue.lat}
                            />
                          </div>
                        </div>
                      </Grid>

                    </Grid>
                  </Grid>
                </Form>
              }
            </Formik>
          </DataContainer>
        </PageContainer>
      </MainContainer>
    </>
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

export default withStyles(
  styles,
  {'withTheme': true}
)(BCAddJobLocationModal);

