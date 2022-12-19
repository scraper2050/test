import React, { useEffect, useState } from 'react';
import classnames from "classnames";
import Box from '@material-ui/core/Box';
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Drawer from '@material-ui/core/Drawer';
import RoomIcon from '@material-ui/icons/Room';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { createStyles, withStyles, makeStyles } from '@material-ui/core/styles';
import styles from './sidebar.styles';
import * as CONSTANTS from "../../../../../constants";
import {warning} from 'actions/snackbar/snackbar.action';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import {setTicketSelected} from "../../../../../actions/map/map.actions";
import {RootState} from "../../../../../reducers";
import {CircularProgress, Typography} from "@material-ui/core";
import BCNoResults from "../../../../components/bc-no-results";

interface SidebarTicketsProps {
  classes: any;
  tickets:any[];
  isLoading: boolean;
  selectedTechnician?: {name: string;id: string}[];
  technicianColorCode?: any;
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

function SidebarTickets({ classes, tickets, isLoading, selectedTechnician = [], technicianColorCode = {} }: SidebarTicketsProps) {
  const mapStyles = useStyles();
  const dispatch = useDispatch();
  const sidebarStyles = useSidebarStyles();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const [paginatedTickets, setPaginatedTickets] = useState<any>([]);
  const totalOpenTickets = tickets.length;
  const selectedTicket = useSelector((state: RootState) => state.map.ticketSelected);
  const { streaming } = useSelector(
    ({ serviceTicket }: any) => ({
      streaming: serviceTicket.stream,
    }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenTicketCardClick = (openTicketObj: any, index: any) => {
    if (selectedTicket._id === openTicketObj._id) {
      dispatch(setTicketSelected({_id: ''}));
    } else {
      const location =
        (openTicketObj.jobSite?.location?.coordinates &&  openTicketObj.jobSite?.location.coordinates.length > 0) ||
        (openTicketObj.jobLocation?.location?.coordinates && openTicketObj.jobLocation?.location.coordinates.length > 0) ||
        (openTicketObj.customer?.location?.coordinates && openTicketObj.customer?.location.coordinates.length > 0);

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
  };

  useEffect(() => {
    if (!streaming) dispatch(setTicketSelected({_id: ''}));
    if (page === 1) {
      const firstPage = tickets.slice(0, PAGE_SIZE);
      setPaginatedTickets(firstPage);
    } else {
      setPage(1)
    }
  }, [tickets]);

  useEffect(() => {
    const offset = (page - 1) * PAGE_SIZE;
    const paginatedItems = tickets.slice(offset).slice(0, PAGE_SIZE);
    setPaginatedTickets(paginatedItems);
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
                  : paginatedTickets.length
                    ? paginatedTickets.map((x: any, i: any) => {
                      let  technicianColor:any;
                      if (x.jobId) {
                        technicianColor = technicianColorCode[selectedTechnician.findIndex((tech:{name:string;id:string}) => tech.id === x.tasks[0].contractor?._id || tech.id === x.tasks[0].technician._id)]
                      }
                      return (
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
                              className={`job-status job-status_${x.ticketId ? '-1' : x.requestId ? '-2' : x.status}`}
                              style={{
                                border: x.jobId ? `3px solid ${technicianColor}` : 'none', 
                                borderRadius: '50%',
                                width: 22,
                                height: 22,
                              }}
                            />
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
                            <RoomIcon />
                          </div>
                        </div>
                      )
                    })
                    : <BCNoResults message={'No tickets with this search criteria'} />
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

            {/*<Box position={'absolute'} display={'flex'} flexDirection={'column'} alignItems={'center'} left={'40%'} bottom={10}>
              <Typography variant="caption" component="div" color="textSecondary">Total Tickets</Typography>
              <Box position="relative" flexDirection={'row'} alignSelf={'center'} display="inline-flex">
                <CircularProgress
                  variant="determinate"
                  value={isStreaming ? (totalOpenTickets / totalTicketsCount) * 100 : 100}
                />
                <Box
                  top={0}
                  left={0}
                  bottom={0}
                  right={0}
                  position="absolute"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="caption" component="div" color="textSecondary">{`${totalOpenTickets}`}</Typography>
                </Box>
              </Box>
            </Box>*/}
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
