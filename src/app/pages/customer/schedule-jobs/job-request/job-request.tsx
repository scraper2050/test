import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { withStyles, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import { getAllJobRequestAPI } from 'api/job-request.api';
import { modalTypes } from '../../../../../constants';
import styles from '../../customer.styles';
import { jobRequestStatusReference as statusReference } from 'helpers/contants';
import { formatDateMMMDDYYYY } from 'helpers/format';
import {
  openModalAction,
  setModalDataAction,
} from 'actions/bc-modal/bc-modal.action';
import { setCurrentPageIndex, setCurrentPageSize, setKeyword } from 'actions/job-request/job-request.action';

import { useDispatch, useSelector } from 'react-redux';
import BCDateRangePicker
  , {Range} from "../../../../components/bc-date-range-picker/bc-date-range-picker";
import {getJobRequestDescription} from "../../../../../helpers/job";

function JobRequest({ classes }: any) {
  const dispatch = useDispatch();
  const { isLoading = true, jobRequests, refresh = true, total, prevCursor, nextCursor, currentPageIndex, currentPageSize, keyword} = useSelector(
    ({ jobRequests }: any) => ({
      isLoading: jobRequests.isLoading,
      jobRequests: jobRequests.jobRequests,
      refresh: jobRequests.refresh,
      prevCursor: jobRequests.prevCursor,
      nextCursor: jobRequests.nextCursor,
      total: jobRequests.total,
      currentPageIndex: jobRequests.currentPageIndex,
      currentPageSize: jobRequests.currentPageSize,
      keyword: jobRequests.keyword,
    })
  );

  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('0');
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);
  const loadCount = useRef<number>(0);

  const handleFilterClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };

  const handleSelectStatusFilter = (statusNumber:string) => {
    setSelectedStatus(statusNumber);
    setFilterMenuAnchorEl(null);
  };

  function getJobLocation(originalRow: any, rowIndex: number) {
    return originalRow?.jobLocation?.name || '-'
  }

  function getJobSite(originalRow: any, rowIndex: number) {
    return originalRow?.jobSite?.name || '-'
  }

  const openDetailJobRequestModal = (jobRequest: any) => {
    dispatch(
      setModalDataAction({
        data: {
          jobRequest: jobRequest,
          removeFooter: false,
          maxHeight: '100%',
          modalTitle: 'Job Request',
        },
        type: modalTypes.VIEW_JOB_REQUEST_MODAL,
      })
    );
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const formatSchedulingTime = (time: string) => {
    const timeAr = time.split('T');
    const timeWithSeconds = timeAr[1].substring(0, 5);
    const hours = timeWithSeconds.substring(0, 2);
    const minutes = timeWithSeconds.substring(3, 5);
    return { hours, minutes };
  };

  const columns: any = [
    {
      Cell({ row }: any) {
        const createdAt = formatDateMMMDDYYYY(row.original.createdAt);
        return <div className={'flex items-center'}>{createdAt}</div>;
      },
      Header: 'Request Date',
      accessor: 'createdAt',
      className: 'font-bold',
      sortable: true,
      width: 50,
    },
    {
      Header: 'Description',
      accessor: getJobRequestDescription,
      id: 'description',
      className: classes.capitalize,
      sortable: true,
      width: 100,
    },
    {
      Header: 'Requested By',
      accessor: 'customer.profile.displayName',
      className: 'font-bold',
      sortable: true,
    },
    {
      Header: 'Location',
      id: 'job-location',
      accessor: getJobLocation,
      sortable: true,
      width: 100,
    },
    {
      Header: 'Job Site',
      id: 'job-site',
      accessor: getJobSite,
      sortable: true,
    },
    {
      Cell({ row }: any) {
        const dueDate = formatDateMMMDDYYYY(row.original.dueDate);
        return <div className={'flex items-center'}>{dueDate}</div>;
      },
      Header: 'Due Date',
      id: 'due-date',
      accessor: 'dueDate',
      sortable: true,
      width: 100,
    },
  ];

  function Toolbar() {
    type IconComponentType = React.FunctionComponent<React.SVGProps<SVGSVGElement> & {title?: string | undefined;}>;
    const [IconComponent, setIconComponent] = useState<null | IconComponentType>(null);

    useEffect(() => {
      if(selectedStatus !== '-1'){
        setIconComponent(statusReference[selectedStatus].icon);
      } else {
        setIconComponent(null);
      }
      console.log('ini itu loadCount.current', loadCount.current);
      if(loadCount.current !== 0){
        dispatch(getAllJobRequestAPI(currentPageSize, undefined, undefined, selectedStatus, keyword, selectionRange));
        dispatch(setCurrentPageIndex(0));
      } else {
        dispatch(getAllJobRequestAPI(currentPageSize, undefined, undefined, '0', keyword, selectionRange));
        dispatch(setCurrentPageIndex(0));
      }
    }, [selectedStatus]);

    useEffect(() => {
      if(loadCount.current !== 0){
        dispatch(getAllJobRequestAPI(currentPageSize, undefined, undefined, selectedStatus, keyword, selectionRange));
        dispatch(setCurrentPageIndex(0));
      }
    }, [selectionRange]);

    return (
      <>
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
      dispatch(getAllJobRequestAPI(undefined, undefined, undefined, selectedStatus, keyword, selectionRange));
      dispatch(setCurrentPageIndex(0));
      dispatch(setCurrentPageSize(10));
    }
    console.log('ini itu refresh', refresh);
    setTimeout(() => {
      loadCount.current++;
    }, 1000);
  }, [refresh]);

  useEffect(() => {
    dispatch(getAllJobRequestAPI());
    dispatch(setKeyword(''));
    dispatch(setCurrentPageIndex(0));
    dispatch(setCurrentPageSize(10));
  }, [])
  

  const handleRowClick = (event: any, row: any) => {
    openDetailJobRequestModal(row.original);
  };

  return (
    <DataContainer id={'0'}>
      <BCTableContainer
        columns={columns}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        search
        searchPlaceholder={'Search Job Requests...'}
        tableData={jobRequests}
        toolbarPositionLeft={true}
        toolbar={Toolbar()}
        manualPagination
        fetchFunction={(num: number, isPrev:boolean, isNext:boolean, query :string) => 
          dispatch(getAllJobRequestAPI(num || currentPageSize, isPrev ? prevCursor : undefined, isNext ? nextCursor : undefined, selectedStatus, query === '' ? '' : query || keyword, selectionRange))
        }
        total={total}
        currentPageIndex={currentPageIndex}
        setCurrentPageIndexFunction={(num: number) => dispatch(setCurrentPageIndex(num))}
        currentPageSize={currentPageSize}
        setCurrentPageSizeFunction={(num: number) => dispatch(setCurrentPageSize(num))}
        setKeywordFunction={(query: string) => dispatch(setKeyword(query))}
      />
    </DataContainer>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export default withStyles(styles, { withTheme: true })(JobRequest);
