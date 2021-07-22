import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import styled from 'styled-components';
import styles from './../invoices-list.styles';
import { Box, Chip, Typography, withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import React, { useEffect } from 'react';
import {
  getInvoicingList,
  loadingInvoicingList
} from 'actions/invoicing/invoicing.action';
import { useDispatch, useSelector } from 'react-redux';
import TableFilterService from 'utils/table-filter';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { modalTypes } from '../../../../../constants';
import { FormDefaultValues } from 'app/components/bc-shared-form/bc-shared-form-default-values';
import { FormTypes } from 'app/components/bc-shared-form/bc-shared-form.types';
import EmailInvoiceButton from '../email.invoice';
import { formatDatTimelll } from 'helpers/format';
import qbLogo from "../../../../../assets/img/integration-bg/quickbooks.png";


const getFilteredList = (state: any) => {
  return TableFilterService.filterByDateDesc(state?.invoiceList?.data);
};

function InvoicingListListing({ classes, theme }: any) {
  const dispatch = useDispatch();
  const invoiceList = useSelector(getFilteredList);
  const isLoading = useSelector((state: any) => state?.invoiceList?.loading);
  const showInvoiceDetail = (id:string) => {
    dispatch(setModalDataAction({
      'data': {
        'detail': true,
        'modalTitle': 'Invoice',
        'formId': id,
        'removeFooter': false
      },
      'type': modalTypes.SHARED_FORM_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 10);
  };

  const columns: any = [
    {
      'Header': 'Invoice ID',
      'accessor': 'invoiceId',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Job ID',
      'accessor': 'job.jobId',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Customer',
      'accessor': 'customer.profile.displayName',
      'className': 'font-bold',
      'sortable': true
    },
    /*
     * {
     *   'Header': 'Type',
     *   'accessor': '',
     *   'className': 'font-bold',
     *   'sortable': true
     * },
     * {
     *   Cell({ row }: any) {
     *     return <div className={'flex items-center'}>
     *       {`$${row.original.charges}` || 0}
     *     </div>;
     *   },
     *   'Header': 'Amount',
     *   'sortable': true,
     *   'width': 60
     * },
     * {
     *   Cell({ row }: any) {
     *     return <div className={'flex items-center'}>
     *       {`$${row.original.tax}` || 0}
     *     </div>;
     *   },
     *   'Header': 'Tax',
     *   'sortable': true,
     *   'width': 60
     * },
     */
    {
      Cell({ row }: any) {
        return <div className={classes.totalNumber}>

          <span>
            {`$${row.original.total}` || 0}
          </span>
        </div>;
      },
      'Header': 'Total',
      'sortable': true,
      'width': 20
    },
    { Cell({ row }: any) {
      return row.original.paid
        ? <Chip
          label={'Paid'}
          style={{ 'backgroundColor': theme.palette.success.light,
            'color': '#fff' }}
        />
        : <Chip
          color={'secondary'}
          label={'Unpaid'}
        />;
    },
    'Header': 'Payment Status',
    'accessor': 'paid',
    'className': 'font-bold',
    'sortable': true
    },
    { Cell({ row }: any) {
      return row.original.lastEmailSent
        ? formatDatTimelll(row.original.lastEmailSent)
        : 'N/A';
    },
    'Header': 'Last Email Send Date ',
    'accessor': 'lastEmailSent',
    'className': 'font-bold',
    'sortable': true
    },
    {
      Cell({ row }: any) {
        return row.original.createdAt
          ? formatDatTimelll(row.original.createdAt)
          : 'N/A';
      },
      'Header': 'Invoice Date',
      'accessor': 'createdAt',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          <Box
            display={'block'}
            pr={1}>
            <EmailInvoiceButton
              Component={<Fab
                aria-label={'send-email'}
                classes={{
                  'root': classes.fabRoot
                }}
                color={'primary'}
                size={'medium'}
                variant={'extended'}>
                {'Email'}
              </Fab>}
              invoice={row.original}
            />
          </Box>
          <Fab
            aria-label={'view-more'}
            classes={{
              'root': classes.fabRoot
            }}
            color={'primary'}
            onClick={() => showInvoiceDetail(row.original._id)}
            size={'medium'}
            style={{marginTop: '5px'}}
            variant={'extended'}>
            {'View More'}

          </Fab>
        </div>;
      },
      'Header': 'Actions',
      'id': 'action-send-email',
      'sortable': false,
      'width': 60
    },
    {
      Cell({ row }: any) {
        return (
          row.original.quickbookId !== null ?
            <img style={{width: '30px', height: '30px', verticalAlign: 'middle'}}
                 alt={'logo'}
                 title={'synced with QuickBooks'}
                 src={qbLogo}
            /> :
            null
        );
      },
      'id': 'qbSync',
      'sortable': false,
      'width': 30
    }
  ];

  useEffect(() => {
    dispatch(getInvoicingList());
    dispatch(loadingInvoicingList());
  }, []);

  const handleRowClick = (event: any, row: any) => {
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
