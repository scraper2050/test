import React, { useEffect } from 'react';
import * as yup from 'yup';
import { Fab, FormControl, FormHelperText, Paper, Select, Typography, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import { createSalesTax, getAllSalesTaxAPI, updateSalesTax } from 'api/tax.api';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import BCInput from 'app/components/bc-input/bc-input';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import { allStates } from 'utils/constants';
import { error as errorSnackBar, success } from 'actions/snackbar/snackbar.action';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { TaxItem } from 'actions/tax/tax.types';


const SalesTaxValidation = yup.object().shape({
  'state': yup
    .string()
    .required('Please select a state'),
  'tax': yup
    .string()
    .required('Tax is required')
});


const BCSalesTaxModalContainer = styled(Paper)`
padding: 30px;
.actions-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}
.MuiFab-primary {
    color: white;
    width: 200px;
    border-radius: 30px;
    margin-top: 20px;
}
`;

interface ModalProps {
  item?: TaxItem
}

function BCAddAndEditSalesTaxModal({ item } : ModalProps) {
  
  const dispatch = useDispatch();
  const { isLoading, updating } = useSelector(({ tax }: any) => tax);
  const isAdd = item?._id ? false : true;

  const closeModal = () => {
    dispatch(setModalDataAction({
      'data': {},
      'type': '',
    }));
    dispatch(closeModalAction());
  };


  const formik = useFormik({
    'initialValues': {
      'state': '',
      'tax': ''
    },
    'onSubmit': async values => {
      const { tax, state } = values;

      const taxObj: any = {
        tax,
        state
      }
      if (!isAdd) {
        taxObj.id = item!._id
      }
      let response;
      try {
        if (isAdd) {
          response = await createSalesTax(taxObj);
        } else {
          response = await updateSalesTax(taxObj);
        }
      } catch (err) {
        dispatch(errorSnackBar(err.message));
      }
      
      dispatch(success(response.message));
      dispatch(getAllSalesTaxAPI());
      dispatch(closeModal())
    },
    'validateOnBlur': false,
    'validateOnChange': true,
    'validationSchema': SalesTaxValidation
  });

  useEffect(() => {
    formik.setFieldValue('state', item?.state);
    formik.setFieldValue('tax', item?.tax);
  }, []);


  if (isLoading) {
    return <BCCircularLoader heightValue={'100px'} />;
  }


  return <BCSalesTaxModalContainer >
    <p style={{ 'textAlign': 'center' }}>

      {'Tax must be in percentage %'}

    </p>
    <form onSubmit={formik.handleSubmit}>
      <BCInput
        error={formik.touched.tax && Boolean(formik.errors.tax)}
        helperText={formik.touched.tax && formik.errors.tax}
        id={'tax'}
        label={'Tax'}
        name={'tax'}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        placeholder={'Tax Percentage'}
        type={'number'}
        value={formik.values.tax}
      />


      <FormControl
        error={formik.touched.state && Boolean(formik.errors.state)}
        fullWidth
        variant={'outlined'}>
        <Typography
          component={'p'}
          variant={'subtitle1'}>
          {'State'}
        </Typography>
        <Select
          inputProps={{
            'name': 'state'

          }}
          native
          onChange={formik.handleChange}
          value={formik.values.state}>
          <option
            aria-label={'None'}
            disabled
            value={''}>
            {'Select'}
          </option>
          {allStates.map(state => <option
            aria-label={state.name}
            key={state.abbreviation}
            value={state.name}>
            {state.name}
          </option>)}
        </Select>
        { formik.errors.state && <FormHelperText>
          {formik.errors.state}
        </FormHelperText>}
      </FormControl>
      <div className={'actions-container'}>
        <Fab
          color={'primary'}
          disabled={updating}
          type={'submit'}>
            {isAdd ? 'Add Sale Tax' : 'Update Sale Tax'}
        </Fab>
      </div>
    </form>

  </BCSalesTaxModalContainer>;
}


export default withStyles(
  {},
  { 'withTheme': true }
)(BCAddAndEditSalesTaxModal);
