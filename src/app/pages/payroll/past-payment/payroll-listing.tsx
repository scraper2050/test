import React, {useEffect, useState, useRef} from 'react';
import {
  Button,
  withStyles
} from "@material-ui/core";
import styles from './payroll.styles';
import {useLocation} from "react-router-dom";
import BCTableContainer  from "../../../components/bc-table-container/bc-table-container";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BCMenuButton from "../../../components/bc-menu-more";
import {
  openModalAction,
  setModalDataAction
} from "../../../../actions/bc-modal/bc-modal.action";
import {modalTypes} from "../../../../constants";
import {useDispatch} from "react-redux";
import {
  formatCurrency,

  formatShortDateNoDay
} from "../../../../helpers/format";
import BCDateRangePicker
  from "../../../components/bc-date-range-picker/bc-date-range-picker";
import {HighlightOff} from "@material-ui/icons";
import BCItemsFilter from "../../../components/bc-items-filter/bc-items-filter";

interface Props {
  classes: any;
}

const ITEMS = [
  {id: 0, title:'Edit Commisssion'},
  {id: 1, title:'Payment History'},
]

const TEMP_DATA = [{
  _id: '1',
  vendorName: 'Test Vendor 1',
  totalAmount: 325.33,
  dueDate: new Date(),
},{
  _id: '2',
  vendorName: 'Test Vendor 2',
  totalAmount: 20,
  dueDate: new Date(),
},{
  _id: '3',
  vendorName: 'Test Vendor 3',
  totalAmount: 3500,
  dueDate: new Date(),
},{
  _id: '4',
  vendorName: 'Test Vendor 4',
  totalAmount: 1500,
  dueDate: new Date(),
},
];

function Payroll({classes}: Props) {
  const dispatch = useDispatch();
  const location = useLocation<any>();
  const locationState = location.state;
  const prevPage = locationState && locationState.prevPage ? locationState.prevPage : null;
  const [tableData, setTableData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState({
    'page': prevPage ? prevPage.page : 0,
    'pageSize': prevPage ? prevPage.pageSize : 10,
    'sortBy': prevPage ? prevPage.sortBy : []
  });
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [selectedIDs, setSelectedIDs] = useState<string[]>([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setTableData(selectedIDs.length > 0 ?
      TEMP_DATA.filter((item: any) => selectedIDs.indexOf(item._id) >=0) : TEMP_DATA);
  }, [selectedIDs])


  const editCommission = (vendor: any) => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Edit Commission',
        'vendorCommission': vendor,
      },
      'type': modalTypes.EDIT_COMMISSION_MODAL
    }));

    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  }

  const getData = () => {
    setTableData(TEMP_DATA);
  }

  const handleMenuButtonClick = (event: any, id: number, row:any) => {
    event.stopPropagation();
    switch (id) {
      case 0:
        editCommission(row);
        break;
    }
  }

  const columns: any = [
    {
      'Header': 'Vendor',
      'accessor': 'vendorName',
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Total Amount',
      'accessor': (originalRow: any, rowIndex: number) => formatCurrency(originalRow.totalAmount),
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Due Date',
      'accessor': (originalRow: any, rowIndex: number) => formatShortDateNoDay(originalRow.dueDate),
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
    return tableData.length > 0 ? (
      <BCDateRangePicker
        range={selectionRange}
        onChange={setSelectionRange}
    />) : null;
  }

  function renderMenu () {
    return (
      <BCItemsFilter
        items={TEMP_DATA.map((item) => ({id: item._id, value: item.vendorName}))}
        selected={selectedIDs}
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
      //isLoading={vendors.loading}
      //onRowClick={handleRowClick}
      search
      searchPlaceholder = 'Search Vendor...'
      setPage={setCurrentPage}
      tableData={tableData}
      toolbarPositionLeft={true}
      toolbar={[renderMenu(), renderDateRangePicker(), renderClearFilterButton()]}
    />
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(Payroll);
