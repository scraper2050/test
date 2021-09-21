import React from 'react';
import classnames from 'classnames';
import { createStyles, makeStyles, useTheme, Theme, withStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from "./bc-admin-layout.style";
import * as CONSTANTS from "../../../constants";
import BCAdminHeader from "../bc-admin-header/bc-admin-header";
import BCAdminSidebar from "../bc-admin-sidebar/bc-admin-sidebar";
import BCModal from "../../modals/bc-modal";
import BCSnackbar from "../bc-snackbar/bc-snackbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: CONSTANTS.PRIMARY_WHITE
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
      minHeight: '100vh',
      flexGrow: 1,
      padding: theme.spacing(0),
      backgroundColor: CONSTANTS.PRIMARY_WHITE,
      overflow: 'hidden',
    },
    blankContainer: {
      display: 'flex',
      flex: '1 1 100%',
      overflowX: 'hidden',
      width: '100%',
      backgroundColor: CONSTANTS.PRIMARY_WHITE
    }
  }),
);

interface Props {
  classes: any;
  children: React.ReactNode
}

function BCAdminLayout({classes, children}: Props) {
  const themClasses = useStyles();
  const theme = useTheme();
  const sidebarCollapse = localStorage.getItem('sidebarCollapse');
  const [open, setOpen] = React.useState(sidebarCollapse === 'false' ? false : true);

  return (
    <div className={themClasses.root}>
      <BCSnackbar />
      <CssBaseline />
      <BCAdminHeader
        drawerOpen={open}
        drawerToggle={() => {
          localStorage.setItem('sidebarCollapse', new Boolean(!open).toString());
          setOpen(!open);
        }}
      />

      <BCAdminSidebar
        open={open}
      />

      <main className={themClasses.content}>
        <div className={themClasses.toolbar} />
        {children ? children : <div className={classes.blankContainer}/>}
      </main>
      <BCModal />
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCAdminLayout);
