import React from 'react';
import classnames from 'classnames';
import { createStyles, makeStyles, useTheme, Theme, withStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from "./bc-admin-layout.style";
import * as CONSTANTS from "../../../constants";
import BCAdminHeader from "../bc-admin-header/bc-admin-header";
import BCAdminSidebar from "../bc-admin-sidebar/bc-admin-sidebar";
import BCModal from "../../modals/bc-modal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      width: `calc(100% - ${theme.spacing(9) + 1}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: CONSTANTS.ADMIN_SIDEBAR_WIDTH,
      width: `calc(100% - ${CONSTANTS.ADMIN_SIDEBAR_WIDTH}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      height: '100vh',
      width: CONSTANTS.ADMIN_SIDEBAR_WIDTH,
    },
    drawerOpen: {
      width: CONSTANTS.ADMIN_SIDEBAR_WIDTH,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      backgroundColor: CONSTANTS.PRIMARY_WHITE
    },
  }),
);

interface Props {
  classes: any;
  children: React.ReactNode
}

function BCAdminLayout({classes, children}: Props) {
  const themClasses = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={themClasses.root}>
      <CssBaseline />
      <BCAdminHeader
        drawerOpen={open}
        drawerToggle={() => {
          setOpen(!open);
        }}
        collapsedClasses={classnames(themClasses.appBar, {
          [themClasses.appBarShift]: open,
        })}
      />

      <BCAdminSidebar
        open={open}
        drawerClasses={themClasses}
      />

      <main className={themClasses.content}>
        <div className={themClasses.toolbar} />
        {children}
      </main>
      <BCModal />
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCAdminLayout);
