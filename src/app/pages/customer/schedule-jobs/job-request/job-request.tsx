import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { withStyles, Grid, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import BCTabs from '../../../../components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
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

const activeJobRequest = process.env.REACT_APP_JOB_REQUEST_ACTIVE

function JobRequest({ classes, hidden }: any) {
  const dispatch = useDispatch();
  const { isLoading = true, jobRequests, refresh = true, total, prevCursor, nextCursor, lastPageCursor, currentPageIndex, currentPageSize, keyword} = useSelector(
    ({ jobRequests }: any) => ({
      isLoading: jobRequests.isLoading,
      jobRequests: jobRequests.jobRequests,
      refresh: jobRequests.refresh,
      prevCursor: jobRequests.prevCursor,
      nextCursor: jobRequests.nextCursor,
      lastPageCursor: jobRequests.lastPageCursor,
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
          modalTitle: `${jobRequest.type === 1 ? 'Repair' : 'Window'} Job Request`,
        },
        type: modalTypes.VIEW_JOB_REQUEST_MODAL,
      })
    );
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const columns: any = [
    {
      Cell({ row }: any) {
        const createdAt = formatDateMMMDDYYYY(row.original.createdAt);
        return <div>{createdAt}</div>;
      },
      Header: 'Request Date',
      accessor: 'createdAt',
      className: 'font-bold',
      sortable: true,
      width: 50,
    },
    {
      Cell({ row }: any) {
        const dueDate = formatDateMMMDDYYYY(row.original.dueDate);
        return <div><b>{dueDate}</b></div>;
      },
      Header: 'Due Date',
      id: 'due-date',
      accessor: 'dueDate',
      sortable: true,
      width: 100,
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
      accessor: 'createdBy.profile.displayName',
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
      Header: 'Job Address',
      id: 'job-site',
      accessor: getJobSite,
      sortable: true,
    },
  ];

  function Toolbar() {
    type IconComponentType = React.FunctionComponent<React.SVGProps<SVGSVGElement> & {title?: string | undefined;}>;
    const [IconComponent, setIconComponent] = useState<null | IconComponentType>(null);

    useEffect(() => {
      if(!hidden){
        if(selectedStatus !== '-1'){
          setIconComponent(statusReference[selectedStatus].icon || null);
        } else {
          setIconComponent(null);
        }
        if(loadCount.current !== 0){
          dispatch(getAllJobRequestAPI(currentPageSize, undefined, undefined, selectedStatus, keyword, selectionRange));
          dispatch(setCurrentPageIndex(0));
        } else {
          dispatch(getAllJobRequestAPI(currentPageSize, undefined, undefined, '0', keyword, selectionRange));
          dispatch(setCurrentPageIndex(0));
        }
      }
    }, [selectedStatus, hidden]);

    useEffect(() => {
      if(hidden) {
        if(loadCount.current !== 0){
          dispatch(getAllJobRequestAPI(currentPageSize, undefined, undefined, selectedStatus, keyword, selectionRange));
          dispatch(setCurrentPageIndex(0));
        }
      }
    }, [selectionRange, hidden]);

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
              {statusObj.icon && <statusObj.icon className={classes.filterIcon}/>}
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
      if (activeJobRequest) {
        dispatch(getAllJobRequestAPI(undefined, undefined, undefined, selectedStatus, keyword, selectionRange));
      }
      dispatch(setCurrentPageIndex(0));
      dispatch(setCurrentPageSize(15));
    }
    setTimeout(() => {
      loadCount.current++;
    }, 1000);
  }, [refresh, hidden]);

  useEffect(() => {
    if (activeJobRequest) dispatch(getAllJobRequestAPI());
    dispatch(setKeyword(''));
    dispatch(setCurrentPageIndex(0));
    dispatch(setCurrentPageSize(15));
  }, [])

  const handleTabChange = (newValue: number) => {
  };
  const handleRowClick = (event: any, row: any) => {
    openDetailJobRequestModal(row.original);
  };

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
          <BCTabs
              curTab={0}
              indicatorColor={'primary'}
              onChangeTab={handleTabChange}
              tabsData={[
                {
                  'label': 'Job Requests',
                  'value': 0
                }
              ]}
            />
          <SwipeableViews index={0}>
            <div
              className={classes.dataContainer}
              hidden={false}
              id={'0'}>
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
                lastPageCursorImplemented
                fetchFunction={(num: number, isPrev:boolean, isNext:boolean, query :string, isLastPage: boolean) =>
                  dispatch(getAllJobRequestAPI(num || currentPageSize, isPrev ? prevCursor : undefined, isNext ? nextCursor : undefined, selectedStatus, query === '' ? '' : query || keyword, selectionRange , isLastPage ? lastPageCursor : undefined))
                }
                total={total}
                currentPageIndex={currentPageIndex}
                setCurrentPageIndexFunction={(num: number) => dispatch(setCurrentPageIndex(num))}
                currentPageSize={currentPageSize}
                setCurrentPageSizeFunction={(num: number) => dispatch(setCurrentPageSize(num))}
                setKeywordFunction={(query: string) => dispatch(setKeyword(query))}
              />
            </div>
            <div
              hidden={true}
              id={'1'}>
                <Grid
                  item
                  xs={12}
                />
            </div>
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export default withStyles(styles, { withTheme: true })(JobRequest);
