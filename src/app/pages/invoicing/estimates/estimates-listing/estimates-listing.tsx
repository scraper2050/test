import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import Fab from '@material-ui/core/Fab';
import styled from 'styled-components';
import styles from './../estimates.styles';
import { Box, makeStyles, withStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import {
  getInvoicingEstimates,
  loadingInvoicingEstimates
} from 'actions/invoicing/invoicing.action';
import { useDispatch, useSelector } from 'react-redux';

function EstimatesListing({ classes }: any) {
  const dispatch = useDispatch();
  const estimates = useSelector((state: any) => state.estimates);
  const columns: any = [
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          {row.index + 1}
        </div>;
      },
      'Header': 'No#',
      'sortable': true,
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          {
            row.original.items && row.original.items.length
              ? row.original.items.map((item: { name: string }, index: number) => `${item.name} ${index === row.original.items.length - 1
                ? ''
                : ','}`)
              : ''
          }
        </div>;
      },
      'Header': 'Items',
      'sortable': true,
      'width': 60
    },
    {
      'Header': 'Customer',
      'accessor': 'customer.profile.displayName',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          {`$${row.original.total}` || 0}
        </div>;
      },
      'Header': 'Total',
      'sortable': true,
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          <Box display="inline" pr={1}>
            <Fab
              aria-label={'create-invoice'}
              classes={{
                'root': classes.fabRoot,
              }}
              color={'primary'}
              variant={'extended'}>
              {'Create Invoice'}
              </Fab>
          </Box>
          <Fab
            aria-label={'create-purchase-order'}
            classes={{
              'root': classes.fabRoot
            }}
            color={'primary'}
            variant={'extended'}>
            {'Create Purchase Order'}
          </Fab>
        </div>;
      },
      "Header": 'Options',
      'id': 'action-create-invoice',
      'sortable': false,
      'width': 60
    },
  ];

  useEffect(() => {
    dispatch(getInvoicingEstimates());
    dispatch(loadingInvoicingEstimates());
  }, []);

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  return (
    <DataContainer id={'0'}>
      <BCTableContainer
        columns={columns}
        isLoading={estimates.loading}
        onRowClick={handleRowClick}
        search
        searchPlaceholder={'Search invoices...'}
        tableData={estimates.data}
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

export default withStyles(styles, { 'withTheme': true })(EstimatesListing);
