import * as CONSTANTS from '../../../constants';
import styles from './bc-bulk-payment-modal.styles';
import {
  DialogActions,
  Button,
  Grid,
  TableContainer,
  Typography,
  withStyles, Paper, Table, TableHead, TableRow, TableCell, TableBody
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { closeModalAction, openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";
import { error, info } from "../../../actions/snackbar/snackbar.action";
import { modalTypes } from "../../../constants";
import { getInvoiceDetail } from 'api/invoicing.api';
import {formatCurrency} from "../../../helpers/format";
const TABLE_PADDING = 75;

function BcBulkPaymentHistoryModal({
  classes,
  data,
}: any): JSX.Element {
  const isBulk = !!data.line?.length;
  const dispatch = useDispatch();
  const [invoice, setInvoice] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    if (!isBulk) {
      getInvoiceDetail(data.invoice._id).then((response) => {
        if (response.status === 1) {
          setInvoice(response.invoice);
          setLoading(false);
        } else {
          dispatch(error('Cannot find invoice'));
          closeModal();
        }
      }).catch((e) => {
        dispatch(error(e.message));
        closeModal();
      })
    } else {
      setLoading(false);
    }
  }, []);

  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  const editPayment = () => {
    if (!isBulk) {
      const modalDataForEditPayment = {
        'data': {
          invoice,
          payment: data,
          modalTitle: 'Edit Payment',
          removeFooter: false,
        },
        'type': modalTypes.PAYMENT_RECORD_MODAL
      };
      dispatch(setModalDataAction({
        'data': {
          modalDataForEditPayment,
        },
        'type': modalTypes.CONFIRM_EDIT_PAYMENT_MODAL
      }));
    } else {
      const modalDataForEditPayment = {
        'data': {
          'modalTitle': 'Edit Bulk Payment',
          'removeFooter': false,
          payments: data,
        },
        'type': modalTypes.EDIT_BULK_PAYMENT_MODAL
      };
      dispatch(setModalDataAction({
        'data': {
          modalDataForEditPayment
        },
        'type': modalTypes.CONFIRM_EDIT_PAYMENT_MODAL
      }));
      setTimeout(() => {
        dispatch(openModalAction());
      }, 200);
    }
  }

  const { customer, paidAt, amountPaid, paymentType, referenceNumber, invoice: paymentInvoice } = data;
  const formatedPaidAt = (new Date(paidAt)).toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' })
  const payments = isBulk ? data.line : [{ amountPaid, invoice: paymentInvoice }]

  return (
    <DataContainer className={'new-modal-design'}>
      {loading ?
        <BCCircularLoader heightValue={'60vh'} /> :
        <>
          <Grid container className={classes.modalPreview} justify={'space-around'}>
            <Grid item>
              <Typography variant={'caption'} className={classes.previewCaption}>BILL TO</Typography>
              <Typography variant={'h6'} className={classes.previewText}>{customer.profile.displayName}</Typography>
            </Grid>
            <Grid item>
              <Typography variant={'caption'} className={classes.previewCaption}>TOTAL AMOUNT PAID</Typography>
              <Typography variant={'h6'} className={classes.previewText}>{formatCurrency(amountPaid)}</Typography>
            </Grid>
            {/* <Grid item>
          <Typography variant={'caption'} className={classes.previewCaption}>PAYMENT METHOD</Typography>
          <Typography variant={'h6'} className={classes.previewText}>{paymentType || 'N/A'}</Typography>
        </Grid>
        <Grid item>
          <Typography variant={'caption'} className={classes.previewCaption}>REFERENCE NO.</Typography>
          <Typography variant={'h6'} className={classes.previewText}>{referenceNumber || 'N/A'}</Typography>
        </Grid> */}
            <Grid item>
              <Typography variant={'caption'} className={classes.previewCaption}>PAYMENT DATE</Typography>
              <Typography variant={'h6'} className={classes.previewText}>{formatedPaidAt}</Typography>
            </Grid>
            {/* <Grid item>
          <Grid container direction={'row'} spacing={2}>
            <Grid item>
              <Grid container direction={'column'}>
                <Typography variant={'caption'} align={'right'} className={classes.previewCaption2}>INVOICE
                  #:</Typography>
                <Typography variant={'caption'} align={'right'} className={classes.previewCaption2}>CUSTOMER
                  P.O.:</Typography>
                <Typography variant={'caption'} align={'right'} className={classes.previewCaption2}>DUE
                  DATE:</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction={'column'}>
                <Typography variant={'caption'} align={'right'}
                  className={classes.previewTextSm}>{invoice.invoiceId}</Typography>
                <Typography variant={'caption'} align={'right'}
                  className={classes.previewTextSm}>{customerPO}</Typography>
                <Typography variant={'caption'} align={'right'}
                  className={classes.previewTextSm}>{formatedPaidAt}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid> */}

          </Grid>
          <TableContainer>
            <Table size={'medium'}>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice ID</TableCell>
                  <TableCell>Amount Paid</TableCell>
                  <TableCell>Payment Type</TableCell>
                  <TableCell>Reference Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment: any, index: number) => (
                  <TableRow key={payment._id || index}>
                    <TableCell>{payment.invoice.invoiceId}</TableCell>
                    <TableCell>{formatCurrency(payment.amountPaid)}</TableCell>
                    <TableCell>{paymentType || 'N/A'}</TableCell>
                    <TableCell>{referenceNumber || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <DialogActions classes={{
            'root': classes.dialogActions
          }}>
            <Button
              aria-label={'edit-payment'}
              classes={{
                root: classes.submitButton,
                disabled: classes.submitButtonDisabled
              }}
              onClick={editPayment}
              color="primary"
              type={'submit'}
              variant={'contained'}>
              Edit Payment
            </Button>
          </DialogActions>
        </>
      }
    </DataContainer >
  );
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
  .required > label:after {
    margin-left: 3px;
    content: "*";
    color: red;
  }
  .MuiTableContainer-root {
    height: 40vh;
    overflow: vertical;
  }
  td {
    vertical-align: top;
  }
  td:first-child {
    padding-left: ${TABLE_PADDING}px;
  }
  th:first-child {
    padding-left: ${TABLE_PADDING}px;
  }
  td:last-child {
    padding-right: ${TABLE_PADDING}px;
  }
  th:last-child {
    padding-right: ${TABLE_PADDING}px;
  }
  .save-customer-button {
    color: ${CONSTANTS.PRIMARY_WHITE};
  }
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(BcBulkPaymentHistoryModal);
