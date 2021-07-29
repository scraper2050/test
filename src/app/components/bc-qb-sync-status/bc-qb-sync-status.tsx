import React from 'react';
import styles from './bc-qb-sync-status.style';
import { withStyles } from '@material-ui/core/styles';
import qbLogo from "../../../assets/img/integration-bg/quickbooks.png";
import classNames from "classnames";

interface Props {
  data: any;
  classes: any;
}


function isNotEmpty(str: string | undefined | null) {
  return !(!str || 0 === str.trim().length);
}

function BCQbSyncStatus({ data, classes }: Props) {
  return (
    isNotEmpty(data.quickbookId) ?
      <img className={classes.logo}
           alt={'logo'}
           title={'synced with QuickBooks'}
           src={qbLogo}
      /> :
      null
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCQbSyncStatus);
