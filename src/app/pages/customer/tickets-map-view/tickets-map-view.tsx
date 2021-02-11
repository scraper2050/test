import BCTabs from '../../../components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import styles from './ticket-map-view.style';
import { Grid, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../scss/index.css';
import BCMapWithMarkerList from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';
import { formatDateYMD } from 'helpers/format';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { refreshServiceTickets, setOpenServiceTicket, setOpenServiceTicketObject, setClearOpenServiceTicketObject, setClearOpenTicketFilterState, setOpenServiceTicketLoading, setOpenTicketFilterState } from 'actions/service-ticket/service-ticket.action';
import { getOpenServiceTickets } from 'api/service-tickets.api';
import Pagination from '@material-ui/lab/Pagination';
import { DatePicker } from "@material-ui/pickers";
import BCMapFilterModal from '../../../modals/bc-map-filter/bc-map-filter-popup';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import "./ticket-map-view.scss";
import { info } from 'actions/snackbar/snackbar.action'

function TicketsWithMapView({ classes }: any) {
  const dispatch = useDispatch();
  const openTickets = useSelector((state: any) => state.serviceTicket.openTickets);
  const totalOpenTickets = useSelector((state: any) => state.serviceTicket.totalOpenTickets);
  const openServiceTicketFIlter = useSelector((state: any) => state.serviceTicket.filterTicketState);
  const isLoading = useSelector((state: any) => state.serviceTicket.isLoading);
  const [page, setPage] = useState(1);
  const [curTab, setCurTab] = useState(0);
  const [dateValue, setDateValue] = useState<any>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempDate, setTempDate] = useState<any>(new Date());


  useEffect(() => {
    const rawData = {
      jobTypeTitle: '',
      dueDate: '',
      customerNames: '',
      ticketId: ''
    }
    const requestObj = { ...rawData, pageNo: 1, pageSize: 6 };
    getOpenTickets(requestObj);
    dispatch(setClearOpenServiceTicketObject());
  }, []);

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

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const dateChangeHandler = (date: string) => {

    const dateObj = new Date(date);
    let rawData = {
      jobTypeTitle: '',
      dueDate: '',
      customerNames: '',
      ticketId: ''
    }
    const formattedDate = formatDateYMD(dateObj);
    setDateValue(dateObj);
    setTempDate(date);
    dispatch(setClearOpenTicketFilterState(rawData));
    const requestObj = { ...rawData, pageNo: 1, pageSize: 6, dueDate: formattedDate };
    dispatch(setOpenTicketFilterState({ ...rawData, dueDate: formattedDate }));
    getOpenTickets(requestObj);

  };

  const handleButtonClickPlusDay = () => {
    let rawData = {
      jobTypeTitle: '',
      dueDate: '',
      customerNames: '',
      ticketId: ''
    }
    dispatch(setClearOpenServiceTicketObject());
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

  const handleButtonClickMinusDay = () => {
    let rawData = {
      jobTypeTitle: '',
      dueDate: '',
      customerNames: '',
      ticketId: ''
    }
    dispatch(setClearOpenServiceTicketObject());
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
      'ticketId': ''
    }));
    const requestObj = { ...openServiceTicketFIlter, pageNo: 1, pageSize: 6, dueDate: formattedDate };
    dispatch(setOpenTicketFilterState({ ...rawData, dueDate: formattedDate }));
    getOpenTickets(requestObj);
  }

  const handleChange = (event: any, value: any) => {
    setPage(value);
    dispatch(setClearOpenServiceTicketObject());
    const requestObj = { ...openServiceTicketFIlter, pageNo: value, pageSize: 6 };
    getOpenTickets(requestObj);
  }

  const openTicketFilerModal = () => {
    setShowFilterModal(!showFilterModal);
  }

  const resetDate = () => {
    setDateValue(null);
    setTempDate(new Date());
  }

  const resetDateFilter = () => {
    setPage(1);
    setDateValue(null);
    dispatch(setClearOpenServiceTicketObject());
    dispatch(setClearOpenTicketFilterState({
      'jobTypeTitle': '',
      'dueDate': '',
      'customerNames': '',
      'ticketId': ''
    }));
    getOpenTickets({ pageNo: 1, pageSize: 6 })
  }

  useEffect(() => {
    let prevItemKey = localStorage.getItem('prevItemKey');
    if (prevItemKey) {
      let prevItem = document.getElementById(prevItemKey);
      if (prevItem)
        prevItem.style.border = 'none';
    }
    localStorage.setItem('prevItemKey', '');
  })

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

    if (openTicketObj.jobLocation === undefined && openTicketObj.customer.location.coordinates.length === 0) {
      dispatch(info('Kindly check job location / customer location.'))
    }

    dispatch(setClearOpenServiceTicketObject());
    dispatch(setOpenServiceTicketObject(openTicketObj));
  }

  //removing the first element: this first element needs to be deleted from the backend
  let openTicketsClone = [...openTickets];

  // if (!dateValue) {

  //   openTicketsClone.shift();
  // }

  if (isLoading) {
    return <BCCircularLoader heightValue={'200px'} />
  }
  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
          <BCTabs
            curTab={curTab}
            indicatorColor={'primary'}
            onChangeTab={handleTabChange}
            tabsData={[
              {
                'label': 'Open Tickets',
                'value': 0
              },
              {
                'label': 'Scheduled Jobs',
                'value': 1
              }
            ]}
          />
          <SwipeableViews index={curTab}>
            <div
              className={classes.dataContainer}
              hidden={curTab !== 0}
              id={'0'}>
              <Grid container item lg={12} >
                <Grid container item lg={6} className='ticketsMapContainer'>
                  {
                    <BCMapWithMarkerList
                      ticketList={openTickets}
                    />
                  }
                </Grid>
                <Grid container item lg={6} >
                  <div className='ticketsFilterContainer'>

                    <div className='filter_wrapper'>
                      <button onClick={() => openTicketFilerModal()}>  <i className="material-icons" >filter_list</i> <span>Filter</span></button>
                      {showFilterModal ? <div className="dropdown_wrapper"><BCMapFilterModal openTicketFilerModal={openTicketFilerModal} resetDate={resetDate} /></div> : null}
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
                      openTicketsClone.map((x: any, i: any) => (
                        <div className={'ticketItemDiv'} key={i} onClick={() => handleOpenTicketCardClick(x, i)} id={`openTicket${i}`}>
                          <div className="ticket_title">
                            <h3>{x.customer && x.customer.profile && x.customer.profile.displayName ? x.customer.profile.displayName : ''}</h3>
                          </div>
                          <div className="card_location">
                            <h4>{x.company && x.company.info ? x.company.info.companyName : ''}</h4>
                          </div>

                          <div className="card_desc">
                            <p>{x.jobType ? x.jobType.title : ''}</p>
                          </div>
                          <hr></hr>
                          <div className="card-footer">
                            <span>  <i className="material-icons">access_time</i>{x.dueDate ? new Date(x.dueDate).toString().substr(0, 15) : ''}</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <Pagination count={Math.ceil(totalOpenTickets / 6)} color="primary" onChange={handleChange} showFirstButton page={page}
                    showLastButton />
                </Grid>
              </Grid>
            </div>
            <div
              hidden={curTab !== 1}
              id={'1'}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                />
              </Grid>
            </div>
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(TicketsWithMapView);