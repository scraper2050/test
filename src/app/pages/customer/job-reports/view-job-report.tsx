import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import BCJobReport from '../../../components/bc-job-report/bc-job-report';
import { formatJobReportDetails } from './util';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { getJobDetailAction, loadSingleJob } from 'actions/job/job.action';
import { useDispatch, useSelector } from 'react-redux';


function ViewJobReportsPage() {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const { jobObj, isLoading } = useSelector((state: any) => state.jobState);

  useEffect(() => {
    dispatch(loadSingleJob());
    dispatch(getJobDetailAction({ jobId }));
  }, []);


  if (isLoading) {
    return <BCCircularLoader heightValue={'200px'} />;
  }
  const jobReportData = formatJobReportDetails(jobObj);
  return <BCJobReport jobReportData={jobReportData} />;
}

export default ViewJobReportsPage;
