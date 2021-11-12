import React, { useEffect, useState } from 'react';
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
import { createStyles, withStyles, makeStyles } from '@material-ui/core/styles';
import {
  refreshServiceTickets,
  setOpenServiceTicket,
  setOpenServiceTicketLoading,
} from 'actions/service-ticket/service-ticket.action';
import styles from './sidebar.styles';
import { formatDateYMD } from 'helpers/format';
import * as CONSTANTS from "../../../../../constants";
import {error, warning} from 'actions/snackbar/snackbar.action';
import { getCustomers } from 'actions/customer/customer.action';
import { getOpenServiceTickets } from 'api/service-tickets.api';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import BCMapFilter from "./bc-map-filter";
import { ReactComponent as IconFunnel } from 'assets/img/icons/map/icon-funnel.svg';
import {setTicketSelected} from "../../../../../actions/map/map.actions";
import {RootState} from "../../../../../reducers";
import {ReactComponent as IconCalendar} from "../../../../../assets/img/icons/map/icon-calendar.svg";

interface SidebarTicketsProps {
  classes: any;
}

interface FilterTickets {
  jobId?: string | null,
  customerNames?: any,
  contact?: any,
  jobStatus?: number[],
  schedule_date: string | null,
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
      height: 'calc(100% - 125px)',
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

function SidebarTickets({ classes }: SidebarTicketsProps) {
  const mapStyles = useStyles();
  const dispatch = useDispatch();
  const sidebarStyles = useSidebarStyles();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(true);
  const [filterTickets, setFilterTickets] = useState<FilterTickets>({
    'customerNames': null,
    'jobId': '',
    'schedule_date': '',
    'contact': null,
  });
  const [dateValue, setDateValue] = useState<any>(null);
  const [paginatedJobs, setPaginatedJobs] = useState<any>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const totalOpenTickets = useSelector(
    (state: any) => state.serviceTicket.totalOpenTickets
  );
  const openTickets = useSelector(
    (state: any) => state.serviceTicket.openTickets
  );
  const isLoading = useSelector((state: any) => state.serviceTicket.isLoading);
  const selectedTicket = useSelector((state: RootState) => state.map.ticketSelected);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleFilter =  (filter: any) => {
    dispatch(setTicketSelected({_id: ''}));
    setShowFilterModal(false);
    if (filter) {
      setFilterTickets(filter);

      const rawData = {
        jobTypeTitle: '',
        dueDate: dateValue ? formatDateYMD(dateValue) : '',
        customerNames: filter.customerNames?.profile?.displayName || '',
        ticketId:  filter.jobId || '',
        contactName: filter.contact?.name || '',
      }

      const requestObj = {
        ...rawData,
        pageNo: 1,
        pageSize: PAGE_SIZE,
      };
      getOpenTickets(requestObj);
    }
  };

  const resetFilter = () => {
    dispatch(setTicketSelected({_id: ''}));
    setShowFilterModal(false);
    setPage(1);
    setDateValue(null);

    setFilterTickets({
      'customerNames': null,
      'jobId': '',
      'schedule_date': '',
      'contact': null,
    });

    const rawData = {
      jobTypeTitle: '',
      dueDate: '',
      customerNames: '',
      ticketId: '',
      contactName: '',
    }

    const requestObj = {
      ...rawData,
      pageNo: 1,
      pageSize: PAGE_SIZE,
    };
    getOpenTickets(requestObj);
  }

  const dateChangeHandler = (date: string) => {
    const dateObj = new Date(date);
    const rawData = {
      jobTypeTitle: '',
      dueDate: formatDateYMD(dateObj),
      customerNames: filterTickets.customerNames?.profile?.displayName || '',
      ticketId:  filterTickets.jobId || '',
      contactName: filterTickets.contact?.name || '',
    }
    console.log(rawData);
    setDateValue(dateObj);

    const requestObj = {
      ...rawData,
      pageNo: 1,
      pageSize: PAGE_SIZE,
    };
    getOpenTickets(requestObj);
  };

  const handleOpenTicketCardClick = (openTicketObj: any, index: any) => {
    if (selectedTicket._id === openTicketObj._id) {
      dispatch(setTicketSelected({_id: ''}));
    } else {
      const location =
        (openTicketObj.jobSite?.location &&  openTicketObj.jobSite?.location.coordinates.length > 0) ||
        (openTicketObj.jobLocation?.location || openTicketObj.jobLocation?.location.coordinates.length > 0) ||
        (openTicketObj.customer?.location && openTicketObj.customer?.location.coordinates.length > 0);

      if (!location){
        dispatch(warning("There's no address on this ticket."));
      }

      if (openTicketObj && !openTicketObj?.customer) {
        dispatch(warning("There's no customer associated with this ticket"));
      }

      dispatch(setTicketSelected(openTicketObj))
    }
  }

  const handlePageChange = (event: any, value: any) => {
    dispatch(setTicketSelected({_id: ''}));
    setPage(value);

    const rawData = {
      jobTypeTitle: '',
      dueDate: dateValue ? formatDateYMD(dateValue) : '',
      customerNames: filterTickets.customerNames?.profile?.displayName || '',
      ticketId:  filterTickets.jobId || '',
      contactName: filterTickets.contact?.name || '',
    }

    const requestObj = {
      ...rawData,
      pageNo: value,
      pageSize: PAGE_SIZE,
    };
    getOpenTickets(requestObj);
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
        if (response.status === 1) {
          dispatch(setOpenServiceTicketLoading(false));
          dispatch(setOpenServiceTicket(response));
          dispatch(refreshServiceTickets(true));
        } else {
          dispatch(setOpenServiceTicketLoading(false));
          dispatch(error(response.message));
        }
      })
      .catch((err: any) => {
        throw err;
      });
  };

  const handleButtonClickMinusDay = () => {
    const previousDay = dateValue ? new Date(dateValue.getTime() - 24 * 60 * 60 * 1000) : new Date();
    const formattedDate = formatDateYMD(previousDay);
    dateChangeHandler(formattedDate);
  };

  const handleButtonClickPlusDay = () => {
    const nextDay =  dateValue ? new Date(dateValue.getTime() + 24 * 60 * 60 * 1000) : new Date();
    const formattedDate = formatDateYMD(nextDay);
    dateChangeHandler(formattedDate);
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
    getOpenTickets(requestObj);
    dispatch(setTicketSelected({_id: ''}));
  }, []);

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
              <span
                className={"datepicker_wrapper"}
              >
                <button className="prev_btn">
                  <i
                    className="material-icons"
                    onClick={() => handleButtonClickMinusDay()}
                  >
                    keyboard_arrow_left
                  </i>
                </button>
                <IconCalendar className="calendar_icon" />
                <DatePicker
                  autoOk
                  disablePast={false}
                  format={"MMM d, yyyy"}
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
              <div className="filter_wrapper">
                <Button className={mapStyles.funnel} onClick={() => setShowFilterModal(true)}>
                  <IconFunnel />
                </Button>
              </div>
            </div>
            {showFilterModal ?
              <BCMapFilter
                callback={handleFilter}
                currentFilter={filterTickets}
                resetFilter={resetFilter}
                isTicket={true}
              />
              :<>
                <div className="ticketsListViewContainer">
                  {
                    isLoading
                      ? <div style={{
                        'display': 'flex',
                        'width': '100%',
                        'justifyContent': 'center'
                      }}>
                        <BCCircularLoader heightValue={'200px'}/>
                      </div>
                      : openTickets.length
                        ? openTickets.map((x: any, i: any) => (
                          <div
                            className={`ticketItemDiv ${selectedTicket._id === x._id ? 'ticketItemDiv_active' : ''}`}
                            id={`openTicket${i}`}
                            key={i}
                            onClick={() => {
                              handleOpenTicketCardClick(x, i);
                            }}
                          >
                            <div className={'ticket_title'}>
                              <span
                                className={`job-status job-status_${x.status}`}/>
                              <h3>
                                {x.customer && x.customer.profile && x.customer.profile.displayName ? x.customer.profile.displayName : ''}
                              </h3>
                            </div>
                            <div className={'location_desc_container'}>
                              <div className={'card_location'}>
                                <h4>
                                  {x.jobLocation && x.jobLocation.name ? x.jobLocation.name : ` `}
                                </h4>
                              </div>
                            </div>
                            <div className={'ticket_marker'}>
                              <RoomIcon/>
                            </div>
                          </div>
                        ))
                        : <h4>No available ticket.</h4>
                  }
                </div>
                {Math.ceil(totalOpenTickets / PAGE_SIZE) > 1 && (
                  <Pagination
                  color="primary"
                  count={Math.ceil(totalOpenTickets / PAGE_SIZE)}
                  onClick={() => dispatch(setTicketSelected({_id: ''}))}
                  onChange={handlePageChange}
                  page={page}
                  showFirstButton
                  showLastButton
                  />
                  )}
              </>
            }

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
