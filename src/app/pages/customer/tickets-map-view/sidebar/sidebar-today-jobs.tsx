import React, {useEffect, useState} from 'react';
import classnames from "classnames";
import Box from '@material-ui/core/Box';
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Drawer from '@material-ui/core/Drawer';
import Pagination from '@material-ui/lab/Pagination';
import {useDispatch, useSelector} from 'react-redux';
import RoomIcon from '@material-ui/icons/Room';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { createStyles, withStyles, makeStyles } from '@material-ui/core/styles';
import styles from './sidebar.styles';
import { getCustomerDetail } from 'api/customer.api';
import { warning } from 'actions/snackbar/snackbar.action';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import * as CONSTANTS from "../../../../../constants";
import {setTicketSelected} from "../../../../../actions/map/map.actions";
import {RootState} from "../../../../../reducers";
import {Job} from "../../../../../actions/job/job.types";
import BCNoResults from "../../../../components/bc-no-results";

interface SidebarTodayJobsProps {
  classes: any;
  jobs: any[];
  isLoading: boolean;
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

function SidebarTodayJobs({ classes, jobs, isLoading }: SidebarTodayJobsProps) {
  const mapStyles = useStyles();
  const dispatch = useDispatch();
  const sidebarStyles = useSidebarStyles();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [paginatedJobs, setPaginatedJobs] = useState<Job[]>([]);
  const totalItems = jobs.length;
  const selectedTicket = useSelector((state: RootState) => state.map.ticketSelected);
  const { streaming } = useSelector(
    ({ jobState }: any) => ({
      streaming: jobState.streaming,
    }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
    if (!streaming) dispatch(setTicketSelected({_id: ''}));
    if (page === 1) {
      const firstPage = jobs.slice(0, PAGE_SIZE);
      setPaginatedJobs(firstPage);
    } else {
      setPage(1)
    }
  }, [jobs]);

  useEffect(() => {
    const offset = (page - 1) * PAGE_SIZE;
    const paginatedItems = jobs.slice(offset).slice(0, PAGE_SIZE);
    setPaginatedJobs(paginatedItems);
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
          <Grid container item lg={12} >
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
                    : paginatedJobs.length
                      ? paginatedJobs.map((x: any, i: any) =>
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
                      : <BCNoResults message={'No jobs with this search criteria'} />
                }
              </div>
              {Math.ceil(totalItems / PAGE_SIZE) > 1 && !isLoading &&(
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
