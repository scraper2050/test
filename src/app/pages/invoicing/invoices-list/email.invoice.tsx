import React from 'react';

import { useDispatch } from 'react-redux';
import EmailButton from '../../../components/bc-email-button/bc-email-button';
import { sendEmailAction } from 'actions/email/email.action';


interface EmailReportProps {
    invoice: any,
    Component: any,
    showLoader?: boolean,
}


export default function EmailInvoiceButton({ invoice, Component, showLoader = true }: EmailReportProps) {
  const { customer, _id, invoiceId } = invoice;
  const dispatch = useDispatch();

  const sendInvoice = () => {
    dispatch(sendEmailAction.fetch({ 'email': customer?.info?.email,
      'id': _id,
      'type': 'invoice'
    }));
  };

  const data = {
    'modalTitle': 'Send this invoice',
    'customer': customer?.profile?.displayName,
    // 'customerEmail': customer?.info?.email,
    'customerEmail': invoice.customerContactId?.email || customer?.info?.email,
    'handleClick': sendInvoice,
    'id': _id,
    'typeText': 'Invoice',
    'className': 'wideModalTitle',
    'customerId': customer?._id,
  };

  return <EmailButton
    Component={Component}
    data={data}
    showLoader={showLoader}
  />;
}


