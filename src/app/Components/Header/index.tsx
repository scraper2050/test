import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  SwipeableDrawer,
  Button,
  Divider,
  IconButton,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

import LogoSvg from "../../../assets/img/Logo.svg";
import HelpIconSvg from "../../../assets/img/Help-Icon.svg";
import SettingIconSvg from "../../../assets/img/Setting-Icon.svg";
import BellIconSvg from "../../../assets/img/Bell-Icon.svg";
import AvatarImg1 from "../../../assets/img/avatars/1.jpg";

import "./styled.scss";

const Header = (): JSX.Element => {
  const location = useLocation();
  const pathName = location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_DATA = [
    {
      link: "/dashboard",
      label: "Dashboard",
    },
    {
      link: "/customers",
      label: "Customers",
    },
    {
      link: "/invoicing",
      label: "Invoicing",
    },
    {
      link: "/tags",
      label: "Tags",
    },
    {
      link: "/inventory",
      label: "Inventory",
    },
    {
      link: "/employees",
      label: "Employees",
    },
    {
      link: "/vendors",
      label: "Vendors",
    },
    {
      link: "/admin",
      label: "Admin",
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar id="app-bar" position="fixed">
      <Toolbar className="bc-top-bar">
        <div className="bc-top-bar__drawer">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <SwipeableDrawer
            anchor="left"
            open={mobileOpen}
            onOpen={handleDrawerToggle}
            onClose={handleDrawerToggle}
          >
            <div className="nav-items">
              <Link to="/" className="logo-brand">
                <img src={LogoSvg} alt="logo" />
              </Link>
              {NAV_DATA.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={`nav-item ${
                      pathName.indexOf(item.link) === 0 ? "active" : ""
                    }`}
                    tabIndex={0}
                    onClick={handleDrawerToggle}
                  >
                    <Link to={item.link}>{item.label}</Link>
                    <Divider />
                  </div>
                );
              })}
            </div>
          </SwipeableDrawer>
        </div>

        <Link to="/" className="logo-brand">
          <img src={LogoSvg} alt="logo" />
        </Link>

        <ul className="header-nav">
          {NAV_DATA.map((item, idx) => {
            return (
              <li
                key={idx}
                className={`nav-item ${
                  pathName.indexOf(item.link) === 0 ? "active" : ""
                }`}
                tabIndex={0}
              >
                <Link to={item.link}>{item.label}</Link>
              </li>
            );
          })}
        </ul>

        <ul className="header-tools">
          <li>
            <Button
              variant="contained"
              className="header-tools-btn"
              color="primary"
            >
              <img src={HelpIconSvg} alt="Help" />
            </Button>
            <Button
              variant="contained"
              className="header-tools-btn"
              color="primary"
            >
              <img src={SettingIconSvg} alt="Help" />
            </Button>
            <Button
              variant="contained"
              className="header-tools-btn"
              color="primary"
            >
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
