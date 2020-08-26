import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { allStates } from "consts";
import styled from "styled-components";
import {
  Button,
  FormGroup,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  List,
  ListItem,
  Box,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { FormDataModel } from "../../../Models/FormData";
import * as CONSTANTS from "../../../../constants";

import SubHeader from "../../../../app/Components/SubHeader";
import BCTabs from "../../../../app/Components/BCTabs";
import Sidebar from "../../../../app/Components/Sidebar";
import MapWithMarker from "../../../../app/Components/MapWithMarker";
import PhoneNumberInput from "../../../../app/Components/PhoneNumberInput";
import EmailValidateInput from "../../../../app/Components/EmailValidateInput";
import ToolBarSearchInput from "../../../../app/Components/ToolBarSearchInput";

const LINK_DATA = [
  { label: "Customer List", link: "/customers/customer-list" },
  { label: "New Customer", link: "/customers/new-customer" },
  { label: "Schedule/Jobs", link: "/customers/schedule" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

const NewCustomerPage = () => {
  const classes = useStyles();
  const location = useLocation();
  const pathName = location.pathname;
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);
  const [usState, setUsState] = useState("");
  const [formData, setFormData] = useState<{ [k: string]: FormDataModel }>({
    email: {
      value: "",
      validate: true,
      errorMsg: "",
    },
    phone_number: {
      value: "",
      validate: true,
      errorMsg: "",
    },
  });

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const onClickLink = (strLink: string): void => {
    history.push(strLink);
  };

  return (
    <>
      <SubHeader title="Customers">
        <ToolBarSearchInput style={{ marginLeft: "auto", width: "321px" }} />
        <CustomerButton variant="contained">
          <Link to="/customers/new-customer">New Customer</Link>
        </CustomerButton>
      </SubHeader>

      <MainContainer>
        <Sidebar>
          <StyledList aria-label="customers sidebar list">
            {LINK_DATA.map((item, idx) => {
              if (item.label === "Customer List")
                return (
                  <StyledListItem
                    key={idx}
                    button
                    selected={
                      pathName === item.link || pathName === "/customers"
                    }
                    onClick={() => onClickLink(item.link)}
                  >
                    {item.label}
                  </StyledListItem>
                );
              else
                return (
                  <StyledListItem
                    key={idx}
                    button
                    selected={pathName === item.link}
                    onClick={() => onClickLink(item.link)}
                  >
                    {item.label}
                  </StyledListItem>
                );
            })}
          </StyledList>
        </Sidebar>

        <PageContainer>
          <BCTabs
            curTab={curTab}
            onChangeTab={handleTabChange}
            indicatorColor="primary"
            tabsData={[{ value: 0, label: "New Customer" }]}
          />

          <SwipeableViews index={curTab}>
            <DataContainer id="0" hidden={curTab !== 0}>
              <Grid container>
                <Grid item md={6} xs={12}>
                  <Grid item md={12} className={classes.paper}>
                    <FormGroup>
                      <InputLabel>Company Name</InputLabel>
                      <TextField
                        className="TextField"
                        fullWidth
                        name="company"
                        variant="outlined"
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item md={12} className={classes.paper}>
                    <FormGroup className="required">
                      <InputLabel>Email</InputLabel>
                      <EmailValidateInput
                        id="email"
                        label=""
                        variant="outlined"
                        size="small"
                        inputData={formData.email}
                        onChange={(emailData: FormDataModel) => {
                          setFormData({
                            ...formData,
                            email: {
                              ...emailData,
                            },
                          });
                        }}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid container>
                    <Grid item md={6} className={classes.paper}>
                      <FormGroup className="required">
                        <InputLabel>Contact Name</InputLabel>
                        <TextField
                          className="TextField"
                          fullWidth
                          name="company"
                          variant="outlined"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item md={6} className={classes.paper}>
                      <FormGroup>
                        <InputLabel>Phone Number</InputLabel>
                        <PhoneNumberInput
                          id="phone_number"
                          label=""
                          size="small"
                          validate={false}
                          inputData={formData.phone_number}
                          changeData={(data: FormDataModel) => {
                            setFormData({
                              ...formData,
                              phone_number: { ...data },
                            });
                          }}
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item md={6} className={classes.paper}>
                      <FormGroup>
                        <InputLabel>Street</InputLabel>
                        <TextField
                          className="TextField"
                          fullWidth
                          name="company"
                          variant="outlined"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item md={6} className={classes.paper}>
                      <FormGroup>
                        <InputLabel>City</InputLabel>
                        <TextField
                          className="TextField"
                          fullWidth
                          name="company"
                          variant="outlined"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item md={6} className={classes.paper}>
                      <FormGroup>
                        <InputLabel>State</InputLabel>
                        <Select
                          className="select"
                          value={usState}
                          variant="outlined"
                          onChange={(
                            event: React.ChangeEvent<{ value: unknown }>
                          ) => {
                            setUsState(event.target.value as string);
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {allStates.map((state) => (
                            <MenuItem
                              value={state.name}
                              key={state.abbreviation}
                            >
                              {state.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormGroup>
                    </Grid>
                    <Grid item md={6} className={classes.paper}>
                      <FormGroup>
                        <InputLabel>Zip Code</InputLabel>
                        <TextField
                          className="TextField"
                          fullWidth
                          name="company"
                          variant="outlined"
                          type="number"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>

                  <Grid item md={12} className={classes.paper}>
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={"save-customer-button"}
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={"cancel-customer-button"}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Grid>
                </Grid>

                <Grid item md={6} xs={12} className={classes.paper}>
                  <MapWithMarker lat={29.972065} lang={-90.111533} />
                </Grid>
              </Grid>
            </DataContainer>
          </SwipeableViews>
        </PageContainer>
      </MainContainer>
    </>
  );
};

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

export default NewCustomerPage;
