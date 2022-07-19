import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import { useHistory, useLocation } from "react-router-dom";
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
import { getAllDraftInvoicesAPI } from 'api/invoicing.api';
import { 
  setCurrentDraftPageIndex,
  setCurrentDraftPageSize,
  setDraftKeyword,
} from 'actions/invoicing/invoicing.action';

const getFilteredList = (state: any) => {
  const sortedInvoices = TableFilterService.filterByDateDesc(state?.invoiceList.draft);
  return sortedInvoices.filter((invoice: any) => invoice.isDraft);
};

function InvoicingDraftListing({ classes, theme }: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<any>();
  const invoiceList = useSelector(getFilteredList);
  const customStyles = useCustomStyles()
  // const isLoading = useSelector((state: any) => state?.invoiceList?.loading);
  const { loading, total, prevCursor, nextCursor, currentPageIndex, currentPageSize, keyword} = useSelector(
    ({ invoiceList }: any) => ({
      loading: invoiceList.loadingDraft,
      prevCursor: invoiceList.prevCursorDraft,
      nextCursor: invoiceList.nextCursorDraft,
      total: invoiceList.totalDraft,
      currentPageIndex: invoiceList.currentPageIndexDraft,
      currentPageSize: invoiceList.currentPageSizeDraft,
      keyword: invoiceList.keywordDraft,
    })
  );

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
    // dispatch(getInvoicingList());
    // dispatch(loadingInvoicingList());
    dispatch(getAllDraftInvoicesAPI());
    return () => {
      dispatch(setDraftKeyword(''));
      dispatch(setCurrentDraftPageIndex(currentPageIndex));
      dispatch(setCurrentDraftPageSize(currentPageSize));
    }
  }, []);

  useEffect(() => {
    if(location?.state?.tab === 1 && (location?.state?.option?.search || location?.state?.option?.pageSize)){
      dispatch(setDraftKeyword(location.state.option.search));
      dispatch(getAllDraftInvoicesAPI(location.state.option.pageSize, undefined, undefined, location.state.option.search));
      dispatch(setCurrentDraftPageSize(location.state.option.pageSize));
      dispatch(setCurrentDraftPageIndex(0));
      window.history.replaceState({}, document.title)
    } 
  }, [location]);

  const showInvoiceDetail = (id:string) => {
    history.push({
      'pathname': `view/${id}`,
      'state': {
        keyword,
        currentPageSize,
        tab: 1,
      }
    });
  };

  const handleRowClick = (event: any, row: any) => showInvoiceDetail(row.original._id);

  return (
    <DataContainer id={'0'}>
      <BCTableContainer
        columns={columns}
        isLoading={loading}
        onRowClick={handleRowClick}
        search
        searchPlaceholder={'Search Invoices...'}
        tableData={invoiceList}
        manualPagination
        fetchFunction={(num: number, isPrev:boolean, isNext:boolean, query :string) => 
          dispatch(getAllDraftInvoicesAPI(num || currentPageSize, isPrev ? prevCursor : undefined, isNext ? nextCursor : undefined, query === '' ? '' : query || keyword))
        }
        total={total}
        currentPageIndex={currentPageIndex}
        setCurrentPageIndexFunction={(num: number) => dispatch(setCurrentDraftPageIndex(num))}
        currentPageSize={currentPageSize}
        setCurrentPageSizeFunction={(num: number) => dispatch(setCurrentDraftPageSize(num))}
        setKeywordFunction={(query: string) => dispatch(setDraftKeyword(query))}
        disableInitialSearch={location?.state?.tab !== 1}
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
