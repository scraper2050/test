import React, { useEffect, useState } from "react";
import { Button, ClickAwayListener, Grow, Paper, Popper, useMediaQuery, useTheme } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
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
import { connect, useDispatch, useSelector } from "react-redux";
import { loadNotificationsActions } from "../../../actions/notifications/notifications.action";
import * as CONSTANTS from "../../../constants";
import classnames from "classnames";
import SearchIcon from '@material-ui/icons/Search';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Fab from "@material-ui/core/Fab";

interface Props {
  token: string;
  user: any;
  classes: any;
  drawerToggle?(): void;
  drawerOpen: boolean;
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
  console.log("log-theme", theme.zIndex.drawer + 1);
  return ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      width: `calc(100% - ${theme.spacing(9) + 1}px)`,
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

function BCAdminHeader({ token, user, classes, drawerToggle, drawerOpen }: Props): JSX.Element {
  const fabStyles = useStyles();
  const headerStyles = useHeaderStyles();

  const { notifications, error, loading } = useSelector((state: any) => state.notifications);
  const activeNotifications = notifications.filter((notification:NotificationItem) => !notification.dismissedStatus.isDismissed);
  const location = useLocation();
  const dispatch = useDispatch();
  const pathName = location.pathname;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationEl, setNotificationEl] = React.useState<null | HTMLElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    dispatch(loadNotificationsActions.fetch());
  }, []);

  const showNotificationDetails = () => {
    setShowNotification(!showNotification);
  };

  const notificationPopover = showNotification ? 'notification-popper' : undefined;

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
    setShowNotification(false);
    setAnchorEl(null);
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
    {
      'label': 'Tags',
      'link': '/main/tags/purchasedtag'
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
      'label': 'Admin',
      'link': '/main/admin'
    }
  ];

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
                    <Link to={item.link}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Toolbar>

        </div>

        <div className={classes.bcAdminHeaderTools} >
          <Button
            className={classes.bcAdminHeaderToolsButton}>
            <SearchIcon color={'action'} />
          </Button>
          <Button
            className={classes.bcAdminHeaderToolsButton}
            href={'http://blueclerk.com/support/'}
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
            onClick={showNotificationDetails}
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
              [classes.bcAdminPopperClose]: !showNotification,
              [classes.bcAdminPopperResponsive]: true,
              [classes.bcAdminPopperNav]: true
            })}
            disablePortal
            id={notificationPopover}
            open={showNotification}
            placement={'bottom'}
            transition>
            {({ TransitionProps, placement }) =>
              <Grow
                {...TransitionProps}
                style={{ 'transformOrigin': '0 0 0' }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <Paper className={classes.bcAdminDropdown}>
                    <HeaderNotifications
                      close={handleClose}
                      items={activeNotifications}
                      loading={loading}
                    />
                  </Paper>
                </ClickAwayListener>
              </Grow>
            }
          </Popper>
        </div>

      </AppBar>
    </>
  )
}

const mapStateToProps = (state: {
  auth: {
    token: string;
    user: any;
  };
}) => ({
  'token': state.auth.token,
  'user': state.auth.user,
});


export default withStyles(
  styles,
  { 'withTheme': true }
)(connect(mapStateToProps)(BCAdminHeader));
