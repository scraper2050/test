import React from 'react';

import { useDispatch } from 'react-redux';
import EmailButton from '../../../components/bc-email-button/bc-email-button';
import { sendEmailAction } from 'actions/email/email.action';
import {error as errorSnackBar} from "actions/snackbar/snackbar.action";
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { resetEmailState } from 'actions/email/email.action';
import { modalTypes } from '../../../../constants';
import {getInvoiceEmailTemplate} from "api/emailDefault.api";


interface EmailReportProps {
    jobReport: any;
    Component: any;
}


export default function EmailReportButton({ jobReport, Component }: EmailReportProps) {
  const { job, _id } = jobReport;
  const dispatch = useDispatch();

  const errorDispatcher = (message:string) => {
    dispatch(errorSnackBar(message))
  }

  const draftInvoiceHandler = (data:any, emailDefault:string) => {
    dispatch(setModalDataAction({
      data: {...data, emailDefault, modalTitle: 'Save & Send'},
      'type': modalTypes.SAVE_INVOICE_AND_EMAIL_JOB_REPORT_MODAL
    }));
    dispatch(resetEmailState());
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  }

  const invoiceHandler = (data:any, emailDefault:string) => {
    dispatch(setModalDataAction({
      data: {...data, emailDefault},
      'type': modalTypes.EMAIL_JOB_REPORT_MODAL
    }));
    dispatch(resetEmailState());
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  }
  
  const oldJobReportHandler = (data:any) => {
    dispatch(setModalDataAction({
      data,
      'type': modalTypes.EMAIL_JOB_REPORT_MODAL_OLD
    }));
    dispatch(resetEmailState());
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  }

  const data = {
    'customerContactId': job?.customerContactId,
    'customerId': job?.customer?._id,
    'customerEmail': job?.customer?.info
      ? job?.customer?.info?.email
      : '',
    'id': job?.jobId || job?._id,
    'jobReportId': _id,
    'typeText': 'Job Report'
  };

  return <EmailButton
    Component={Component}
    data={data}
    errorDispatcher={errorDispatcher}
    draftInvoiceHandler={draftInvoiceHandler}
    invoiceHandler={invoiceHandler}
    oldJobReportHandler={oldJobReportHandler}
    getInvoiceEmailTemplate={getInvoiceEmailTemplate}
  />;
}


