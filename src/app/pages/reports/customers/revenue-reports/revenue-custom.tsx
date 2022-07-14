import React from 'react';
import { withStyles } from '@material-ui/core';

import styles from './revenue.styles';

const RevenueCustomReport = () => {
  return (
    <div>
      Revenue Custom Report
    </div>
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(RevenueCustomReport);