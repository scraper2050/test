import React, {useEffect, useState, useRef} from 'react';
import {
  Button,
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

interface Props {
  classes: any;
}

const ITEMS = [
  {id: 0, title:'Edit'},
  {id: 1, title:'Delete'},
  {id: 2, title:'View Detail'},
]

function PastPayments({classes}: Props) {
  const dispatch = useDispatch();
  const location = useLocation<any>();
  const locationState = location.state;
  const prevPage = locationState && locationState.prevPage ? locationState.prevPage : null;
  const { loading, payments, contractors } = useSelector((state: any) => state.payroll);

  const [filteredPayments, setFilteredPayments] = useState<ContractorPayment[]>([]);
  const [currentPage, setCurrentPage] = useState({
    'page': prevPage ? prevPage.page : 0,
    'pageSize': prevPage ? prevPage.pageSize : 10,
    'sortBy': prevPage ? prevPage.sortBy : []
  });
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);
  const [selectedIDs, setSelectedIDs] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getContractors());
    const obj: any = location.state;
    if (obj?.contractor) {
      setSelectedIDs([obj.contractor._id]);
    } else {
      dispatch(getContractorPayments());
    }
  }, []);

  useEffect(() => {
    const cont = contractors.find((contractor: any) => contractor._id === selectedIDs[0]);
    if (cont) {
      dispatch(getContractorPayments({id: cont._id, type: cont.type}));
    }
  }, [selectedIDs]);

  useEffect(() => {
    if (selectionRange) {
      const filtered = payments.filter((payment: ContractorPayment) =>
        moment(payment.paidAt).isBetween(selectionRange?.startDate, selectionRange?.endDate, 'day', '[]')
      );
      setFilteredPayments(filtered);
    } else {
      setFilteredPayments(payments);
    }
  }, [selectionRange, payments]);

  const editPayment = (payment: any) => {
    dispatch(setModalDataAction({
      data: {
        modalTitle: 'Edit Payment',
        payment,
        payroll: payment.payedPerson,
        dateRange: {startDate: payment.startDate, endDate: payment.endDate},
      },
      'type': modalTypes.PAYROLL_RECORD_PAYMENT_MODAL
    }));

    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  }

  const deletePayment = (payment: any) => {
    dispatch(setModalDataAction({
      data: {
        modalTitle: '         ',
        message: 'Are you sure you want to delete this Payment Record?',
        subMessage: 'This action cannot be undone.',
        action: removeContractorPayment(payment),
      },
      'type': modalTypes.WARNING_MODAL
    }));

    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  }

  const viewPayment = (payment: any) => {
    dispatch(setModalDataAction({
      data: {
        modalTitle: 'Payroll Details',
        payment,
      },
      'type': modalTypes.PAYROLL_DETAIL_PAYMENT_MODAL
    }));

    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  }

  const handleMenuButtonClick = (event: any, id: number, row:any) => {
    switch (id) {
      case 0:
        editPayment(row);
        break;
      case 1:
        deletePayment(row);
        break;
      case 2:
        viewPayment(row);
        break;
    }
  }

  const columns: any = [
    {
      'Header': 'Vendor',
      'accessor': (originalRow: any) => originalRow.payedPerson.vendor,
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
      'accessor': (originalRow: any) =>
        originalRow.note ?
          (originalRow.note.length < 100 ? originalRow.note : originalRow.note.substring(0, 100)+'...')
          : '',
      'sortable': true,
      'className': classes.tableCellWrap,
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
    return <BCDateRangePicker range={selectionRange} onChange={setSelectionRange} />
  }

  function renderMenu () {
    return (
      <BCItemsFilter
        items={contractors.map((item: Contractor) => ({id: item._id, value: item.vendor}))}
        selected={selectedIDs}
        single={true}
        onApply={setSelectedIDs}
        />
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
      //onRowClick={handleRowClick}
      search
      searchPlaceholder = 'Search...'
      setPage={setCurrentPage}
      tableData={filteredPayments}
      toolbarPositionLeft={true}
      toolbar={[renderMenu(), renderDateRangePicker()].map((tool:any, idx:number) => <React.Fragment key={idx}>{tool}</React.Fragment>)}
    />
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(PastPayments);
