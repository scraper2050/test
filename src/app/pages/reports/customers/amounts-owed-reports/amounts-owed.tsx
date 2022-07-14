import React from 'react';
import { withStyles } from '@material-ui/core';

import styles from './amounts-owed.styles';

const AmountsOwedReport = () => {
  return (
    <div>
      Amounts Owed Report
    </div>
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(AmountsOwedReport);