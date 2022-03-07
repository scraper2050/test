import React, {useEffect, useState, useRef} from 'react';
import {Button, withStyles} from "@material-ui/core";
import styles from './view-more.styles';
import {useLocation} from "react-router-dom";
import BCTableContainer
  from "../../../../components/bc-table-container/bc-table-container";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BCMenuButton from "../../../../components/bc-menu-more";
import BCDateRangePicker
  , {Range} from "../../../../components/bc-date-range-picker/bc-date-range-picker";
import {useSelector} from "react-redux";
import {
  formatCurrency, formatDate,
} from "../../../../../helpers/format";
import {ContractorPayment} from "../../../../../actions/payroll/payroll.types";
import moment from "moment";


interface Props {
  classes: any;
}

const ITEMS = [
  {id: 0, title:'Edit'},
  {id: 1, title:'Delete'},
]

function VendorPayment({classes}: Props) {
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);
  const location = useLocation<any>();
  const { vendorObj, vendorPayments } = useSelector((state: any) => state.vendors)
  const locationState = location.state;
  const prevPage = locationState && locationState.prevPage ? locationState.prevPage : null;
  const [filteredPayments, setFilteredPayments] = useState<ContractorPayment[]>([])
  const [currentPage, setCurrentPage] = useState({
    'page': prevPage ? prevPage.page : 0,
    'pageSize': prevPage ? prevPage.pageSize : 10,
    'sortBy': prevPage ? prevPage.sortBy : []
  });

  const handleMenuButtonClick = (event: any, id: number, row:any) => {
    event.stopPropagation();
  }

  const calculateDefaultRange = () => {
    const paymentDates = vendorPayments.map((payment: any) =>  (new Date(payment.paidAt)).getTime());
    const newRange = {
      startDate: new Date(Math.min(...paymentDates)),
      endDate: new Date(Math.max(...paymentDates)),
    }
    return newRange;
  }

  useEffect(() => {
    const range = calculateDefaultRange();
    setSelectionRange(range);
  }, [vendorPayments]);

  useEffect(() => {
    if (selectionRange) {
      const filtered = vendorPayments.filter((payment: ContractorPayment) =>
        moment(payment.paidAt).isBetween(selectionRange?.startDate, selectionRange?.endDate, 'day', '[]')
      );
      setFilteredPayments(filtered);
    } else {
      setFilteredPayments(vendorPayments);
    }
  }, [selectionRange])

  const columns: any = [
    {
      'Header': 'Vendor',
      'accessor': (originalRow: any) => vendorObj.info.companyName,
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Payment Date',
      'accessor': (originalRow: any) => formatDate(originalRow.paidAt),
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Amount',
      'accessor': (originalRow: any) => formatCurrency(originalRow.amountPaid),
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Method',
      'accessor': 'paymentType',
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Reference No.',
      'accessor': 'referenceNumber',
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Notes',
      'accessor': 'notes',
      'className': 'font-bold',
      'sortable': true,
    },
    { Cell({ row }: any) {
        return (
          <BCMenuButton
            icon={MoreHorizIcon}
            items={ITEMS}
            handleClick={(e, id) => handleMenuButtonClick(e, id, row.original)}/>
        )
      },
      'Header': 'Actions',
      'className': 'font-bold',
      'sortable': false,
      'width': 100
    },
  ];

  function renderDateRangePicker () {
    return vendorPayments.length > 0 ? (
      <BCDateRangePicker
        range={selectionRange}
        onChange={setSelectionRange}
      />) : null;
  }

  return (
    <BCTableContainer
      columns={columns}
      currentPage={currentPage}
      //isLoading={vendors.loading}
      //onRowClick={handleRowClick}
      search
      searchPlaceholder = 'Search Payments...'
      setPage={setCurrentPage}
      tableData={filteredPayments}
      toolbarPositionLeft={true}
      toolbar={renderDateRangePicker()}
    />
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(VendorPayment);
