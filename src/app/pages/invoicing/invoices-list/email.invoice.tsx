import React from 'react';

import { useDispatch } from 'react-redux';
import EmailButton from '../../../components/bc-email-button/bc-email-button';
import { sendEmailAction } from 'actions/email/email.action';


interface EmailReportProps {
    invoice: any,
    Component: any
}


export default function EmailInvoiceButton({ invoice, Component }: EmailReportProps) {
  const { customer, _id, invoiceId } = invoice;
  const dispatch = useDispatch();

  const sendInvoice = () => {
    dispatch(sendEmailAction.fetch({ 'email': customer?.info?.email,
      'id': _id,
      'type': 'invoice'
    }));
  };

  const data = {
    'customer': customer?.profile?.displayName,
    'customerEmail': customer?.info?.email,
    'handleClick': sendInvoice,
    'id': invoiceId,
    'typeText': 'Invoice'
  };

  return <EmailButton
    Component={Component}
    data={data}
  />;
}


