import React, { useEffect, useState } from "react";
import { Button, ClickAwayListener, Grow, Paper, Popper, Select, useMediaQuery, useTheme } from "@material-ui/core";
import { withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import styles from "./bc-admin-header.style";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LogoSvg from "../../../assets/img/header-logo.svg";
import { Link, useHistory, useLocation } from "react-router-dom";
import classNames from "classnames";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import Badge from "@material-ui/core/Badge";
import { computeUnreadNotifications } from "../bc-header/util";
import NotificationsIcon from "@material-ui/icons/Notifications";
import HeaderNotifications, { NotificationItem } from "../bc-header/bc-header-notification";
import * as CONSTANTS from "../../../constants";
import classnames from "classnames";
import SearchIcon from '@material-ui/icons/Search';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Fab from "@material-ui/core/Fab";
import InputBase from '@material-ui/core/InputBase';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LocationOn from '@material-ui/icons/LocationOn';
import { useDispatch, useSelector } from "react-redux";
import { CompanyProfileStateType } from "actions/user/user.types";
import { getCompanyLocationsAction } from "actions/user/user.action";
import { setCurrentLocation } from "actions/filter-location/filter.location.action";
import { ICurrentLocation } from "actions/filter-location/filter.location.types";

interface Props {
  classes: any;
  drawerToggle?(): void;
  drawerOpen: boolean;
  notifications: any;
  initialLoad: () => void;
  showNotificationDetails: (state?:boolean) => void;
  openModalHandler: (type:any, data:any, itemId:any, metadata?:any) => void;
  jobRequests: any;
  user: any;
}

const useStyles = makeStyles(theme => ({
  fab: {
    zIndex: 1101,
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    minHeight: 'unset',
    backgroundColor: CONSTANTS.ADMIN_SIDEBAR_TOGGLE_BG
  },
}));

const useHeaderStyles = makeStyles(theme => {
  return ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      width: `calc(100% - ${theme.spacing(10) + 1}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      zIndex: theme.zIndex.drawer + 1,
      marginLeft: CONSTANTS.ADMIN_SIDEBAR_WIDTH,
      width: `calc(100% - ${CONSTANTS.ADMIN_SIDEBAR_WIDTH}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  });
});

const useSearchStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius+5,
      border: '1px solid #E0E0E0',
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        minWidth: '200px',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 0, 0 , 1),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropIcon: {
      padding: theme.spacing(0, 0, 0 , 1),
      height: '100%',
      position: 'absolute',
      right: 0,
      top: 0,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
      paddingRight: `calc(1em + ${theme.spacing(2)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '15ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

function BCAdminHeader({
  classes,
  drawerToggle,
  drawerOpen,
  notifications:
  notificationsFromRedux,
  initialLoad,
  showNotificationDetails,
  openModalHandler,
  jobRequests,
  user,
}: Props): JSX.Element {
  const fabStyles = useStyles();
  const headerStyles = useHeaderStyles();
  const searchStyles = useSearchStyles();

  const { notifications, loading, notificationOpen } = notificationsFromRedux;
  const activeNotifications = notifications.filter((notification:NotificationItem) => !notification.dismissedStatus.isDismissed);
  const location = useLocation();
  const pathName = location.pathname;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationEl, setNotificationEl] = React.useState<null | HTMLElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const profileState: CompanyProfileStateType = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const [assignedlocations, setAssignedLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<number>(0);
  const currentLocation:  ICurrentLocation = useSelector((state: any) => state.currentLocation.data);

  useEffect(() => {
    initialLoad()
    dispatch(getCompanyLocationsAction());
  }, []);

  useEffect(() => {
    if(profileState.locations && profileState.locations.length){
      let locationDevisions: any[] = [];
      profileState.locations?.forEach(location => {
        if(user._id == profileState.companyAdmin || user?.canAccessAllLocations){
          location?.workTypes?.forEach(workType => {
            locationDevisions.push({
              locationId: location?._id,
              workTypeId: workType?._id,
              name: `${location.name}(${workType?.title})`
            })
          })
        }else if (user.__t == "Employee") {
          location.assignedEmployees?.forEach(assignedEmployee => {
            if (assignedEmployee?.employee?._id == user?._id) {
              assignedEmployee?.workTypes.forEach((workType: any) => {
                locationDevisions.push({
                  locationId: location?._id,
                  workTypeId: workType?._id,
                  name: `${location.name}(${workType?.title})`
                })
              })
            }
          })
        }else{
          location.assignedVendors?.forEach(assignedVendor => {
            if (assignedVendor?.vendor?._id == user?.company) {
              assignedVendor?.workTypes.forEach((workType: any) => {
                locationDevisions.push({
                  locationId: location?._id,
                  workTypeId: workType?._id,
                  name: `${location.name}(${workType?.title})`
                })
              })
            }
          })
        }
      })

      if(user._id == profileState.companyAdmin || user?.canAccessAllLocations){
        locationDevisions.unshift({
          name: "All"
        });
      }

      //Remove location storage when any location is not provide
      if (!locationDevisions.length) {
        localStorage.removeItem("currentLocation");
      }
      setAssignedLocations(locationDevisions);
    }
  }, [profileState.locations, profileState.refresh_location]);

  useEffect(() => {
    if(!currentLocation?.locationId && assignedlocations.length){
      setSelectedLocation(0);
      if (assignedlocations[0]) {
        localStorage.setItem("currentLocation",JSON.stringify(assignedlocations[0]));
        dispatch(setCurrentLocation(assignedlocations[0]));
      }
    }
  }, [assignedlocations]);

  const notificationPopover = notificationOpen ? 'notification-popper' : undefined;

  const popperId = profileOpen
    ? 'profile-popper'
    : undefined;

  const [contentGrid, setContentGrid] = useState<any>({
    'lg': 12,
    'md': 12,
    'sm': 12
  });

  const handleClose = () => {
    setProfileOpen(false);
    showNotificationDetails(false)
    setAnchorEl(null);
  };

  const showMenu = (event: any) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  const NAV_DATA = [
    {
      'label': 'Dashboard',
      'link': '/main/dashboard'
    },
    {
      'label': 'Customers',
      'link': '/main/customers'
    },
    {
      'label': 'Invoicing',
      'link': '/main/invoicing'
    },
    // {
    //   'label': 'Tags',
    //   'link': '/main/tags/purchasedtag'
    // },
    {
      'label': 'Payroll',
      'link': '/main/payroll'
    },
    /*
     * {
     *   'label': 'Inventory',
     *   'link': '/main/inventory'
     * },
     * {
     *   'label': 'Employees',
     *   'link': '/main/employees/group'
     * },
     */
    {
      'label': 'Reports',
      'link': '/main/reports'
    },
    {
      'label': 'Admin',
      'link': '/main/admin'
    },
  ];

  const handleLocationChange = (params: any) => {
    setSelectedLocation(params.target.value);
    localStorage.setItem("currentLocation",JSON.stringify(assignedlocations[params.target.value]))
    dispatch(setCurrentLocation(assignedlocations[params.target.value]));
  }


  return (
    <>
      <AppBar
        position="fixed" color={'inherit'}
        className={classnames(
          classes.bcHeader,
          {
            [headerStyles.appBarShift]: drawerOpen,
            [headerStyles.appBar]: !drawerOpen,
          })
        }>
        <div className={classes.toolbarToggleButton}>
          <Fab size="small" onClick={drawerToggle} className={fabStyles.fab}>
            {drawerOpen ? <ChevronLeftIcon style={{ fontSize: 20, color: CONSTANTS.SECONDARY_GREY }}/> : <ChevronRightIcon style={{ fontSize: 20, color: CONSTANTS.SECONDARY_GREY }} />}
          </Fab>
        </div>

        <div className="bcNavMenu">
          <Link
            onClick={handleClose}
            className={classes.bcAdminHeaderLogo}
            to={'/main/dashboard'}>
            <img
              alt={'logo'}
              src={LogoSvg}
            />
          </Link>

          <Toolbar className={classes.bcHeaderToolBar}>
            <ul className={classes.bcAdminHeaderNav}>
              {NAV_DATA.map((item, idx) => {
                return (
                  <li
                    className={classNames({
                      [classes.bcAdminHeaderNavItem]: true,
                      [classes.bcAdminHeaderNavItemActive]: pathName.indexOf(item.link) === 0
                    })}
                    key={idx}
                    tabIndex={0}>
                    <Link to={item.link} onClick={handleClose}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Toolbar>

          <div className="bcAdminHeaderPopup">
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={showMenu}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={menuAnchorEl}
              keepMounted
              open={isMenuOpen}
              onClose={closeMenu}
            >
              {NAV_DATA.map((item, idx) => {
                return (
                  <MenuItem key={idx} onClick={closeMenu} className={classNames({
                    [classes.bcAdminHeaderNavItem]: true,
                    [classes.bcAdminHeaderPopupItem]: true,
                    [classes.bcAdminHeaderPopupItemActive]: pathName.indexOf(item.link) === 0
                  })}>
                    <Link to={item.link} onClick={handleClose}>
                      {item.label}
                    </Link>
                  </MenuItem>
                );
              })}
            </Menu>
          </div>

        </div>

        <div className={classes.bcAdminHeaderTools} >
          {
            assignedlocations.length > 0 && (
              <div className={classes.bcDropdownLocation}>
                <div className={classes.bcDropdownLocationIcon}>
                  <LocationOn fontSize={'small'} color={'action'}/>
                </div>
                <Select
                  id="select-location"
                  disableUnderline={true}
                  value={selectedLocation}
                  onChange={handleLocationChange}
                >
                  {
                    assignedlocations?.map((res: any,index: number) => {
                      return (
                        <MenuItem value={index} key={index}>{res.name}</MenuItem>
                      )
                    })
                  }
                </Select>
              </div>
            )
          }
          <div className={searchStyles.search}>
            <div className={searchStyles.searchIcon}>
              <SearchIcon color={'action'}/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: searchStyles.inputRoot,
                input: searchStyles.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <div className={searchStyles.dropIcon}>
              <ArrowDropDownIcon color={'action'}/>
            </div>
          </div>
          <Button
            className={classes.bcAdminHeaderToolsButton}
            href={'https://help.blueclerk.com/docs/'}
            target={'_blank'}>
            <ContactSupportIcon color={'action'} />
          </Button>
          <Button
            aria-describedby={notificationPopover}
            buttonRef={(node: any) => {
              setNotificationEl(node);
            }}
            className={classes.bcAdminHeaderToolsButton}
            color={'default'}
            href={''}
            onClick={() => showNotificationDetails()}
            target={'_blank'}>
            <Badge
              badgeContent={computeUnreadNotifications(notifications)}
              color={'secondary'}
              invisible={computeUnreadNotifications(notifications) === 0}>
              <NotificationsIcon
                color={computeUnreadNotifications(notifications) === 0 ? 'action' : 'primary'}
              />
            </Badge>
          </Button>

          <Popper
            anchorEl={notificationEl}
            className={classNames({
              [classes.bcAdminPopperClose]: !notificationOpen,
              [classes.bcAdminPopperResponsive]: true,
              [classes.bcAdminPopperNav]: true
            })}
            modifiers={{
              flip: {
                enabled: false,
              },
            }}
            disablePortal
            id={notificationPopover}
            open={notificationOpen}
            placement={'bottom'}
            transition>
            {({ TransitionProps, placement }) =>
              <Grow
                {...TransitionProps}
                style={{ 'transformOrigin': '0 0 0' }}>
                <>
                {/* <ClickAwayListener onClickAway={handleClose}> */}
                  <Paper className={classes.bcAdminDropdown}>
                    <HeaderNotifications
                      close={handleClose}
                      items={activeNotifications}
                      loading={loading}
                      openModalHandler={openModalHandler}
                      jobRequests={jobRequests}
                    />
                  </Paper>
                {/* </ClickAwayListener> */}
                </>
              </Grow>
            }
          </Popper>
        </div>

      </AppBar>
    </>
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCAdminHeader);
