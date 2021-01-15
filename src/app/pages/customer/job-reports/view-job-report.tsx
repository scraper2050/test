import React, { useEffect } from "react";

import {
  getJobReportDetailAction,
  loadSingleJobReport,
} from "actions/customer/job-report/job-report.action";
import { useDispatch, useSelector } from "react-redux";
import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";

import BCJobReport from "../../../components/bc-job-report/bc-job-report";
import { useLocation } from "react-router-dom";
import {
  closeModalAction,
  setModalDataAction,
} from "../../../../actions/bc-modal/bc-modal.action";
//import { JobData } from "../../../../testData";

function ViewJobReportsPage() {
  const dispatch = useDispatch();
  const jobReportObj = useSelector((state: any) => state.jobReports);

  console.log(jobReportObj);

  useEffect(() => {
    const jobId = jobReportObj.jobId;
    dispatch(loadSingleJobReport());
    dispatch(getJobReportDetailAction({ jobId }));
  }, []);

  const renderJobReport = (row: any) => {
    let baseObj = row;
    let workReport =
      baseObj && baseObj["jobId"] !== undefined ? baseObj["jobId"] : "N/A";

    let customerName =
      baseObj && baseObj["customer"] !== undefined
        ? baseObj["customer"]["profile"]["displayName"]
        : "N/A";
    let customerPhoneNumber =
      baseObj && baseObj["customer"] !== undefined
        ? baseObj["customer"]["contact"]["phone"]
        : "N/A";
    let customerEmail =
      baseObj && baseObj["customer"] !== undefined
        ? baseObj["customer"]["info"]["email"]
        : "N/A";
    let customerAddress = baseObj && baseObj["customer"];
    let address: any = "";
    if (customerAddress && customerAddress !== undefined) {
      address = `${
        customerAddress["street"] !== undefined &&
        customerAddress["street"] !== null
          ? customerAddress["street"]
          : ""
      } 
      ${
        customerAddress["city"] !== undefined &&
        customerAddress["city"] !== null
          ? customerAddress["city"]
          : ""
      } ${
        customerAddress["state"] !== undefined &&
        customerAddress["state"] !== null &&
        customerAddress["state"] !== "none"
          ? customerAddress["state"]
          : ""
      } ${
        customerAddress["zipCode"] !== undefined &&
        customerAddress["zipCode"] !== null
          ? customerAddress["zipCode"]
          : ""
      }`;
    } else {
      address = "N/A";
    }
    let jobType =
      baseObj && baseObj["type"] !== undefined
        ? baseObj["type"]["title"]
        : "N/A";
    let jobDate =
      baseObj && baseObj["createdAt"] !== undefined
        ? baseObj["createdAt"]
        : "N/A";
    let jobTime =
      baseObj && baseObj["dateTime"] !== undefined
        ? baseObj["dateTime"]
        : "N/A";
    let technicianName =
      baseObj && baseObj["technician"] !== undefined
        ? baseObj["technician"]["profile"]["displayName"]
        : "N/A";
    let recordNote =
      baseObj && baseObj["note"] !== undefined ? baseObj["dateTime"] : "N/A";
    let purchaseOrderCreated =
      baseObj && baseObj["createdAt"] !== undefined
        ? baseObj["dateTime"]
        : "N/A";
    let companyName =
      baseObj && baseObj["createdBy"] !== undefined
        ? baseObj["createdBy"]["info"]["companyName"]
        : "N/A";
    let companyEmail =
      baseObj && baseObj["createdBy"] !== undefined
        ? baseObj["createdBy"]["auth"]["email"]
        : "N/A";
    let companyPhone =
      baseObj && baseObj["createdBy"] !== undefined
        ? baseObj["createdBy"]["contact"]["phone"]
        : "N/A";
    let workPerformedLocation =
      baseObj && baseObj["scans"] !== undefined
        ? baseObj["scans"]["equipment"]["info"]["location"]
        : "N/A";
    let workPerformedDate =
      baseObj && baseObj["ticket"] !== undefined
        ? baseObj["ticket"]["scheduleDateTime"]
        : "N/A";
    let workPerformedTimeScan =
      baseObj && baseObj["scans"] !== undefined
        ? baseObj["scans"]["timeOfScan"]
        : "N/A";
    let workPerformedImage =
      baseObj && baseObj["scans"] !== undefined
        ? baseObj["scans"]["equipment"]["images"]
        : "N/A";
    let workPerformedNote =
      baseObj && baseObj["scans"] !== undefined
        ? baseObj["scans"]["comment"]
        : "N/A";

    let jobReportObj = {
      workReport,
      customerName,
      customerPhoneNumber,
      customerEmail,
      address,
      jobType,
      jobDate,
      jobTime,
      technicianName,
      recordNote,
      purchaseOrderCreated,
      companyName,
      companyEmail,
      companyPhone,
      workPerformedLocation,
      workPerformedDate,
      workPerformedTimeScan,
      workPerformedImage,
      workPerformedNote,
    };

    return jobReportObj;
  };

  if (jobReportObj.loading) {
    return <BCCircularLoader heightValue={"200px"} />;
  } else {
    const jobReportData = renderJobReport(jobReportObj);

    return <BCJobReport jobReportData={jobReportData} />;
  }
}

export default ViewJobReportsPage;
