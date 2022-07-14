import React from 'react';
import { withStyles } from '@material-ui/core';

import styles from './payroll.styles';

const PayrollReport = () => {
  return (
    <div>
      Payroll Report
    </div>
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(PayrollReport);