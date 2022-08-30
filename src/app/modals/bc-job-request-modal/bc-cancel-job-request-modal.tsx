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
} from '@material-ui/core';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import BCInput from 'app/components/bc-input/bc-input';
import { updateInvoiceItem } from 'actions/invoicing/items/items.action';
import { RootState } from 'reducers';
import { error as errorSnackBar, success } from 'actions/snackbar/snackbar.action';
import * as CONSTANTS from "../../../constants";
import styles from './bc-job-request-modal.styles'
import { updateItems, addItem } from 'api/items.api';
import { loadInvoiceItems } from 'actions/invoicing/items/items.action';
import { Job } from 'actions/job/job.types';
import { rejectionReason } from '../../../constants';
import classNames from 'classnames';
import {getJobRequestDescription} from "../../../helpers/job";

const rejectRequestValidation = yup.object().shape({
  'name': yup
    .string()
    .required(),
  'description': yup
    .string(),
  'isFixed': yup
    .boolean()
    .required(),
  'isJobType': yup
    .boolean()
    .required(),
  'tax': yup
    .string()
    .required()

});

const StyledInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 10,
      marginBottom: 10,
    },
    input: {
      // width: 130,
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
    jobRequest: Job;
    classes: any;
}

function BCRejectJobRequestModal({ jobRequest:item, classes }:any) {
  const { _id, name, isFixed, isJobType, description, tax } = item;
  const { itemObj, error, loadingObj } = useSelector(({ invoiceItems }:RootState) => invoiceItems);
  const { 'data': taxes } = useSelector(({ tax }: any) => tax);
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
      'itemId': _id,
      'name': name,
      'description': description,
      'isFixed': `${isFixed}`,
      'isJobType': isJobType,
      'tax': tax
        ? 1
        : 0,
    },
    'onSubmit': async values => {
      // setIsSubmitting(true)
      // if (Number(values.tax) === 1) {
      //   values.tax = taxes[0].tax;
      // } else {
      //   values.tax = 0;
      // }
      // const itemObject = {
      //   itemId: values.itemId,
      //   name: values.name,
      //   description: values.description || '',
      //   isFixed: values.isFixed === 'true' ? true : false,
      //   isJobType: values.isJobType,
      //   tax: values.tax,
      // }
      // let response;
      // if(isAdd){
      //   response = await addItem(itemObject).catch((err: { message: any; }) => {
      //     dispatch(errorSnackBar(err.message));
      //   });
      // } else {
      //   response = await updateItems([itemObject]).catch((err: { message: any; }) => {
      //     dispatch(errorSnackBar(err.message));
      //   });
      // }
      // if (response) {
      //   dispatch(loadInvoiceItems.fetch());
      //   dispatch(success(`Items successfully ${isAdd ? 'added' : 'updated'}`));
      //   closeModal();
      // }
      // setIsSubmitting(false);
    },
    'validateOnBlur': false,
    'validateOnChange': true,
    'validationSchema': rejectRequestValidation
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
            style={{padding: '0 30px 0 7px'}}
          >
            <span style={{color: '#4F4F4F', fontWeight: 500}}>DESCRIPTION</span>
          </Grid>
          <Grid item xs={12} sm={9} alignItems='center' style={{padding: '0 30px 0 7px', textTransform: 'capitalize'}}>
            {getJobRequestDescription(item)}
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            container
            alignItems={'center'}
            justify={window.innerWidth< 600 ? 'flex-start' : 'flex-end'}
            style={{padding: '0 30px 0 7px'}}
          >
            <span style={{color: '#4F4F4F', fontWeight: 500, whiteSpace: 'nowrap'}}>REASON</span>
          </Grid>
          <Grid item xs={12} sm={9} alignItems='center' style={{padding: '0 30px 0 7px'}}>
            <FormControl fullWidth>
              <Select
                error={formik.touched.isFixed && Boolean(formik.errors.isFixed)}
                input={<StyledInput />}
                name={'isFixed'}
                onChange={formik.handleChange}
                value={formik.values.isFixed}>
                {rejectionReason.map(({value, label}) =>(
                  <MenuItem value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            container
            alignItems={'center'}
            justify={window.innerWidth < 600 ? 'flex-start' : 'flex-end'}
            style={{padding: '0 30px 0 7px', alignSelf: 'flex-start'}}
          >
            <span style={{color: '#4F4F4F', fontWeight: 500, marginTop: 20}}>NOTES</span>
          </Grid>
          <Grid item xs={12} sm={9} alignItems='center' style={{padding: '0 30px 0 7px'}}>
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
            style={{padding: '0 30px 0 7px'}}
          />
        </Grid>
      </DialogContent>
      <hr style={{height: '1px', background: '#D0D3DC', borderWidth: '0px'}}/>
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
              aria-label={'close-modal'}
              onClick={closeModal}
              classes={{
                'root': classes.closeButton
              }}
              variant={'outlined'}>
              Back
            </Button>
            <Button
              disabled={isSubmitting}
              aria-label={'reject-job-request'}
              classes={{
                root: classNames([classes.purpleButton, classes.submitButton]),
                disabled: classes.submitButtonDisabled
              }}
              color="primary"
              type={'submit'}
              variant={'contained'}>
              Reject
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
)(BCRejectJobRequestModal);
