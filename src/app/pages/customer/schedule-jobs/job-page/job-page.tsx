import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import Fab from '@material-ui/core/Fab';
import InfoIcon from '@material-ui/icons/Info';
import { getAllJobsAPI } from 'api/job.api';
import { modalTypes } from '../../../../../constants';
import styled from 'styled-components';
import styles from '../../customer.styles';
import { Grid, withStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { convertMilitaryTime, formatDate } from 'helpers/format';
import {
  // CloseModalAction,
  openModalAction,
  setModalDataAction
} from 'actions/bc-modal/bc-modal.action';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';

// Import { VendorsReducer } from 'reducers/vendor.reducer';


interface StatusTypes {
  status: number;
}

function JobPage({ classes, currentPage, setCurrentPage }: any) {
  const dispatch = useDispatch();
  const { _id } = useSelector(({ auth }:RootState) => auth);
  const { isLoading = true, jobs, refresh = true } = useSelector(({ jobState }: any) => ({
    'isLoading': jobState.isLoading,
    'jobs': jobState.data,
    'refresh': jobState.refresh
  }));

  function RenderStatus({ status }: StatusTypes) {
    const statusArray = [
      {
        'class': classes.statusPendingText,
        'text': 'Scheduled'
      },
      {
        'class': classes.statusStartedText,
        'text': 'Started'
      },
      {
        'class': classes.statusFinishedText,
        'text': 'Finished'
      },
      {
        'class': classes.statusCanceledText,
        'text': 'Canceled'
      },
      {
        'class': classes.resheduledText,
        'text': 'Rescheduled'
      }
    ];
    const textStatus = statusArray[status].text;
    return <div className={statusArray[status].class}>
      {textStatus}
    </div>;
  }

  function RenderVendor({ vendor }:any) {
    if (vendor) {
      return vendor.profile
        ? vendor.profile.displayName
        : vendor.info.companyName;
    }
    return null;
  }

  const openEditJobModal = (job: any) => {
    dispatch(setModalDataAction({
      'data': {
        'job': job,
        'modalTitle': 'Edit Job',
        'removeFooter': false
      },
      'type': modalTypes.EDIT_JOB_MODAL
    }));
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
    dispatch(setModalDataAction({
      'data': {
        'detail': true,
        'job': job,
        'modalTitle': 'View Job',
        'removeFooter': false
      },
      'type': modalTypes.EDIT_JOB_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const formatSchedulingTime = (time: string) => {
    const timeAr = time.split('T');
    const timeWithSeconds = timeAr[1].substr(0, 5);
    const hours = timeWithSeconds.substr(0, 2);
    const minutes = timeWithSeconds.substr(3, 5);

    return { hours,
      minutes };
  };

  const columns: any = [
    {
      'Header': 'Job ID',
      'accessor': 'jobId',
      'className': 'font-bold',
      'sortable': true,
      'width': 50
    },
    {
      Cell({ row }: any) {
        return <RenderStatus status={row.original.status} />;
      },
      'Header': 'Status',
      'accessor': 'status',
      'className': 'font-bold',
      'sortable': true,
      'width': 60
    },
    {
      Cell({ row }: any) {
        return <RenderVendor vendor={row.original.technician || row.original.contractor} />;
      },
      'Header': 'Technician',
      'accessor': 'contractor.info.companyName',
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
      'Header': 'Type',
      'accessor': 'type.title',
      'className': 'font-bold',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        const scheduleDate = formatDate(row.original.scheduleDate);
        return (
          <div className={'flex items-center'}>
            <p>
              {scheduleDate}
            </p>
          </div>
        );
      },
      'Header': 'Schedule Date',
      'id': 'job-schedulee-date',
      'sortable': true,
      'width': 60
    },
    {
      Cell({ row }: any) {
        let startTime = 'N/A';
        let endTime = 'N/A';
        if (row.original.scheduledStartTime !== undefined) {
          const formatScheduledObj = formatSchedulingTime(row.original.scheduledStartTime);
          startTime = convertMilitaryTime(`${formatScheduledObj.hours}:${formatScheduledObj.minutes}`);
        }
        if (row.original.scheduledEndTime !== undefined) {
          const formatScheduledObj = formatSchedulingTime(row.original.scheduledEndTime);
          endTime = convertMilitaryTime(`${formatScheduledObj.hours}:${formatScheduledObj.minutes}`);
        }
        return (
          <div className={'flex items-center'} >
            <p>
              {`${startTime} - ${endTime}`}
            </p>
          </div>
        );
      },
      'Header': 'Time',
      'id': 'job-time',
      'sortable': true,
      'width': 40
    },
    {
      Cell({ row }: any) {
        return (
          <Grid
            alignItems={'center'}
            container>
            <div className={'flex items-center'}>
              {[0, 4].includes(row.original.status) && (!row.original.employeeType || row.original.createdBy.profile._id === _id)
                ? <Fab
                  aria-label={'edit-job'}
                  classes={{
                    'root': classes.fabRoot
                  }}
                  color={'primary'}
                  onClick={() => openEditJobModal(row.original)}
                  variant={'extended'}>
                  {'Edit'}
                </Fab>
                : <div style={{
                  'height': 34,
                  'width': 48 }}
                />}
            </div>
            <div
              className={'flex items-center'}
              onClick={() => openDetailJobModal(row.original)}
              style={{
                'alignItems': 'center',
                'display': 'flex',
                'height': 34,
                'marginLeft': '.5rem'

              }}>
              <InfoIcon style={{ 'margin': 'auto, 0' }} />
            </div>
          </Grid>
        );
      },
      'Header': 'Options',
      'id': 'action-options',
      'sortable': false
    }
  ];

  useEffect(() => {
    if (refresh) {
      dispatch(getAllJobsAPI());
    }
  }, [refresh]);

  const handleRowClick = (event: any, row: any) => { };

  return (
    <DataContainer id={'0'}>
      <BCTableContainer
        columns={columns}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        search
        searchPlaceholder={'Search Jobs...'}
        tableData={jobs}
      />
    </DataContainer>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  overflow: hidden;
`;

export default withStyles(styles, { 'withTheme': true })(JobPage);
