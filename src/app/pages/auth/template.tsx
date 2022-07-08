import React, { useEffect, useState } from 'react';
import BCSnackbar from "../../components/bc-snackbar/bc-snackbar";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import BCModal from "../../modals/bc-modal";
import BCSpinnerer from "../../components/bc-spinner/bc-spinner";
import styles from './template.styles';
import {withStyles} from "@material-ui/core/styles";
import moment from "moment/moment";


interface Props {
  isLoading: boolean;
  children?: React.ReactNode;
  classes: any;
}

function AuthTemplatePage({  isLoading, children, classes}: Props) : JSX.Element | null {

  return (
    <div className={classes.root}>
      <BCSnackbar topRight />

      <Grid
        container
        style={{ 'flex': '1 1 100%' }}>
        <Grid
          className={classes.leftSection}
          item
          md={6}
        />
      </Grid>
      <Grid
        className={classes.formGrid}
        item
        md={6}>
        {children}
      </Grid>
      <Grid
        className={classes.footer}
        container>
        <span>
          <Link
            className={classes.link}
            to={'https://www.blueclerk.com'}>
            {'BlueClerk'}
          </Link>
          {' '}
          {`© ${moment().format('YYYY')}`}
        </span>
        <span>
          {'Phone:512-846-6035'}
        </span>
        <span>
          <a
            className={classes.link}
            href={'mailto:chris.norton1@blueclerk.com'}>
            {'BlueClerk Support'}
          </a>
        </span>
      </Grid>
      <BCModal />
      {isLoading && <BCSpinnerer />}
    </div>
  );
}

export default withStyles(styles, { 'withTheme': true })(AuthTemplatePage);
