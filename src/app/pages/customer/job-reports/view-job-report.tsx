import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";
import BCJobReport from "../../../components/bc-job-report/bc-job-report";
import { useLocation } from "react-router-dom";
import { loadSingleJob, getJobDetailAction } from "actions/job/job.action";
import { formatDate, formatTime, phoneNumberFormatter } from "helpers/format";

function ViewJobReportsPage({ classes }: any) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { jobObj, isLoading } = useSelector((state: any) => state.jobState);
  // const jobObj = location.state;

  useEffect(() => {
    const obj: any = location.state;
    const jobId = obj.jobId;
    dispatch(loadSingleJob());
    dispatch(getJobDetailAction({ jobId }));
  }, []);

  const renderJobReport = (row: any) => {
    let baseObj = row;

    let jobId = baseObj["jobId"]
    let customerName = baseObj['customer']['profile']['displayName']
    let phoneNum = baseObj["customer"]["contact"]["phone"];
    let phoneFormat = phoneNumberFormatter(phoneNum);
    let customerEmail = baseObj["customer"]["info"]["email"];
    let workReport = baseObj["jobId"];
    let customerAddress = baseObj && baseObj["customer"]["address"];
    let address: any = "";
    if (customerAddress && customerAddress !== undefined) {
      address = `${customerAddress["street"] !== undefined &&
        customerAddress["street"] !== null
        ? customerAddress["street"]
        : ""
        } 
      ${customerAddress["city"] !== undefined &&
          customerAddress["city"] !== null
          ? customerAddress["city"]
          : ""
        } ${customerAddress["state"] !== undefined &&
          customerAddress["state"] !== null &&
          customerAddress["state"] !== "none"
          ? customerAddress["state"]
          : ""
        } ${customerAddress["zipCode"] !== undefined &&
          customerAddress["zipCode"] !== null
          ? customerAddress["zipCode"]
          : ""
        }`;
    } else {
      address = "N/A";
    }
    let jobType = baseObj["type"]["title"]
    let jobDate =
    baseObj && baseObj["createdAt"] !== undefined
      ? baseObj["createdAt"]
      : "N/A";
    let formatJobDate = formatDate(jobDate);
    let jobTime =
      baseObj && baseObj["createdAt"] !== undefined
        ? baseObj["createdAt"]
        : "N/A";
    let formatJobTime = formatTime(jobTime);
    let technicianName =
      baseObj && baseObj["technician"]["profile"] !== undefined
        ? baseObj["technician"]["profile"]["displayName"]
        : "N/A";
    let recordNote =
      baseObj && baseObj["description"] !== undefined
        ? baseObj["description"]
        : "N/A";
    let purchaseOrderCreated =
      baseObj && baseObj["ticket"] !== undefined
        ? baseObj["ticket"]["jobCreated"]
        : "N/A";
    let purchaseOrder = purchaseOrderCreated ? "Yes" : "No";

    let companyName =
      baseObj && baseObj["company"]["info"] !== undefined
        ? baseObj["company"]["info"]["companyName"]
        : "N/A";
    let companyLogo =
      baseObj && baseObj["company"]["info"] !== undefined
        ? baseObj["company"]["info"]["logoUrl"]
        : "N/A";
    let companyEmail =
      baseObj && baseObj["company"]["info"] !== undefined
        ? baseObj["company"]["info"]["companyEmail"]
        : "N/A";
    let companyFax =
      baseObj && baseObj["company"]["contact"] !== undefined
        ? baseObj["company"]["contact"]["fax"]
        : "N/A";
    let companyAddress = 
      baseObj && baseObj['company']['address']
    let companyPhone =
      baseObj && baseObj["company"]["contact"] !== undefined
        ? baseObj["company"]["contact"]["phone"]
        : "N/A";
    let workPerformedLocation =
      baseObj && baseObj["ticket"] !== undefined
        ? baseObj["ticket"]["jobLocation"]
        : "N/A";
    let location =
      workPerformedLocation === "" || null || undefined
        ? "None Found"
        : workPerformedLocation;
    let workPerformedDate =
      baseObj && baseObj["ticket"] !== undefined
        ? baseObj["ticket"]["createdAt"]
        : "N/A";
    let formatworkPerformedDate = formatDate(workPerformedDate);
    let workPerformedTimeScan =
      baseObj && baseObj["ticket"] !== undefined
        ? baseObj["ticket"]["createdAt"]
        : "N/A";
    let workPerformedNote =
      baseObj && baseObj["ticket"] !== undefined
        ? baseObj["ticket"]["note"]
        : "N/A";
    let formatworkPerformedTimeScan = formatTime(workPerformedTimeScan);
    let status = baseObj && baseObj["status"] === 2 ? baseObj["status"] : "N/A";
    let serviceTicket = baseObj && baseObj["ticket"] || null;
    let startTime = baseObj && baseObj["startTime"] !== undefined ? new Date(baseObj["startTime"]).toLocaleString() : 'N/A';
    let endTime = baseObj && baseObj["endTime"] !== undefined ? new Date(baseObj["endTime"]).toLocaleString() : 'N/A';

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
      companyLogo,
      companyFax,
      companyPhone,
      companyAddress,
      location,
      formatworkPerformedDate,
      formatworkPerformedTimeScan,
      // workPerformedImage,
      workPerformedNote,
      status,
      serviceTicket,
      startTime,
      endTime,
    };

    return jobReportObj;
  };

  if (isLoading) {
    return <BCCircularLoader heightValue={"200px"} />;
  } else {
    console.log('isLoading : ', )
    const jobReportData = renderJobReport(jobObj);
    return <BCJobReport jobReportData={jobReportData} />;
  }
}

export default ViewJobReportsPage;
