import BCTableContainer from '../../../components/bc-table-container/bc-table-container';
import BCTabs from '../../../components/bc-tab/bc-tab';
import Fab from '@material-ui/core/Fab';
import { Job } from 'actions/job/job.types';
import SwipeableViews from 'react-swipeable-views';
import { getAllJobsAPI } from 'api/job.api';
import styles from '../customer.styles';
import { Grid, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { formatDate, formatTime, phoneNumberFormatter } from 'helpers/format';
import {
  getJobDetailAction,
  loadSingleJob
} from 'actions/job/job.action';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';


function JobReportsPage({ classes }: any) {
  const dispatch = useDispatch();
  const { isLoading = true, jobs, refresh = true } = useSelector(({ jobState }: any) => ({
    'isLoading': jobState.isLoading,
    'jobs': jobState.data,
    'refresh': jobState.refresh
  }));
  const [curTab, setCurTab] = useState(0);
  const history = useHistory();

  const location = useLocation<any>();

  const locationState = location.state;

  const prevPage = locationState && locationState.prevPage
    ? locationState.prevPage
    : null;

  const [currentPage, setCurrentPage] = useState({
    'page': prevPage
      ? prevPage.page
      : 0,
    'pageSize': prevPage
      ? prevPage.pageSize
      : 10,
    'sortBy': prevPage
      ? prevPage.sortBy
      : []
  });


  const [filteredJobs, setFilterJobs] = useState<Job[] | []>([]);

  const handleFilterData = (jobs: any) => {
    const oldJobs = JSON.parse(JSON.stringify(jobs));
    const filteredJobs = oldJobs;

    filteredJobs
      .filter((x: any) => x.status !== 2)
      .forEach((x: any) => filteredJobs.splice(filteredJobs.indexOf(x), 1));

    setFilterJobs(filteredJobs);
  };

  const columns: any = [
    {
      Cell({ row }: any) {
        return <div className={'flex items-center'}>
          {row.index + 1}
        </div>;
      },
      'Header': 'No#',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Job ID',
      'accessor': 'jobId',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Customer',
      'accessor': 'customer.profile.displayName',
      'className': 'font-bold',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        const Date = formatDate(row.original.scheduleDate);
        return (
          <div className={'flex items-center'}>
            <p>
              {Date}
            </p>
          </div>
        );
      },
      'Header': 'Date',
      'id': 'job-date',
      'sortable': true
    },
    {
      'Header': 'Technician',
      'accessor': 'technician.profile.displayName',
      'className': 'font-bold',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        return (
          <div className={'flex items-center'}>
            <Fab
              aria-label={'delete'}
              classes={{
                'root': classes.fabRoot
              }}
              color={'primary'}
              onClick={() => renderViewMore(row)}
              variant={'extended'}>
              {'View More'}
            </Fab>
          </div>
        );
      },
      'id': 'action',
      'sortable': false,
      'width': 60
    }
  ];

  /*
   * UseEffect(() => {
   *   if (jobState.refresh) {
   *     dispatch(loadingCustomers());
   *     dispatch(getJobs());
   */

  /*
   *     //console.log(jobs);
   *   }
   * }, [jobState.refresh]);
   */

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const handleRowClick = (event: any, row: any) => {
    // Console.log(event, row);
  };

  const renderViewMore = (row: any) => {
    const baseObj = row.original;
    let jobId = row.original._id;
    const status =
      baseObj && baseObj.status === undefined
        ? baseObj.status
        : 'N/A';
    const customerName =
      baseObj && baseObj.customer.profile !== undefined
        ? baseObj.customer.profile.displayName
        : 'N/A';
    const customerId =
      baseObj && baseObj.customer._id !== undefined
        ? baseObj.customer._id
        : 'N/A';
    const customerPhone =
      baseObj && baseObj.customer.contact !== undefined
        ? baseObj.customer.contact.phone
        : 'N/A';
    const phoneFormat = phoneNumberFormatter(customerPhone);
    const workReport =
      baseObj && baseObj.jobId !== undefined
        ? baseObj.jobId
        : 'N/A';
    const customerEmail =
      baseObj && baseObj.customer.info !== undefined
        ? baseObj.customer.info.email
        : 'N/A';
    const customerAddress = baseObj && baseObj.customer.address;
    let address: any = '';
    if (customerAddress && customerAddress !== undefined) {
      address = `${customerAddress.street !== undefined &&
        customerAddress.street !== null
        ? customerAddress.street
        : ''
      }
      ${customerAddress.city !== undefined &&
          customerAddress.city !== null
    ? customerAddress.city
    : ''
} ${customerAddress.state !== undefined &&
          customerAddress.state !== null &&
          customerAddress.state !== 'none'
  ? customerAddress.state
  : ''
} ${customerAddress.zipCode !== undefined &&
          customerAddress.zipCode !== null
  ? customerAddress.zipCode
  : ''
}`;
    } else {
      address = 'N/A';
    }

    const jobType =
      baseObj && baseObj.type !== undefined
        ? baseObj.type.title
        : 'N/A';
    const jobDate =
      baseObj && baseObj.createdAt !== undefined
        ? baseObj.createdAt
        : 'N/A';
    const formatJobDate = formatDate(jobDate);

    const jobTime =
      baseObj && baseObj.createdAt !== undefined
        ? baseObj.createdAt
        : 'N/A';
    const formatJobTime = formatTime(jobTime);
    const technicianName =
      baseObj && baseObj.technician.profile !== undefined
        ? baseObj.technician.profile.displayName
        : 'N/A';
    const recordNote =
      baseObj && baseObj.description !== undefined
        ? baseObj.description
        : 'N/A';

    const purchaseOrderCreated =
      baseObj && baseObj.ticket !== undefined
        ? baseObj.ticket.jobCreated
        : 'N/A';

    const purchaseOrder = purchaseOrderCreated
      ? 'Yes'
      : 'No';

    const companyName =
      baseObj && baseObj.company.info !== undefined
        ? baseObj.company.info.companyName
        : 'N/A';
    const companyEmail =
      baseObj && baseObj.company.info !== undefined
        ? baseObj.company.info.companyEmail
        : 'N/A';
    const companyPhone =
      baseObj && baseObj.company.contact !== undefined
        ? baseObj.company.contact.phone
        : 'N/A';

    const workPerformedLocation =
      baseObj && baseObj.ticket !== undefined
        ? baseObj.ticket.jobLocation
        : 'N/A';

    const location =
      workPerformedLocation === '' || null || undefined
        ? 'None Found'
        : workPerformedLocation;

    const workPerformedDate =
      baseObj && baseObj.ticket !== undefined
        ? baseObj.ticket.createdAt
        : 'N/A';

    const formatworkPerformedDate = formatDate(workPerformedDate);

    const workPerformedTimeScan =
      baseObj && baseObj.ticket !== undefined
        ? baseObj.ticket.createdAt
        : 'N/A';

    const workPerformedNote =
      baseObj && baseObj.ticket !== undefined
        ? baseObj.ticket.note
        : 'N/A';

    const formatworkPerformedTimeScan = formatTime(workPerformedTimeScan);

    const jobReportObj = {
      address,
      companyEmail,
      companyName,
      companyPhone,
      customerEmail,
      customerId,
      customerName,
      formatJobDate,
      formatJobTime,
      formatworkPerformedDate,
      formatworkPerformedTimeScan,
      jobId,
      jobType,
      location,
      phoneFormat,
      purchaseOrder,
      recordNote,
      status,
      technicianName,
      workPerformedNote,
      workReport
    };

    jobId = jobId !== undefined
      ? jobId.replace(/ /gu, '')
      : 'jobid';
    localStorage.setItem('nestedRouteKey', `${jobId}`);
    dispatch(loadSingleJob());
    dispatch(getJobDetailAction(jobReportObj));
    history.push({
      'pathname': `job-reports/${jobId}`,
      'state': {
        ...jobReportObj,
        currentPage
      }
    });
  };

  /*
   * Display only complete jobs
   *  let newJobState = jobState.data;
   */

  /*
   * NewJobState
   *   .filter((x: any) => x.status !== 2)
   *   .forEach((x: any) => newJobState.splice(newJobState.indexOf(x), 1));
   */


  useEffect(() => {
    if (refresh) {
      dispatch(getAllJobsAPI());
    }

    if (jobs) {
      handleFilterData(jobs);
    }
  }, [refresh]);

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
          <BCTabs
            curTab={curTab}
            indicatorColor={'primary'}
            onChangeTab={handleTabChange}
            tabsData={[
              {
                'label': 'Job Report List',
                'value': 0
              }
              /*
               * {
               *   label: "Recent Activities",
               *   value: 1,
               * },
               */
            ]}
          />
          <SwipeableViews index={curTab}>
            <div
              className={classes.dataContainer}
              hidden={curTab !== 0}
              id={'0'}>
              <BCTableContainer
                columns={columns}
                currentPage={currentPage}
                initialMsg={'There are no Job Report List'}
                isLoading={isLoading}
                onRowClick={handleRowClick}
                search
                searchPlaceholder={'Search Job Reports...'}
                setPage={setCurrentPage}
                tableData={filteredJobs}
              />
            </div>
            <div
              hidden={curTab !== 1}
              id={'1'}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                />
              </Grid>
            </div>
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles, { 'withTheme': true })(JobReportsPage);
