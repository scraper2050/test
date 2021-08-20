import React, { useEffect } from 'react';
import * as yup from 'yup';
import { Fab, FormControl, FormHelperText, InputLabel, Paper, Select, Snackbar, Typography, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import { createSalesTax, getAllSalesTaxAPI, updateSalesTax } from 'api/tax.api';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import BCInput from 'app/components/bc-input/bc-input';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import { allStates } from 'utils/constants';
import { createSalesTaxAction, updateSalesTaxAction } from 'actions/tax/tax.action';
import { error as errorSnackBar, success } from 'actions/snackbar/snackbar.action';
import { closeModalAction } from 'actions/bc-modal/bc-modal.action';


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

function BCSalesTaxModal() {
  const dispatch = useDispatch();
  const { 'data': taxes, isLoading, done, updating, error } = useSelector(({ tax }: any) => tax);

  useEffect(() => {
    dispatch(getAllSalesTaxAPI());
  }, []);


  const formik = useFormik({
    'initialValues': {
      'state': '',
      'tax': ''
    },
    'onSubmit': values => {
      const { tax, state } = values;

      taxes.length > 0
        ? dispatch(updateSalesTaxAction.fetch({ 'id': taxes[0]._id,
          state,
          tax
        }))
        : dispatch(createSalesTaxAction.fetch({ state,
          tax }));
    },
    'validateOnBlur': false,
    'validateOnChange': true,
    'validationSchema': SalesTaxValidation
  });

  useEffect(() => {
    if (taxes.length > 0 && taxes[0]) {
      formik.setFieldValue('state', taxes[0].state);
      formik.setFieldValue('tax', taxes[0].tax);
    }
  }, [taxes]);


  useEffect(() => {
    if (done) {
      dispatch(success('Taxes successfully updated'));
      setTimeout(() => dispatch(closeModalAction()), 500);
    }
    if (error) {
      dispatch(errorSnackBar(error));
    }
    dispatch(createSalesTaxAction.cancelled());
  }, [done, error]);

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
          {taxes.length > 0
            ? 'Update Sales Tax'
            : 'Create Sales Tax'}
        </Fab>
      </div>
    </form>

  </BCSalesTaxModalContainer>;
}


export default withStyles(
  {},
  { 'withTheme': true }
)(BCSalesTaxModal);
