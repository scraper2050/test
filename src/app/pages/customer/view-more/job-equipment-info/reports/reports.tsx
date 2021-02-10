import BCBackButtonNoLink from '../../../../../components/bc-back-button/bc-back-button-no-link';
import BCTableContainer from '../../../../../components/bc-table-container/bc-table-container';
import BCTabs from '../../../../../components/bc-tab/bc-tab';
import Fab from "@material-ui/core/Fab";
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import styles from '../job-equipment-info.style';
import { withStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { formatDate, formatTime, phoneNumberFormatter } from "helpers/format";
import { loadSingleJob, getJobDetailAction } from "actions/job/job.action";
import { getCustomerDetailAction, loadingSingleCustomers } from 'actions/customer/customer.action';
import { getAllJobsAPI } from "api/job.api";
import { Job } from 'actions/job/job.types';

interface LocationStateTypes {
  customerName: string;
  customerId: string;
}

function CustomersJobEquipmentInfoReportsPage({ classes }: any) {
  const dispatch = useDispatch();

  const { isLoading = true, jobs, refresh = true } = useSelector(
    ({ jobState }: any) => ({
      'isLoading': jobState.isLoading,
      'jobs': jobState.data,
      'refresh': jobState.refresh,
    })
  );

  const { customerObj } = useSelector((state: any) => state.customers);

  const location = useLocation<any>();
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);
  const [filteredJobs, setFilterJobs] = useState<Job[] | []>([]);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };


  const locationState = location.state;

  const prevPage = locationState && locationState.prevPage ? locationState.prevPage : null;

  const [currentPage, setCurrentPage] = useState({
    page: prevPage ? prevPage.page : 0,
    pageSize: prevPage ? prevPage.pageSize : 10,
    sortBy: prevPage ? prevPage.sortBy : [],
  });

  const handleFilterData = (jobs: any, location: LocationStateTypes) => {
    const oldJobs = jobs;
    let filteredJobs = oldJobs;

    filteredJobs = filteredJobs.filter((resJob: any) =>
      resJob.customer._id === location.customerId);


    filteredJobs
      .filter((x: any) => x.status !== 2)
      .forEach((x: any) => filteredJobs.splice(filteredJobs.indexOf(x), 1));

    setFilterJobs(filteredJobs);
  }

  const renderGoBack = (location: any) => {
    const baseObj = location;
    let customerName =
      baseObj["customerName"] && baseObj["customerName"] !== undefined
        ? baseObj["customerName"]
        : "N/A";
    let customerId =
      baseObj["customerId"] && baseObj["customerId"] !== undefined
        ? baseObj["customerId"]
        : "N/A";

    let linkKey: any = localStorage.getItem('nestedRouteKey');
    localStorage.setItem('prevNestedRouteKey', linkKey);
    localStorage.setItem('nestedRouteKey', `${customerName}`);

    history.push({
      pathname: `/main/customers/${customerName}`,
      state: {
        customerName,
        customerId,
        from: 1
      }
    });
  }

  const columns: any = [
    {
      Cell({ row }: any) {
        return <div className={"flex items-center"}>{row.index + 1}</div>;
      },
      Header: "No#",
      className: "font-bold",
      sortable: true,
    },
    {
      Header: "Job ID",
      accessor: "jobId",
      className: "font-bold",
      sortable: true,
    },
    // {
    //   Header: "Customer",
    //   accessor: "customer.profile.displayName",
    //   className: "font-bold",
    //   sortable: true,
    // },
    {
      Cell({ row }: any) {
        const Date = formatDate(row.original.scheduleDate);
        return (
          <div className={"flex items-center"}>
            <p>{Date}</p>
          </div>
        );
      },
      Header: "Date",
      id: "job-date",
      sortable: true,
    },
    {
      Header: "Technician",
      accessor: "technician.profile.displayName",
      className: "font-bold",
      sortable: true,
    },
    {
      Cell({ row }: any) {
        return (
          <div className={"flex items-center"}>
            <Fab
              aria-label={"delete"}
              classes={{
                root: classes.fabRoot,
              }}
              color={"primary"}
              onClick={() => renderViewMore(row)}
              variant={"extended"}
            >
              {"View More"}
            </Fab>
          </div>
        );
      },
      id: "action",
      sortable: false,
      width: 60,
    },
  ];

  const renderViewMore = (row: any) => {

    let baseObj = row["original"];
    let jobId = row["original"]["_id"];
    let status =
      baseObj && baseObj["status"] === undefined ? baseObj["status"] : "N/A";
    let customerName =
      baseObj && baseObj["customer"]["profile"] !== undefined
        ? baseObj["customer"]["profile"]["displayName"]
        : "N/A";
    let customerId =
      baseObj && baseObj["customer"]["_id"] !== undefined
        ? baseObj["customer"]["_id"]
        : "N/A";
    let customerPhone =
      baseObj && baseObj["customer"]["contact"] !== undefined
        ? baseObj["customer"]["contact"]["phone"]
        : "N/A";
    let phoneFormat = phoneNumberFormatter(customerPhone);
    let workReport =
      baseObj && baseObj["jobId"] !== undefined ? baseObj["jobId"] : "N/A";
    let customerEmail =
      baseObj && baseObj["customer"]["info"] !== undefined
        ? baseObj["customer"]["info"]["email"]
        : "N/A";
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

    let jobType =
      baseObj && baseObj["type"] !== undefined
        ? baseObj["type"]["title"]
        : "N/A";
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
    let companyEmail =
      baseObj && baseObj["company"]["info"] !== undefined
        ? baseObj["company"]["info"]["companyEmail"]
        : "N/A";
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

    let jobReportObj = {
      jobId: jobId,
      customerId,
      customerName,
      phoneFormat,
      workReport,
      customerEmail,
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
      workPerformedNote,
      status,
    };

    jobId = jobId !== undefined ? jobId.replace(/ /g, "") : "jobid";

    let linkKey: any = localStorage.getItem('nestedRouteKey');
    localStorage.setItem('prevNestedRouteKey', linkKey);
    localStorage.setItem('nestedRouteKey', `${customerName}/job-equipment-info/jobs/${jobId}`);

    dispatch(loadSingleJob());
    dispatch(getJobDetailAction(jobReportObj));
    history.push({
      pathname: `/main/customers/${customerName}/job-equipment-info/jobs/${jobId}`,
      state: {
        ...jobReportObj,
        currentPage,
      },
    });
  };



  useEffect(() => {
    if (refresh) {
      dispatch(getAllJobsAPI());
    }

    if (jobs) {
      handleFilterData(jobs, location.state);
    }

    if (customerObj._id === '') {
      const obj: any = location.state;
      const customerId = obj.customerId;
      dispatch(loadingSingleCustomers());
      dispatch(getCustomerDetailAction({ customerId }));
    }
  }, [refresh]);

  return (
    <>
      <div className={classes.pageMainContainer}>
        <div className={classes.pageContainer}>
          <div className={classes.pageContent}>

            <Grid
              container>
              <BCBackButtonNoLink
                func={() => renderGoBack(location.state)}
              />
              <div className="tab_wrapper">
                <BCTabs
                  curTab={curTab}
                  indicatorColor={'primary'}
                  onChangeTab={handleTabChange}
                  tabsData={[
                    {
                      'label': 'CUSTOMER REPORTS',
                      'value': 0
                    },
                  ]}
                />
              </div>
            </Grid>

            <div
              style={{
                'height': '15px'
              }}
            />

            <div
              className={`${classes.dataContainer} `}
              hidden={curTab !== 0}
              id={'0'}>
              <BCTableContainer
                currentPage={currentPage}
                setPage={setCurrentPage}
                columns={columns}
                isLoading={isLoading}
                search
                searchPlaceholder={"Search...(Keyword, Date, Tag, etc.)"}
                tableData={filteredJobs}
                initialMsg="There are no data!"
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding: 30px;
  width: 100%;
  padding-left: 65px;
  padding-right: 65px;
  margin: 0 auto;
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(CustomersJobEquipmentInfoReportsPage);
