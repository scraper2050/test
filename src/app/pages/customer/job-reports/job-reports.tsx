import BCTableContainer from "../../../components/bc-table-container/bc-table-container";
import BCTabs from "../../../components/bc-tab/bc-tab";
import Fab from "@material-ui/core/Fab";
import SwipeableViews from "react-swipeable-views";
import styles from "../customer.styles";
import { Grid, withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  getJobReportDetailAction,
  loadSingleJobReport,
  getJobReports,
  loadingJobReport,
} from "actions/customer/job-report/job-report.action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { JobData } from "../../../../testData";

function JobReportsPage({ classes }: any) {
  const dispatch = useDispatch();
  const jobReports = useSelector((state: any) => state.jobReports);
  const [curTab, setCurTab] = useState(0);
  const history = useHistory();

  const columns: any = [
    {
      Cell({ row }: any) {
        return <div className={"flex items-center"}>{row.index + 1}</div>;
      },
      Header: "Job ID",
      accessor: "jobId",
      className: "font-bold",
      sortable: true,
    },
    {
      Header: "Customer",
      accessor: "customer.profile.displayName",
      className: "font-bold",
      sortable: true,
    },
    {
      Header: "Date",
      accessor: "createdAt",
      className: "font-bold",
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

  useEffect(() => {
    dispatch(loadingJobReport());
    dispatch(getJobReports(jobReports));
  }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const handleRowClick = (event: any, row: any) => {
    //console.log(event, row);
  };

  const renderViewMore = (row: any) => {
    let baseObj = row["original"];
    let customerName =
      baseObj["customer"] && baseObj["customer"]["profile"] !== undefined
        ? baseObj["customer"]["profile"]["displayName"]
        : "N/A";
    let jobId = row["original"]["jobId"];
    let jobReportObj = {
      customerName: customerName,
      jobId,
    };
    jobId = jobId !== undefined ? jobId.replace(/ /g, "") : "jobid";
    localStorage.setItem("nestedRouteKey", `${jobId}`);
    dispatch(loadSingleJobReport());
    dispatch(getJobReportDetailAction(jobReportObj));
    history.push({
      pathname: `job-reports/${jobId}`,
      state: jobReportObj,
    });
  };

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
          <BCTabs
            curTab={curTab}
            indicatorColor={"primary"}
            onChangeTab={handleTabChange}
            tabsData={[
              {
                label: "Job Report List",
                value: 0,
              },
              {
                label: "Recent Activities",
                value: 1,
              },
            ]}
          />
          <SwipeableViews index={curTab}>
            <div
              className={classes.dataContainer}
              hidden={curTab !== 0}
              id={"0"}
            >
              <BCTableContainer
                columns={columns}
                isLoading={jobReports.loading}
                onRowClick={handleRowClick}
                search
                tableData={jobReports.data}
                searchPlaceholder={"Search Job Reports..."}
                initialMsg={"There are no Job Report List"}
              />
            </div>
            <div hidden={curTab !== 1} id={"1"}>
              <Grid container>
                <Grid item xs={12} />
              </Grid>
            </div>
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(JobReportsPage);
