import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import BCJobReport from '../../../components/bc-job-report/bc-job-report';
import { loadJobReportActions } from 'actions/customer/job-report/job-report.action';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function ViewJobReportsPage() {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const { loading, jobReportObj, error } = useSelector(({ JobReport }: any) =>
    JobReport);

  useEffect(() => {
    dispatch(loadJobReportActions.fetch({ jobId }));
  }, []);


  if (loading) {
    return <BCCircularLoader heightValue={'200px'} />;
  }

  return <BCJobReport jobReportData={jobReportObj} />;
}

export default ViewJobReportsPage;
