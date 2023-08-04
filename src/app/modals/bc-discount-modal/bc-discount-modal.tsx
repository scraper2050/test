/* eslint-disable react/jsx-handler-names */
import * as yup from 'yup';
import { Button,
  FormControl,
  MenuItem,
  Select,
  Grid,
  DialogContent,
  DialogActions,
  InputBase,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import BCInput from 'app/components/bc-input/bc-input';
import { DiscountItem } from 'actions/discount/discount.types';
import { RootState } from 'reducers';
import { error as errorSnackBar, success } from 'actions/snackbar/snackbar.action';
import * as CONSTANTS from "../../../constants";
import styles from './bc-discount-modal.styles'
import { updateDiscount, addDiscount } from 'api/discount.api';
import { getAllDiscountItemsAPI } from 'api/discount.api'

const EditDiscountValidation = yup.object().shape({
  'name': yup
    .string()
    .required(),
  'description': yup
    .string(),
  'tax': yup
    .string(),
  'charges': yup
    .string()
    .required('Amount is required'),
  'isCustomerSpecific': yup
    .boolean(),
  'noOfItems': yup
    .number()
    .when("isCustomerSpecific", {
      is: true,
      then: yup.number().min(1, 'At least 1 minimum number of items'),
    }),
});

const StyledInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 10,
      marginBottom: 10,
    },
    input: {
      width: 130,
      borderRadius: 7,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: [
        'Roboto',
        'sans-serif',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

interface ModalProps {
    item: DiscountItem;
    classes: any;
}

function BCDiscountEditModal({ item, classes }:ModalProps) {
  const { _id, name, description, tax, charges, customer, noOfItems} = item;
  const { itemObj, error, loadingObj } = useSelector(({ invoiceItems }:RootState) => invoiceItems);
  const { 'data': taxes } = useSelector(({ tax }: any) => tax);
  const { 'data': customers} = useSelector(({ customers }: any) => customers);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const isAdd = _id ? false : true;

  const closeModal = () => {
    dispatch(setModalDataAction({
      'data': {},
      'type': '',
    }));
    dispatch(closeModalAction());
  };

  const formik = useFormik({
    'initialValues': {
      'discountItemId': _id,
      'name': name,
      'description': description,
      'tax': tax
        ? 1
        : 0,
      'charges': charges ? `${Math.abs(charges)}` : '',
      'isCustomerSpecific': !!customer?._id,
      'status': item.isActive ? 1 : 0,
      'noOfItems': noOfItems || 0,
      'customer': customer || null,
    },
    'onSubmit': async values => {
      setIsSubmitting(true);
      let tax = 0;
      if (Number(values.tax) === 1) {
        tax = taxes[0].tax;
      }
      const discountObject: any = {
        title: values.name,
        description: values.description || '',
        tax,
        charges: values.charges ? -parseInt(values.charges) : 0,
        noOfItems: values.noOfItems,
        customerId: values?.customer?._id ? values.customer._id : '',
        isActive: values.status ? true : false
      }
      if(!isAdd){
        discountObject.discountItemId = _id
      }
      let response;
      if(isAdd){
        response = await addDiscount(discountObject).catch((err: { message: any; }) => {
          dispatch(errorSnackBar(err.message));
        });
      } else {
        response = await updateDiscount(discountObject).catch((err: { message: any; }) => {
          dispatch(errorSnackBar(err.message));
        });
      }
      setIsSubmitting(false);
      if (response) {
        dispatch(success(`Discount item successfully ${isAdd ? 'added' : 'updated'}`));
        dispatch(getAllDiscountItemsAPI());
        closeModal();
      }
    },
    'validateOnBlur': false,
    'validateOnChange': true,
    'validationSchema': EditDiscountValidation
  });

  useEffect(() => {
    if(formik.values.isCustomerSpecific === false){
      formik.setFieldValue('noOfItems', 0);
      formik.setFieldValue('customer', null);
    }
  }, [formik.values.isCustomerSpecific]);


  return <DataContainer>
    <hr style={{height: '1px', background: '#D0D3DC', borderWidth: '0px'}}/>
    <form onSubmit={formik.handleSubmit}>
      <DialogContent classes={{'root': classes.dialogContent}}>
        <Grid container alignItems={'center'}>
          {!isAdd && (
            <>
              <Grid
                item
                xs={12}
                sm={3}
                container
                alignItems={'center'}
                justify={window.innerWidth < 600 ? 'flex-start' : 'flex-end'}
                style={{ padding: '0 7px' }}
              >
                <span style={{ color: '#4F4F4F', fontWeight: 500, whiteSpace: 'nowrap' }}>STATUS</span>
              </Grid>
              <Grid item xs={12} sm={9} style={{ padding: '0 7px' }}>
                <FormControl>
                  <Select
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    input={<StyledInput />}
                    name={'status'}
                    onChange={formik.handleChange}
                    value={formik.values.status}>
                    <MenuItem value={1}>
                      {'Active'}
                    </MenuItem>
                    <MenuItem value={0}>
                      {'Inactive'}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}
          <Grid 
            item 
            xs={12} 
            sm={3} 
            container 
            alignItems={'center'} 
            justify={window.innerWidth < 600 ? 'flex-start' : 'flex-end'} 
            style={{padding: '0 7px'}}
          >
            <span style={{color: '#4F4F4F', fontWeight: 500, whiteSpace: 'nowrap'}}>DISCOUNT NAME</span>
          </Grid>
          <Grid item xs={12} sm={9} style={{padding: '0 7px'}}>
            <BCInput
              error={formik.touched.name && Boolean(formik.errors.name)}
              handleChange={formik.handleChange}
              helperText={formik.touched.name && formik.errors.name}
              name={'name'}
              value={formik.values.name}
              margin={'none'}
              inputProps={{
                style : {
                  padding: '12px 14px',
                },
              }}
              InputProps={{
                style:{
                  borderRadius: 8,
                  marginTop: 10,
                },
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            container 
            alignItems={'center'} 
            justify={window.innerWidth < 600 ? 'flex-start' : 'flex-end'} 
            style={{padding: '0 7px'}}
          >
            <span style={{color: '#4F4F4F', fontWeight: 500}}>DESCRIPTION</span>
          </Grid>
          <Grid item xs={12} sm={9} style={{padding: '0 7px'}}>
            <BCInput
              error={formik.touched.description && Boolean(formik.errors.description)}
              handleChange={formik.handleChange}
              helperText={formik.touched.description && formik.errors.description}
              name={'description'}
              value={formik.values.description}
              multiline
              margin={'none'}
              inputProps={{
                style : {
                  padding: '12px 14px',
                },
              }}
              InputProps={{
                style:{
                  borderRadius: 8,
                  marginTop: 10,
                },
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            container
            alignItems={'center'}
            justify={window.innerWidth< 600 ? 'flex-start' : 'flex-end'} 
            style={{padding: '0 7px'}}
          >
            <span style={{color: '#4F4F4F', fontWeight: 500, whiteSpace: 'nowrap'}}>CHARGE TYPE</span>
          </Grid>
          <Grid item xs={12} sm={9} style={{padding: '10px 10px'}}>
            <div>Fixed</div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            container
            alignItems={'center'}
            justify={window.innerWidth< 600 ? 'flex-start' : 'flex-end'} 
            style={{padding: '0 7px'}}
          >
            <span style={{color: '#4F4F4F', fontWeight: 500}}>TAX</span>
          </Grid>
          <Grid item xs={12} sm={9} style={{padding: '0 7px'}}>
            <FormControl>
              <Select
                error={formik.touched.tax && Boolean(formik.errors.tax)}
                input={<StyledInput />}
                name={'tax'}
                onChange={formik.handleChange}
                value={formik.values.tax}>
                <MenuItem value={1}>
                  {'Yes'}
                </MenuItem>
                <MenuItem value={0}>
                  {'No'}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            container
            alignItems={'center'}
            justify={window.innerWidth< 600 ? 'flex-start' : 'flex-end'} 
            style={{padding: '0 7px'}}
          >
            <span style={{color: '#4F4F4F', fontWeight: 500}}>AMOUNT</span>
          </Grid>
          <Grid item xs={12} sm={9} style={{padding: '0 7px'}}>
            <FormControl>
              <BCInput
                error={formik.touched.charges && Boolean(formik.errors.charges)}
                handleChange={(e: {target: {value: string;}}) => {
                  formik.setFieldValue('charges', e.target.value.replace(/[^0-9]/g,''))
                }}
                helperText={formik.touched.charges && formik.errors.charges}
                name={'charges'}
                value={formik.values.charges}
                margin={'none'}
                inputProps={{
                  style : {
                    padding: '12px 14px',
                    width: 100,
                  },
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">- $</InputAdornment>,
                  style:{
                    borderRadius: 8,
                    marginTop: 10,
                  },
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <div style={{backgroundColor: '#f2f2f2'}}>
        <DialogContent classes={{'root': classes.dialogContent}}>
          <Grid container alignItems={'center'}>
            <Grid
              item
              xs={12}
              sm={3}
              container
              alignItems={'center'}
              justify={window.innerWidth< 600 ? 'flex-start' : 'flex-end'} 
              style={{padding: '0 7px'}}
            />
            <Grid item xs={12} sm={9} style={{padding: '0 7px'}}>
              <FormControlLabel
                classes={{label: classes.checkboxLabel}}
                control={
                  <Checkbox
                    color={'primary'}
                    checked={formik.values.isCustomerSpecific}
                    onChange={formik.handleChange}
                    name="isCustomerSpecific"
                    classes={{root: classes.checkboxInput}}
                  />
                }
                label={`This discount is customer specific`}
              />
            </Grid>
            {formik.values.isCustomerSpecific && (
              <>
                <Grid 
                  item 
                  xs={12} 
                  sm={3} 
                  container 
                  alignItems={'center'} 
                  justify={window.innerWidth < 600 ? 'flex-start' : 'flex-end'} 
                  style={{padding: '0 7px'}}
                >
                  <span style={{color: '#4F4F4F', fontWeight: 500, whiteSpace: 'nowrap'}}>CUSTOMER</span>
                </Grid>
                <Grid item xs={12} sm={9} style={{padding: '0 7px'}}>
                  <Autocomplete
                    value={formik.values.customer}
                    getOptionLabel={(option: any) => option.profile?.displayName ? option.profile.displayName : ''}
                    getOptionSelected={(option: any, value: any) => option._id === value._id}
                    onChange={(ev: any, newValue: any) => formik.setFieldValue('customer', newValue)}
                    options={customers && customers.length !== 0 ? customers.sort((a: any, b: any) => a.profile.displayName > b.profile.displayName ? 1 : b.profile.displayName > a.profile.displayName ? -1 : 0) : []}
                    renderInput={(params: any) =>
                      <TextField
                        required
                        {...params}
                        variant={'outlined'}
                        style={{backgroundColor: '#FFFFFF', marginBottom: 10}}
                      />
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  container
                  alignItems={'center'}
                  justify={window.innerWidth< 600 ? 'flex-start' : 'flex-end'} 
                  style={{padding: '0 7px'}}
                >
                  <span style={{color: '#4F4F4F', fontWeight: 500, textAlign: 'end'}}>MINIMUM NO. OF ITEMS</span>
                </Grid>
                <Grid item xs={12} sm={9} style={{padding: '0 7px'}}>
                  <FormControl>
                    <BCInput
                      error={formik.touched.noOfItems && Boolean(formik.errors.noOfItems)}
                      handleChange={(e: {target: {value: string;}}) => {
                        formik.setFieldValue('noOfItems', parseInt(e.target.value.replace(/[^0-9]/g,'') || '0'));
                      }}
                      helperText={formik.touched.noOfItems && formik.errors.noOfItems}
                      name={'noOfItems'}
                      value={formik.values.noOfItems}
                      margin={'none'}
                      inputProps={{
                        style : {
                          padding: '12px 14px',
                          width: 100,
                        },
                      }}
                      InputProps={{
                        style:{
                          borderRadius: 8,
                          marginTop: 10,
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
      </div>
      <hr style={{height: '1px', background: '#D0D3DC', borderWidth: '0px', margin: 0}}/>
      <DialogActions classes={{
        'root': classes.dialogActions
      }}>
        <Grid
          container
          justify={'space-between'}>
          <Grid item />
          <Grid item>
            <Button
              disabled={isSubmitting}
              aria-label={'record-payment'}
              onClick={closeModal}
              classes={{
                'root': classes.closeButton
              }}
              variant={'outlined'}>
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              aria-label={'create-job'}
              classes={{
                root: classes.submitButton,
                disabled: classes.submitButtonDisabled
              }}
              color="primary"
              type={'submit'}
              variant={'contained'}>
              Save
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </form>
  </DataContainer>;
}

const DataContainer = styled.div`
  margin: auto 0;

  .MuiFormLabel-root {
    font-style: normal;
    font-weight: normal;
    width: 800px;
    font-size: 20px;
    color: ${CONSTANTS.PRIMARY_DARK};
    /* margin-bottom: 6px; */
  }
  .MuiFormControl-marginNormal {
    margin-top: .5rem !important;
    margin-bottom: 1rem !important;
    /* height: 20px !important; */
  }
  .MuiInputBase-input {
    color: #383838;
    font-size: 16px;
    padding: 12px 14px;
  }
  .MuiInputAdornment-positionStart {
    margin-right: 0;
  }
  .MuiInputAdornment-root + .MuiInputBase-input {
    padding: 12px 14px 12px 0;
  }
  .MuiOutlinedInput-multiline {
    align-items: flex-start;
  }
  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
    padding: 5px;
    border-radius: 8px;
  }
  .required > label:after {
    margin-left: 3px;
    content: "*";
    color: red;
  }
  .save-customer-button {
    color: ${CONSTANTS.PRIMARY_WHITE};
  }
`;

export default withStyles(
  styles,
  {'withTheme': true}
)(BCDiscountEditModal);