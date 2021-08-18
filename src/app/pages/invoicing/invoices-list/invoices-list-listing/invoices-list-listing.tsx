import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import styled from 'styled-components';
import styles from './../invoices-list.styles';
import { Box, Button, Chip, createStyles, makeStyles, Typography, withStyles } from "@material-ui/core";
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
import { MailOutlineOutlined } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EmailInvoiceButton from '../email.invoice';
import { formatDatTimelll } from 'helpers/format';
import BCQbSyncStatus from "../../../../components/bc-qb-sync-status/bc-qb-sync-status";
import { Theme } from "@material-ui/core/styles";
import * as CONSTANTS from "../../../../../constants";
import { CSButton, useCustomStyles, CSChip } from "../../../../../helpers/custom";

const getFilteredList = (state: any) => {
  return TableFilterService.filterByDateDesc(state?.invoiceList?.data);
};

function InvoicingListListing({ classes, theme }: any) {
  const dispatch = useDispatch();
  const invoiceList = useSelector(getFilteredList);
  const customStyles = useCustomStyles()
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
      return (
        <div className={customStyles.centerContainer}>
          {
            row.original.paid
              ? <CSChip
                label={'Paid'}
                style={{ 'backgroundColor': theme.palette.success.light,
                  'color': '#fff' }}
              />
              : <CSChip
              className="block"
                color={'secondary'}
                label={'Unpaid'}
              />
          }
        </div>
      )
    },
    'Header': 'Payment Status',
    'accessor': 'paid',
    'className': 'font-bold',
    'sortable': true,
      'width': 10
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
      Cell({ row }: any) {
        return (
          <BCQbSyncStatus data={row.original} />
        );
      },
      'Header': 'Integrations',
      'id': 'qbSync',
      'sortable': false,
      'width': 30
    },
    {
      Cell({ row }: any) {
        return <div className={customStyles.centerContainer}>
          <EmailInvoiceButton
            Component={<CSButton
              variant="contained"
              classes={{
                'root': classes.emailButton
              }}
              color="primary"
              size="small">
              <MailOutlineOutlined
                className={customStyles.iconBtn}
              />
            </CSButton>}
            invoice={row.original}
          />
        </div>;
      },
      'Header': 'Actions',
      'id': 'action-send-email',
      'sortable': false,
      'width': 120
    },
  ];

  useEffect(() => {
    dispatch(getInvoicingList());
    dispatch(loadingInvoicingList());
  }, []);

  const handleRowClick = (event: any, row: any) => showInvoiceDetail(row.original._id);

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
