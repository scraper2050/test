import React, {useEffect, useState, useRef} from 'react';
import {Button, withStyles} from "@material-ui/core";
import styles from './view-more.styles';
import {useLocation} from "react-router-dom";
import BCTableContainer
  from "../../../../components/bc-table-container/bc-table-container";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BCMenuButton from "../../../../components/bc-menu-more";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker  } from 'react-date-range';
import {ReactComponent as IconCalendar} from "../../../../../assets/img/icons/map/icon-calendar.svg";
import {formatShortDate} from "../../../../../helpers/format";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import Popper from "@material-ui/core/Popper";
// import './picker.css';


interface Props {
  classes: any;
  /*profile: {
    companyName?: string;
  }
  back: () => void;*/
}

const ITEMS = [
  {id: 0, title:'Edit'},
  {id: 1, title:'Delete'},
]

function VendorPayment({classes}: Props) {
  const [tableData, setTableData] = useState<any[]>([]);
  const [showDateRangePicker, setDateRangePicker] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const location = useLocation<any>();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const locationState = location.state;
  const prevPage = locationState && locationState.prevPage ? locationState.prevPage : null;

  const [currentPage, setCurrentPage] = useState({
    'page': prevPage ? prevPage.page : 0,
    'pageSize': prevPage ? prevPage.pageSize : 10,
    'sortBy': prevPage ? prevPage.sortBy : []
  });
  useEffect(() => {
    getData();
  }, []);


  const getData = () => {
    const tempData = [{
      vendorName: 'Test Vendor',
      paymentDate: '2022-02-17',
      amount: 130,
      method: 'ACH',
      reference: '44444444444444',
      notes: 'Yes no, yes no, yes no'
    },{
      vendorName: 'Test Vendor',
      paymentDate: '2022-02-16',
      amount: 130,
      method: 'ACH',
      reference: '44444444444444',
      notes: 'Yes no, yes no, yes no'
    },{
      vendorName: 'Test Vendor',
      paymentDate: '2022-02-15',
      amount: 130,
      method: 'ACH',
      reference: '44444444444444',
      notes: 'Yes no, yes no, yes no'
    },{
      vendorName: 'Test Vendor',
      paymentDate: '2022-02-14',
      amount: 130,
      method: 'ACH',
      reference: '44444444444444',
      notes: 'Yes no, yes no, yes no'
    },
    ];
    setTableData(tempData);
    setSelectionRange({
      startDate: new Date(tempData[tempData.length - 1].paymentDate),
      endDate: new Date(tempData[0].paymentDate),
    })
  }

  const handleMenuButtonClick = (event: any, id: number, row:any) => {
    event.stopPropagation();
  }

  const columns: any = [
    {
      'Header': 'Vendor',
      'accessor': 'vendorName',
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Payment Date',
      'accessor': 'paymentDate',
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Amount',
      'accessor': 'amount',
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Method',
      'accessor': 'method',
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Reference No.',
      'accessor': 'reference',
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

  const handleSelect = (date: any) => {
    console.log({date})
    setSelectionRange(date.range1 || date);
    // setDateRangePicker(false);
  }

  function renderDateRangePicker () {
    return (
      <div
        className={classes.rangePickerContainer}
      >
        <Button
          ref={buttonRef}
          variant={'outlined'}
          className={classes.rangePickerButton}
          startIcon={<IconCalendar />}
          onClick={(e) => setDateRangePicker(!showDateRangePicker)}
        >
          {formatShortDate(selectionRange.startDate)} - {formatShortDate(selectionRange.endDate)}
        </Button>
      </div>
    )
  }




  return (
    <div style={{height: '100%'}}>
    <Popper
      className={classes.rangePickerPopup}
      open={showDateRangePicker}
      anchorEl={buttonRef.current}
      role={undefined} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Fade timeout={500}
          {...TransitionProps}
        >
          <Paper>
            <ClickAwayListener onClickAway={() => setDateRangePicker(false)}>
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                // moveRangeOnFirstSelection={true}
                // retainEndDateOnFirstSelection={true}
                months={2}
                direction={'horizontal'}
              />
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>

    <BCTableContainer
      columns={columns}
      currentPage={currentPage}
      //isLoading={vendors.loading}
      //onRowClick={handleRowClick}
      search
      searchPlaceholder = 'Search Payments...'
      setPage={setCurrentPage}
      tableData={tableData}
      toolbarPositionLeft={true}
      toolbar={renderDateRangePicker()}
    />
  </div>
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(VendorPayment);
