import * as CONSTANTS from '../../../constants';
import BCMapWithMarker from '../../components/bc-map-with-marker/bc-map-with-marker';
import BCTextField from '../../components/bc-text-field/bc-text-field';
import Config from '../../../config';
import Geocode from 'react-geocode';
import { allStates } from 'utils/constants';
import classNames from 'classnames';
import styled from 'styled-components';
import styles from './bc-add-job-location-modal.style';
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
import { createJobLocationAction } from 'actions/job-location/job-location.action';


import '../../../scss/index.scss';

interface Props {
  classes: any
}

function BCAddJobLocationModal({ classes, jobLocationInfo }: any) {
  const dispatch = useDispatch();
  const [positionValue, setPositionValue] = useState({
    'long': jobLocationInfo && jobLocationInfo.location && jobLocationInfo.location.long ? jobLocationInfo.location.long : -86.902298,
    'lat': jobLocationInfo && jobLocationInfo.location && jobLocationInfo.location.lat ? jobLocationInfo.location.lat : 32.3182314
  });
  const [nameLabelState, setNameLabelState] = useState(false);
  const [latLabelState, setLatLabelState] = useState(false);
  const [longLabelState, setLongLabelState] = useState(false);
  const initialValues = {
    "name": '',
    "contact": {
      "name": '',
      "phone": '',
      "email":  ''
    },
    "location": {
      "lat": 0,
      "long": 0
    },
    "address": {
      "city": '',
      'state': {
        'id': 0
      },
      "street":  '',
      "zipcode":  ''
    },
    "customerId": jobLocationInfo && jobLocationInfo.customerId ? jobLocationInfo.customerId : '',
  }
 

  const updateMap = (values: any, state: number): void => {
    Geocode.setApiKey(Config.REACT_APP_GOOGLE_KEY);

    let fullAddr = '';
    fullAddr = fullAddr.concat(values.street, ' ', values.city, ' ', allStates[state].name, ' ', 'USA');

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
    if(requestObj.name === ''){
      setNameLabelState(true);
      validateFlag = false;
    }else{
      setNameLabelState(false);
    }

    if(requestObj.location.lat === 0){
      setLatLabelState(true);
      validateFlag = false;
    }else{
      setLatLabelState(false);
      
    }

    if(requestObj.location.long === 0){
      setLongLabelState(true);
      validateFlag = false;
    }else{
      setLongLabelState(false);
      
    }
    return validateFlag;
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
                  onSubmit={(values, { setSubmitting }) => {
                     let state = values.address.state.id;
                     values.location.lat = positionValue.lat;
                     values.location.long = positionValue.long;
                     const requestObj = {...values, address:{
                      city: '', state: '', street: '', zipcode: ''
                     }};
                     requestObj.address.city = values.address.city;
                     requestObj.address.state = allStates[state].name;
                     requestObj.address.street = values.address.street;
                     requestObj.address.zipcode = values.address.zipcode;
                     console.log(requestObj);
                     if (isValidate(requestObj)) {
                      if (jobLocationInfo.update) {
                      } else {
                        dispatch(createJobLocationAction(requestObj, () => {
                          closeModal();
                        }))
                      }
                    }
                       
                    setTimeout(() => {
                      setSubmitting(false);
                    }, 400);
                  }}
                  validateOnChange>
                  {({ handleChange, values, errors, isSubmitting }) =>
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
                            {'Job Location Name'}
                          </InputLabel>

                          <BCTextField
                            name={'name'}
                            placeholder={'Job Location Name'}
                            required={true}
                          />
                          {nameLabelState ? <label>Required</label>: ''}
                        </FormGroup>
                      </Grid>

                      <Grid
                        className={classes.paper}
                        item
                        sm={12}>
                        <FormGroup >
                          <InputLabel className={classes.label}>
                            {'Email'}
                          </InputLabel>
                          <BCTextField
                            name={'contact.email'}
                            placeholder={'Email'}
                            type={'email'}
                           
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
                              type={'number'}
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
                            <InputLabel className={classes.label}>
                              {'Street'}
                            </InputLabel>
                            <BCTextField
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
                            <InputLabel className={classes.label}>
                              {'State'}
                            </InputLabel>
                            <Field
                              as={Select}
                              enableReinitialize
                              name={'address.state.id'}
                              onChange={(e: any) => {
                                updateMap(values, e.target.value);
                                handleChange(e);
                              }}
                              type={'select'}
                              variant={'outlined'}>
                              { allStates.map((state, id) =>
                                <MenuItem
                                  key={id}
                                  value={id}>
                                  { state.name }
                                </MenuItem>)
                              }
                            </Field>
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
                            {jobLocationInfo && jobLocationInfo.update ? 'Update' : 'Save'}
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
                      {latLabelState ? <label>Required</label>: ''}
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
                      {longLabelState ? <label>Required</label>: ''}
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
                            {jobLocationInfo && jobLocationInfo.update ? 'Update' : 'Save'}
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
)(BCAddJobLocationModal);

