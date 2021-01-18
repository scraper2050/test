import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";
import BCJobReport from "../../../components/bc-job-report/bc-job-report";
import { useLocation } from "react-router-dom";
import { loadSingleJob, getJobDetailAction } from "actions/job/job.action";

function ViewJobReportsPage({ classes }: any) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { jobState, isLoading } = useSelector((state: any) => state.jobState);
  const jobObj = location.state;

  useEffect(() => {
    const obj: any = location.state;
    const jobId = obj.jobId;
    dispatch(loadSingleJob());
    dispatch(getJobDetailAction({ jobId }));
  }, []);

  const renderJobReport = (row: any) => {
    let baseObj = row;
    let jobId =
      baseObj && baseObj["jobId"] !== undefined ? baseObj["jobId"] : "N/A";

    let customerName =
      baseObj && baseObj["customerName"] !== undefined
        ? baseObj["customerName"]
        : "N/A";
    let phoneFormat =
      baseObj && baseObj["phoneFormat"] !== undefined
        ? baseObj["phoneFormat"]
        : "N/A";
    let customerEmail =
      baseObj && baseObj["customerEmail"] !== undefined
        ? baseObj["customerEmail"]
        : "N/A";

    let workReport =
      baseObj && baseObj["workReport"] !== undefined
        ? baseObj["workReport"]
        : "N/A";

    let address =
      baseObj && baseObj["address"] !== undefined ? baseObj["address"] : "N/A";

    let jobType =
      baseObj && baseObj["jobType"] !== undefined ? baseObj["jobType"] : "N/A";
    let formatJobDate =
      baseObj && baseObj["formatJobDate"] !== undefined
        ? baseObj["formatJobDate"]
        : "N/A";
    let formatJobTime =
      baseObj && baseObj["formatJobTime"] !== undefined
        ? baseObj["formatJobTime"]
        : "N/A";
    let technicianName =
      baseObj && baseObj["technicianName"] !== undefined
        ? baseObj["technicianName"]
        : "N/A";
    let recordNote =
      baseObj && baseObj["recordNote"] !== undefined
        ? baseObj["recordNote"]
        : "N/A";
    let purchaseOrder =
      baseObj && baseObj["purchaseOrder"] !== undefined
        ? baseObj["purchaseOrder"]
        : "N/A";
    let companyName =
      baseObj && baseObj["companyName"] !== undefined
        ? baseObj["companyName"]
        : "N/A";
    let companyEmail =
      baseObj && baseObj["companyEmail"] !== undefined
        ? baseObj["companyEmail"]
        : "N/A";
    let companyPhone =
      baseObj && baseObj["companyPhone"] !== undefined
        ? baseObj["companyPhone"]
        : "N/A";
    let location =
      baseObj && baseObj["location"] !== undefined
        ? baseObj["location"]
        : "N/A";
    let formatworkPerformedDate =
      baseObj && baseObj["formatworkPerformedDate"] !== undefined
        ? baseObj["formatworkPerformedDate"]
        : "N/A";
    let formatworkPerformedTimeScan =
      baseObj && baseObj["formatworkPerformedTimeScan"] !== undefined
        ? baseObj["formatworkPerformedTimeScan"]
        : "N/A";
    let workPerformedImage =
      baseObj && baseObj["scans"] !== undefined
        ? baseObj["scans"]["equipment"]["images"]
        : "N/A";
    let workPerformedNote =
      baseObj && baseObj["workPerformedNote"] !== undefined
        ? baseObj["workPerformedNote"]
        : "N/A";

    let status = baseObj && baseObj["status"] === 2 ? baseObj["status"] : "N/A";

    let jobReportObj = {
      workReport,
      customerName: customerName,
      phoneFormat: phoneFormat,
      customerEmail: customerEmail,
      jobId: jobId,
      address,
      jobType,
      formatJobDate,
      formatJobTime,
      technicianName,
      recordNote,
      purchaseOrder,
      companyName,
      companyEmail,
      companyPhone,
      location,
      formatworkPerformedDate,
      formatworkPerformedTimeScan,
      workPerformedImage,
      workPerformedNote,
      status,
    };

    return jobReportObj;
  };

  if (isLoading) {
    return <BCCircularLoader heightValue={"200px"} />;
  } else {
    const jobReportData = renderJobReport(jobObj);

    return <BCJobReport jobReportData={jobReportData} />;
  }
}

export default ViewJobReportsPage;
