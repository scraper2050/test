import * as CONSTANTS from '../../../constants';
import moment from 'moment';
import styles from './bc-edit-commission-modal.styles';
import { useFormik } from 'formik';
import Edit from '@material-ui/icons/Edit';
import {
  DialogActions,

  Button,
  Grid,
  TableContainer,
  Typography,
  withStyles, Paper, Table, TableHead, TableRow, TableCell, TableBody
} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {closeModalAction, openModalAction, setModalDataAction} from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {error, info} from "../../../actions/snackbar/snackbar.action";
import {getInvoiceDetail} from "../../../api/invoicing.api";
import BCCircularLoader from "../../components/bc-circular-loader/bc-circular-loader";
import {modalTypes} from "../../../constants";
import CSInvoiceStatus from "../../components/bc-invoice-status";
import {formatCurrency} from "../../../helpers/format";
const TABLE_PADDING = 75;

function BcPaymentHistoryModal({
                                 classes,
                                 invoiceID,
                               }: any): JSX.Element {
  const [invoice, setInvoice] = useState<any>({});
  const [payments, setPayments] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getInvoiceDetail(invoiceID).then((response) => {
      if (response.status === 1) {
        setInvoice(response.invoice);
        setPayments(response.payments);
        setLoading(false);
      } else {
        dispatch(error('Cannot find invoice'));
        closeModal();
      }
    }).catch((e) => {
      dispatch(error(e.message));
      closeModal();
    })
  }, []);

  const currentBalanceDue = invoice?.balanceDue ?? invoice?.total;

  const formatNumber = (number: number) => {
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    })
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

  const recordPayment = () => {
    dispatch(setModalDataAction({
      'data': {
        invoice,
        modalTitle: 'Record a Payment',
        removeFooter: false,
      },
      'type': modalTypes.PAYMENT_RECORD_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  }

  const editPayment = (payment: any) => {
    dispatch(setModalDataAction({
      'data': {
        invoice,
        payment,
        fromHistory: true,
        modalTitle: 'Edit Payment',
        removeFooter: false,
      },
      'type': modalTypes.PAYMENT_RECORD_MODAL
    }));
  }

  const {customer, dueDate} = invoice;
  const formatedDueDate = (new Date(dueDate)).toLocaleDateString('en-us',{ year: 'numeric', month: 'short', day: 'numeric' })
  const customerPO = invoice.customerPO ? invoice.customerPO : '\u00A0';

  return (
    <DataContainer className={'new-modal-design'}>
      {loading ?
        <BCCircularLoader heightValue={'60vh'}/> :
        <>
          <Grid container className={classes.modalPreview} justify={'space-around'}>
            <Grid item>
              <Typography variant={'caption'} className={classes.previewCaption}>BILL TO</Typography>
              <Typography variant={'h6'} className={classes.previewText}>{customer.profile.displayName}</Typography>
            </Grid>
            <Grid item>
              <Typography variant={'caption'} className={classes.previewCaption}>TOTAL AMOUNT</Typography>
              <Typography variant={'h6'} className={classes.previewText}>{formatCurrency(invoice.total)}</Typography>
            </Grid>
            <Grid item>
              <Typography variant={'caption'} className={classes.previewCaption}>BALANCE DUE</Typography>
              <Typography variant={'h6'} className={classes.previewText}>{formatCurrency(currentBalanceDue)}</Typography>
            </Grid>
            <Grid item>
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
                                className={classes.previewTextSm}>{formatedDueDate}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
          <TableContainer>
            <Table size={'medium'}>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Method</TableCell>
                  <TableCell>Reference&nbsp;No.</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell>&nbsp;&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment: any) => {
                  const paymentDate = moment(payment.paidAt);
                  return <TableRow
                    key={payment._id}
                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      {paymentDate.format('MM/DD/YYYY')}
                    </TableCell>
                    <TableCell>{formatCurrency(payment.amountPaid)}</TableCell>
                    <TableCell style={{whiteSpace: 'nowrap'}}>{payment.paymentType}</TableCell>
                    <TableCell>{payment.referenceNumber}</TableCell>
                    <TableCell style={{width: '99%'}}>{payment.note}</TableCell>
                    <TableCell>
                      <Button onClick={() => editPayment(payment)}>
                        <Edit />
                      </Button>
                    </TableCell>
                  </TableRow>
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <DialogActions classes={{
            'root': classes.dialogActions
          }}>

            {invoice?.status === 'PAID' ?
              <CSInvoiceStatus status={invoice.status} />

              :

              <Button
                aria-label={'create-job'}
                classes={{
                  root: classes.submitButton,
                  disabled: classes.submitButtonDisabled
                }}
                onClick={recordPayment}
                color="primary"
                type={'submit'}
                variant={'contained'}>
                Record Payment
              </Button>
            }

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
)(BcPaymentHistoryModal);
