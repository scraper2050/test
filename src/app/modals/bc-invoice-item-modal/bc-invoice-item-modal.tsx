/* eslint-disable react/jsx-handler-names */
import * as yup from 'yup';
import { Button, FormControl, FormHelperText, InputAdornment, MenuItem, Select, Typography } from '@material-ui/core';
import { ReactComponent as EmailIcon } from '../../../assets/img/email.svg';
import React, { useEffect, useState } from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import BCInput from 'app/components/bc-input/bc-input';
import { Item } from 'actions/invoicing/items/items.types';
import { updateInvoiceItem } from 'actions/invoicing/items/items.action';
import { RootState } from 'reducers';
import { error as errorSnackBar, success } from 'actions/snackbar/snackbar.action';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const EditItemContainer = styled.div`
  padding: 30px;

  h6 {
    font-weight: 800;
  }
  .MuiFormControl-root {
    margin-bottom: 5px;
  }

  .actions-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      color: #fff;
    }
  }

`;

const EditItemValidation = yup.object().shape({
  'name': yup
    .string()
    .required(),
  'isFixed': yup
    .boolean()
    .required(),
  'charges': yup
    .number()
    .required(),
  'tax': yup
    .string()
    .required()

});

interface ModalProps {
    item: Item
}

export default function BCInvoiceEditModal({ item }:ModalProps) {
  const { _id, name, isFixed, charges, description, tax } = item;
  const { itemObj, error, loadingObj } = useSelector(({ invoiceItems }:RootState) => invoiceItems);
  const { 'data': taxes } = useSelector(({ tax }: any) => tax);
  const dispatch = useDispatch();

  const formik = useFormik({
    'initialValues': {
      'itemId': _id,
      'name': name,
      'description': description,
      'isFixed': isFixed,
      'charges': charges,
      'tax': tax
        ? 1
        : 0
    },
    'onSubmit': values => {
      if (Number(values.tax) === 1) {
        values.tax = taxes[0].tax;
      } else {
        values.tax = 0;
      }
      dispatch(updateInvoiceItem.fetch(values));
    },
    'validateOnBlur': false,
    'validateOnChange': true,
    'validationSchema': EditItemValidation
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


  return <EditItemContainer>
    <form onSubmit={formik.handleSubmit}>
      <BCInput
        disabled
        error={formik.touched.name && Boolean(formik.errors.name)}
        handleChange={formik.handleChange}
        helperText={formik.touched.name && formik.errors.name}
        label={'Name'}
        name={'name'}
        value={formik.values.name}
      />
      <BCInput
        disabled
        error={formik.touched.description && Boolean(formik.errors.description)}
        handleChange={formik.handleChange}
        helperText={formik.touched.description && formik.errors.description}
        label={'Description'}
        name={'description'}
        value={formik.values.description}
      />
      <FormControl
        fullWidth
        variant={'outlined'}>
        <Typography
          variant={'subtitle1'}>
          {'Fixed/Hourly'}
        </Typography>
        <Select
          error={formik.touched.isFixed && Boolean(formik.errors.isFixed)}
          fullWidth
          // Label={'Fixed/Hourly'}
          name={'isFixed'}
          onChange={formik.handleChange}
          value={formik.values.isFixed}>
          <MenuItem value={'true'}>
            {'Fixed'}
          </MenuItem>
          <MenuItem value={'false'}>
            {'Hourly'}
          </MenuItem>
        </Select>
      </FormControl>
      <BCInput
        error={formik.touched.charges && Boolean(formik.errors.charges)}
        handleChange={formik.handleChange}
        helperText={formik.touched.charges && formik.errors.charges}
        InputProps={{
          'startAdornment':
  <InputAdornment position={'start'}>
    <AttachMoneyIcon />
  </InputAdornment>
        }}
        label={'Charges'}
        name={'charges'}
        value={formik.values.charges}
      />
      <FormControl
        error={formik.touched.tax && Boolean(formik.errors.tax)}
        fullWidth
        variant={'outlined'}>
        <Typography
          variant={'subtitle1'}>
          {'Tax'}
        </Typography>
        <Select

          fullWidth
          // Label={'Fixed/Hourly'}
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
        { formik.errors.tax && <FormHelperText>
          {formik.errors.tax}
        </FormHelperText>}
      </FormControl>

      <div className={'actions-container'}>
        <Button
          color={'primary'}
          type={'submit'}
          variant={'contained'}>
          {'Update'}
        </Button>
      </div>
      { error }
    </form>
  </EditItemContainer>;
}
