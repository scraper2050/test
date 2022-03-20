import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { Checkbox, FormControlLabel, withStyles, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import { getAllJobsAPI } from 'api/job.api';
import { modalTypes } from '../../../../../constants';
import styles from '../../customer.styles';
import { statusReference } from 'helpers/contants';
import { convertMilitaryTime, formatDate } from 'helpers/format';
import {
  openModalAction,
  setModalDataAction,
} from 'actions/bc-modal/bc-modal.action';
import { setCurrentPageIndex, setCurrentPageSize } from 'actions/job/job.action';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import BCJobStatus from '../../../../components/bc-job-status';
import BCDateRangePicker
  , {Range} from "../../../../components/bc-date-range-picker/bc-date-range-picker";
import moment from "moment";

function JobPage({ classes, currentPage, setCurrentPage }: any) {
  const dispatch = useDispatch();
  const customers = useSelector(({ customers }: any) => customers.data);
  // const [showAllJobs, toggleShowAllJobs] = useState(true);
  const { _id } = useSelector(({ auth }: RootState) => auth);
  const { isLoading = true, jobs, refresh = true, total, prevCursor, nextCursor, currentPageIndex, currentPageSize} = useSelector(
    ({ jobState }: any) => ({
      isLoading: jobState.isLoading,
      jobs: jobState.data,
      refresh: jobState.refresh,
      prevCursor: jobState.prevCursor,
      nextCursor: jobState.nextCursor,
      total: jobState.total,
      currentPageIndex: jobState.currentPageIndex,
      currentPageSize: jobState.currentPageSize,
    })
  );

  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('-1');
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);

  const handleFilterClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };

  const handleSelectStatusFilter = (statusNumber:string) => {
    setSelectedStatus(statusNumber);
    setFilterMenuAnchorEl(null);
  };

  // const filteredJobs = jobs.filter(
  //   (job: any) => [0, 1, 4, 5, 6].indexOf(job.status) >= 0
  // );

  const filteredJobs = jobs.filter((job: any) =>  {
    let cond = true;
    if (selectionRange) {
      cond = cond &&
        moment(job.scheduleDate).isBetween(selectionRange.startDate, selectionRange.endDate, 'day', '[]');
    }
    if (Number(selectedStatus) >= 0) {
      cond = cond && job.status === Number(selectedStatus)
    }
    return cond;
  })

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

  function getJobLocation(originalRow: any, rowIndex: number) {
    return originalRow?.jobLocation?.name || '-'
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
          modalTitle: 'View Job',
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
        return <BCJobStatus status={row.original.status} data={row.original} />;
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
      Header: 'Job Location',
      id: 'job-location',
      accessor: getJobLocation,
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
    type IconComponentType = React.FunctionComponent<React.SVGProps<SVGSVGElement> & {title?: string | undefined;}>;
    const [IconComponent, setIconComponent] = useState<null | IconComponentType>(null);

/*    const handleCheckBoxChange = () => {
      toggleShowAllJobs((current) => {
        if(current === false){
          setSelectedStatus('-1');
        } else {
          setSelectedStatus('-2');
        }
        return !current;
      });
    };*/

    useEffect(() => {
      if(selectedStatus !== '-1' && selectedStatus !== '-2'){
        setIconComponent(statusReference[selectedStatus].icon);
        // toggleShowAllJobs(false);
      } else if(selectedStatus === '-1'){
        // toggleShowAllJobs(true);
        setIconComponent(null);
      } else {
        setIconComponent(null);
      }
    }, [selectedStatus]);

    return (
      <>
{/*        <FormControlLabel
          control={
            <Checkbox
              checked={showAllJobs}
              onChange={handleCheckBoxChange}
              name="checkedB"
              color="primary"
            />
          }
          label="Display All Jobs"
        />*/}
        <div className={classNames(classes.filterMenu, classes.filterMenuLabel)}>
          View:
        </div>
        <div
          onClick={handleFilterClick}
          className={classNames(classes.filterMenu, classes.filterMenuContainer)}
        >
          {
            statusReference[selectedStatus] &&
            IconComponent &&
            <IconComponent className={classes.filterIcon}/>
          }
          <span
            style={{color: statusReference[selectedStatus] && statusReference[selectedStatus].color || 'inherit'}}
          >
            {
              statusReference[selectedStatus]
                ? statusReference[selectedStatus].text
                : selectedStatus === '-1'
                  ? 'All'
                  : 'Default'
            }
          </span>
          <span style={{flex: 1, textAlign: 'right'}}>
            <ArrowDropDownIcon />
          </span>
        </div>
        <Menu
          id="filter-by-status-menu"
          variant="menu"
          anchorEl={filterMenuAnchorEl}
          keepMounted
          open={Boolean(filterMenuAnchorEl)}
          onClose={() => setFilterMenuAnchorEl(null)}
        >
          <MenuItem
            classes={{
              root: classes.filterMenuItemRoot,
              selected: classes.filterMenuItemSelected
            }}
            selected={selectedStatus === '-1'}
            onClick={() => handleSelectStatusFilter('-1')}
          >
            All
          </MenuItem>
          {Object.values(statusReference).map(statusObj => (
            <MenuItem
              key={statusObj.statusNumber}
              classes={{
                root: classes.filterMenuItemRoot,
                selected: classes.filterMenuItemSelected
              }}
              style={{color: statusObj.color || 'inherit'}}
              selected={statusObj.statusNumber === selectedStatus}
              onClick={() => handleSelectStatusFilter(statusObj.statusNumber)}
            >
              <statusObj.icon className={classes.filterIcon}/>
              {statusObj.text}
            </MenuItem>
          ))}
        </Menu>
        <BCDateRangePicker
          range={selectionRange}
          onChange={setSelectionRange}
          showClearButton={true}
          title='Filter by Schedule Date...'
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
        tableData={filteredJobs}
        toolbarPositionLeft={true}
        toolbar={Toolbar()}
        manualPagination
        fetchFunction={(num: number, isPrev:boolean, isNext:boolean) => dispatch(getAllJobsAPI(num, isPrev ? prevCursor : undefined, isNext ? nextCursor : undefined))}
        total={2020}
        currentPageIndex={currentPageIndex}
        setCurrentPageIndexFunction={(num: number) => dispatch(setCurrentPageIndex(num))}
        currentPageSize={currentPageSize}
        setCurrentPageSizeFunction={(num: number) => dispatch(setCurrentPageSize(num))}
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
