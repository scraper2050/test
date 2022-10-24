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
  Grid,
  MenuItem,
  TextField,
  Typography,
  withStyles, RadioGroup, FormControlLabel, Radio, FormGroup, InputLabel
} from '@material-ui/core';
import React, { useState } from 'react';
import classNames from 'classnames';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import InputAdornment from "@material-ui/core/InputAdornment";
import { error } from "../../../actions/snackbar/snackbar.action";
import {modalTypes} from "../../../constants";
import { voidPayment } from 'api/payment.api';
import BCSentSync from "../../components/bc-sent-sync";
import {formatCurrency} from "../../../helpers/format";
import BCTextField from "../../components/bc-text-field/bc-text-field";

interface ApiProps {
  customerId: string,
  invoiceId?:string,
  paymentId?:string,
  amount?: number,
  paidAt: Date,
  referenceNumber?: string,
  paymentType?: string,
  note?: string
  line?: string,
}

function BcArReportModal({
  classes,
  // invoice: invoiceOrg,
  payment,
  fromHistory,
}: any): JSX.Element {
  const [sent, setSent] = useState<null | {created: boolean,synced: boolean }>(null);
  // const [invoice, setInvoice] = useState(invoiceOrg);
  const dispatch = useDispatch();

  const isValidate = () => {
    return true;
  };


  const formatNumber = (number: number) => {
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    })
  }
  const form = useFormik({
    initialValues: {
      asOf: new Date(),
      agingMethode: 'current',
      days: 30,
      periods: 4,
      customer: null
    },
    onSubmit: (values: any, { setSubmitting }: any) => {
      setSubmitting(true);

      // try {
      //   setSubmitting(false);
      //     //closeModal()
      // }).catch((e: any) => {
      //   console.log(e.message);
      //   dispatch(error(e.message));
      //   setSubmitting(false);
      // })
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
          <div style={{width: 300}}>
            <BCDateTimePicker
              // label="AS OF"
              className={'due_date'}
              handleChange={formikChange}
              name={'asOf'}
              id={'asOf'}
              placeholder={'Date'}
              value={FormikValues.asOf}
            />
          </div>

          <div className={classes.titleDiv}>
            <ExpandMoreIcon />
            <Typography className={classes.title}>AGING METHOD</Typography>
          </div>

          <RadioGroup style={{marginLeft: 30}}  row aria-label="agingMethode" name="agingMethode" value={FormikValues.agingMethode} onChange={formikChange}>
            <FormControlLabel style={{width: 200}} color="primary" value="current" control={<Radio />} label="Current" />
            <FormControlLabel style={{width: 200}} color="primary" value="report" control={<Radio />} label="Report Date" />
          </RadioGroup>

          <FormGroup>
            <InputLabel className={classes.label}>
              {'Days per aging period'}
            </InputLabel>
            <BCTextField
              name={'days'}
              // onChange={formikChange}
              placeholder={'Days'}
            />
          </FormGroup>

          <div style={{width: 300}}>
            <BCDateTimePicker
              label="AS OF"
              className={'due_date'}
              handleChange={formikChange}
              name={'asOf'}
              id={'asOf'}
              placeholder={'Date'}
              value={FormikValues.asOf}
            />
          </div>
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

          {!sent &&
          <Button
            disabled={!isValidate() || isSubmitting}
            aria-label={'create-job'}
            classes={{
              root: classes.submitButton,
              disabled: classes.submitButtonDisabled
            }}
            color="primary"
            type={'submit'}
            variant={'contained'}>
            Submit
          </Button>
          }

        </DialogActions>
      </form>

    </DataContainer >
  );
}

const Label = styled.div`
  color: red;
  font-size: 15px;
`;

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
    padding: 0;
  }
  .required > label:after {
    margin-left: 3px;
    content: "*";
    color: red;
  }
  .save-customer-button {
    color: ${CONSTANTS.PRIMARY_WHITE};
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
