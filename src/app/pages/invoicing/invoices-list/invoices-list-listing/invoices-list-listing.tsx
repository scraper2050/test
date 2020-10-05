import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import styles from './../invoices-list.styles';
import { withStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import {
  getInvoicingList,
  loadingInvoicingList
} from 'actions/invoicing/invoicing.action';
import { useDispatch, useSelector } from 'react-redux';

function InvoicingListListing({ classes }: any) {
  const dispatch = useDispatch();
  const invoiceList = useSelector((state: any) => state.invoiceList);
  const columns: any = [
    {
      'Header': 'Invoice Id',
      'accessor': 'invoiceId',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Job Id',
      'accessor': '',
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
      'accessor': '',
      'className': 'font-bold',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        return <div className={'flex items-center'}>
          {`$${row.original.charges}` || 0}
        </div>;
      },
      'Header': 'Amount',
      'sortable': true,
      'width': 60
    },
    {
      Cell({ row }: any) {
        return <div className={'flex items-center'}>
          {`$${row.original.tax}` || 0}
        </div>;
      },
      'Header': 'Tax',
      'sortable': true,
      'width': 60
    },
    {
      Cell({ row }: any) {
        return <div className={'flex items-center'}>
          {`$${row.original.total}` || 0}
        </div>;
      },
      'Header': 'Total',
      'sortable': true,
      'width': 60
    }
  ];

  useEffect(() => {
    dispatch(getInvoicingList());
    dispatch(loadingInvoicingList());
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
        isLoading={invoiceList.loading}
        onRowClick={handleRowClick}
        search
        searchPlaceholder={'Search Managers...'}
        tableData={invoiceList.data}
      />
    </div>
  );
}

export default withStyles(styles, { 'withTheme': true })(InvoicingListListing);
