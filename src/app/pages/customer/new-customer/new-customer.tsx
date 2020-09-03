import * as CONSTANTS from '../../../../constants';
import BCEmailValidateInput from '../../../components/bc-email-validate-input/bc-email-validate-input';
import BCMapWithMarker from '../../../components/bc-map-with-marker/bc-map-with-marker';
import BCPhoneNumberInput from '../../../components/bc-phone-number-input/bc-phone-number-input';
import BCSidebar from '../../../components/bc-sidebar/bc-sidebar';
import BCSubHeader from '../../../components/bc-sub-header/bc-sub-header';
import BCToolBarSearchInput from '../../../components/bc-toolbar-search-input/bc-toolbar-search-input';
import { FormDataModel } from '../../../models/form-data';
import { allStates } from 'utils/constants';
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
  const location = useLocation();
  const pathName = location.pathname;
  const history = useHistory();
  const [usState, setUsState] = useState('');
  const [formData, setFormData] = useState<{ [k: string]: FormDataModel }>({
    'email': {
      'errorMsg': '',
      'validate': true,
      'value': ''
    },
    'phone_number': {
      'errorMsg': '',
      'validate': true,
      'value': ''
    }
  });

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
                md={6}
                xs={12}>
                <Grid
                  className={classes.paper}
                  item
                  md={12}>
                  <p className={classes.subTitle}>
                    {'New Customer Information'}
                  </p>
                </Grid>
                <Grid
                  className={classes.paper}
                  item
                  md={12}>
                  <FormGroup>
                    <InputLabel>
                      {'Company Name'}
                    </InputLabel>
                    <TextField
                      className={'TextField'}
                      fullWidth
                      name={'company'}
                      variant={'outlined'}
                    />
                  </FormGroup>
                </Grid>

                <Grid
                  className={classes.paper}
                  item
                  md={12}>
                  <FormGroup className={'required'}>
                    <InputLabel>
                      {'Email'}
                    </InputLabel>
                    <BCEmailValidateInput
                      id={'email'}
                      inputData={formData.email}
                      label={''}
                      onChange={(emailData: FormDataModel) => {
                        setFormData({
                          ...formData,
                          'email': {
                            ...emailData
                          }
                        });
                      }}
                      size={'small'}
                      variant={'outlined'}
                    />
                  </FormGroup>
                </Grid>

                <Grid container>
                  <Grid
                    className={classes.paper}
                    item
                    md={6}>
                    <FormGroup className={'required'}>
                      <InputLabel>
                        {'Contact Name'}
                      </InputLabel>
                      <TextField
                        className={'TextField'}
                        fullWidth
                        name={'contact_name'}
                        variant={'outlined'}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid
                    className={classes.paper}
                    item
                    md={6}>
                    <FormGroup>
                      <InputLabel>
                        {'Phone Number'}
                      </InputLabel>
                      <BCPhoneNumberInput
                        changeData={(data: FormDataModel) => {
                          setFormData({
                            ...formData,
                            'phone_number': { ...data }
                          });
                        }}
                        id={'phone_number'}
                        inputData={formData.phone_number}
                        label={''}
                        size={'small'}
                        validate={false}
                      />
                    </FormGroup>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid
                    className={classes.paper}
                    item
                    md={6}>
                    <FormGroup>
                      <InputLabel>
                        {'Street'}
                      </InputLabel>
                      <TextField
                        className={'TextField'}
                        fullWidth
                        name={'street'}
                        variant={'outlined'}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid
                    className={classes.paper}
                    item
                    md={6}>
                    <FormGroup>
                      <InputLabel>
                        {'City'}
                      </InputLabel>
                      <TextField
                        className={'TextField'}
                        fullWidth
                        name={'city'}
                        variant={'outlined'}
                      />
                    </FormGroup>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid
                    className={classes.paper}
                    item
                    md={6}>
                    <FormGroup>
                      <InputLabel>
                        {'State'}
                      </InputLabel>
                      <Select
                        className={'select'}
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                          setUsState(event.target.value as string);
                        }}
                        value={usState}
                        variant={'outlined'}>
                        <MenuItem value={''}>
                          <em>
                            {'None'}
                          </em>
                        </MenuItem>
                        {allStates.map(state =>
                          <MenuItem
                            key={state.abbreviation}
                            value={state.name}>
                            {state.name}
                          </MenuItem>)}
                      </Select>
                    </FormGroup>
                  </Grid>
                  <Grid
                    className={classes.paper}
                    item
                    md={6}>
                    <FormGroup>
                      <InputLabel>
                        {'Zip Code'}
                      </InputLabel>
                      <TextField
                        className={'TextField'}
                        fullWidth
                        name={'zip_code'}
                        variant={'outlined'}
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
              </Grid>

              <Grid
                className={classes.paper}
                item
                md={6}
                xs={12}>
                <BCMapWithMarker
                  lang={-90.111533}
                  lat={29.972065}
                />
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
