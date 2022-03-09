import React, {useEffect, useState, useRef} from 'react';
import {
  Button, Chip,
  withStyles
} from "@material-ui/core";
import styles from '../payroll.styles';
import {useLocation} from "react-router-dom";
import BCTableContainer  from "../../../components/bc-table-container/bc-table-container";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BCMenuButton from "../../../components/bc-menu-more";
import {
  openModalAction,
  setModalDataAction
} from "../../../../actions/bc-modal/bc-modal.action";
import {modalTypes} from "../../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {
  formatCurrency, formatDate,
  formatDateYMD,
  formatShortDateNoDay
} from "../../../../helpers/format";
import BCDateRangePicker, {Range} from "../../../components/bc-date-range-picker/bc-date-range-picker";
import {HighlightOff} from "@material-ui/icons";
import BCItemsFilter from "../../../components/bc-items-filter/bc-items-filter";
import {
  getContractorPayments,
  getContractors, removeContractorPayment
} from "../../../../actions/payroll/payroll.action";
import {
  Contractor,
  ContractorPayment
} from "../../../../actions/payroll/payroll.types";
import moment from "moment";
import {getPayrollReportAPI} from "../../../../api/payroll.api";
import {error} from "../../../../actions/snackbar/snackbar.action";
import classNames from "classnames";

interface Props {
  classes: any;
}
function PayrollInvoices({classes}: Props) {
  const dispatch = useDispatch();
  const location = useLocation<any>();
  const locationState = location.state;
  const prevPage = locationState && locationState.prevPage ? locationState.prevPage : null;
  const { contractors } = useSelector((state: any) => state.payroll);
  // const [contractors, setContractors] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filteredInvoices, setFilteredInvoices] = useState<ContractorPayment[]>([]);
  const [currentPage, setCurrentPage] = useState({
    'page': prevPage ? prevPage.page : 0,
    'pageSize': prevPage ? prevPage.pageSize : 10,
    'sortBy': prevPage ? prevPage.sortBy : []
  });
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);
  const [selectedIDs, setSelectedIDs] = useState<string[]>([]);
  const [totals, setTotals] = useState({invoices: 0, commissions: 0});

  const getData = async(type?: string, id?: string) => {
    setLoading(true);
    const response: any = await getPayrollReportAPI();
    if (response.status === 1) {
      setInvoices(response.data);
    } else {
      dispatch(error(response.message));
    }
    setLoading(false);
  }

  useEffect(() => {
    dispatch(getContractors());
    getData();
  }, []);

  useEffect(() => {
    const cont = contractors.find((contractor: any) => contractor._id === selectedIDs[0]);
    if (cont) {
      dispatch(getContractorPayments({id: cont._id, type: cont.type}));
    }
  }, [selectedIDs]);

  useEffect(() => {
    let totalInvoicesAmount = 0;
    let totalCommissions = 0;
    const filtered = invoices.filter((item: any) => {
      let cond = true;
      if (selectionRange) {
        cond = cond &&
          moment(item.invoice.dueDate).isBetween(selectionRange?.startDate, selectionRange?.endDate, 'day', '[]');
      }
      if (selectedIDs.length > 0) {
        cond = cond && selectedIDs.indexOf(item.payedPerson._id) >= 0;
      }
      if (cond) {
        totalInvoicesAmount += item.invoice.balanceDue;
        totalCommissions += item.commissionAmount;
      }
      setTotals({invoices: totalInvoicesAmount, commissions: totalCommissions});
      return cond;
    });
    setFilteredInvoices(filtered);
  }, [selectionRange, invoices, selectedIDs]);

  const columns: any = [
    {
      'Header': 'Invoice',
      'accessor': (originalRow: any) => originalRow.invoice.invoiceId,
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Vendor',
      'accessor': (originalRow: any) => originalRow.payedPerson.vendor,
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Invoice Amount',
      'accessor': (originalRow: any) => formatCurrency(originalRow.invoice.balanceDue),
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Date',
      'accessor': (originalRow: any) => formatShortDateNoDay(originalRow.invoice.dueDate),
      'className': 'font-bold',
      'sortable': true,
    },
    { Cell({ row }: any) {
        return (
          <Chip
            label={row.original.invoice.paid ? 'Paid' : 'Unpaid'}
            className={classNames({[classes.statusChip]: true, [classes.unPaidChip]: !row.original.invoice.paid})}
          />
        )
      },
      'Header': 'Status',
      'className': 'font-bold',
      'sortable': false,
      'width': 100
    },
    {
      'Header': 'Notes',
      'accessor': (originalRow: any) =>
        originalRow.note ?
          (originalRow.note.length < 100 ? originalRow.note : originalRow.note.substring(0, 100)+'...')
          : '',
      'sortable': true,
      'className': classes.tableCellWrap,
    },
  ];

  function renderDateRangePicker () {
    return <BCDateRangePicker range={selectionRange} onChange={setSelectionRange} showClearButton={true} />
  }

  function renderMenu () {
    return (
      <BCItemsFilter
        items={contractors.map((item: Contractor) => ({id: item._id, value: item.vendor}))}
        selected={selectedIDs}
        onApply={setSelectedIDs}
        />
    )
  }

  function renderTotals () {
    return (
      loading ? null :
        <div className={classes.totalContainer}>
          <div style={{display: 'flex', flex: 1}}>
            <span className={classes.totalText}>Total Amount</span>
            <span
              className={classes.totalValue}>{formatCurrency(totals.invoices)}</span>
          </div>
          <div style={{display: 'flex', flex: 1}}>
            <span
              className={classNames(classes.totalText, classes.totalTextSmall)}>Commissions</span>
            <span
              className={classNames(classes.totalValue, classes.totalTextSmall)}>{formatCurrency(totals.commissions)}</span>
          </div>
        </div>

    )
  }

  const renderClearFilterButton = () => {
    return(selectedIDs.length > 0 ?
      <div style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', display: 'flex'}}>
        <Button
          variant={'text'}
          className={classes.filterClearButton}
          onClick={() => setSelectedIDs([])}
          endIcon={<HighlightOff />}
        >Clear Filters</Button></div> : null
    )
  }

  return (
    <BCTableContainer
      columns={columns}
      currentPage={currentPage}
      isLoading={loading}
      setPage={setCurrentPage}
      tableData={filteredInvoices}
      toolbarPositionLeft={true}
      toolbar={[renderMenu(), renderDateRangePicker(), renderTotals()]}
    />
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(PayrollInvoices);
