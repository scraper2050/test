import {
  AppBar,
  Button,
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  SwipeableDrawer,
  Toolbar
} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { io } from 'socket.io-client';
// eslint-disable-next-line sort-imports
import AvatarImg from '../../../assets/img/user_avatar.png';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import LogoSvg from '../../../assets/img/Logo.svg';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import { logoutAction } from 'actions/auth/auth.action';
import { removeUserFromLocalStorage } from 'utils/local-storage.service';
import styles from './bc-header.styles';
import { withStyles } from '@material-ui/core/styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { SocketMessage } from 'helpers/contants';
import { setServiceTicketNotification } from 'actions/service-ticket/service-ticket.action';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { getJobLocationsAction, loadingJobLocations } from 'actions/job-location/job-location.action';
import { clearJobSiteStore, getJobSites, loadingJobSites } from 'actions/job-site/job-site.action';
import { getAllJobTypesAPI } from 'api/job.api';
import { modalTypes } from '../../../constants';
import Config from '../../../config';
import { loadNotificationsActions } from 'actions/notifications/notifications.action';
import HeaderNotifications from './bc-header-notification';
import { computeUnreadNotifications } from './util';

interface Props {
  token: string;
  user: any;
  classes: any;
}


function BCHeader({ token, user, classes }: Props): JSX.Element {
  const serviceTickets = useSelector((state: any) => state.serviceTicket.notifications);
  const { notifications, error, loading } = useSelector((state: any) => state.notifications);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const pathName = location.pathname;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationEl, setNotificationEl] = React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    dispatch(loadNotificationsActions.fetch());
    if (token) {
      const socket = io(`${Config.socketSever}`, {
        'extraHeaders': { 'Authorization': token }
      });


      socket.on(SocketMessage.CREATESERVICETICKET, data => {
        const newTickets = [...serviceTickets, data];
        dispatch(setServiceTicketNotification(newTickets));
      });
    }
  }, []);

  const imageUrl = user?.profile?.imageUrl === '' || user?.profile?.imageUrl === null
    ? AvatarImg
    : user?.profile?.imageUrl;

  const dropdownItem = classNames(
    classes.dropdownItem,
    classes.primaryHover
  );

  const showNotificationDetails = () => {
    setShowNotification(!showNotification);
  };

  const notificationPopover = showNotification ? 'notification-popper' : undefined;

  const popperId = profileOpen
    ? 'profile-popper'
    : undefined;

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    setProfileOpen(!profileOpen);
  };
  const handleClose = () => {
    setProfileOpen(false);
    setShowNotification(false);
    setAnchorEl(null);
  };

  const handleViewProfile = (): void => {
    handleClose();
    history.push('/main/user/view-profile');
  };

  const viewNotificationInfo = (ticket:any): void => {
    handleClose();
    const filterNotication = serviceTickets.filter((item:any) => item._id !== ticket._id);
    dispatch(setServiceTicketNotification(filterNotication));
    openDetailTicketModal(ticket);
  };

  const openDetailTicketModal = (ticket: any) => {
    const reqObj = {
      'customerId': ticket.customer?._id,
      'locationId': ticket.jobLocation
    };
    dispatch(loadingJobLocations());
    dispatch(getJobLocationsAction(reqObj.customerId));
    if (reqObj.locationId !== undefined && reqObj.locationId !== null) {
      dispatch(loadingJobSites());
      dispatch(getJobSites(reqObj));
    } else {
      dispatch(clearJobSiteStore());
    }
    dispatch(getAllJobTypesAPI());
    ticket.updateFlag = true;
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Service Ticket Details',
        'removeFooter': false,
        'ticketData': ticket,
        'className': 'serviceTicketTitle',
        'maxHeight': '754px',
        'height': '100%',
        'detail': true

      },
      'type': modalTypes.EDIT_TICKET_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const handleClickLogout = (): void => {
    handleClose();
    dispatch(logoutAction());
    removeUserFromLocalStorage();
    history.push('/');
  };

  return (
    <div>
      {token !== null && token !== '' &&
        <AppBar
          className={classes.appBar}
          id={'app-bar'}
          position={'fixed'}>
          <Toolbar className={classes.bcTopBar}>
            <div className={classes.bcTopBarDrawer}>
              <IconButton
                aria-label={'Open drawer'}
                color={'inherit'}
                onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>

              <SwipeableDrawer
                anchor={'left'}
                onClose={handleDrawerToggle}
                onOpen={handleDrawerToggle}
                open={mobileOpen}>
                <div
                  className={classNames([classes.navItem], [classes.sideBarNavItems])}>
                  <Link
                    className={classes.sideBarLogoBrand}
                    to={'/main/dashboard'}>
                    <img
                      alt={'logo'}
                      src={LogoSvg}
                    />
                  </Link>
                  {NAV_DATA.map((item, idx) => {
                    return (
                      <div
                        className={classNames({
                          [classes.navItem]: true,
                          [classes.navItemActive]: pathName.indexOf(item.link) === 0
                        })}
                        key={idx}
                        onClick={handleDrawerToggle}
                        tabIndex={0}>
                        <Link to={item.link}>
                          {item.label}
                        </Link>
                        <Divider />
                      </div>
                    );
                  })}
                </div>
              </SwipeableDrawer>
            </div>

            <Link
              className={classes.logoBrand}
              to={'/main/dashboard'}>
              <img
                alt={'logo'}
                src={LogoSvg}
              />
            </Link>

            <ul className={classes.headerNav}>
              {NAV_DATA.map((item, idx) => {
                return (
                  <li
                    className={classNames({
                      [classes.navItem]: true,
                      [classes.navItemActive]: pathName.indexOf(item.link) === 0
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
            <div className={classes.headerTools} >
              <Button
                className={classes.headerToolsButton}
                href={'http://blueclerk.com/support/'}
                target={'_blank'}>
                <ContactSupportIcon color={'primary'} />
              </Button>
              <Button
                aria-describedby={notificationPopover}
                buttonRef={(node: any) => {
                  setNotificationEl(node);
                }}
                className={classes.headerToolsButton}
                color={'default'}
                href={''}
                onClick={showNotificationDetails}
                target={'_blank'}>
                <Badge
                  badgeContent={computeUnreadNotifications(notifications)}
                  color={'secondary'}
                  invisible={!notifications.length}>
                  <NotificationsIcon
                    color={'primary'}
                  />
                </Badge>
              </Button>

              <Popper
                anchorEl={notificationEl}
                className={classNames({
                  [classes.popperClose]: !showNotification,
                  [classes.popperResponsive]: true,
                  [classes.popperNav]: true
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
                      <Paper className={classes.dropdown}>
                        <HeaderNotifications
                          close={handleClose}
                          items={notifications}
                        />
                      </Paper>
                    </ClickAwayListener>
                  </Grow>
                }
              </Popper>
            </div>
            <div className={classes.profile}>
              <Button
                aria-describedby={popperId}
                buttonRef={(node: any) => {
                  setAnchorEl(node);
                }}
                className={classes.profileAvatar}
                onClick={handleClick}>
                <img
                  alt={'avatar'}
                  className={classes.profileAvatarImage}
                  src={imageUrl}
                />
                {user?.profile?.displayName}
              </Button>
              <Popper
                anchorEl={anchorEl}
                className={classNames({
                  [classes.popperClose]: !profileOpen,
                  [classes.popperResponsive]: true,
                  [classes.popperNav]: true
                })}
                disablePortal
                id={popperId}
                open={profileOpen}
                placement={'bottom'}
                transition>
                {({ TransitionProps, placement }) =>
                  <Grow
                    {...TransitionProps}
                    style={{ 'transformOrigin': '0 0 0' }}>
                    <Paper className={classes.dropdown}>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList role={'menu'}>
                          <MenuItem
                            className={dropdownItem}
                            onClick={handleViewProfile}>
                            {'View Profile'}
                          </MenuItem>
                          <MenuItem
                            className={dropdownItem}
                            onClick={handleClickLogout}>
                            {'Logout'}
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                }
              </Popper>
            </div>
          </Toolbar>
        </AppBar>
      }
    </div>
  );
}

const mapStateToProps = (state: {
  auth: {
    token: string;
    user: any;
  };
}) => ({
  'token': state.auth.token,
  'user': state.auth.user
});


export default withStyles(
  styles,
  { 'withTheme': true }
)(connect(mapStateToProps)(BCHeader));
