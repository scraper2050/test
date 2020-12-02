import * as CONSTANTS from '../../../constants';
import BCTextField from '../../components/bc-text-field/bc-text-field';
import { allStates } from 'utils/constants';
import classNames from 'classnames';
import styled from 'styled-components';
import styles from './bc-customer-info-modal.style';
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import { getCustomerDetailAction, updateCustomerAction, loadingSingleCustomers } from 'actions/customer/customer.action';
import '../../../scss/index.scss';
import { useHistory } from 'react-router-dom';

interface Props {
  classes: any
}

function BCEditCutomerInfoModal({ classes, customerInfo }: any) {
  const dispatch = useDispatch();
  const [nameLabelState, setNameLabelState] = useState(false);
  const history = useHistory();
  const initialValues = {
    "name": customerInfo && customerInfo.customerName && customerInfo.customerName !== 'N/A' ? customerInfo.customerName : '',
    "contactName": customerInfo && customerInfo.contactName && customerInfo.contactName !== 'N/A' ? customerInfo.contactName : '',
    "phone": customerInfo && customerInfo.phone && customerInfo.phone ? customerInfo.phone : '',
    "email": customerInfo && customerInfo.email && customerInfo.email && customerInfo.email !== 'N/A'? customerInfo.email : '',
    "city": customerInfo && customerInfo.customerAddress && customerInfo.customerAddress.city ? customerInfo.customerAddress.city : '',
    'state': {
        'id': customerInfo && customerInfo.customerAddress && customerInfo.customerAddress.state ? allStates.findIndex(x => x.name === customerInfo.customerAddress.state) : 0
    },
    "street": customerInfo && customerInfo.customerAddress && customerInfo.customerAddress.street ? customerInfo.customerAddress.street : '',
    "zipCode": customerInfo && customerInfo.customerAddress && customerInfo.customerAddress.zipCode ? customerInfo.customerAddress.zipCode : '',
    "customerId": customerInfo && customerInfo.customerId ? customerInfo.customerId : '',
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


  
  const isValidate = (requestObj: any) => {
    let validateFlag = true;
    if(requestObj.name === ''){
      setNameLabelState(true);
      validateFlag = false;
    }else{
      setNameLabelState(false);
    }    
    return validateFlag;
  }
 
  return (
    <>
      <MainContainer>
        <PageContainer >
          <DataContainer
            id={'0'} 
            className='editCustomerContainer'
            >
            <Grid container>
              <Grid
                item
                sm={12}
                lg={6}>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values, { setSubmitting }) => {
                     let updateCustomerrequest = {...values, state: ''};
                      updateCustomerrequest.state = allStates[values.state.id].name;
                      if(isValidate(updateCustomerrequest)){
                        dispatch(updateCustomerAction(updateCustomerrequest, () => {
                            closeModal();
                            dispatch(loadingSingleCustomers())
                            dispatch(getCustomerDetailAction(updateCustomerrequest));
                          }));
                      }
                      
                  }}
                  validateOnChange>
                  {({ handleChange, values, errors, isSubmitting }) =>
                    <Form className='editCustomerForm'>
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
                            {'Name'}
                          </InputLabel>

                          <BCTextField
                            name={'name'}
                            placeholder={'Name'}
                            required={true}
                            onChange={handleChange}
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
                            name={'email'}
                            placeholder={'Email'}
                            type={'email'}
                            onChange={handleChange}
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
                              name={'contactName'}
                              placeholder={'Contact Name'}
                              onChange={handleChange}
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
                              name={'phone'}
                              placeholder={'Phone Number'}
                              type={'number'}
                              onChange={handleChange}
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
                              onChange={handleChange}
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
                              onChange={handleChange}
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
                              type={'number'}
                              onChange={handleChange}
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
                            {customerInfo && customerInfo.update ? 'Update' : 'Save'}
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
                      
                   

                <Grid
                    className={classNames(classes.paper)}
                    item
                    sm={12}
                    lg={6}>
                        <Grid container>
                            <Grid
                                className={classes.paper}
                                item
                                sm={6}>
                                <FormGroup className={'required'}>
                                
                                </FormGroup>
                            </Grid>
                            <Grid
                                className={classes.paper}
                                item
                                sm={6}>
                                <FormGroup className={'required'}>
                                
                                </FormGroup>
                                
                            </Grid>
                        </Grid>
                        
                </Grid>
            
                </Form>
                  }
                </Formik>
              </Grid> 

            </Grid>{/*Main Grid*/}
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
)(BCEditCutomerInfoModal);

