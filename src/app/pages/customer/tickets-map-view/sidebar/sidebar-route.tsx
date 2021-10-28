import React, { useEffect, useState } from 'react';
import moment from 'moment';
import classnames from "classnames";
import Box from '@material-ui/core/Box';
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Drawer from '@material-ui/core/Drawer';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch } from 'react-redux';
import RoomIcon from '@material-ui/icons/Room';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { createStyles, withStyles, makeStyles } from '@material-ui/core/styles';

import { getSearchJobs } from 'api/job.api';
import styles from './sidebar.styles';
import { getCustomerDetail } from 'api/customer.api';
import { warning } from 'actions/snackbar/snackbar.action';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import BCMapFilterModal from '../../../../modals/bc-map-filter/bc-map-filter-jobs-popup/bc-map-filter-jobs-popup';
import * as CONSTANTS from "../../../../../constants";
import { Job } from '../../../../../actions/job/job.types';

import { ReactComponent as IconFunnel } from 'assets/img/icons/map/icon-funnel.svg';
import { ReactComponent as IconCalendar } from 'assets/img/icons/map/icon-calendar.svg';
import {DatePicker} from "@material-ui/pickers";
import {formatDateYMD} from "../../../../../helpers/format";
import {setOpenTicketFilterState} from "../../../../../actions/service-ticket/service-ticket.action";
import {getAllRoutes} from "../../../../../api/job-routes.api";
import {JobRoute} from "../../../../../actions/job-routes/job-route.types";
import {Image} from "@material-ui/icons";

interface SidebarJobsProps {
  classes: any;
  dispatchRoutes: (routes: JobRoute[]) => void;
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

function SidebarRoutes({ classes, dispatchRoutes }: SidebarJobsProps) {
  const mapStyles = useStyles();
  const dispatch = useDispatch();
  const sidebarStyles = useSidebarStyles();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(true);
  const [routes, setRoutes] = useState<JobRoute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currentDate, setCurrentDate] = useState<any>(new Date());
  const [paginatedRoutes, setPaginatedRoutes] = useState<JobRoute[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showPagination, setShowPagination] = useState(true);
  const totalRoutes = paginatedRoutes.length;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openTicketFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const getInitials = (fullname = '') => {
    const words = fullname.split(' ');
    switch (words.length) {
      case 0:
        return '';
      case 1:
        return words[0].substring(0, 1).toUpperCase();
      default:
        return `${words[0].substring(0, 1).toUpperCase()}${words[words.length - 1].substring(0, 1).toUpperCase()}`
    }
  }

  const getColor = (str: string) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  const getRoute = async () => {
    setIsLoading(true);
    const dateString = moment(currentDate).utc().format('YYYY-MM-DD');
    const response: any = await getAllRoutes(dateString);

    const { data } = response;
    if (data.status) {
      setPaginatedRoutes(data.jobRoutes);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }

  const handleButtonClickMinusDay = () => {
    const yesterday = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
    dateChangeHandler(yesterday);
  };

  const dateChangeHandler = (date: Date) => {
    setCurrentDate(date);
    setSelectedIndex(-1);
  };

  const handleButtonClickPlusDay = () => {
    const tomorrow = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    dateChangeHandler(tomorrow);
  };

  const resetFilter = async () => {
    //setPaginatedRoutes(scheduledJobs);
  };

  const handleJobCardClick = async (JobObj: any, index: any) => {
    if (index === selectedIndex) {
      setSelectedIndex( -1);
      dispatchRoutes(paginatedRoutes);
    } else {
      setSelectedIndex(index);
      dispatchRoutes([paginatedRoutes[index]]);
    }
  };

  const handleChange = (event: any, value: any) => {
    setPage(value);
    setSelectedIndex(-1);
  };

  useEffect(() => {
    getRoute();
  }, [currentDate]);

  useEffect(() => {
    if (page === 1) {
      const firstPage = paginatedRoutes.slice(0, PAGE_SIZE);
      setRoutes(firstPage);
      dispatchRoutes(firstPage);
    } else {
      setPage(1)
    }
  }, [paginatedRoutes]);

  useEffect(() => {
    const offset = (page - 1) * PAGE_SIZE;
    const paginatedItems = paginatedRoutes.slice(offset).slice(0, PAGE_SIZE);
    setRoutes(paginatedItems);
    dispatchRoutes(paginatedItems);
  }, [page]);

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
          container: document.getElementById('map-swipeable-today'),
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
            lg={12} >
            <div className={'ticketsFilterContainer'}>
              <span
                className={"datepicker_wrapper datepicker_wrapper_map"}
              >
                <button className="prev_btn" disabled={isLoading} onClick={() => handleButtonClickMinusDay()}>
                  <i className="material-icons" >
                    keyboard_arrow_left
                  </i>
                </button>
                <DatePicker
                  autoOk
                  disabled={isLoading}
                  className={classes.picker}
                  disablePast={false}
                  format={"d MMM yyyy"}
                  id={`datepicker-${"scheduleDate"}`}
                  inputProps={{
                    name: "scheduleDate",
                    placeholder: "Scheduled Date",
                  }}
                  inputVariant={"outlined"}
                  name={"scheduleDate"}
                  onChange={(e: any) => dateChangeHandler(e)}
                  required={false}
                  value={formatDateYMD(currentDate)}
                  variant={"inline"}
                />
                <button className="next_btn" disabled={isLoading} onClick={() => handleButtonClickPlusDay()}>
                  <i className="material-icons">
                    keyboard_arrow_right
                  </i>
                </button>
              </span>
              <div className={'filter_wrapper'}>
               {/* <Button className={mapStyles.funnel} onClick={() => openTicketFilterModal()}>
                  <IconFunnel />
                </Button>*/}
                {
                  showFilterModal
                    ? <ClickAwayListener onClickAway={openTicketFilterModal}>
                      <div className={'dropdown_wrapper dropdown_wrapper_filter elevation-5'}>

                      </div>
                    </ClickAwayListener>
                    : null
                }
              </div>
            </div>
            <div className={'ticketsListViewContainer'}>
              {
                isLoading
                  ? <div style={{
                      'display': 'flex',
                      'width': '100%',
                      'justifyContent': 'center'
                    }}>
                      <BCCircularLoader heightValue={'200px'} />
                    </div>
                  : routes.length
                    ? routes.map((route: JobRoute, i: any) => {
                      const {technician: {profile}} = route;

                      return (<div
                        className={`route_item_div ${i === selectedIndex ? 'ticketItemDiv_active' : ''}`}
                        id={`openTodayJob${i}`}
                        key={i}
                        onClick={() => handleJobCardClick(route, i)}>

                        {!!profile.imageUrl ?
                          <img className={'technician_avatar'}
                               src={profile.imageUrl}
                          style={{borderColor: getColor(profile.displayName)}}/>
                          :
                          <div className={'route_initials'} style={{backgroundColor: getColor(profile.displayName)}}>
                            {getInitials(profile.displayName)}
                          </div>
                        }
                        <div className={'route_info'}>
                          <div className={'ticket_title'}>
                            <h3>
                              {profile.displayName}
                            </h3>
                          </div>
                          <div className={'location_desc_container'}>
                            <div className={'card_location'}>
                              <h4>

                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className={'ticket_marker'}>
                          <RoomIcon/>
                        </div>
                      </div>)
                    })
                    : <h4>No available route.</h4>
              }
            </div>
            {Math.ceil(totalRoutes / PAGE_SIZE) > 1 && showPagination && (
              <Pagination
                color={'primary'}
                count={Math.ceil(totalRoutes / PAGE_SIZE)}
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
)(SidebarRoutes);
