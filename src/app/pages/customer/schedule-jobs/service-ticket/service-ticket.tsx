import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import Fab from '@material-ui/core/Fab';
import InfoIcon from '@material-ui/icons/Info';
import styled from 'styled-components';
import styles from '../../customer.styles';
import { withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

function ServiceTicket({ classes }: any) {
  const [serviceTickets] = useState([
    {
      'createdAt': 'Aug 11, 2020',
      'customer': 'Test User',
      'id': '1'
    },
    {
      'createdAt': 'Aug 12, 2020',
      'customer': 'Test User',
      'id': '2'
    },
    {
      'createdAt': 'Aug 13, 2020',
      'customer': 'Test User',
      'id': '3'
    }
  ]);
  const columns: any = [
    {
      'Header': 'Ticket ID',
      'accessor': 'id',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Created At',
      'accessor': 'createdAt',
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
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          <Fab
            aria-label={'create-job'}
            classes={{
              'root': classes.fabRoot
            }}
            color={'primary'}
            variant={'extended'}>
            {'Create Job'}
          </Fab>
        </div>;
      },
      'Header': 'Create Job',
      'id': 'action-create-job',
      'sortable': false,
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          <Fab
            aria-label={'edit-ticket'}
            classes={{
              'root': classes.fabRoot
            }}
            color={'primary'}
            variant={'extended'}>
            {'Edit Ticket'}
          </Fab>
        </div>;
      },
      'Header': 'Edit Ticket',
      'id': 'action-edit-ticket',
      'sortable': false,
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          <InfoIcon />
        </div>;
      },
      'Header': 'Ticket Details',
      'id': 'action-detail',
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
        searchPlaceholder={'Search Tickets...'}
        tableData={serviceTickets}
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
)(ServiceTicket);
