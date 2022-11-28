import * as CONSTANTS from '../../../constants';
import BCDateTimePicker from 'app/components/bc-date-time-picker/bc-date-time-picker';
import styles from './bc-ar-report-modal.styles';
import { useFormik } from 'formik';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AttachMoney from '@material-ui/icons/AttachMoney';
import {
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Typography,
  withStyles,
  Checkbox
} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import Autocomplete from "@material-ui/lab/Autocomplete";
import {getCustomers} from "../../../actions/customer/customer.action";
import {useHistory} from "react-router-dom";

interface PROPS {
  classes: any;
  asOfDate: Date;
  selectedCustomers: any[];
}

function BcArReportModal({
  classes,
  asOfDate,
  selectedCustomers = []
}: PROPS): JSX.Element {
  const history = useHistory();
  const {data: customers, loading} = useSelector(({ customers }: any) => customers);
  const dispatch = useDispatch();

  const isValidate = () => {
    return true;
  };

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const form = useFormik({
    initialValues: {
      asOf: asOfDate || new Date(),
      agingMethode: 'current',
      days: 30,
      periods: 4,
      filterCustomer: selectedCustomers.length > 0,
      customers: selectedCustomers,
    },
    onSubmit: (values: any, { setSubmitting }: any) => {
      history.push({
        pathname: '/main/reports/ar',
        state: {
          type: 'custom',
          asOf: values.asOf,
          customers: values.filterCustomer ? values.customers : [],
        }
      });
      closeModal();
    }
  });


  const {
    'errors': FormikErrors,
    'values': FormikValues,
    'handleChange': formikChange,
    'handleSubmit': FormikSubmit,
    setFieldValue,
    getFieldMeta,
    isSubmitting
  } = form;

  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  return (
    <DataContainer className={'new-modal-design'}>
      <form onSubmit={FormikSubmit}>
        <DialogContent classes={{'root': classes.dialogContent}}>
          <div className={classes.titleDiv}>
            <ExpandMoreIcon />
            <Typography className={classes.title}>AS OF</Typography>
          </div>
          <BCDateTimePicker
            // label="AS OF"
            className={'due_date'}
            handleChange={(date: Date) => setFieldValue('asOf', date)}
            name={'asOf'}
            id={'asOf'}
            placeholder={'Date'}
            value={FormikValues.asOf}
          />

          {/*<div className={classes.titleDiv}>*/}
          {/*  <ExpandMoreIcon />*/}
          {/*  <Typography className={classes.title}>AGING METHOD</Typography>*/}
          {/*</div>*/}

          {/*<RadioGroup row aria-label="agingMethode" name="agingMethode" value={FormikValues.agingMethode} onChange={formikChange}>*/}
          {/*  <FormControlLabel color="primary" value="current" control={<Radio />} label="Current" />*/}
          {/*  <FormControlLabel color="primary" value="report" control={<Radio />} label="Report Date" />*/}
          {/*</RadioGroup>*/}

          {/*<div className="MethodContainer">*/}
          {/*  <FormGroup>*/}
          {/*    <InputLabel>*/}
          {/*      {'Days per aging period'}*/}
          {/*    </InputLabel>*/}
          {/*    <TextField*/}
          {/*      variant="outlined"*/}
          {/*      name="days"*/}
          {/*      onChange={formikChange}*/}
          {/*      placeholder={'Days'}*/}
          {/*      value={FormikValues.days}*/}
          {/*    />*/}
          {/*  </FormGroup>*/}

          {/*  <FormGroup>*/}
          {/*    <InputLabel>*/}
          {/*      {'Number of periods'}*/}
          {/*    </InputLabel>*/}
          {/*    <TextField*/}
          {/*      variant="outlined"*/}
          {/*      name="periods"*/}
          {/*      onChange={formikChange}*/}
          {/*      placeholder={'Periods'}*/}
          {/*      value={FormikValues.periods}*/}
          {/*    />*/}
          {/*  </FormGroup>*/}
          {/*</div>*/}

          <div className={classes.titleDiv} style={{marginLeft: -10, marginTop: 20}}>
            <Checkbox
              name="filterCustomer"
              color="primary"
              onChange={formikChange}
              // onBlur={handleBlur}
              checked={FormikValues.filterCustomer}
            />
            <Typography className={classes.title}>CUSTOMER(S)</Typography>

          </div>
          <Autocomplete
            multiple
            disableCloseOnSelect
            disabled={loading || !FormikValues.filterCustomer}
            getOptionLabel={(option: any) => option?.profile?.displayName ? option?.profile.displayName : ''}

            // getOptionDisabled={(option) => !option?.isActive}
            id={'tags-standard'}
            onChange={(ev: any, newValue: any) =>  setFieldValue('customers', newValue)}
            options={customers && customers.length !== 0 ? customers.sort((a: any, b: any) => a.profile.displayName > b.profile.displayName ? 1 : b.profile.displayName > a.profile.displayName ? -1 : 0) : []}
            renderInput={params => <TextField
              {...params}
              InputProps={{ ...params.InputProps, style: { background: '#fff' } }}
              variant={'outlined'}
              //error={isCustomerErrorDisplayed}
              //helperText={isCustomerErrorDisplayed && 'Please Select A Customer'}
            />
            }
            value={FormikValues.customers}
          />


          </DialogContent>

        <DialogActions classes={{
          'root': classes.dialogActions
        }}>
          <Button
            aria-label={'record-payment'}
            classes={{
              'root': classes.closeButton
            }}
            disabled={isSubmitting}
            onClick={() => closeModal()}
            variant={'outlined'}>
            Close
          </Button>

          <Button
            disabled={!isValidate() || isSubmitting}
            aria-label={'create-job'}
            color="primary"
            type={'submit'}
            variant={'contained'}>
            Run Report
          </Button>

        </DialogActions>
      </form>

    </DataContainer >
  );
}

const DataContainer = styled.div`

  margin: auto 0;

  .MuiFormGroup-root {
    margin-left: 30px;
    margin-bottom: 10px;
  }

  .MuiFormControlLabel-root {
    width: 200px;
  }

  .MuiFormLabel-root {
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    color: ${CONSTANTS.GRAY2};
    margin-bottom: 6px;
  }
  .MuiFormControl-marginNormal {
    margin-top: .5rem !important;
    margin-bottom: 1rem !important;
    /* height: 20px !important; */
  }

  .MuiInputBase-root {
    width: 200px;
  }

  .MuiInputBase-input {
     color: #383838;
    font-size: 16px;
    padding: 12px 14px;
  }

  .MethodContainer {
    display: flex;
    flex-direction: row;
    margin-left: 200px;
  }
  .MuiInputAdornment-positionStart {
    margin-right: 0;
  }
  .MuiOutlinedInput-notchedOutline {
    border-radius: 8px;
  }
  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
    padding: 3px;
    width: 400px;
  }

 .MuiButton-root {
    height: 47px;
    width: 79px;
  }
  .MuiButton-containedPrimary {
    width: 136px;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(BcArReportModal);
