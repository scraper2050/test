import React, { useEffect, useState } from 'react';
import moment from 'moment';
import classnames from "classnames";
import Box from '@material-ui/core/Box';
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Drawer from '@material-ui/core/Drawer';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch } from 'react-redux';
import RoomIcon from '@material-ui/icons/Room';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { createStyles, withStyles, makeStyles } from '@material-ui/core/styles';
import styles from './sidebar.styles';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import * as CONSTANTS from "../../../../../constants";
import {JobRoute} from "../../../../../actions/job-routes/job-route.types";
import BCNoResults from "../../../../components/bc-no-results";

interface SidebarJobsProps {
  classes: any;
  routes: JobRoute[];
  dispatchRoutes: (routes: JobRoute[]) => void;
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

function SidebarRoutes({ classes, routes: allRoutes, dispatchRoutes, isLoading }: SidebarJobsProps) {
  const mapStyles = useStyles();
  const sidebarStyles = useSidebarStyles();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [paginatedRoutes, setPaginatedRoutes] = useState<JobRoute[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showPagination, setShowPagination] = useState(true);
  const totalRoutes = allRoutes.length;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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

  const handleJobCardClick = async (JobObj: any, index: any) => {
    if (index === selectedIndex) {
      setSelectedIndex( -1);
      dispatchRoutes(allRoutes);
    } else {
      setSelectedIndex(index);
      dispatchRoutes([allRoutes[index]]);
    }
  };

  const handleChange = (event: any, value: any) => {
    setPage(value);
    setSelectedIndex(-1);
  };

  useEffect(() => {
    if (page === 1) {
      const firstPage = allRoutes.slice(0, PAGE_SIZE);
      setPaginatedRoutes(firstPage);
      dispatchRoutes(firstPage);
    } else {
      setPage(1)
    }
  }, [allRoutes]);

  useEffect(() => {
    const offset = (page - 1) * PAGE_SIZE;
    const paginatedItems = allRoutes.slice(offset).slice(0, PAGE_SIZE);
    setPaginatedRoutes(paginatedItems);
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
                  : paginatedRoutes.length
                    ? paginatedRoutes.map((route: JobRoute, i: any) => {
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
                        </div>
                        <div className={'ticket_marker'}>
                          <RoomIcon/>
                        </div>
                      </div>)
                    })
                    : <BCNoResults message={'No routes with this search criteria'} />
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
