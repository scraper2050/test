import React, { useState, useEffect } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';
import { useDispatch, useSelector } from 'react-redux';
import BCMapFilterModal from '../../../../modals/bc-map-filter/bc-map-filter-popup';
import { DatePicker } from "@material-ui/pickers";
import {
  refreshServiceTickets,
  setOpenServiceTicket,
  setOpenServiceTicketObject,
  setClearOpenServiceTicketObject,
  setClearOpenTicketFilterState,
  setOpenServiceTicketLoading,
  setOpenTicketFilterState
} from 'actions/service-ticket/service-ticket.action';
import { getOpenServiceTickets } from 'api/service-tickets.api';
import { formatDateYMD } from 'helpers/format';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import Pagination from '@material-ui/lab/Pagination';
import { info, warning } from 'actions/snackbar/snackbar.action';
import "../ticket-map-view.scss";
import '../../../../../scss/index.css';
import styles from '../ticket-map-view.style';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';

function MapViewTicketsScreen({ classes }: any) {

  const dispatch = useDispatch();
  const openTickets = useSelector((state: any) => state.serviceTicket.openTickets);
  const totalOpenTickets = useSelector((state: any) => state.serviceTicket.totalOpenTickets);
  const openServiceTicketFIlter = useSelector((state: any) => state.serviceTicket.filterTicketState);
  const isLoading = useSelector((state: any) => state.serviceTicket.isLoading);
  const [selectedTicket, setSelectedTicket] = useState<any>({});

  const [dateValue, setDateValue] = useState<any>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempDate, setTempDate] = useState<any>(new Date());
  const [page, setPage] = useState(1);
  const [hasPhoto, setHasPhoto] = useState(false);

  useEffect(() => {
    const rawData = {
      jobTypeTitle: '',
      dueDate: '',
      customerNames: '',
      ticketId: '',
      contactName: '',
    }
    const requestObj = { ...rawData, pageNo: 1, pageSize: 6 };
    getOpenTickets(requestObj);
    setSelectedTicket({});
  }, []);

  const openTicketFilerModal = () => {
    setShowFilterModal(!showFilterModal);
  }

  const resetDate = () => {
    setDateValue(null);
    setTempDate(new Date());
  }


  const handleButtonClickMinusDay = () => {
    let rawData = {
      jobTypeTitle: '',
      dueDate: '',
      customerNames: '',
      ticketId: '',
      contactName: '',
    }
    setSelectedTicket({})
    const dateObj = new Date(tempDate);
    // const selectDate = dateObj.setHours(0,0,0,0);
    // const todayDate = new Date().setHours(0,0,0,0);
    var yesterday = new Date(dateObj.getTime() - (24 * 60 * 60 * 1000));
    const formattedDate = formatDateYMD(yesterday);
    setDateValue(formattedDate);
    setTempDate(yesterday);
    dispatch(setClearOpenTicketFilterState({
      'jobTypeTitle': '',
      'dueDate': '',
      'customerNames': '',
      'ticketId': '',
      'contactName': '',
    }));
    const requestObj = { ...openServiceTicketFIlter, pageNo: 1, pageSize: 6, dueDate: formattedDate };
    dispatch(setOpenTicketFilterState({ ...rawData, dueDate: formattedDate }));
    getOpenTickets(requestObj);
  }

  const handleButtonClickPlusDay = () => {
    let rawData = {
      jobTypeTitle: '',
      dueDate: '',
      customerNames: '',
      ticketId: '',
      contactName: '',
    }

    setSelectedTicket({})
    const dateObj = new Date(tempDate);
    var tomorrow = new Date(dateObj.getTime() + (24 * 60 * 60 * 1000));
    const formattedDate = formatDateYMD(tomorrow);

    setDateValue(formattedDate);
    setTempDate(tomorrow);
    dispatch(setClearOpenTicketFilterState(rawData));
    const requestObj = { ...openServiceTicketFIlter, pageNo: 1, pageSize: 6, dueDate: formattedDate };
    dispatch(setOpenTicketFilterState({ ...rawData, dueDate: formattedDate }));
    getOpenTickets(requestObj);
  }

  const getOpenTickets = (requestObj: {
    pageNo?: number,
    pageSize?: number,
    jobTypeTitle?: string,
    dueDate?: string,
    customerNames?: any,
    ticketId?: string,
    companyId?: string
  }) => {
    dispatch(setOpenServiceTicketLoading(true));
    getOpenServiceTickets(requestObj).then((response: any) => {
      dispatch(setOpenServiceTicketLoading(false));
      dispatch(setOpenServiceTicket(response));
      dispatch(refreshServiceTickets(true));
      dispatch(closeModalAction());
      setTimeout(() => {
        dispatch(setModalDataAction({
          'data': {},
          'type': ''
        }));
      }, 200);
    })
      .catch((err: any) => {
        throw err;
      });
  }


  const dateChangeHandler = (date: string) => {
    const dateObj = new Date(date);
    let rawData = {
      jobTypeTitle: '',
      dueDate: '',
      customerNames: '',
      ticketId: '',
      contactName: '',
    }
    const formattedDate = formatDateYMD(dateObj);
    setDateValue(dateObj);
    setTempDate(date);
    dispatch(setClearOpenTicketFilterState(rawData));
    const requestObj = { ...rawData, pageNo: 1, pageSize: 6, dueDate: formattedDate };
    dispatch(setOpenTicketFilterState({ ...rawData, dueDate: formattedDate }));
    getOpenTickets(requestObj);
  };

  const resetDateFilter = () => {
    setPage(1);
    setDateValue(null);
    setSelectedTicket({});
    dispatch(setClearOpenTicketFilterState({
      'jobTypeTitle': '',
      'dueDate': '',
      'customerNames': '',
      'ticketId': '',
      'contactName': ''
    }));
    getOpenTickets({ pageNo: 1, pageSize: 6 })
  }


  const handleChange = (event: any, value: any) => {
    setSelectedTicket({});
    setPage(value);


    const requestObj = { ...openServiceTicketFIlter, pageNo: value, pageSize: 6 };
    getOpenTickets(requestObj);
  }

  const handleOpenTicketCardClick = (openTicketObj: any, index: any) => {
    let prevItemKey = localStorage.getItem('prevItemKey');
    let currentItem = document.getElementById(`openTicket${index}`);
    if (prevItemKey) {
      let prevItem = document.getElementById(prevItemKey);
      if (prevItem)
        prevItem.style.border = 'none';
      if (currentItem) {
        currentItem.style.border = `1px solid #00aaff`;
        localStorage.setItem('prevItemKey', `openTicket${index}`)
      }
    } else {
      if (currentItem) {
        currentItem.style.border = `1px solid #00aaff`;
        localStorage.setItem('prevItemKey', `openTicket${index}`)
      }
    }

    if (openTicketObj.image) {
      setHasPhoto(true)
    } else {
      setHasPhoto(false)
    }

    if (!openTicketObj.jobLocation || openTicketObj.jobLocation === undefined && openTicketObj.customer.location.coordinates.length === 0) {
      dispatch(warning('There\'s no address on this ticket.'))
    }



    setSelectedTicket(openTicketObj);
  }

  useEffect(() => {
    let prevItemKey = localStorage.getItem('prevItemKey');
    if (prevItemKey) {
      let prevItem = document.getElementById(prevItemKey);
      if (prevItem)
        prevItem.style.border = 'none';
    }
    localStorage.setItem('prevItemKey', '');
  }, [])

  let openTicketsClone = [...openTickets];

  if (isLoading) {
    return <BCCircularLoader heightValue={'200px'} />
  }

  return (
    <Grid container item lg={12} >
      <Grid container item lg={6} className='ticketsMapContainer'>
        {
          <MemoizedMap
            list={openTicketsClone}
            selected={selectedTicket}
            hasPhoto={hasPhoto}
          />
        }
      </Grid>
      <Grid container item lg={6} >
        <div className='ticketsFilterContainer'>
          <div className='filter_wrapper'>
            <button onClick={() => openTicketFilerModal()}>  <i className="material-icons" >filter_list</i> <span>Filter</span></button>
            {showFilterModal ? <div className="dropdown_wrapper elevation-5"><BCMapFilterModal openTicketFilerModal={openTicketFilerModal} resetDate={resetDate} /></div> : null}
          </div>
          <span className={`${dateValue == null ? 'datepicker_wrapper datepicker_wrapper_default' : 'datepicker_wrapper'}`}>
            <button className="prev_btn"><i className="material-icons" onClick={() => handleButtonClickMinusDay()}>keyboard_arrow_left</i></button>
            <DatePicker
              autoOk
              className={classes.picker}
              disablePast={false}
              format={'d MMM yyyy'}
              id={`datepicker-${'scheduleDate'}`}
              inputProps={{
                'name': 'scheduleDate',
                'placeholder': 'Due Date',
              }}
              inputVariant={'outlined'}
              name={'scheduleDate'}
              onChange={(e: any) => dateChangeHandler(e)}
              required={false}
              value={dateValue}
              variant={'inline'}
            />
            <button className="next_btn"><i className="material-icons" onClick={() => handleButtonClickPlusDay()}>keyboard_arrow_right</i></button>
          </span>
          <button onClick={() => resetDateFilter()}><i className="material-icons">undo</i> <span>Reset</span></button>
        </div>
        <div className='ticketsCardViewContainer'>
          {
            openTickets.map((x: any, i: any) => (
              <div className={'ticketItemDiv'} key={i} onClick={() => { setSelectedTicket({}); handleOpenTicketCardClick(x, i) }} id={`openTicket${i}`}>
                <div className="ticket_title">
                  <h3>{x.customer && x.customer.profile && x.customer.profile.displayName ? x.customer.profile.displayName : ''}</h3>
                </div>
                <div className="location_desc_container">
                  <div className="card_location">
                    <h4>{x.jobLocation && x.jobLocation.name ? x.jobLocation.name : ` `}</h4>
                  </div>
                  {/* <div className="card_location">
                <h4>{x.company && x.company.info ? x.company.info.companyName : ''}</h4>
              </div> */}

                  <div className="card_desc">
                    <p>{x.jobType ? x.jobType.title : ''}</p>
                  </div>
                </div>
                <hr></hr>
                <div className="card-footer">
                  <span>  <i className="material-icons">access_time</i>{x.dueDate ? new Date(x.dueDate).toString().substr(0, 15) : ''}</span>
                </div>
              </div>
            ))
          }
        </div>
        <Pagination count={Math.ceil(totalOpenTickets / 6)} color="primary" onClick={() => setSelectedTicket({})} onChange={handleChange} showFirstButton page={page}
          showLastButton />
      </Grid>
    </Grid >
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(MapViewTicketsScreen);