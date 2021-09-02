import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import styles from './../invoices-list.styles';
import { withStyles, Button } from "@material-ui/core";
import React, { useEffect } from 'react';
import {
  getInvoicingList,
  loadingInvoicingList
} from 'actions/invoicing/invoicing.action';
import { useDispatch, useSelector } from 'react-redux';
import TableFilterService from 'utils/table-filter';
import { MailOutlineOutlined } from '@material-ui/icons';
import EmailInvoiceButton from '../email.invoice';
import { formatDatTimelll } from 'helpers/format';
import BCQbSyncStatus from "../../../../components/bc-qb-sync-status/bc-qb-sync-status";
import { CSButton, useCustomStyles, CSButtonSmall } from "../../../../../helpers/custom";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {openModalAction, setModalDataAction} from "../../../../../actions/bc-modal/bc-modal.action";
import {modalTypes} from "../../../../../constants";

const getFilteredList = (state: any) => {
  const sortedInvoices = TableFilterService.filterByDateDesc(state?.invoiceList.data);
  return sortedInvoices.filter((invoice: any) => invoice.isDraft);
};

function InvoicingDraftListing({ classes, theme }: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const invoiceList = useSelector(getFilteredList);
  const customStyles = useCustomStyles()
  const isLoading = useSelector((state: any) => state?.invoiceList?.loading);
  const showInvoiceDetail = (id:string) => {
    history.push({
      'pathname': `view/${id}`,
    });
  };
  console.log(invoiceList)
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
    {
      Cell({ row }: any) {
        return row.original.createdAt
          ? formatDatTimelll(row.original.createdAt)
          : 'N/A';
      },
      'Header': 'Last Edited Date',
      'accessor': 'createdAt',
      'className': 'font-bold',
      'sortable': true
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
        searchPlaceholder={'Search Invoices...'}
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

export default withStyles(styles, { 'withTheme': true })(InvoicingDraftListing);
