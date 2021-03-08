import * as CONSTANTS from '../../../constants';
import BCMapWithMarker from '../../components/bc-map-with-marker/bc-map-with-marker';
import BCTextField from '../../components/bc-text-field/bc-text-field';
import Config from '../../../config';
import Geocode from 'react-geocode';
import { allStates } from 'utils/constants';
import classNames from 'classnames';
import styled from 'styled-components';
import styles from './bc-add-jobsite-modal.style';
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import { createJobSiteAction, getJobSites, updateJobSiteAction } from 'actions/job-site/job-site.action';
import { useHistory } from 'react-router-dom';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { success } from 'actions/snackbar/snackbar.action';

import '../../../scss/index.scss';

interface Props {
  classes: any
}

interface AllStateTypes {
  abbreviation: string,
  name: string,
}



function BCAddJobSiteModal({ classes, jobSiteInfo }: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [positionValue, setPositionValue] = useState({
    'long': jobSiteInfo && jobSiteInfo.location && jobSiteInfo.location.long ? jobSiteInfo.location.long : 0,
    'lat': jobSiteInfo && jobSiteInfo.location && jobSiteInfo.location.lat ? jobSiteInfo.location.lat : 0
  });
  const [nameLabelState, setNameLabelState] = useState(false);
  const [latLabelState, setLatLabelState] = useState(false);
  const [longLabelState, setLongLabelState] = useState(false);
  const initialValues = {
    "name": jobSiteInfo && jobSiteInfo.name ? jobSiteInfo.name : '',
    "contact": {
      "name": jobSiteInfo && jobSiteInfo.contact && jobSiteInfo.contact.name ? jobSiteInfo.contact.name : '',
      "phone": jobSiteInfo && jobSiteInfo.contact && jobSiteInfo.contact.phone ? jobSiteInfo.contact.phone : '',
      "email": jobSiteInfo && jobSiteInfo.contact && jobSiteInfo.contact.email ? jobSiteInfo.contact.email : ''
    },
    "location": {
      "lat": 0,
      "long": 0
    },
    "address": {
      "city": jobSiteInfo && jobSiteInfo.address && jobSiteInfo.address.city ? jobSiteInfo.address.city : '',
      'state': {
        'id': jobSiteInfo && jobSiteInfo.address && jobSiteInfo.address.state ? allStates.findIndex(x => x.name === jobSiteInfo.address.state) : 0
      },
      "street": jobSiteInfo && jobSiteInfo.address && jobSiteInfo.address.street ? jobSiteInfo.address.street : '',
      "zipcode": jobSiteInfo && jobSiteInfo.address && jobSiteInfo.address.zipcode ? jobSiteInfo.address.zipcode : ''
    },
    "customerId": jobSiteInfo && jobSiteInfo.customerId ? jobSiteInfo.customerId : '',
    "jobSiteId": jobSiteInfo && jobSiteInfo._id ? jobSiteInfo._id : '',
    "locationId": jobSiteInfo && jobSiteInfo.locationId ? jobSiteInfo.locationId : ''
  }

  const filterOptions = createFilterOptions({
    stringify: (option: AllStateTypes) => option.abbreviation + option.name,
  });


  const updateMap = (values: any, street?: any, city?: any, zipCode?: number, state?: number): void => {
    let stateVal: any = '';
    Geocode.setApiKey(Config.REACT_APP_GOOGLE_KEY);
    if (state) {
      stateVal = allStates[state].name;
    }

    let fullAddr = '';
    fullAddr = fullAddr.concat(street ? street : values.address.street, ' ', city ? city : values.address.city, ' ', stateVal, ' ', zipCode ? zipCode : values.address.zipcode, ' ', 'USA');


    Geocode.fromAddress(fullAddr).then(
      (response: { results: { geometry: { location: { lat: any; lng: any; }; }; }[]; }) => {
        const { lat, lng } = response.results[0].geometry.location;
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

    if (requestObj.location.lat === 0) {
      setLatLabelState(true);
      validateFlag = false;
    } else {
      setLatLabelState(false);

    }

    if (requestObj.location.long === 0) {
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


  return (
    <>
      <MainContainer>
        <PageContainer className="map_modal__wrapper">
          <DataContainer
            id={'0'}>
            <Grid container>
              <Grid
                item
                sm={12}
                lg={6}>
                <Formik
                  initialValues={initialValues}
                  onSubmit={async (values, { setSubmitting }) => {
                    let state = values.address.state.id;
                    values.location.lat = positionValue.lat;
                    values.location.long = positionValue.long;
                    const requestObj = {
                      ...values, address: {
                        city: '', state: '', street: '', zipcode: ''
                      }
                    };
                    requestObj.address.city = values.address.city;
                    requestObj.address.state = allStates[state].name;
                    requestObj.address.street = values.address.street;
                    requestObj.address.zipcode = values.address.zipcode;
                    if (isValidate(requestObj)) {
                      if (jobSiteInfo.update) {
                        await dispatch(updateJobSiteAction(requestObj, () => {
                          closeModal();
                          dispatch(getJobSites(requestObj))
                        }))
                        dispatch(success("Update Job Site Successful!"));
                      } else {
                        await dispatch(createJobSiteAction(requestObj, () => {
                          closeModal();
                        }))
                        dispatch(success("Creating Job Site Successful!"));
                      }
                    }
                    setTimeout(() => {
                      setSubmitting(false);
                    }, 400);
                  }}
                  validateOnChange>
                  {({ handleChange, values, errors, isSubmitting, setFieldValue }) =>
                    <Form >
                      <Grid
                        className={classes.paper}
                        item
                        sm={12}>

                      </Grid>

                      <Grid
                        className={classes.paper}
                        item
                        sm={12}>
                        <FormGroup className={'required'}>
                          <InputLabel className={classes.label}>
                            {'Job Site Name'}
                          </InputLabel>

                          <BCTextField
                            name={'name'}
                            placeholder={'Job Site Name'}
                            required={true}
                            onChange={(e: any) => {
                              setFieldValue('name', e.target.value)
                            }}
                          />
                          {nameLabelState ? <label>Required</label> : ''}
                        </FormGroup>
                      </Grid>

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
                                updateMap(values, e.target.value)
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

                                defaultValue={jobSiteInfo?._id && allStates[values.address.state.id]}
                                id="tags-standard"
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
                      </Grid>

                      <Grid
                        className={classNames(classes.paper, 'form_button_wrapper-desktop')}
                        item
                        md={12}>
                        <Box mt={2}>
                          <Button
                            className={'save-customer-button'}
                            color={'primary'}
                            type={'submit'}
                            variant={'contained'}>
                            {jobSiteInfo && jobSiteInfo.update ? 'Update' : 'Save'}
                          </Button>
                          <Button
                            className={'cancel-customer-button'}
                            onClick={() => closeModal()}
                            color={'secondary'}
                            variant={'contained'}>
                            {'Cancel'}
                          </Button>
                        </Box>
                      </Grid>

                    </Form>
                  }
                </Formik>
              </Grid>

              <Grid
                className={classNames(classes.paper, classes.mapLocation)}
                item
                sm={12}
                lg={6}>
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
                        onChange={(e: any) => updateMapFromLatLng('lat', e.target.value)}
                        placeholder={'Latitude'}
                        variant={'outlined'}
                        type={'number'}
                        value={positionValue.lat}
                      />
                      {latLabelState ? <label>Required</label> : null}
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
                      {longLabelState ? <label>Required</label> : null}
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


                <Grid
                  className={classNames(classes.paper, 'form_button_wrapper-mobile')}
                  item
                  md={12}>
                  <Box mt={2}>
                    <Button
                      className={'save-customer-button'}
                      color={'primary'}
                      type={'submit'}
                      variant={'contained'}>
                      {jobSiteInfo && jobSiteInfo.update ? 'Update' : 'Save'}
                    </Button>
                    <Button
                      className={'cancel-customer-button'}
                      onClick={() => closeModal()}
                      color={'secondary'}
                      variant={'contained'}>
                      {'Cancel'}
                    </Button>
                  </Box>
                </Grid>

              </Grid>
            </Grid>
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
  .MuiInputBase-input {
    color: #383838;
    font-size: 16px;
    padding: 12px 14px;
  }
  .MuiAutocomplete-inputRoot {
    height: 40px;
  }
  .state-label {
    color: #383838;
    font-size: 18px !important;
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
)(BCAddJobSiteModal);

