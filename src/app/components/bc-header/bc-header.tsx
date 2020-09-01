import AvatarImg1 from '../../../assets/img/avatars/1.jpg';
import BellIconSvg from '../../../assets/img/Bell-Icon.svg';
import HelpIconSvg from '../../../assets/img/Help-Icon.svg';
import LogoSvg from '../../../assets/img/Logo.svg';
import MenuIcon from '@material-ui/icons/Menu';
import SettingIconSvg from '../../../assets/img/Setting-Icon.svg';
import {
  AppBar,
  Button,
  Divider,
  IconButton,
  SwipeableDrawer,
  Toolbar
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

import './bc-header.scss';

function BCHeader(): JSX.Element {
  const location = useLocation();
  const pathName = location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_DATA = [
    {
      'label': 'Dashboard',
      'link': '/dashboard'
    },
    {
      'label': 'Customers',
      'link': '/customers'
    },
    {
      'label': 'Invoicing',
      'link': '/invoicing'
    },
    {
      'label': 'Tags',
      'link': '/tags'
    },
    {
      'label': 'Inventory',
      'link': '/inventory'
    },
    {
      'label': 'Employees',
      'link': '/employees'
    },
    {
      'label': 'Vendors',
      'link': '/vendors'
    },
    {
      'label': 'Admin',
      'link': '/admin'
    }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      id={'app-bar'}
      position={'fixed'}>
      <Toolbar className={'bc-top-bar'}>
        <div className={'bc-top-bar__drawer'}>
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
            <div className={'nav-items'}>
              <Link
                className={'logo-brand'}
                to={'/'}>
                <img
                  alt={'logo'}
                  src={LogoSvg}
                />
              </Link>
              {NAV_DATA.map((item, idx) => {
                return (
                  <div
                    className={`nav-item ${
                      pathName.indexOf(item.link) === 0
                        ? 'active'
                        : ''}`}
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
          className={'logo-brand'}
          to={'/'}>
          <img
            alt={'logo'}
            src={LogoSvg}
          />
        </Link>

        <ul className={'header-nav'}>
          {NAV_DATA.map((item, idx) => {
            return (
              <li
                className={`nav-item ${
                  pathName.indexOf(item.link) === 0
                    ? 'active'
                    : ''}`}
                key={idx}
                tabIndex={0}>
                <Link to={item.link}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className={'header-tools'}>
          <li>
            <Button
              className={'header-tools-btn'}
              color={'primary'}
              variant={'contained'}>
              <img
                alt={'Help'}
                src={HelpIconSvg}
              />
            </Button>
            <Button
              className={'header-tools-btn'}
              color={'primary'}
              variant={'contained'}>
              <img
                alt={'Help'}
                src={SettingIconSvg}
              />
            </Button>
            <Button
              className={'header-tools-btn'}
              color={'primary'}
              variant={'contained'}>
              <img
                alt={'Help'}
                src={BellIconSvg}
              />
            </Button>
          </li>
        </ul>
        <div className={'account'}>
          <div className={'avatar'}>
            <img
              alt={'avatar'}
              src={AvatarImg1}
            />
            {'J.Mactavish'}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default BCHeader;
