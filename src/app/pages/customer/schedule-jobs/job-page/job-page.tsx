import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core";
import styled from "styled-components";

import BCTableContainer from "../../../../components/bc-table-container/bc-table-container";
import { getAllJobsAPI } from "api/job.api";
import { modalTypes } from "../../../../../constants";
import styles from "../../customer.styles";
import { formatDate, convertMilitaryTime } from "helpers/format";
import {
  openModalAction,
  setModalDataAction,
} from "actions/bc-modal/bc-modal.action";
import { getJobs, loadingJobs } from "actions/job/job.action";

function JobPage({ classes }: any) {
  const dispatch = useDispatch();
  const { isLoading = true, jobs, refresh = true } = useSelector(
    ({ jobState }: any) => ({
      isLoading: jobState.isLoading,
      jobs: jobState.data,
      refresh: jobState.refresh,
    })
  );
  const openEditJobModal = (job: any) => {
    dispatch(
      setModalDataAction({
        data: {
          job: job,
          modalTitle: "Edit Job",
          removeFooter: false,
        },
        type: modalTypes.EDIT_JOB_MODAL,
      })
    );
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const formatSchedulingTime = (time: string) => {
    let timeAr = time.split("T");
    let timeWithSeconds = timeAr[1].substr(0, 5);
    let hours = timeWithSeconds.substr(0, 2);
    let minutes = timeWithSeconds.substr(3, 5);

    return { hours, minutes };
  };

  const columns: any = [
    {
      Header: "Job ID",
      accessor: "jobId",
      className: "font-bold",
      sortable: true,
    },
    {
      Header: "Status",
      accessor: "status",
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
      Header: "Customer",
      accessor: "customer.profile.displayName",
      className: "font-bold",
      sortable: true,
    },
    {
      Header: "Type",
      accessor: "type.title",
      className: "font-bold",
      sortable: true,
    },
    {
      Cell({ row }: any) {
        const scheduleDate = formatDate(row.original.scheduleDate);
        return (
          <div className={"flex items-center"}>
            <p>{scheduleDate}</p>
          </div>
        );
      },
      Header: "Schedule Date",
      id: "job-schedulee-date",
      sortable: true,
    },
    {
      Cell({ row }: any) {
        let startTime = "N/A";
        let endTime = "N/A";
        if (row.original.scheduledStartTime !== undefined) {
          let formatScheduledObj = formatSchedulingTime(
            row.original.scheduledStartTime
          );
          startTime = convertMilitaryTime(
            `${formatScheduledObj.hours}:${formatScheduledObj.minutes}`
          );
        }
        if (row.original.scheduledEndTime !== undefined) {
          let formatScheduledObj = formatSchedulingTime(
            row.original.scheduledEndTime
          );
          endTime = convertMilitaryTime(
            `${formatScheduledObj.hours}:${formatScheduledObj.minutes}`
          );
        }
        return (
          <div className={"flex items-center"}>
            <p>{`${startTime} - ${endTime}`}</p>
          </div>
        );
      },
      Header: "Time",
      id: "job-time",
      sortable: true,
    },
    {
      Cell({ row }: any) {
        return (
          <div className={"flex items-center"}>
            {row.original.status === "0" || row.original.status === "1" ? (
              <Fab
                aria-label={"edit-job"}
                classes={{
                  root: classes.fabRoot,
                }}
                color={"primary"}
                onClick={() => openEditJobModal(row.original)}
                variant={"extended"}
              >
                {"Edit"}
              </Fab>
            ) : null}
          </div>
        );
      },
      Header: "Options",
      id: "action-options",
      sortable: false,
      width: 60,
    },
  ];

  useEffect(() => {
    if (refresh) {
      dispatch(getAllJobsAPI());
    }
  }, [refresh]);

  const handleRowClick = (event: any, row: any) => { };

  return (
    <DataContainer id={"0"}>
      <BCTableContainer
        columns={columns}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        search
        searchPlaceholder={"Search Jobs..."}
        tableData={jobs}
      />
    </DataContainer>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export default withStyles(styles, { withTheme: true })(JobPage);
