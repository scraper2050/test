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
import { DiscountItem } from 'actions/invoicing/items/items.types';
import { updateInvoiceItem } from 'actions/invoicing/items/items.action';
import { RootState } from 'reducers';
import { error as errorSnackBar, success } from 'actions/snackbar/snackbar.action';
import * as CONSTANTS from "../../../constants";
import styles from './bc-invoice-discount-modal.styles'
import { updateDiscount, addDiscount } from 'api/discount.api';
import { loadInvoiceItems } from 'actions/invoicing/items/items.action';

const EditDiscountValidation = yup.object().shape({
  'name': yup
    .string()
    .required(),
  'description': yup
    .string(),
  'tax': yup
    .string()
    .required(),
  'charges': yup
    .string()
    .required(),
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
  const { _id, name, description, tax, charges, customerId} = item;
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

  const handleCustomerChange = (fieldName: any, newValue: any) => {
    console.log(newValue)
    formik.setFieldValue(fieldName, newValue);
  };

  const formik = useFormik({
    'initialValues': {
      'itemId': _id,
      'name': name,
      'description': description,
      'tax': tax
        ? 1
        : 0,
      'charges': charges ? `${Math.abs(charges)}` : '',
      'isCustomerSpecific': false,
      'numberOfItems': 0,
      'customerId': customerId ? customerId : '',
    },
    'onSubmit': async values => {
      setIsSubmitting(true)
      if (Number(values.tax) === 1) {
        values.tax = taxes[0].tax;
      } else {
        values.tax = 0;
      }
      const discountObject: any = {
        itemId: values.itemId,
        name: values.name,
        description: values.description || '',
        isFixed: true,
        isJobType: false,
        tax: values.tax,
        charges: values.charges ? -parseFloat(values.charges) : 0,
      }
      if(values.isCustomerSpecific){
        discountObject.customerId = values.customerId._id;
        discountObject.numberOfItems = values.numberOfItems;
      }
      console.log('ini itu',discountObject)
      // let response;
      // if(isAdd){
      //   response = await addDiscount(discountObject).catch((err: { message: any; }) => {
      //     dispatch(errorSnackBar(err.message));
      //   });
      // } else {
      //   response = await updateDiscount([discountObject]).catch((err: { message: any; }) => {
      //     dispatch(errorSnackBar(err.message));
      //   });
      // }
      // if (response) {
      //   dispatch(loadInvoiceItems.fetch());
      //   dispatch(success(`Items successfully ${isAdd ? 'added' : 'updated'}`));
      //   closeModal();
      // }
      setIsSubmitting(false);
    },
    'validateOnBlur': false,
    'validateOnChange': true,
    'validationSchema': EditDiscountValidation
  });

  useEffect(() => {
    if (error) {
      dispatch(errorSnackBar('Something went wrong, failed to update item'));
      return;
    }


    if (itemObj && itemObj._id === _id && !loadingObj) {
      dispatch(success('Item successfully updated'));
      setTimeout(() => {
        dispatch(closeModalAction());
        setTimeout(() => {
          dispatch(setModalDataAction({
            'data': {},
            'type': ''
          }));
        }, 200);
      }, 100);

      return () => {
        dispatch(updateInvoiceItem.cancelled());
      };
    }
  }, [itemObj]);


  return <DataContainer>
    <hr style={{height: '1px', background: '#D0D3DC', borderWidth: '0px'}}/>
    <form onSubmit={formik.handleSubmit}>
      <DialogContent classes={{'root': classes.dialogContent}}>
        <Grid container alignItems={'center'}>
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
          <Grid item xs={12} sm={9} alignItems='center' style={{padding: '0 7px'}}>
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
            <span style={{color: '#4F4F4F', fontWeight: 500, marginTop: 20}}>DESCRIPTION</span>
          </Grid>
          <Grid item xs={12} sm={9} alignItems='center' style={{padding: '0 7px'}}>
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
          <Grid item xs={12} sm={9} alignItems='center' style={{padding: '10px 10px'}}>
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
          <Grid item xs={12} sm={9} alignItems='center' style={{padding: '0 7px'}}>
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
          <Grid item xs={12} sm={9} alignItems='center' style={{padding: '0 7px'}}>
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
            <Grid item xs={12} sm={9} alignItems='center' style={{padding: '0 7px'}}>
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
                <Grid item xs={12} sm={9} alignItems='center' style={{padding: '0 7px'}}>
                  <Autocomplete
                    defaultValue={customerId && customers.length !== 0 && customers.filter((customer: any) => customer?._id === customerId)[0]}
                    getOptionLabel={(option: any) => option.profile?.displayName ? option.profile.displayName : ''}
                    onChange={(ev: any, newValue: any) => handleCustomerChange('customerId', newValue)}
                    options={customers && customers.length !== 0 ? customers.sort((a: any, b: any) => a.profile.displayName > b.profile.displayName ? 1 : b.profile.displayName > a.profile.displayName ? -1 : 0) : []}
                    renderInput={(params: any) =>
                      <TextField
                        required
                        {...params}
                        variant={'outlined'}
                        style={{backgroundColor: '#FFFFFF'}}
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
                  <span style={{color: '#4F4F4F', fontWeight: 500}}>NO. OF ITEMS</span>
                </Grid>
                <Grid item xs={12} sm={9} alignItems='center' style={{padding: '0 7px'}}>
                  <FormControl>
                    <Select
                      error={formik.touched.numberOfItems && Boolean(formik.errors.numberOfItems)}
                      input={<StyledInput />}
                      name={'numberOfItems'}
                      onChange={formik.handleChange}
                      value={formik.values.numberOfItems}>
                      <MenuItem value={4}>
                        4
                      </MenuItem>
                      <MenuItem value={3}>
                        3
                      </MenuItem>
                      <MenuItem value={2}>
                        2
                      </MenuItem>
                      <MenuItem value={1}>
                        1
                      </MenuItem>
                      <MenuItem value={0}>
                        Any
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
      </div>
      {/* <hr style={{height: '1px', background: '#D0D3DC', borderWidth: '0px'}}/> */}
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