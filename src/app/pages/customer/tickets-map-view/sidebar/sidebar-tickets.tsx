import React, { useEffect, useState } from 'react';
import moment from 'moment';
import classnames from "classnames";
import Box from '@material-ui/core/Box';
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Drawer from '@material-ui/core/Drawer';
import RoomIcon from '@material-ui/icons/Room';
import { DatePicker } from '@material-ui/pickers';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { createStyles, withStyles, makeStyles } from '@material-ui/core/styles';

import {
  closeModalAction,
  openModalAction,
  setModalDataAction,
} from 'actions/bc-modal/bc-modal.action';
import {
  refreshServiceTickets,
  setOpenServiceTicket,
  setClearOpenTicketFilterState,
  setOpenServiceTicketLoading,
  setOpenTicketFilterState,
  setSelectedCustomers,
} from 'actions/service-ticket/service-ticket.action';
import styles from './sidebar.styles';
import { formatDateYMD } from 'helpers/format';
import { getCustomerDetail } from 'api/customer.api';
import { warning } from 'actions/snackbar/snackbar.action';
import { getCustomers } from 'actions/customer/customer.action';
import { getOpenServiceTickets } from 'api/service-tickets.api';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import BCMapFilterModal from '../../../../modals/bc-map-filter/bc-map-filter-jobs-popup/bc-map-filter-jobs-popup';
import * as CONSTANTS from "../../../../../constants";
import { Job } from '../../../../../actions/job/job.types';

import { ReactComponent as IconFunnel } from 'assets/img/icons/map/icon-funnel.svg';
import { ReactComponent as IconCalendar } from 'assets/img/icons/map/icon-calendar.svg';

interface SidebarTicketsProps {
  classes: any;
  onSelectedTicket: (obj: any) => void;
}

const useStyles = makeStyles(theme => ({
  fab: {
    zIndex: 1101,
    minHeight: 'unset',
    width: theme.spacing(3.5),
    borderRadius: '8px 0 0 8px',
    boxShadow: 'rgb(0 0 0 / 30%) 0px 1px 4px -1px;',
    backgroundColor: CONSTANTS.ADMIN_SIDEBAR_TOGGLE_BG
  },
  funnel: {
    minHeight: 'unset',
    height: theme.spacing(5),
    minWidth: theme.spacing(5),
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    height: '40px',
    marginRight: '4px',
    borderRadius: '8px',
    border: '1px solid #E0E0E0',
  },
}));

const useSidebarStyles = makeStyles(theme =>
  createStyles({
    drawer: {
      height: 'calc(100vh - 125px)',
      zIndex: 1099,
      width: CONSTANTS.ADMIN_MAP_SIDEBAR_WIDTH,
    },
    drawerOpen: {
      width: CONSTANTS.ADMIN_MAP_SIDEBAR_WIDTH,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      display: 'none',
      overflowX: 'hidden',
    },
  }),
);

const PAGE_SIZE = 6;

function SidebarTickets({ classes, onSelectedTicket }: SidebarTicketsProps) {
  const mapStyles = useStyles();
  const dispatch = useDispatch();
  const sidebarStyles = useSidebarStyles();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filterJobs, setFilterJobs] = useState({
    'customerNames': '',
    'jobId': '',
    'schedule_date': ''
  });
  const [hasPhoto, setHasPhoto] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [dateValue, setDateValue] = useState<any>(null);
  const [tempDate, setTempDate] = useState<any>(new Date());
  const [paginatedJobs, setPaginatedJobs] = useState<any>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showPagination, setShowPagination] = useState(true);
  const totalOpenTickets = useSelector(
    (state: any) => state.serviceTicket.totalOpenTickets
  );
  const openTickets = useSelector(
    (state: any) => state.serviceTicket.openTickets
  );
  const ticketFilterObject = useSelector(
    ({ serviceTicket }: any) => serviceTicket?.filterTicketState
  );
  const openServiceTicketFIlter = useSelector(
    (state: any) => state.serviceTicket.filterTicketState
  );
  const isLoading = useSelector((state: any) => state.serviceTicket.isLoading);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openTicketFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const dateChangeHandler = (date: string) => {
    const dateObj = new Date(date);
    const {
      jobTypeTitle,
      customerNames,
      ticketId,
      contactName,
    } = ticketFilterObject;
    let rawData = {
      jobTypeTitle: jobTypeTitle || "",
      // dueDate: '',
      customerNames: customerNames || "",
      ticketId: ticketId || "",
      contactName: contactName || "",
    };

    const formattedDate = formatDateYMD(dateObj);
    setDateValue(dateObj);
    setTempDate(date);
    // dispatch(setClearOpenTicketFilterState(rawData));
    const requestObj = {
      ...rawData,
      pageNo: 1,
      pageSize: PAGE_SIZE,
      dueDate: formattedDate,
    };
    dispatch(setOpenTicketFilterState({ ...rawData, dueDate: formattedDate }));
    getOpenTickets(requestObj);
  };

  const handleOpenTicketCardClick = (openTicketObj: any, index: any) => {
    console.log(`openTicketObj`, openTicketObj);
    console.log(`index`, index);
    let prevItemKey = localStorage.getItem("prevItemKey");
    let currentItem = document.getElementById(`openTicket${index}`);
    if (prevItemKey) {
      let prevItem = document.getElementById(prevItemKey);
      if (prevItem) prevItem.style.border = "none";
      if (currentItem) {
        currentItem.style.border = `1px solid #00aaff`;
        localStorage.setItem("prevItemKey", `openTicket${index}`);
      }
    } else {
      if (currentItem) {
        currentItem.style.border = `1px solid #00aaff`;
        localStorage.setItem("prevItemKey", `openTicket${index}`);
      }
    }

    if (openTicketObj.image) {
      setHasPhoto(true);
    } else {
      setHasPhoto(false);
    }

    if (
      !openTicketObj.jobLocation &&
      openTicketObj.customer.jobLocations.length === 0 &&
      (openTicketObj.jobLocation === undefined &&
        openTicketObj.customer.location.coordinates.length === 0) &&
      (openTicketObj.jobLocation === undefined &&
        openTicketObj.customer.address.zipCode.length === 0)
    ) {
      dispatch(warning("There's no address on this ticket."));
    }

    if (openTicketObj && !openTicketObj?.customer) {
      dispatch(warning("There's no customer associated with this ticket"));
    }

    onSelectedTicket(openTicketObj);
  };

  const handleChange = (event: any, value: any) => {
    onSelectedTicket({});
    setPage(value);

    const requestObj = {
      ...openServiceTicketFIlter,
      pageNo: value,
      pageSize: PAGE_SIZE,
    };
    getOpenTickets(requestObj);
  };

  const resetDateFilter = () => {
    setPage(1);
    setDateValue(null);
    setTempDate(new Date());
    onSelectedTicket({});
    dispatch(
      setClearOpenTicketFilterState({
        jobTypeTitle: "",
        dueDate: "",
        customerNames: "",
        ticketId: "",
        contactName: "",
      })
    );
    getOpenTickets({ pageNo: 1, pageSize: PAGE_SIZE });
    dispatch(setSelectedCustomers([]));
    setShowFilterModal(false);
  };

  const getOpenTickets = (requestObj: {
    pageNo?: number;
    pageSize?: number;
    jobTypeTitle?: string;
    dueDate?: string;
    customerNames?: any;
    ticketId?: string;
    companyId?: string;
  }) => {
    dispatch(setOpenServiceTicketLoading(true));
    getOpenServiceTickets(requestObj)
      .then((response: any) => {
        dispatch(setOpenServiceTicketLoading(false));
        dispatch(setOpenServiceTicket(response));
        dispatch(refreshServiceTickets(true));
        dispatch(closeModalAction());
        setTimeout(() => {
          dispatch(
            setModalDataAction({
              data: {},
              type: "",
            })
          );
        }, 200);
      })
      .catch((err: any) => {
        throw err;
      });
  };

  const handleClickAway = (event: any) => {
    const target = event.target;
    const isBody = (target as Element).nodeName === "BODY";

    if (!isBody) {
      openTicketFilterModal();
    }
  };

  const resetDate = () => {
    // setDateValue(null);
    // setTempDate(new Date());
  };

  const handleButtonClickMinusDay = () => {
    const {
      jobTypeTitle,
      customerNames,
      ticketId,
      contactName,
    } = ticketFilterObject;
    let rawData = {
      jobTypeTitle: jobTypeTitle || "",
      dueDate: "",
      customerNames: customerNames || "",
      ticketId: ticketId || "",
      contactName: contactName || "",
    };
    onSelectedTicket({});
    const dateObj = new Date(tempDate);
    // const selectDate = dateObj.setHours(0,0,0,0);
    // const todayDate = new Date().setHours(0,0,0,0);
    var yesterday = new Date(dateObj.getTime() - 24 * 60 * 60 * 1000);
    const formattedDate = formatDateYMD(yesterday);
    setDateValue(formattedDate);
    setTempDate(yesterday);
    // dispatch(setClearOpenTicketFilterState({
    //   'jobTypeTitle': '',
    //   'dueDate': '',
    //   'customerNames': '',
    //   'ticketId': '',
    //   'contactName': '',
    // }));
    const requestObj = {
      ...openServiceTicketFIlter,
      pageNo: 1,
      pageSize: PAGE_SIZE,
      dueDate: formattedDate,
    };
    dispatch(setOpenTicketFilterState({ ...rawData, dueDate: formattedDate }));
    getOpenTickets(requestObj);
  };

  const handleButtonClickPlusDay = () => {
    let rawData = {
      jobTypeTitle: "",
      dueDate: "",
      customerNames: "",
      ticketId: "",
      contactName: "",
    };

    onSelectedTicket({});
    const dateObj = new Date(tempDate);
    var tomorrow = new Date(dateObj.getTime() + 24 * 60 * 60 * 1000);
    const formattedDate = formatDateYMD(tomorrow);

    setDateValue(formattedDate);
    setTempDate(tomorrow);
    // dispatch(setClearOpenTicketFilterState(rawData));
    const requestObj = {
      ...openServiceTicketFIlter,
      pageNo: 1,
      pageSize: PAGE_SIZE,
      dueDate: formattedDate,
    };
    dispatch(setOpenTicketFilterState({ ...rawData, dueDate: formattedDate }));
    getOpenTickets(requestObj);
  };

  useEffect(() => {
    let rawData = {
      jobTypeTitle: "",
      dueDate: "",
      customerNames: "",
      ticketId: "",
      contactName: "",
    };
    const requestObj = { ...rawData, pageNo: 1, pageSize: PAGE_SIZE };
    dispatch(getCustomers());
    resetDateFilter();
    getOpenTickets(requestObj);
    onSelectedTicket({});

    console.log('11111111111111')
  }, []);

  // useEffect(() => {
  //   const rawData = {
  //     'customerNames': '',
  //     'jobId': '',
  //     'todaysJobs': 'true'
  //   };
  //   const requestObj = { ...rawData,
  //     'page': 1,
  //     'pageSize': PAGE_SIZE };
  //   getScheduledJobs(requestObj);
  // }, []);

  // useEffect(() => {
  //   const offset = (page - 1) * PAGE_SIZE;

  //   const paginatedItems = jobs.slice(offset).slice(0, PAGE_SIZE);

  //   setPaginatedJobs([...paginatedItems]);
  //   setTotalItems(jobs.length);
  // }, [jobs]);

  return (
    <>
      <Box
        position="absolute"
        top={76}
        right={open ? 290 : 0}
      >
        <Fab
          size="medium"
          className={mapStyles.fab}
          onClick={open ? handleDrawerClose : handleDrawerOpen}
        >
          {open
            ? <ChevronRightIcon style={{ fontSize: 20, color: CONSTANTS.SECONDARY_GREY }} />
            : <ChevronLeftIcon style={{ fontSize: 20, color: CONSTANTS.SECONDARY_GREY }}/>
          }

        </Fab>

      </Box>
      <Drawer
        open={open}
        anchor="right"
        PaperProps={{ style: { position: 'absolute' } }}
        BackdropProps={{ style: { position: 'absolute' } }}
        ModalProps={{
          container: document.getElementById('map-swipeable-open'),
          style: { position: 'absolute' }
        }}
        variant="persistent"
        onClose={handleDrawerClose}
        className={classnames(sidebarStyles.drawer, sidebarStyles.drawerOpen, {
          [sidebarStyles.drawerClose]: !open,
        })}
        classes={{
          paper: classnames(classes.bcSideBar, sidebarStyles.drawerOpen, {
            [sidebarStyles.drawerClose]: !open,
          }),
        }}
      >
        <Grid>
          <Grid
            container
            item
            lg={12}
          >
            <div className="ticketsFilterContainer">
              <div className="filter_wrapper">
                <span
                  className={`${
                    dateValue == null
                      ? "datepicker_wrapper datepicker_wrapper_default"
                      : "datepicker_wrapper"
                  }`}
                >
                  <button className="prev_btn">
                    <i
                      className="material-icons"
                      onClick={() => handleButtonClickMinusDay()}
                    >
                      keyboard_arrow_left
                    </i>
                  </button>
                  <DatePicker
                    autoOk
                    className={classes.picker}
                    disablePast={false}
                    format={"d MMM yyyy"}
                    id={`datepicker-${"scheduleDate"}`}
                    inputProps={{
                      name: "scheduleDate",
                      placeholder: "Due Date",
                    }}
                    inputVariant={"outlined"}
                    name={"scheduleDate"}
                    onChange={(e: any) => dateChangeHandler(e)}
                    required={false}
                    value={dateValue}
                    variant={"inline"}
                  />
                  <button className="next_btn">
                    <i
                      className="material-icons"
                      onClick={() => handleButtonClickPlusDay()}
                    >
                      keyboard_arrow_right
                    </i>
                  </button>
                </span>
                <Button className={mapStyles.funnel} onClick={() => openTicketFilterModal()}>
                  <IconFunnel />
                </Button>
                {showFilterModal ? (
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <div className="dropdown_wrapper elevation-5">
                      <BCMapFilterModal
                        openTicketFilterModal={openTicketFilterModal}
                        resetDate={resetDate}
                        // TODO: add here...
                      />
                    </div>
                  </ClickAwayListener>
                ) : null}
              </div>
            </div>
            <div className="ticketsCardViewContainer">
              {
                isLoading
                  ? <div style={{
                    'display': 'flex',
                    'width': '100%',
                    'justifyContent': 'center'
                  }}>
                    <BCCircularLoader heightValue={'200px'} />
                  </div>
                : openTickets.length
                  ? openTickets.map((x: any, i: any) => (
                    <div
                      className={"ticketItemDiv"}
                      key={i}
                      onClick={() => {
                        onSelectedTicket({});
                        handleOpenTicketCardClick(x, i);
                      }}
                      id={`openTicket${i}`}
                    >
                      {x?.customer === undefined ? (
                        <div className="button_wrapper">
                          test
                          {/* <EditIcon
                            className="editIcon"
                            color={"primary"}
                            fontSize={"small"}
                            onClick={() => openEditTicketModal(x)}
                          /> */}
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="ticket_title">
                        <h3>
                          {x.customer &&
                          x.customer.profile &&
                          x.customer.profile.displayName
                            ? x.customer.profile.displayName
                            : (x.ticketId ? x.ticketId : '')}
                        </h3>
                      </div>
                      <div className="location_desc_container">
                        <div className="card_location">
                          <h4>
                            {x.jobLocation && x.jobLocation.name
                              ? x.jobLocation.name
                              : ` `}
                          </h4>
                        </div>

                        <div className="card_desc">
                          {x.jobType ? <p>{x.jobType.title}</p> : ''}
                          {!x.customer ? <p>Ticket made via website</p> : ''}
                          {x.tasks.length ? x.tasks.map((item: any) => <p>{item.title}</p>) : ''}
                        </div>
                      </div>
                      <hr></hr>
                      <div className="card-footer">
                        <span>
                          {" "}
                          <i className="material-icons">access_time</i>
                          {x.dueDate
                            ? new Date(x.dueDate).toString().substr(0, 15)
                            : ""}
                        </span>
                      </div>
                    </div>
                    ))
                  : <h4>No available ticket.</h4> }
            </div>
            {Math.ceil(totalOpenTickets / PAGE_SIZE) > 1 && showPagination && (
              <Pagination
                color="primary"
                count={Math.ceil(totalOpenTickets / PAGE_SIZE)}
                onClick={() => onSelectedTicket({})}
                onChange={handleChange}
                page={page}
                showFirstButton
                showLastButton
              />
            )}
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(SidebarTickets);
