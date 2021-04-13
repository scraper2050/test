import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import styled from 'styled-components';
import styles from './../invoices-list.styles';
import { Box, withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import React, { useEffect } from 'react';
import {
  getInvoicingList,
  loadingInvoicingList
} from 'actions/invoicing/invoicing.action';
import { useDispatch, useSelector } from 'react-redux';
import TableFilterService from 'utils/table-filter';


const getFilteredList = (state: any) => {
  return TableFilterService.filterByDateDesc(state?.invoiceList?.data);
}

function InvoicingListListing({ classes }: any) {
  const dispatch = useDispatch();
  const invoiceList = useSelector(getFilteredList);
  const isLoading = useSelector((state: any) => state?.invoiceList?.loading);

  const columns: any = [
    {
      'Header': 'Invoice ID',
      'accessor': 'invoiceId',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Job ID',
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
    // {
    //   'Header': 'Type',
    //   'accessor': '',
    //   'className': 'font-bold',
    //   'sortable': true
    // },
    // {
    //   Cell({ row }: any) {
    //     return <div className={'flex items-center'}>
    //       {`$${row.original.charges}` || 0}
    //     </div>;
    //   },
    //   'Header': 'Amount',
    //   'sortable': true,
    //   'width': 60
    // },
    // {
    //   Cell({ row }: any) {
    //     return <div className={'flex items-center'}>
    //       {`$${row.original.tax}` || 0}
    //     </div>;
    //   },
    //   'Header': 'Tax',
    //   'sortable': true,
    //   'width': 60
    // },
    {
      Cell({ row }: any) {
        return <div className={classes.totalNumber}>
        <span className={classes.currencySign}>$</span><span>{`${row.original.total}` || 0}</span>
        </div>;
      },
      'Header': 'Total',
      'sortable': true,
      'width': 20
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          <Box display="inline" pr={1}>
            <Fab
              aria-label={'send-email'}
              classes={{
                'root': classes.fabRoot
              }}
              color={'primary'}
              variant={'extended'}
              size={"medium"}
            >
              {'Email'}
              </Fab>
          </Box>
          <Fab
            aria-label={'view-more'}
            classes={{
              'root': classes.fabRoot
            }}
            color={'primary'}
            variant={'extended'}
            size={"medium"}
          >
            {'View More'}

          </Fab>
        </div>;
      },
      'Header': 'Actions',
      'id': 'action-send-email',
      'sortable': false,
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
    <DataContainer id={'0'}>
      <BCTableContainer
        columns={columns}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        search
        searchPlaceholder={'Search invoices...'}
        tableData={invoiceList}
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

export default withStyles(styles, { 'withTheme': true })(InvoicingListListing);
