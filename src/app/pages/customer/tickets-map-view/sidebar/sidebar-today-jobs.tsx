import React, { useEffect, useState } from 'react';
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
import BCMapFilterModal from '../../../../modals/bc-map-filter/bc-map-filter-jobs-popup/bc-map-filter-jobs-popup';
import * as CONSTANTS from "../../../../../constants";
import { Job } from '../../../../../actions/job/job.types';

import { ReactComponent as IconFunnel } from 'assets/img/icons/map/icon-funnel.svg';
import { ReactComponent as IconCalendar } from 'assets/img/icons/map/icon-calendar.svg';
import {setTicketSelected} from "../../../../../actions/map/map.actions";
import {RootState} from "../../../../../reducers";
import {formatDateYMD} from "../../../../../helpers/format";
import BCMapFilter from "./bc-map-filter";

interface SidebarTodayJobsProps {
  classes: any;
  onJobs: (jobs: any[]) => void;
}

interface FilterJobs {
  jobId?: string | null,
  customerNames?: any,
  contact?: any,
  jobStatus?: number[],
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

function SidebarTodayJobs({ classes, onJobs }: SidebarTodayJobsProps) {
  const mapStyles = useStyles();
  const dispatch = useDispatch();
  const sidebarStyles = useSidebarStyles();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filterJobs, setFilterJobs] = useState<FilterJobs>({
    'customerNames': null,
    'jobId': '',
    'contact': null,
  });
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const selectedTicket = useSelector((state: RootState) => state.map.ticketSelected);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openTicketFilterModal = () => {
    setShowFilterModal(true);
  };

  const getScheduledJobs = async (
    requestObj: {
      page?: number,
      pageSize?: number,
      customerNames?: any,
      jobId?: string,
      todaysJobs?: string
    }
  ) => {
    setIsLoading(true);
    const response: any = await getSearchJobs(requestObj);
    const { data } = response;
    if (data.status) {
      setJobs(data.jobs);
      onJobs(data.jobs);
      setTotalItems(data.total);
      setIsLoading(false);
    } else {
      onJobs([]);
      setIsLoading(false);
    }
  };


  const handleFilter =  (filter: any) => {
    dispatch(setTicketSelected({_id: ''}));
    setShowFilterModal(false);
    if (filter) {
      setFilterJobs(filter);

      const rawData = {
        todaysJobs: 'true',
        customerNames: filter.customerNames?.profile?.displayName || '',
        jobId:  filter.jobId || '',
        contactName: filter.contact?.name || '',
      }

      const requestObj = {
        ...rawData,
        page: 1,
        pageSize: PAGE_SIZE,
      };
      getScheduledJobs(requestObj);
    }
  };

  const resetFilter = async () => {
    dispatch(setTicketSelected({_id: ''}));
    setShowFilterModal(false);
    setPage(1);

    setFilterJobs({
      'customerNames': null,
      'jobId': '',
      'contact': null,
    });

    const rawData = {
      todaysJobs: 'true',
      customerNames: '',
      ticketId: '',
      contactName: '',
    }

    const requestObj = {
      ...rawData,
      page: 1,
      pageSize: PAGE_SIZE,
    };
    getScheduledJobs(requestObj);
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

    const rawData = {
      todaysJobs: 'true',
      customerNames: filterJobs.customerNames?.profile?.displayName || '',
      ticketId:  filterJobs.jobId || '',
      contactName: filterJobs.contact?.name || '',
    }

    const requestObj = {
      ...rawData,
      page: value,
      pageSize: PAGE_SIZE,
    };
    getScheduledJobs(requestObj);
  };

  useEffect(() => {
    const rawData = {
      'todaysJobs': 'true',
    };
    const requestObj = { ...rawData,
      'page': 1,
      'pageSize': PAGE_SIZE };
    getScheduledJobs(requestObj);
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
              <Box className={mapStyles.date} >
                <IconCalendar />
                <Box marginLeft={1}>{moment(new Date()).format("MMM DD, YYYY")}</Box>
              </Box>
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
                showStatusSelector={false}
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
                            id={`openTodayJob${i}`}
                            key={i}
                            onClick={() => handleJobCardClick(x, i)}
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
                          </div>)
                        : <h4>No available job.</h4>
                  }
                </div>
                {Math.ceil(totalItems / PAGE_SIZE) > 1 && (
                  <Pagination
                    color={'primary'}
                    count={Math.ceil(totalItems / PAGE_SIZE)}
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
)(SidebarTodayJobs);
