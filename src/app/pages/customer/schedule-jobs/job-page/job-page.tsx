import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { Checkbox, FormControlLabel, withStyles, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import { getAllJobsAPI } from 'api/job.api';
import { modalTypes } from '../../../../../constants';
import styles from '../../customer.styles';
import {ReactComponent as IconStarted} from 'assets/img/icons/map/icon-started.svg';
import {ReactComponent as IconCompleted} from 'assets/img/icons/map/icon-completed.svg';
import {ReactComponent as IconCancelled} from 'assets/img/icons/map/icon-cancelled.svg';
import {ReactComponent as IconRescheduled} from 'assets/img/icons/map/icon-rescheduled.svg';
import {ReactComponent as IconPaused} from 'assets/img/icons/map/icon-paused.svg';
import {ReactComponent as IconIncomplete} from 'assets/img/icons/map/icon-incomplete.svg';
import {ReactComponent as IconPending} from 'assets/img/icons/map/icon-pending.svg';
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
  
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('-2');

  const handleFilterClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };

  const handleSelectStatusFilter = (statusNumber:string) => {
    setSelectedStatus(statusNumber);
    setFilterMenuAnchorEl(null);
  };

  const filteredJobs = jobs.filter(
    (job: any) => [0, 1, 4, 5, 6].indexOf(job.status) >= 0
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

  const statusReference: { 
    [key: string]: {
      text: string; 
      icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {title?: string | undefined;}>; 
      color: string;
      statusNumber: string;
    }; 
  } = {
    '0': {text: 'Pending', icon: IconPending, color: '#828282', statusNumber: '0'},
    '1': {text: 'Started', icon: IconStarted, color: '#00AAFF', statusNumber: '1'},
    '5': {text: 'Paused', icon: IconPaused, color: '#FA8029', statusNumber: '5'},
    '2': {text: 'Completed', icon: IconCompleted, color: '#50AE55', statusNumber: '2'},
    '3': {text: 'Canceled', icon: IconCancelled, color: '#A107FF', statusNumber: '3'},
    '4': {text: 'Rescheduled', icon: IconRescheduled, color: '#828282', statusNumber: '4'},
    '6': {text: 'Incomplete', icon: IconIncomplete, color: '#F50057', statusNumber: '6'}
  }

  function Toolbar() {
    type IconComponentType = React.FunctionComponent<React.SVGProps<SVGSVGElement> & {title?: string | undefined;}>;
    const [IconComponent, setIconComponent] = useState<null | IconComponentType>(null);
    
    const handleCheckBoxChange = () => {
      toggleShowAllJobs((current) => {
        if(current === false){
          setSelectedStatus('-1');
        } else {
          setSelectedStatus('-2');
        }
        return !current;
      });
    };

    useEffect(() => {
      if(selectedStatus !== '-1' && selectedStatus !== '-2'){
        setIconComponent(statusReference[selectedStatus].icon);
        toggleShowAllJobs(false);
      } else if(selectedStatus === '-1'){
        toggleShowAllJobs(true);
        setIconComponent(null);
      } else {
        setIconComponent(null);
      }
    }, [selectedStatus]);
    
    return (
      <>
        <FormControlLabel
          control={
            <Checkbox
              checked={showAllJobs}
              onChange={handleCheckBoxChange}
              name="checkedB"
              color="primary"
            />
          }
          label="Display All Jobs"
        />
        <div className={classNames(classes.filterMenu, classes.filterMenuLabel)}>
          View:
        </div>
        <div 
          onClick={handleFilterClick}
          className={classNames(classes.filterMenu, classes.filterMenuContainer)}
        >
          {
            Boolean(statusReference[selectedStatus]) && 
            Boolean(statusReference[selectedStatus].icon) &&
            IconComponent &&
            <IconComponent className={classes.filterIcon}/>
          }
          <span 
            style={{color: statusReference[selectedStatus] && statusReference[selectedStatus].color || 'inherit'}}
          >
            {
              Boolean(statusReference[selectedStatus]) 
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
        tableData={
          showAllJobs 
            ? jobs 
            : selectedStatus === '-2'
              ? filteredJobs
              : jobs.filter(
                (job: any) =>  job.status === Number(selectedStatus)
              )
        }
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
