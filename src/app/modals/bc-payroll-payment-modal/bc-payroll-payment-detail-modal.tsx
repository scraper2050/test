import * as CONSTANTS from '../../../constants';
import styles from './bc-payroll-payment-modal.styles';
import {
  DialogActions,
  Button,
  Grid,
  Typography,
  withStyles,
  DialogContent
} from '@material-ui/core';
import React, {useEffect} from 'react';
import {closeModalAction, setModalDataAction} from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  formatCurrency,
  formatShortDateNoDay
} from "../../../helpers/format";
import {useHistory} from "react-router-dom";
import {PRIMARY_BLUE, PRIMARY_RED} from "../../../constants";


function BcPayrollPaymentDetailModal({
                                       classes,
                                       payment,
                               }: any): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  const viewInvoice = (invoice: any) => {
    closeModal();
    history.push({
      'pathname': `/main/invoicing/view/${invoice._id}`,
    });
  }

  // const editPayment = (payment: any) => {
  //   dispatch(setModalDataAction({
  //     'data': {
  //       invoice,
  //       payment,
  //       fromHistory: true,
  //       modalTitle: 'Record a Payment',
  //       removeFooter: false,
  //     },
  //     'type': modalTypes.PAYMENT_RECORD_MODAL
  //   }));
  // }

  return (
    <DataContainer className={'new-modal-design'}>
      <Grid container className={classes.modalPreview} justify={'space-around'}>
        <Grid item>
          <Typography variant={'caption'} className={classes.previewCaption}>VENDOR</Typography>
          <Typography variant={'h6'} className={classes.previewText}>{payment.payedPerson.vendor}</Typography>
        </Grid>
        <Grid item>
          <Typography variant={'caption'} className={classes.previewCaption}>TOTAL AMOUNT</Typography>
          <Typography variant={'h6'} className={classes.previewText}>{formatCurrency(payment.amountPaid)}</Typography>
        </Grid>
        <Grid item>
          <Typography variant={'caption'} className={classes.previewCaption}>TIME PERIOD</Typography>
          <Typography variant={'h6'} className={classes.previewTextSmall}>
            {formatShortDateNoDay(payment.paidAt) + ' - ' + formatShortDateNoDay(payment.paidAt)}
          </Typography>
        </Grid>
      </Grid>

      <DialogContent classes={{'root': `modalDataContainer ${classes.dialogContent}`}}>
        <div className={'tableRow'}>
          <Typography variant={'button'} className={'tableTitle'}>DATE</Typography>
          <Typography variant={'button'} className={'tableValue'}>
            {formatShortDateNoDay(payment.paidAt)}
          </Typography>
        </div>
        <div className={'tableRow'}>
          <Typography variant={'button'} className={'tableTitle'}>AMOUNT</Typography>
          <Typography variant={'button'} className={'tableValue'}>
            {formatCurrency(payment.amountPaid)}
          </Typography>
        </div>
        <div className={'tableRow'}>
          <Typography variant={'button'} className={'tableTitle'}>PAYMENT METHOD</Typography>
          <Typography variant={'button'} className={'tableValue'}>
            {payment.paymentType}
          </Typography>
        </div>
        <div className={'tableRow'}>
          <Typography variant={'button'} className={'tableTitle'}>REFERENCE NO</Typography>
          <Typography variant={'button'} className={'tableValue'}>
            {payment.referenceNumber}
          </Typography>
        </div>
        <div className={'tableRow'}>
          <Typography variant={'button'} className={'tableTitle'}>NOTES</Typography>
          <Typography variant={'button'} className={'tableValue'}>
            {payment.note}
          </Typography>
        </div>
        {payment.invoices && (
          <div className={'tableRow'}>
            <Typography variant={'button'} className={'tableTitle'}>INVOICE NO(s).</Typography>
            <div className={'tableValue'}>
              {payment.invoices.map((invoice: any, index: number, array: any[]) =>
                <>
                  <a href={`/main/invoicing/view/${invoice._id}`}>{invoice.invoiceId}</a>
                  {index < array.length - 1 ? ', ' : ''}
                </>
              )}
            </div>
          </div>
        )}
      </DialogContent>


      <DialogActions classes={{
        'root': classes.dialogActions
      }}>
        <Button
          aria-label={'record-payment'}
          classes={{
            'root': classes.closeButton
          }}
          onClick={() => closeModal()}
          variant={'outlined'}>
          Close
        </Button>

      </DialogActions>
    </DataContainer >
  );
}

const DataContainer = styled.div`
  margin: auto 0;
  .tableRow {
    display: flex;
    flex: 1 1 0%;
    flex-direction: row;
    padding: 8px;
  }
  .tableTitle {
    flex: 0.25;
    text-align: right;
   }
  .tableValue {
    flex: 0.75;
    margin-left: 20px;
    color: '#8F8F8F';
    font-size: 14px;
    text-transform: none;
   }
   a:link {
    color: ${PRIMARY_BLUE};
  }
  a:visited {
    color: ${PRIMARY_BLUE};
  }
  a:hover {
    color: ${PRIMARY_RED};
  }
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(BcPayrollPaymentDetailModal);
