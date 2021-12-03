import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import { getAllJobsAPI } from 'api/job.api';
import { modalTypes } from '../../../../../constants';
import styled from 'styled-components';
import styles from '../../customer.styles';
import { Checkbox, FormControlLabel, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { convertMilitaryTime, formatDate } from 'helpers/format';
import {
  openModalAction,
  setModalDataAction,
} from 'actions/bc-modal/bc-modal.action';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import BCJobStatus from '../../../../components/bc-job-status';

function JobPage({ classes, currentPage, setCurrentPage }: any) {
  const dispatch = useDispatch();
  const [showAllJobs, toggleShowAllJobs] = useState(false);
  const { _id } = useSelector(({ auth }: RootState) => auth);
  const { isLoading = true, jobs, refresh = true } = useSelector(
    ({ jobState }: any) => ({
      isLoading: jobState.isLoading,
      jobs: jobState.data,
      refresh: jobState.refresh,
    })
  );

  const filteredJobs = jobs.filter(
    (job: any) => [0, 1, 3, 5, 6].indexOf(job.status) >= 0
  );

  function getVendor (originalRow: any, rowIndex: number) {
    const {tasks} = originalRow;
    let value = '';
    if (tasks) {
      if (tasks.length === 0) return null;
      else if (tasks.length > 1) value = 'Multiple Techs';
      else if (tasks[0].vendor) {
        value = tasks[0].vendor.profile
          ? tasks[0].vendor.profile.displayName
          : tasks[0].vendor.info.companyName;
      } else if (tasks[0].technician) {
        value =  tasks[0].technician.profile
          ? tasks[0].technician.profile.displayName
          : tasks[0].technician.info.companyName;
      }
    }
    return value.toLowerCase();
  }

  function getJobType(originalRow: any, rowIndex: number) {
    const allTypes = originalRow.tasks.reduce((acc: string[], task: any) => {
      if (task.jobType?.title) {
        if (acc.indexOf(task.jobType.title) === -1) acc.push(task.jobType.title);
        return acc;
      }

      const all = task.jobTypes?.map((item: any) => item.jobType?.title);
      all.forEach((item: string) => {
        if (item && acc.indexOf(item) === -1) acc.push(item);
      })
      return acc;
    }, []);

    return allTypes.length === 1 ? allTypes[0].toLowerCase() : 'multiple jobs';
  }

  function getJobTime(originalRow: any, rowIndex: number) {
    let startTime = 'N/A';
    let endTime = 'N/A';
    if (originalRow.scheduledStartTime !== undefined) {
      const formatScheduledObj = formatSchedulingTime(
        originalRow.scheduledStartTime
      );
      startTime = convertMilitaryTime(
        `${formatScheduledObj.hours}:${formatScheduledObj.minutes}`
      );
    }
    if (originalRow.scheduledEndTime !== undefined) {
      const formatScheduledObj = formatSchedulingTime(
        originalRow.scheduledEndTime
      );
      endTime = convertMilitaryTime(
        `${formatScheduledObj.hours}:${formatScheduledObj.minutes}`
      );
    }
    return `${startTime} - ${endTime}`;
  }

  const openEditJobModal = (job: any) => {
    dispatch(
      setModalDataAction({
        data: {
          job: job,
          modalTitle: 'Edit Job',
          removeFooter: false,
        },
        type: modalTypes.EDIT_JOB_MODAL,
      })
    );
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  /*
   * Const closeModal = () => {
   *   dispatch(closeModalAction());
   *   setTimeout(() => {
   *     dispatch(setModalDataAction({
   *       'data': {},
   *       'type': ''
   *     }));
   *   }, 200);
   * };
   */

  const openDetailJobModal = (job: any) => {
    dispatch(
      setModalDataAction({
        data: {
          job: job,
          removeFooter: false,
          maxHeight: '100%',
        },
        type: modalTypes.VIEW_JOB_MODAL,
      })
    );
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const formatSchedulingTime = (time: string) => {
    const timeAr = time.split('T');
    const timeWithSeconds = timeAr[1].substr(0, 5);
    const hours = timeWithSeconds.substr(0, 2);
    const minutes = timeWithSeconds.substr(3, 5);

    return { hours, minutes };
  };

  const columns: any = [
    {
      Header: 'Job ID',
      accessor: 'jobId',
      className: 'font-bold',
      sortable: true,
      width: 50,
    },
    {
      Cell({ row }: any) {
        return <BCJobStatus status={row.original.status} />;
      },
      Header: 'Status',
      accessor: 'status',
      className: 'font-bold',
      sortable: true,
      width: 60,
    },
    {
      Header: 'Technician',
      accessor: getVendor,
      id: 'technician',
      className: classes.capitalize,
      sortable: true,
      width: 100,
    },
    {
      Header: 'Customer',
      accessor: 'customer.profile.displayName',
      className: 'font-bold',
      sortable: true,
    },
    {
      Header: 'Type',
      id: 'job-type',
      accessor: getJobType,
      className: classes.capitalize,
      sortable: true,
    },
    {
      Cell({ row }: any) {
        const scheduleDate = formatDate(row.original.scheduleDate);
        return <div className={'flex items-center'}>{scheduleDate}</div>;
      },
      Header: 'Schedule Date',
      id: 'job-schedulee-date',
      accessor: 'scheduleDate',
      sortable: true,
      width: 60,
    },
    {
      Header: 'Time',
      id: 'job-time',
      accessor: getJobTime,
      sortable: true,
      width: 40,
    },
  ];

  function Toolbar() {
    return (
      <>
        <FormControlLabel
          control={
            <Checkbox
              checked={showAllJobs}
              onChange={() => toggleShowAllJobs(!showAllJobs)}
              name="checkedB"
              color="primary"
            />
          }
          label="Display All Jobs"
        />
      </>
    );
  }

  useEffect(() => {
    if (refresh) {
      dispatch(getAllJobsAPI());
    }
  }, [refresh]);

  const handleRowClick = (event: any, row: any) => {
    if (
      [0, 4].includes(row.original.status) &&
      (!row.original.employeeType ||
        row.original.createdBy?.profile?._id === _id)
    ) {
      openEditJobModal(row.original);
    } else {
      openDetailJobModal(row.original);
    }
  };

  return (
    <DataContainer id={'0'}>
      <BCTableContainer
        columns={columns}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        search
        searchPlaceholder={'Search Jobs...'}
        tableData={showAllJobs ? jobs : filteredJobs}
        toolbarPositionLeft={true}
        toolbar={Toolbar()}
      />
    </DataContainer>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export default withStyles(styles, { withTheme: true })(JobPage);
