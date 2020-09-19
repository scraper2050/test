import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import Fab from '@material-ui/core/Fab';
import styled from 'styled-components';
import styles from '../../customer.styles';
import { withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

function JobPage({ classes }: any) {
  const [jobs] = useState([
    {
      'customer': 'Test User',
      'id': '1',
      'schedule': 'Aug 11, 2020',
      'status': 'Pending',
      'technician': 'Chirs Norton',
      'time': '11:00',
      'type': 'Repair'
    },
    {
      'customer': 'Test User One',
      'id': '2',
      'schedule': 'Aug 12, 2020',
      'status': 'Started',
      'technician': 'Chirs Norton',
      'time': '9:00',
      'type': 'Repair'
    },
    {
      'customer': 'Test Admin',
      'id': '3',
      'schedule': 'Aug 12, 2020',
      'status': 'Completed',
      'technician': 'Chirs Norton',
      'time': '14:30',
      'type': 'Repair'
    },
    {
      'customer': 'Test User Two',
      'id': '3',
      'schedule': 'Aug 13, 2020',
      'status': 'Cancelled',
      'technician': 'Chirs Norton',
      'time': '13:20',
      'type': 'Repair'
    }
  ]);
  const columns: any = [
    {
      'Header': 'Job ID',
      'accessor': 'id',
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
      'accessor': 'technician',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Customer',
      'accessor': 'customer',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Type',
      'accessor': 'type',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Schedule',
      'accessor': 'schedule',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Time',
      'accessor': 'time',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          <Fab
            aria-label={'edit-job'}
            classes={{
              'root': classes.fabRoot
            }}
            color={'primary'}
            variant={'extended'}>
            {'Edit'}
          </Fab>
        </div>;
      },
      'Header': 'Options',
      'id': 'action-options',
      'sortable': false,
      'width': 60
    }
  ];

  useEffect(() => {
  }, []);

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  return (

    <DataContainer
      id={'0'}>
      <BCTableContainer
        columns={columns}
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
