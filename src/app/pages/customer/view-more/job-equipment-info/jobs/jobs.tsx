import BCBackButtonNoLink from '../../../../../components/bc-back-button/bc-back-button-no-link';
import BCTableContainer from '../../../../../components/bc-table-container/bc-table-container';
import BCTabs from '../../../../../components/bc-tab/bc-tab';
import { Grid } from '@material-ui/core';
import Fab from "@material-ui/core/Fab";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import styles from '../job-equipment-info.style';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { DUMMY_DATA, DUMMY_COLUMN } from '../dummy-data';
import { formatDate, convertMilitaryTime } from "helpers/format";
import { openModalAction, setModalDataAction, } from "actions/bc-modal/bc-modal.action";
import { modalTypes } from "../../../../../../constants";
import { getAllJobsAPI } from "api/job.api";
import { getCustomerDetailAction, loadingSingleCustomers } from 'actions/customer/customer.action';
import { Job } from 'actions/job/job.types';

interface LocationStateTypes {
  customerName: string;
  customerId: string;
}
function CustomersJobEquipmentInfoJobsPage({ classes }: any) {
  const dispatch = useDispatch();

  const { isLoading = true, jobs, refresh = true } = useSelector(
    ({ jobState }: any) => ({
      'isLoading': jobState.isLoading,
      'jobs': jobState.data,
      'refresh': jobState.refresh,
    })
  );

  const { customerObj } = useSelector((state: any) => state.customers);

  const location = useLocation<LocationStateTypes>();
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);
  const [filteredJobs, setFilterJobs] = useState<Job[] | []>([]);


  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

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

  const handleFilterData = (jobs: Job[] | [], location: LocationStateTypes) => {
    const oldJobs = jobs;
    let filteredJobs = oldJobs;

    filteredJobs = filteredJobs.filter((resJob: any) =>
      resJob.customer._id === location.customerId);

    setFilterJobs(filteredJobs);
  }

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
    // {
    //   Header: "Customer",
    //   accessor: "customer.profile.displayName",
    //   className: "font-bold",
    //   sortable: true,
    // },
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



  const handleRowClick = (event: any, row: any) => { };

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
                      'label': 'CUSTOMER JOBS',
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
)(CustomersJobEquipmentInfoJobsPage);
