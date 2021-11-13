import React, {useEffect, useState} from 'react';
import moment from 'moment';
import classnames from "classnames";
import Box from '@material-ui/core/Box';
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Drawer from '@material-ui/core/Drawer';
import Pagination from '@material-ui/lab/Pagination';
import {useDispatch, useSelector} from 'react-redux';
import RoomIcon from '@material-ui/icons/Room';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { createStyles, withStyles, makeStyles } from '@material-ui/core/styles';

import { getSearchJobs } from 'api/job.api';
import styles from './sidebar.styles';
import { getCustomerDetail } from 'api/customer.api';
import { warning } from 'actions/snackbar/snackbar.action';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import * as CONSTANTS from "../../../../../constants";
import { Job } from '../../../../../actions/job/job.types';

import { ReactComponent as IconFunnel } from 'assets/img/icons/map/icon-funnel.svg';
import {DatePicker} from "@material-ui/pickers";
import {RootState} from "../../../../../reducers";
import {setTicketSelected} from "../../../../../actions/map/map.actions";
import {ReactComponent as IconCalendar} from "../../../../../assets/img/icons/map/icon-calendar.svg";
import BCMapFilter from "./bc-map-filter";

interface SidebarJobsProps {
  classes: any;
  onFilterJobs: (obj: any[]) => void;
}

interface FilterJobs {
  jobId?: string | null,
  customerNames?: any,
  contact?: any,
  jobStatus: number[],
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

function SidebarJobs({ classes, onFilterJobs }: SidebarJobsProps) {
  const mapStyles = useStyles();
  const dispatch = useDispatch();
  const sidebarStyles = useSidebarStyles();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateValue, setDateValue] = useState<any>(null);
  const [paginatedJobs, setPaginatedJobs] = useState<Job[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const totalJobs = paginatedJobs.length;
  const selectedTicket = useSelector((state: RootState) => state.map.ticketSelected);
  const [filterJobs, setFilterJobs] = useState<FilterJobs>({
    'customerNames': null,
    'jobId': '',
    'contact': null,
    'jobStatus': [-1],
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openTicketFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const filterScheduledJobs = (jobs: any, date = dateValue) => {
    return jobs.filter((job: any) => {
      let filter = true;
      if (filterJobs.jobStatus.indexOf(-1) === -1) {
        filter = filterJobs.jobStatus.indexOf(job.status) >= 0;
      }
      if(date) {
        filter = filter && moment(job.scheduleDate).isSame(date, 'day');
      }
      return filter;
    });
  };

  const getScheduledJobs = async (
    requestObj: {
      page?: number,
      pageSize?: number,
      customerNames?: any,
      jobId?: string,
    }, saveAll = false
  ) => {
    setIsLoading(true);
    const response: any = await getSearchJobs(requestObj);

    const { data } = response;

    if (data.status) {
      setPaginatedJobs(filterScheduledJobs(data.jobs));
      if (saveAll) setAllJobs(data.jobs);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const handleFilter =  (filter: FilterJobs) => {
    dispatch(setTicketSelected({_id: ''}));
    setShowFilterModal(false);
    if (filter) {
      setFilterJobs(filter);
    }
  };

  const resetFilter = async () => {
    dispatch(setTicketSelected({_id: ''}));
    setShowFilterModal(false);
    setPage(1);
    setDateValue(null);

    setFilterJobs({
      'customerNames': null,
      'jobId': '',
      'contact': null,
      'jobStatus': [-1],
    });
  }

  const handleButtonClickMinusDay = () => {
    const yesterday = dateValue ? moment(dateValue).add(-1, 'day').toDate() : new Date();
    dateChangeHandler(yesterday);
  };

  const dateChangeHandler = (date: Date) => {
    const filteredJobs = filterScheduledJobs(allJobs, date);
    setPaginatedJobs(filteredJobs);

    setDateValue(date);
    dispatch(setTicketSelected({_id: ''}));
    onFilterJobs(filteredJobs);
  };

  const handleButtonClickPlusDay = () => {
    const tomorrow = dateValue ? moment(dateValue).add(1, 'day').toDate() : new Date();
    dateChangeHandler(tomorrow);
  };

  const handleJobCardClick = async (JobObj: any, index: any) => {
    if (selectedTicket._id === JobObj._id) {
      dispatch(setTicketSelected({_id: ''}));
    } else {
      const customer = await getCustomerDetail({
        'customerId': JobObj.customer._id
      });

      if (
        !JobObj?.jobLocation &&
        JobObj?.customer?.jobLocations?.length === 0 &&
        (JobObj.jobLocation === undefined &&
          JobObj?.customer?.location?.coordinates.length === 0) &&
        (JobObj?.jobLocation === undefined &&
          JobObj?.customer.address.zipCode.length === 0)
      ) {
        dispatch(warning('There\'s no address on this job.'));
      }

      dispatch(setTicketSelected ({...JobObj, customer }))
    }
  }

  const handlePageChange = (event: any, value: any) => {
    dispatch(setTicketSelected({_id: ''}));
    setPage(value);
  };

  useEffect(() => {
    const rawData = {
      customerNames: filterJobs.customerNames?.profile?.displayName || '',
      jobId:  filterJobs.jobId || '',
      contactName: filterJobs.contact?.name || '',
    }

    const requestObj = {
      ...rawData,
      page: 1,
      pageSize: 0,
    };
    getScheduledJobs(requestObj, true);
  }, [filterJobs]);

  useEffect(() => {
    dispatch(setTicketSelected({_id: ''}));
    if (page === 1) {
      const firstPage = paginatedJobs.slice(0, PAGE_SIZE);
      setJobs(firstPage);
    } else {
      setPage(1)
    }
    onFilterJobs(paginatedJobs);
  }, [paginatedJobs]);

  useEffect(() => {
    const offset = (page - 1) * PAGE_SIZE;
    const paginatedItems = paginatedJobs.slice(offset).slice(0, PAGE_SIZE);
    setJobs(paginatedItems);
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
                  className={classes.picker}
                  disablePast={false}
                  format={"MMM d, yyyy"}
                  id={`datepicker-${"scheduleDate"}`}
                  inputProps={{
                    name: "scheduleDate",
                    placeholder: "Scheduled Date",
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
              <div className={'filter_wrapper'}>
                <Button className={mapStyles.funnel} onClick={() => openTicketFilterModal()}>
                  <IconFunnel />
                </Button>
              </div>
            </div>
            {showFilterModal ?
              <BCMapFilter
                callback={handleFilter}
                currentFilter={filterJobs}
                resetFilter={resetFilter}
                isTicket={false}
              />
              :
              <div style={{flexDirection: 'column', flex: 1}}>
                <div className={'ticketsListViewContainer'}>
                  {
                    isLoading
                      ? <div style={{
                        'display': 'flex',
                        'width': '100%',
                        'justifyContent': 'center'
                      }}>
                        <BCCircularLoader heightValue={'200px'}/>
                      </div>
                      : jobs.length
                        ? jobs.map((x: any, i: any) =>
                          <div
                            className={`ticketItemDiv ${selectedTicket._id === x._id ? 'ticketItemDiv_active' : ''}`}
                            id={`scheduledJobs${i}`}
                            key={i}
                            onClick={() => handleJobCardClick(x, i)}>
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
                          </div>)
                        : <h4>No available job.</h4>
                  }
                </div>
                {Math.ceil(totalJobs / PAGE_SIZE) > 1 && (
                  <Pagination
                    color={'primary'}
                    count={Math.ceil(totalJobs / PAGE_SIZE)}
                    onChange={handlePageChange}
                    page={page}
                    showFirstButton
                    showLastButton
                  />
                )}
              </div>
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
)(SidebarJobs);
