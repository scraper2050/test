import React, { useEffect } from 'react';
import { emailJobReportActions, resetEmailState } from 'actions/customer/job-report/job-report.action';
import { modalTypes } from '../../../../constants';
import { useDispatch } from 'react-redux';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';


interface EmailReportProps {
    jobReport: any,
    Component: any
}


export default function EmailReportButton({ jobReport, Component }: EmailReportProps) {
  const { job, _id } = jobReport;
  const dispatch = useDispatch();

  const sendReport = () => {
    dispatch(emailJobReportActions.fetch({ 'jobReportId': _id }));
  };

  const handleClick = () => {
    dispatch(setModalDataAction({
      'data': {
        'customer': job.customer.profile
          ? job.customer.profile.displayName
          : jobReport.customerName,
        'customerEmail': job.customer.info
          ? job.customer.info.email
          : '',
        'handleClick': sendReport,
        'jobId': job.jobId || job._id
      },
      'type': modalTypes.EMAIL_JOB_REPORT_MODAL
    }));
    dispatch(resetEmailState());
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  return React.cloneElement(Component, { 'onClick': handleClick });
}


