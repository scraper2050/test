import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import Fab from '@material-ui/core/Fab';
import styles from './../estimates.styles';
import { withStyles } from '@material-ui/core';
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
          <Fab
            aria-label={'create-invoices'}
            classes={{
              'root': classes.fabRoot
            }}
            color={'primary'}
            variant={'extended'}>
            {'Create Invoices'}
          </Fab>
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
      'Header': 'Option',
      'id': 'action-create-job',
      'sortable': false,
      'width': 60
    }
  ];

  useEffect(() => {
    dispatch(getInvoicingEstimates());
    dispatch(loadingInvoicingEstimates());
  }, []);

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  return (
    <div
      className={classes.dataContainer}
      id={'0'}>
      <BCTableContainer
        columns={columns}
        isLoading={estimates.loading}
        onRowClick={handleRowClick}
        search
        searchPlaceholder={'Search Managers...'}
        tableData={estimates.data}
      />
    </div>
  );
}

export default withStyles(styles, { 'withTheme': true })(EstimatesListing);
