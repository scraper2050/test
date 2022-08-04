import React, { useEffect, useState } from 'react';
import styles from '../signup.styles';
import { withStyles } from '@material-ui/core/styles';
import logoWhite from '../../../../../assets/img/logo_white.png';
import {Link} from "@material-ui/core";

interface Props {
  classes: any
}

function SignUpSuccess({ classes }: Props): JSX.Element {
  return (
    <div className={classes.successContainer}>
      <img
        alt={'BC-Logo'}
        src={logoWhite}
        className={classes.logoimg}
      />
      <div>
        <p className={classes.successTitle}>
          Thank you for signing up!
        </p>
        <p className={classes.successText}>
          We have received your account information. Kindly wait for the<br/>
          confirmation email before accessing your account.
        </p>
      </div>
      <p className={classes.successLogIn}>
        Already have an account? <Link href={'/login'} color={'inherit'} underline={'always'}>Log in</Link>
      </p>
    </div>
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(SignUpSuccess);


