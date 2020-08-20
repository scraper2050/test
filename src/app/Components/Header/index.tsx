import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AppBar, Toolbar, Button } from '@material-ui/core';

import LogoSvg from '../../../assets/img/Logo.svg';
import HelpIconSvg from '../../../assets/img/Help-Icon.svg';
import SettingIconSvg from '../../../assets/img/Setting-Icon.svg';
import BellIconSvg from '../../../assets/img/Bell-Icon.svg';
import AvatarImg1 from '../../../assets/img/avatars/1.jpg';

import './styled.scss';

const Header = (): JSX.Element => {
  let location = useLocation();
  let pathName = location.pathname;

  const NAV_DATA = [
    {
      link: '/dashboard',
      label: 'Dashboard',
    },
    {
      link: '/people',
      label: 'People',
    },
    {
      link: '/customers',
      label: 'Customers',
    },
    {
      link: '/invoicing',
      label: 'Invoicing',
    },
    {
      link: '/tags',
      label: 'Tags',
    },
    {
      link: '/inventory',
      label: 'Inventory',
    },
    {
      link: '/employees',
      label: 'Employees',
    },
    {
      link: '/vendors',
      label: 'Vendors',
    },
    {
      link: '/admin',
      label: 'Admin',
    },
  ];

  return (
    <AppBar id="app-bar" position="fixed">
      <Toolbar className="bc-top-bar">
        <Link to="/" className="logo-brand">
          <img src={LogoSvg} alt="logo" />
        </Link>
        <ul className="header-nav">
          {NAV_DATA.map((item, idx) => {
            return (
              <li key={idx} className={`nav-item ${pathName === item.link ? 'active' : ''}`} tabIndex={0}>
                <Link to={item.link}>{item.label}</Link>
              </li>
            );
          })}
        </ul>

        <ul className="header-tools">
          <li>
            <Button variant="contained" className="header-tools-btn" color="primary">
              <img src={HelpIconSvg} alt="Help" />
            </Button>
            <Button variant="contained" className="header-tools-btn" color="primary">
              <img src={SettingIconSvg} alt="Help" />
            </Button>
            <Button variant="contained" className="header-tools-btn" color="primary">
              <img src={BellIconSvg} alt="Help" />
            </Button>
          </li>
        </ul>
        <div className="account">
          <div className="avatar">
            <img src={AvatarImg1} alt="avatar" />
            J.Mactavish
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
