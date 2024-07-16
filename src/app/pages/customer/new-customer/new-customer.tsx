import * as CONSTANTS from '../../../../constants';
import BCMapWithMarker
  from '../../../components/bc-map-with-marker/bc-map-with-marker';
import BCTextField from '../../../components/bc-text-field/bc-text-field';
import Config from '../../../../config';
import {createCustomer, getCustomerDetail} from '../../../../api/customer.api';
import Geocode from 'react-geocode';
import { allStates } from 'utils/constants';
import classNames from 'classnames';
import styled from 'styled-components';
import styles from './new-customer.styles';
import { error, info } from '../../../../actions/snackbar/snackbar.action';
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  FormGroup,
  Grid,
  InputLabel,
  TextField
} from '@material-ui/core';
import { Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import MaskedInput from 'react-text-mask';
import BCSelectOutlined from 'app/components/bc-select-outlined/bc-select-outlined';
import { getCompaniesAutoComplete, getCompanyDetail } from 'api/company.api';

interface CustomerAutoComplete {
  id: number;
  profile: { displayName: string; }
}
interface Props {
  classes: any;
}

interface AllStateTypes {
  abbreviation: string,
  name: string,
}

function NewCustomerPage({ classes }: Props) {
  const initialValues = {
    'city': '',
    'name': '',
    'contactName': '',
    'email': '',
    'latitude': 0.0,
    'longitude': 0.0,
    'phone': '',
    'state': {
      'id': -1
    },
    'street': '',
    'zipCode': '',
    'vendorId': '',
    'itemTierId': '',
    'type': 'Builder',
    'companyId': ''
  };

  const [positionValue, setPositionValue] = useState({
    'lang': 0.0,
    'lat': 0.0
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const filterOptions = createFilterOptions({
    'stringify': (option: AllStateTypes) => option.abbreviation + option.name
  });
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<any[]>([])
  const [selectedCustomerDetail, setSelectedCustomerDetail] = useState<any>();
  const [selectedOption, setSelectedOption] = useState<CustomerAutoComplete>({
    profile: { displayName: "" },
    id: 1,
  });
  const [fieldsUpdated, setFieldsUpdated] = useState({ name: false, email: false, phone: false });
  const accountTypes = [...CONSTANTS.customerTypes];
  const updateMap = (
    values: any,
    street?: any,
    city?: any,
    zipCode?: number,
    state?: number
  ): void => {
    Geocode.setApiKey(Config.REACT_APP_GOOGLE_KEY);
    let stateVal: any = '';
    Geocode.setApiKey(Config.REACT_APP_GOOGLE_KEY);
    if (state) {
      stateVal = allStates[state].name;
    }

    let fullAddr = '';
    fullAddr = fullAddr.concat(
      street ? street : values.street,
      ' ',
      city ? city : values.city,
      ' ',
      stateVal,
      ' ',
      zipCode ? zipCode : values.zipCode,
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


  const updateMapFromLatLng = (name: string, value: any): void => {
    Geocode.setApiKey(Config.REACT_APP_GOOGLE_KEY);
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

  const handleCancelForm = (setFieldValue: any) => {
    setFieldValue('name', '');
    setFieldValue('email', '');
    setFieldValue('contactName', '');
    setFieldValue('street', '');
    setFieldValue('city', '');
    setFieldValue('phone', '');
    setFieldValue('state', -1);
    setFieldValue('zipCode', '');
    setFieldValue('vendorId', '');
    setPositionValue({
      'lang': 0,
      'lat': 0
    });
    setFieldValue('companyId', '');
  };

  const handleSelectState = (value: AllStateTypes, updateMap: any, setFieldValue: any, values: any) => {
    const index = allStates.findIndex((state: AllStateTypes) => state === value);
    updateMap(values, undefined, undefined, undefined, index);
    setFieldValue('state.id', index);
  };

    useEffect(() => {
    let timeoutId:any;

    if (inputValue && inputValue.length > 2) {
      timeoutId = setTimeout(async () => {
        const data = await getCompaniesAutoComplete(inputValue);
        setOptions(data);
      }, 500);
    }

    return () => clearTimeout(timeoutId);
  }, [inputValue, dispatch]);

  const hanldeFetchCustomerDetail = async (companyId: string) => {
    const data = await getCompanyDetail(companyId);
    return data;
  }



  return (
    <MainContainer>
      <PageContainer>
        <DataContainer id={'0'}>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              const val = values.phone;
              let count = 0;
              for (let i = 0; i < val.length; i++)
                if (val.charAt(i) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                  count++
              const isValid = (count === 0 || count === 10) ? true : false;

              if (!isValid) {
                dispatch(error('Please enter a valid phone number.'));
                return;
              }

              if (count === 0) {
                values.phone = '';
              }
              const state = values.state.id;
              values.latitude = positionValue.lat;
              values.longitude = positionValue.lang;

              const reqObj = {
                ...values,
                'state': allStates[state] ? allStates[state].name : ""
              };
              reqObj.state =
                !allStates[state]
                  ? ''
                  : allStates[state].name;
              
              reqObj.type = accountTypes[0].name;
              const { companyId, ...restData } = reqObj;
              const customer: any = await createCustomer(companyId === '' ? restData : reqObj);
              // eslint-disable-next-line no-prototype-builtins
              if (customer.hasOwnProperty('msg')) {
                dispatch(error(customer.msg));
              } else if (customer.status === 0) {
                dispatch(error(customer.message));
              } else {
                dispatch(info(customer.message));
                history.push('/main/customers');
              }
            }}
            validateOnChange>
            {({
              handleChange,
              values,
              setFieldValue,
              isSubmitting,
            }) =>
              <Form>
                <Grid container>
                  <Grid
                    item
                    sm={6}
                    xs={12}>
                    <Grid
                      className={classes.paper}
                      item
                      sm={12}
                      xs={12}>
                      <p className={classes.subTitle}>
                        {'New Customer Information'}
                      </p>
                    </Grid>

                    <Grid
                      className={classes.paper}
                      item
                      sm={12}
                      xs={12}>
                      <FormGroup className={'required'}>
                        <InputLabel className={classes.label}>
                          {'Name'}
                        </InputLabel>

                        <Autocomplete
                          freeSolo={true}
                          defaultValue={selectedOption || ""}
                          inputValue={inputValue}
                          onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                            handleChange(newInputValue);
                          }}
                          onChange={async (event, newValue: any) => {
                            if (newValue) {
                              try {
                                setFieldValue("companyId", newValue._id);
                                const data = await hanldeFetchCustomerDetail(newValue._id);
                                const {
                                  info,
                                  contact,
                                  address,
                                  profile,
                                  location
                                } = data;
                                if (info) {
                                  setFieldValue(
                                    "name",
                                    info?.companyName ?? ""
                                  );
                                  setFieldValue(
                                    "email",
                                    info?.companyEmail ?? ""
                                  );
                                }
                                if (profile) {
                                  setFieldValue(
                                    "contactName",
                                    profile?.firstName ?? ""
                                  );

                                }
                                if (address) {
                                  setFieldValue("street", address?.street ?? "");
                                  setFieldValue("city", address?.city ?? "");
                                  setFieldValue("city", address?.state ?? "");
                                  setFieldValue("zipCode", address?.zipCode ?? "");
                                }
                                                                                                                                                               if (contact) {
                                  setFieldValue("phone", contact?.phone ?? "");
                                }
                                if (location && location?.coordinates) {
                                  setPositionValue({
                                    'lang': location?.coordinates[0] ?? 0,
                                    'lat': location?.coordinates[1] ?? 0
                                  });
                                }
                              } catch (e) { }
                            }
                          }}
                          options={options}
                          getOptionLabel={(option: any) => option?.info?.companyName}
                          style={{ fontSize: 10, padding: "0 !important" }}
                          classes={{ inputRoot: "custom-input-root" }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder={
                                inputValue ? "" : "Customer Name"
                              }
                              variant="outlined"
                              name={'name'}
                              onChange={handleChange}
                              className={classes.customTextField}
                              required                            

                            />
                          )}
                        />
                      </FormGroup>
                    </Grid>

                    <Grid
                      className={classes.paper}
                      item
                      sm={12}
                      xs={12}>
                      <FormGroup>
                        <InputLabel className={classes.label}>
                          {'Email'}
                        </InputLabel>
                        <BCTextField
                          name={'email'}
                          onChange={handleChange}
                          placeholder={'Email'}
                          type={'email'}
                        />
                      </FormGroup>
                    </Grid>

                    <Grid container>
                      <Grid
                        className={classes.paper}
                        item    
                        sm={6}
                        xs={12}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'Contact Name'}
                          </InputLabel>
                          <BCTextField
                            name={'contactName'}
                            onChange={handleChange}
                            placeholder={'Contact Name'}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid
                        className={classes.paper}
                        item
                        sm={6}
                        xs={12}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'Phone Number'}
                          </InputLabel>
                          <BCTextField
                            name={'phone'}
                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                              event.target.value = getMaskString(event.target.value);
                              handleChange(event);
                            }}
                            placeholder={'Phone Number'}
                            type={'text'}
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid
                        className={classes.paper}
                        item
                        sm={6}
                        xs={12}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'Street'}
                          </InputLabel>
                          <BCTextField
                            name={'street'}
                            onChange={(e: any) => {
                              setFieldValue('street', e.target.value);
                              updateMap(values, e.target.value);
                            }}
                            placeholder={'Street'}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid
                        className={classes.paper}
                        item
                        sm={6}
                        xs={12}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'City'}
                          </InputLabel>
                          <BCTextField
                            name={'city'}
                            onChange={(e: any) => {
                              setFieldValue('city', e.target.value);
                              updateMap(values, undefined, e.target.value);
                            }}
                            placeholder={'City'}
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid
                        className={classes.paper}
                        item
                        sm={6}
                        xs={12}>
                        <FormGroup>
                          {/* <InputLabel className={classes.label}>
                                {"State"}
                              </InputLabel>
                              <Field
                                as={Select}
                                enableReinitialize
                                name={"state.id"}
                                onChange={(e: any) => {
                                  updateMap(
                                    values,
                                    undefined,
                                    undefined,
                                    undefined,
                                    e.target.value
                                  );
                                  handleChange(e);
                                }}
                                type={"select"}
                                variant={"outlined"}
                              >
                                {allStates.map((state, id) => {
                                  return (
                                    <MenuItem key={id} value={id}>
                                      {state.name}
                                    </MenuItem>
                                  )
                                }
                                )}
                              </Field> */}

                          <div className={'search_form_wrapper'}>

                            <Autocomplete
                              autoHighlight
                              filterOptions={filterOptions}
                              getOptionLabel={option => option.name}
                              id={'tags-standard'}
                              onChange={(ev: any, newValue: any) => handleSelectState(
                                newValue,
                                updateMap,
                                setFieldValue,
                                values
                              )}
                              options={allStates}
                              renderInput={params =>
                                <>
                                  <InputLabel
                                    className={`${classes.label} state-label`}>
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
                        sm={6}
                        xs={12}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'Zip Code'}
                          </InputLabel>
                          <BCTextField
                            name={'zipCode'}
                            onChange={(e: any) => {
                              setFieldValue('zipCode', e.target.value);
                              updateMap(values, '', '', e.target.value);
                            }}
                            placeholder={'Zip Code'}
                            type={'number'}
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid
                        className={classes.paper}
                        item
                        sm={6}
                        xs={12}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'Type'}
                          </InputLabel>

                          <BCTextField
                            name={'type'}
                            onChange={handleChange}
                            placeholder={'Builder'}
                            disabled={true}
                            variant={'filled'}
                          />
                        </FormGroup>
                       
                      </Grid>
                      <Grid
                        className={classes.paper}
                        item
                        sm={6}
                        xs={12}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'Vendor Number'}
                          </InputLabel>

                          <BCTextField
                            name={'vendorId'}
                            onChange={handleChange}
                            placeholder={'Vendor Number'}
                          />
                        </FormGroup>

                      </Grid>


                    </Grid>

                    {/* <pre>
                          {JSON.stringify(values, null, 2)}
                        </pre>
                        <pre>
                          {JSON.stringify(errors, null, 2)}
                        </pre> */}

                  </Grid>

                  <Grid
                    className={classNames(classes.paper, classes.mapLocation)}
                    item
                    sm={6}
                    xs={12}>
                    <Grid container>
                      <Grid
                        className={classNames(classes.paper, classes.customLoc)}
                        item
                        sm={6}
                        xs={12}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'Latitude'}
                          </InputLabel>
                          <TextField
                            onChange={(e: any) =>
                              updateMapFromLatLng('lat', e.target.value)
                            }
                            placeholder={'Longitude'}
                            type={'number'}
                            value={positionValue.lat}
                            variant={'outlined'}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid
                        className={classNames(classes.paper, classes.customLoc)}
                        item
                        sm={6}
                        xs={12}>
                        <FormGroup>
                          <InputLabel className={classes.label}>
                            {'Longitude'}
                          </InputLabel>
                          <TextField
                            onChange={(e: any) =>
                              updateMapFromLatLng('lng', e.target.value)
                            }
                            placeholder={'Longitude'}
                            type={'number'}
                            value={positionValue.lang}
                            variant={'outlined'}
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>

                    <div
                      className={classNames(classes.paper, classes.mapWrapper)}>
                      <BCMapWithMarker
                        lang={positionValue.lang}
                        lat={positionValue.lat}
                        reactAppGoogleKeyFromConfig={Config.REACT_APP_GOOGLE_KEY}
                      />
                    </div>
                  </Grid>
                  <Grid
                    className={classes.paper}
                    item
                    md={12}
                    xs={12}>
                    <Box mt={2}>
                      <Button
                        className={'save-customer-button'}
                        color={'primary'}
                        type={'submit'}
                        disabled={isSubmitting}
                        variant={'contained'}>            
                        {'Save'}
                      </Button>
                      <Button
                        className={'cancel-customer-button'}
                        color={'secondary'}
                        onClick={() => handleCancelForm(setFieldValue)}
                        variant={'contained'}>
                        {'Cancel'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            }
          </Formik>
        </DataContainer>
      </PageContainer>
    </MainContainer>
  );
}

export const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding: 30px 65px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 18px;
  }
`;

export const DataContainer = styled.div`
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

export default withStyles(styles, { 'withTheme': true })(NewCustomerPage);
