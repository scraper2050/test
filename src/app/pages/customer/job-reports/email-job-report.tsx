import React from 'react';

import { useDispatch } from 'react-redux';
import EmailButton from '../../../components/bc-email-button/bc-email-button';
import { sendEmailAction } from 'actions/email/email.action';


interface EmailReportProps {
    jobReport: any,
    Component: any
}


export default function EmailReportButton({ jobReport, Component }: EmailReportProps) {
  const { job, _id } = jobReport;
  const dispatch = useDispatch();

  const sendReport = () => {
    dispatch(sendEmailAction.fetch({ 'email': job.customer.info?.email,
      'id': _id,
      'type': 'jobReport'
    }));
  };

  const data = {
    'customer': job.customer.profile
      ? job.customer.profile.displayName
      : jobReport.customerName,
    'customerEmail': job.customer.info
      ? job.customer.info.email
      : '',
    'handleClick': sendReport,
    'id': job.jobId || job._id,
    'typeText': 'Job Report'
  };

  return <EmailButton
    Component={Component}
    data={data}
  />;
}


