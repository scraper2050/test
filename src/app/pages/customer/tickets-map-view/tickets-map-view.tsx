import BCTabs from '../../../components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import styles from './ticket-map-view.style';
import { Grid, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../scss/index.css';
import BCMapWithMarkerList from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';
import { formatDateYMD } from 'helpers/format';
import BCDateTimePicker from 'app/components/bc-date-time-picker/bc-date-time-picker';
import { openModalAction, closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { refreshServiceTickets, setOpenServiceTicket, setOpenServiceTicketObject, setClearOpenServiceTicketObject, setClearOpenTicketFilterState } from 'actions/service-ticket/service-ticket.action';
import { getOpenServiceTickets } from 'api/service-tickets.api';
import { modalTypes } from '../../../../constants';
import Pagination from '@material-ui/lab/Pagination';
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";

function TicketsWithMapView({ classes }: any) {
  const dispatch = useDispatch();
  const openTickets = useSelector((state: any) => state.serviceTicket.openTickets);
  const totalOpenTickets = useSelector((state:any) => state.serviceTicket.totalOpenTickets);
  const openServiceTicketFIlter = useSelector((state:any) => state.serviceTicket.filterTicketState);
  const [page, setPage] = useState(1);
  const [curTab, setCurTab] = useState(0);
  const [dateValue, setDateValue] = useState<any>(null)

  useEffect(() => {
    const requestObj = { ...openServiceTicketFIlter,  pageNo: 1, pageSize: 6};
    getOpenTickets(requestObj);
  }, []);

  const formatRequestObj = (rawReqObj: any) => {
    for (let key in rawReqObj) {
      if (rawReqObj[key] === '' || rawReqObj[key] === null || rawReqObj[key].length === 0) {
        delete rawReqObj[key];
      }
    }
    return rawReqObj;
  }

  const getOpenTickets = (requestObj: {
    pageNo?: number,
    pageSize?: number,
    jobTypeTitle?: string,
    dueDate?: string,
    customerNames?: [],
    ticketId?: string,
    companyId?: string
  }) => {
    getOpenServiceTickets(requestObj).then((response: any) => {
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
    const formattedDate = formatDateYMD(dateObj);
    setDateValue(dateObj);
    dispatch(setClearOpenTicketFilterState({
      'jobTypeTitle': '',
      'dueDate': '',
      'customerNames': '',
      'ticketId': ''
    }));
    const requestObj = { ...openServiceTicketFIlter, pageNo: 1, pageSize: 6, dueDate: formattedDate };
    getOpenTickets(requestObj);

  };

  const openTicketFilerModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': '',
        'removeFooter': false
      },
      'type': modalTypes.SHOW_MAP_FILTER_POPUP
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  }

  const resetDateFilter = () => {
    setPage(1);
    setDateValue(null);
    dispatch(setClearOpenServiceTicketObject());
    dispatch(setClearOpenTicketFilterState({
      'jobTypeTitle': '',
      'dueDate':'',
      'customerNames':'',
      'ticketId':''
    }));
    getOpenTickets({pageNo: 1, pageSize: 6})
  }

  const handleChange = (event: any, value: any) => {
    setPage(value);
    const requestObj = { ...openServiceTicketFIlter,  pageNo: value, pageSize: 6};
    getOpenTickets(requestObj);
  }

  useEffect(()=> {
    let prevItemKey = localStorage.getItem('prevItemKey');
    if(prevItemKey){
      let prevItem = document.getElementById(prevItemKey);
      if(prevItem)
        prevItem.style.border = 'none';
    }
    localStorage.setItem('prevItemKey', '');
  })

  const handleOpenTicketCardClick = (openTicketObj: any, index:any) => {
    let prevItemKey = localStorage.getItem('prevItemKey');
    let currentItem = document.getElementById(`openTicket${index}`);
    if(prevItemKey){
      let prevItem = document.getElementById(prevItemKey);
      if(prevItem)
        prevItem.style.border = 'none';
      if(currentItem){
        currentItem.style.border = '1px solid blue';
        localStorage.setItem('prevItemKey',`openTicket${index}` )
      }
    } else{
      if(currentItem){
        currentItem.style.border = '1px solid blue';
        localStorage.setItem('prevItemKey',`openTicket${index}` )
      }
    }
    
   
    dispatch(setClearOpenServiceTicketObject());
    dispatch(setOpenServiceTicketObject(openTicketObj));
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
                      lat={-36}
                      lng={-92}
                    />
                  }
                </Grid>
                <Grid container item lg={6} >
                  <div className='ticketsFilterContainer'>

                    <span onClick={() => openTicketFilerModal()}>Filter</span>
                    <span>
                      {/* <BCDateTimePicker
                        disablePast
                        handleChange={dateChangeHandler}
                        value={dateValue}
                        className='serviceTicketLabel'
                        name={'scheduleDate'}></BCDateTimePicker> */}
                         <DatePicker
                          autoOk
                          className={classes.picker}
                          disablePast={true}
                          format={'d MMM yyyy'}
                          id={`datepicker-${'scheduleDate'}`}
                          inputProps={{
                            'name': 'scheduleDate',
                            'placeholder': 'Due Date',
                          }}
                          inputVariant={'outlined'}
                          name={'scheduleDate'}
                          onChange={(e:any) => dateChangeHandler(e)}
                          required={false}
                          value={dateValue}
                          variant={'inline'}
                       />
                    </span>
                    <span onClick={() => resetDateFilter()}>Rest</span>
                  </div>
                  <div className='ticketsCardViewContainer'>


                    {
                      openTickets.map((x: any, i: any) => (
                        <div className={'ticketItemDiv'} key={i} onClick={() => handleOpenTicketCardClick(x, i)} id={`openTicket${i}`} >
                          <div>
                            <span>{x.customer && x.customer.profile && x.customer.profile.displayName ? x.customer.profile.displayName : ''}</span>
                          </div>
                          <div>
                            <span>{ x.company &&  x.company.info  ? x.company.info.companyName : ''}</span>
                          </div>
                          <hr></hr>
                          <div>
                            <span>{x.jobType ? x.jobType.title : ''}</span>
                          </div>
                          <div>
                            <span>{x.dueDate ? new Date(x.dueDate).toString().substr(0, 15) : '' }</span>
                          </div>
                        </div>
                      ))
                    }
                    <Pagination count={Math.ceil(totalOpenTickets/6)} color="primary" onChange={handleChange} showFirstButton  page={page}
                      showLastButton />
                  </div>
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