import * as CONSTANTS from '../../../../constants';
import BCMapWithMarker from '../../../components/bc-map-with-marker/bc-map-with-marker';
import BCSidebar from '../../../components/bc-sidebar/bc-sidebar';
import BCSubHeader from '../../../components/bc-sub-header/bc-sub-header';
import BCTextField from '../../../components/bc-text-field/bc-text-field';
import BCToolBarSearchInput from '../../../components/bc-toolbar-search-input/bc-toolbar-search-input';
import Config from '../../../../config';
import Geocode from 'react-geocode';
import { allStates } from 'utils/constants';
import classNames from 'classnames';
import styled from 'styled-components';
import styles from './new-customer.styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  FormGroup,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { Link, useHistory, useLocation } from 'react-router-dom';
import React, { useState } from 'react';


const LINK_DATA = [
  {
    'label': 'Customer List',
    'link': '/customers/customer-list'
  },
  {
    'label': 'New Customer',
    'link': '/customers/new-customer'
  },
  {
    'label': 'Schedule/Jobs',
    'link': '/customers/schedule'
  }
];

interface Props {
  classes: any
}

function NewCustomerPage({ classes }: Props) {
  const initialValues = {
    'city': '',
    'companyName': '',
    'contactName': '',
    'email': '',
    'latitude': 0.0,
    'longitude': 0.0,
    'phoneNumber': '',
    'state': {
      'id': 0
    },
    'street': '',
    'zipCode': ''
  };
  const location = useLocation();
  const pathName = location.pathname;
  const history = useHistory();
  const [positionValue, setPositionValue] = useState({
    'lang': -90.111533,
    'lat': 29.972065
  });

  const updateMap = (values: any, state: number): void => {
    Geocode.setApiKey(Config.REACT_APP_GOOGLE_KEY);

    let fullAddr = '';
    fullAddr = fullAddr.concat(values.street, ' ', values.city, ' ', allStates[state].name, ' ', 'USA');

    Geocode.fromAddress(fullAddr).then(
      (response: { results: { geometry: { location: { lat: any; lng: any; }; }; }[]; }) => {
        const { lat, lng } = response.results[0].geometry.location;
        setPositionValue({
          'lang': lng,
          'lat': lat
        });
        console.log(lat, lng);
      },
      (error: any) => {
        console.error(error);
      }
    );
  };

  const updateMapFromLatLng = (name: string, value: any): void => {
    Geocode.setApiKey(Config.REACT_APP_GOOGLE_KEY);
    console.log(positionValue);
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

  const onClickLink = (strLink: string): void => {
    history.push(strLink);
  };

  return (
    <>
      <BCSubHeader title={'Customers'}>
        <BCToolBarSearchInput style={{
          'marginLeft': 'auto',
          'width': '321px'
        }}
        />
        <CustomerButton variant={'contained'}>
          <Link to={'/customers/new-customer'}>
            {'New Customer'}
          </Link>
        </CustomerButton>
      </BCSubHeader>

      <MainContainer>
        <BCSidebar>
          <StyledList aria-label={'customers sidebar list'}>
            {LINK_DATA.map((item, idx) => {
              if (item.label === 'Customer List') {
                return (
                  <StyledListItem
                    button
                    key={idx}
                    onClick={() => onClickLink(item.link)}
                    selected={
                      pathName === item.link || pathName === '/customers'
                    }>
                    {item.label}
                  </StyledListItem>
                );
              }
              return (
                <StyledListItem
                  button
                  key={idx}
                  onClick={() => onClickLink(item.link)}
                  selected={pathName === item.link}>
                  {item.label}
                </StyledListItem>
              );
            })}
          </StyledList>
        </BCSidebar>

        <PageContainer>
          <DataContainer
            id={'0'}>
            <Grid container>
              <Grid
                item
                sm={6}>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      setSubmitting(false);
                    }, 400);
                  }}
                  validateOnChange>
                  {({ handleChange, values, errors, isSubmitting }) =>
                    <Form onChange={() => updateMap(values, values.state.id)}>
                      <Grid
                        className={classes.paper}
                        item
                        sm={12}>
                        <p className={classes.subTitle}>
                          {'New Customer Information'}
                        </p>
                      </Grid>

                      <Grid
                        className={classes.paper}
                        item
                        sm={12}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'Company Name'}
                          </InputLabel>

                          <BCTextField
                            name={'companyName'}
                            placeholder={'Company Name'}
                          />
                        </FormGroup>
                      </Grid>

                      <Grid
                        className={classes.paper}
                        item
                        sm={12}>
                        <FormGroup className={'required'}>
                          <InputLabel className={classes.label}>
                            {'Email'}
                          </InputLabel>
                          <BCTextField
                            name={'email'}
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
                          <FormGroup className={'required'}>
                            <InputLabel className={classes.label}>
                              {'Contact Name'}
                            </InputLabel>
                            <BCTextField
                              name={'contactName'}
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
                              name={'phoneNumber'}
                              placeholder={'Phone Number'}
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
                              name={'street'}
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
                              name={'city'}
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
                              name={'state.id'}
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
                              name={'zipCode'}
                              placeholder={'Zip Code'}
                            />
                          </FormGroup>
                        </Grid>
                      </Grid>

                      <Grid
                        className={classes.paper}
                        item
                        md={12}>
                        <Box mt={2}>
                          <Button
                            className={'save-customer-button'}
                            color={'primary'}
                            type={'submit'}
                            variant={'contained'}>
                            {'Save'}
                          </Button>
                          <Button
                            className={'cancel-customer-button'}
                            color={'secondary'}
                            variant={'contained'}>
                            {'Cancel'}
                          </Button>
                        </Box>
                      </Grid>

                      {/* <pre>
                        {JSON.stringify(values, null, 2)}
                      </pre>
                      <pre>
                        {JSON.stringify(errors, null, 2)}
                      </pre> */}
                    </Form>
                  }
                </Formik>
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
                      <TextField
                        onChange={(e: any) => updateMapFromLatLng('lat', e.target.value)}
                        placeholder={'Longitude'}
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
                      <TextField
                        onChange={(e: any) => updateMapFromLatLng('lng', e.target.value)}
                        placeholder={'Longitude'}
                        variant={'outlined'}
                      />
                    </FormGroup>
                  </Grid>
                </Grid>

                <div className={classNames(classes.paper, classes.mapWrapper)}>
                  <BCMapWithMarker
                    lang={positionValue.lang}
                    lat={positionValue.lat}
                  />
                </div>
              </Grid>
            </Grid>
          </DataContainer>
        </PageContainer>
      </MainContainer>
    </>
  );
}

const CustomerButton = styled(Button)`
  margin-left: 25px;
  border-radius: 2px;
  width: 192px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-transform: initial;
  background-color: ${CONSTANTS.SECONDARY_GREY};
  box-shadow: 0px 4px 4px ${CONSTANTS.SECONDARY_DARK_GREY};

  a {
    text-decoration: none;
    color: ${CONSTANTS.PRIMARY_DARK};
  }
`;

const StyledList = styled(List)``;

const StyledListItem = styled(ListItem)`
  font-size: 16px;
  line-height: 20px;
  height: 40px;
  color: #000;
  padding-left: 41px;
  &.Mui-selected {
    background-color: #c4c4c4;
  }
`;

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
)(NewCustomerPage);
