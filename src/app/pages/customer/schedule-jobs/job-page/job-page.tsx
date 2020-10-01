import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import Fab from '@material-ui/core/Fab';
import { getAllJobAPI } from 'api/job.api';
import { modalTypes } from '../../../../../constants';
import moment from 'moment';
import styled from 'styled-components';
import styles from '../../customer.styles';
import { withStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch, useSelector } from 'react-redux';

function JobPage({ classes }: any) {
  const dispatch = useDispatch();
  const { isLoading = true, jobs, refresh = true } = useSelector(({ jobState }: any) => ({
    'isLoading': jobState.isLoading,
    'jobs': jobState.data,
    'refresh': jobState.refresh
  }));
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
  const columns: any = [
    {
      'Header': 'Job ID',
      'accessor': 'jobId',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Status',
      'accessor': 'status',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Technician',
      'accessor': 'technician.profile.displayName',
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
      'Cell'({ row }: any) {
        const scheduleDate = moment(row.original.scheduleDate).format('YYYY-MM-DD');
        return <div className={'flex items-center'}>
          <p>
            {scheduleDate}
          </p>
        </div>;
      },
      'Header': 'Schedule Date',
      'id': 'job-schedulee-date',
      'sortable': true
    },
    {
      'Cell'({ row }: any) {
        const startTime = moment(row.original.scheduledStartTime).format('HH:mm:ss');
        const endTime = moment(row.original.scheduledEndTime).format('HH:mm:ss');
        return <div className={'flex items-center'}>
          <p>
            {`${startTime} - ${endTime}`}
          </p>
        </div>;
      },
      'Header': 'Time',
      'id': 'job-time',
      'sortable': true
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          {
            row.original.status === '0' || row.original.status === '1'
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
              : null
          }
        </div>;
      },
      'Header': 'Options',
      'id': 'action-options',
      'sortable': false,
      'width': 60
    }
  ];

  useEffect(() => {
    if (refresh) {
      dispatch(getAllJobAPI());
    }
  }, [refresh]);

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  return (

    <DataContainer
      id={'0'}>
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
  margin-top: 25px;
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(JobPage);
