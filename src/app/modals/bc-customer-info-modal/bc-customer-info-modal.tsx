import * as CONSTANTS from "../../../constants";
import BCTextField from "../../components/bc-text-field/bc-text-field";
import { allStates } from "utils/constants";
import classNames from "classnames";
import styled from "styled-components";
import styles from "./bc-customer-info-modal.style";
import Geocode from "react-geocode";
import Config from "../../../config";
import { withStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import {
  closeModalAction,
  setModalDataAction,
} from "actions/bc-modal/bc-modal.action";
import { useDispatch } from "react-redux";
import {
  getCustomerDetailAction,
  updateCustomerAction,
  loadingSingleCustomers,
} from "actions/customer/customer.action";
import "../../../scss/index.scss";
import { useHistory } from "react-router-dom";
import BCMapWithMarker from "../../components/bc-map-with-marker/bc-map-with-marker";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { success, error } from 'actions/snackbar/snackbar.action';

interface Props {
  classes: any;
}

interface AllStateTypes {
  abbreviation: string,
  name: string,
}

function BCEditCutomerInfoModal({ classes, customerInfo }: any) {
  const dispatch = useDispatch();
  const [nameLabelState, setNameLabelState] = useState(false);
  const [positionValue, setPositionValue] = useState({
    lang:
      customerInfo &&
        customerInfo.location &&
        customerInfo.location.coordinates.length > 1
        ? customerInfo.location.coordinates[0]
        : 0,
    lat:
      customerInfo &&
        customerInfo.location &&
        customerInfo.location.coordinates.length > 1
        ? customerInfo.location.coordinates[1]
        : 0,
  });
  const history = useHistory();
  const initialValues = {
    name:
      customerInfo &&
        customerInfo.customerName &&
        customerInfo.customerName !== "N/A"
        ? customerInfo.customerName
        : "",
    contactName:
      customerInfo &&
        customerInfo.contactName &&
        customerInfo.contactName !== "N/A"
        ? customerInfo.contactName
        : "",
    phone:
      customerInfo && customerInfo.phone && customerInfo.phone
        ? customerInfo.phone
        : "",
    email:
      customerInfo &&
        customerInfo.email &&
        customerInfo.email &&
        customerInfo.email !== "N/A"
        ? customerInfo.email
        : "",
    city:
      customerInfo &&
        customerInfo.customerAddress &&
        customerInfo.customerAddress.city
        ? customerInfo.customerAddress.city
        : "",
    state: {
      id:
        customerInfo &&
          customerInfo.customerAddress &&
          customerInfo.customerAddress.state
          ? allStates.findIndex(
            (x) => x.name === customerInfo.customerAddress.state
          )
          : 0,
    },
    street:
      customerInfo &&
        customerInfo.customerAddress &&
        customerInfo.customerAddress.street
        ? customerInfo.customerAddress.street
        : "",
    zipCode:
      customerInfo &&
        customerInfo.customerAddress &&
        customerInfo.customerAddress.zipCode
        ? customerInfo.customerAddress.zipCode
        : "",
    latitude:
      customerInfo &&
        customerInfo.location &&
        customerInfo.location.coordinates.length > 1
        ? customerInfo.location.coordinates[1]
        : 0,
    longitude:
      customerInfo &&
        customerInfo.location &&
        customerInfo.location.coordinates.length > 1
        ? customerInfo.location.coordinates[0]
        : 0,
    customerId:
      customerInfo && customerInfo.customerId ? customerInfo.customerId : "",
    vendorId:
      customerInfo &&
        customerInfo.vendorId &&
        customerInfo.vendorId !== ""
        ? customerInfo.vendorId
        : "",
  };

  const filterOptions = createFilterOptions({
    stringify: (option: AllStateTypes) => option.abbreviation + option.name,
  });


  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(
        setModalDataAction({
          data: {},
          type: "",
        })
      );
    }, 200);
  };

  const updateMap = (
    values: any,
    street?: any,
    city?: any,
    zipCode?: number,
    state?: number
  ): void => {
    Geocode.setApiKey(Config.REACT_APP_GOOGLE_KEY);
    let stateVal: any = "";
    Geocode.setApiKey(Config.REACT_APP_GOOGLE_KEY);
    if (state) {
      stateVal = allStates[state].name;
    }

    let fullAddr = "";
    fullAddr = fullAddr.concat(
      street ? street : values.street,
      " ",
      city ? city : values.city,
      " ",
      stateVal,
      " ",
      zipCode ? zipCode : values.zipCode,
      " ",
      "USA"
    );

    Geocode.fromAddress(fullAddr).then(
      (response: {
        results: { geometry: { location: { lat: any; lng: any } } }[];
      }) => {
        const { lat, lng } = response.results[0].geometry.location;
        setPositionValue({
          lang: lng,
          lat: lat,
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
  };

  const updateMapFromLatLng = (name: string, value: any): void => {
    Geocode.setApiKey(Config.REACT_APP_GOOGLE_KEY);
    if (name === "lat") {
      setPositionValue({
        lang: positionValue.lang,
        lat: parseFloat(value),
      });
    } else {
      setPositionValue({
        lang: parseFloat(value),
        lat: positionValue.lat,
      });
    }
  };

  const isValidate = (requestObj: any) => {

    console.log(requestObj)
    let validateFlag = true;
    if (requestObj.name === "") {
      setNameLabelState(true);
      validateFlag = false;
    } else {
      setNameLabelState(false);
    }
    return validateFlag;
  };

  const handleSelectState = (value: AllStateTypes, updateMap: any, setFieldValue: any, values: any) => {
    const index = allStates.findIndex((state: AllStateTypes) => state === value);
    updateMap(values, undefined, undefined, undefined, index);
    setFieldValue("state.id", index);
  }

  return (
    <>
      <MainContainer>
        <PageContainer>
          <DataContainer id={"0"} className="editCustomerContainer">
            <Grid container>
              <Grid item sm={12} lg={6}>
                <Formik
                  initialValues={initialValues}
                  onSubmit={async (values, { setSubmitting }) => {

                    let updateCustomerrequest = { ...values, state: "" };
                    if (values.state.id !== -1) {
                      updateCustomerrequest.state =
                        allStates[values.state.id].name;
                    }
                    updateCustomerrequest.latitude = positionValue.lat;
                    updateCustomerrequest.longitude = positionValue.lang;

                    if (isValidate(updateCustomerrequest)) {
                      await dispatch(
                        updateCustomerAction(updateCustomerrequest, () => {
                          closeModal();
                          dispatch(loadingSingleCustomers());
                          dispatch(
                            getCustomerDetailAction(updateCustomerrequest)
                          );
                        })
                      );
                      dispatch(success("Update Customer Info Successful!"));
                    }
                  }}
                // validateOnChange
                >
                  {({
                    handleChange,
                    values,
                    errors,
                    isSubmitting,
                    setFieldValue,
                  }) => (
                    <Form className="editCustomerForm">
                      <Grid className={classes.paper} item sm={12}></Grid>

                      <Grid className={classes.paper} item sm={12}>
                        <FormGroup className={"required"}>
                          <InputLabel className={classes.label}>
                            {"Name"}
                          </InputLabel>

                          <BCTextField
                            required
                            name={"name"}
                            placeholder={"Name"}
                            onChange={handleChange}
                          />
                          {nameLabelState ? <label>Required</label> : ""}
                        </FormGroup>
                      </Grid>

                      <Grid className={classes.paper} item sm={12}>
                        <FormGroup className={"required"}>
                          <InputLabel className={classes.label}>
                            {"Email"}
                          </InputLabel>
                          <BCTextField
                            required
                            name={"email"}
                            placeholder={"Email"}
                            type={"email"}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Grid>

                      <Grid container>
                        <Grid className={classes.paper} item sm={6}>
                          <FormGroup>
                            <InputLabel className={classes.label}>
                              {"Contact Name"}
                            </InputLabel>
                            <BCTextField
                              name={"contactName"}
                              placeholder={"Contact Name"}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Grid>
                        <Grid className={classes.paper} item sm={6}>
                          <FormGroup>
                            <InputLabel className={classes.label}>
                              {"Phone Number"}
                            </InputLabel>
                            <BCTextField
                              name={"phone"}
                              placeholder={"Phone Number"}
                              // type={"number"}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid className={classes.paper} item sm={6}>
                          <FormGroup>
                            <InputLabel className={classes.label}>
                              {"Street"}
                            </InputLabel>
                            <BCTextField
                              name={"street"}
                              placeholder={"Street"}
                              onChange={(e: any) => {
                                setFieldValue("street", e.target.value);
                                updateMap(values, e.target.value);
                              }}
                            />
                          </FormGroup>
                        </Grid>
                        <Grid className={classes.paper} item sm={6}>
                          <FormGroup>
                            <InputLabel className={classes.label}>
                              {"City"}
                            </InputLabel>
                            <BCTextField
                              name={"city"}
                              placeholder={"City"}
                              onChange={(e: any) => {
                                setFieldValue("city", e.target.value);
                                updateMap(values, undefined, e.target.value);
                              }}
                            />
                          </FormGroup>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid className={classes.paper} item sm={6}>
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
                              {allStates.map((state, id) => (
                                <MenuItem key={id} value={id}>
                                  {state.name}
                                </MenuItem>
                              ))}
                            </Field> */}

                            <div className="search_form_wrapper">

                              <Autocomplete
                                defaultValue={allStates[values.state.id]}
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
                                      State
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

                        <Grid className={classes.paper} item sm={6}>
                          <FormGroup>
                            <InputLabel className={classes.label}>
                              {"Zip Code"}
                            </InputLabel>
                            <BCTextField
                              name={"zipCode"}
                              placeholder={"Zip Code"}
                              type={"number"}
                              onChange={(e: any) => {
                                setFieldValue("zipCode", e.target.value);
                                updateMap(values, "", "", e.target.value);
                              }}
                            />
                          </FormGroup>
                        </Grid>

                        <Grid className={classes.paper} item sm={12}>
                          <FormGroup>
                            <InputLabel className={classes.label}>
                              {"Vendor Number"}
                            </InputLabel>
                            <BCTextField
                              name={"vendorId"}
                              placeholder={"Vendor Number"}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Grid>


                      </Grid>

                      <Grid
                        className={classNames(
                          classes.paper,
                          "form_button_wrapper-desktop"
                        )}
                        item
                        md={12}
                      >
                        <Box mt={2}>
                          <Button
                            className={"save-customer-button"}
                            color={"primary"}
                            type={"submit"}
                            variant={"contained"}
                          >
                            {customerInfo && customerInfo.update
                              ? "Update"
                              : "Save"}
                          </Button>
                          <Button
                            className={"cancel-customer-button"}
                            onClick={() => closeModal()}
                            color={"secondary"}
                            variant={"contained"}
                          >
                            {"Cancel"}
                          </Button>
                        </Box>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>

              <Grid
                className={classNames(classes.paper, classes.mapLocation)}
                item
                sm={6}
              >
                <Grid container>
                  <Grid className={classes.paper} item sm={6}>
                    <FormGroup>
                      <InputLabel className={classes.label}>
                        {"Latitude"}
                      </InputLabel>
                      <TextField
                        type={"number"}
                        onChange={(e: any) =>
                          updateMapFromLatLng("lat", e.target.value)
                        }
                        placeholder={"Longitude"}
                        variant={"outlined"}
                        value={positionValue.lat}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid className={classes.paper} item sm={6}>
                    <FormGroup>
                      <InputLabel className={classes.label}>
                        {"Longitude"}
                      </InputLabel>
                      <TextField
                        type={"number"}
                        onChange={(e: any) =>
                          updateMapFromLatLng("lng", e.target.value)
                        }
                        placeholder={"Longitude"}
                        variant={"outlined"}
                        value={positionValue.lang}
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
            {/*Main Grid*/}
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

export default withStyles(styles, { withTheme: true })(BCEditCutomerInfoModal);
