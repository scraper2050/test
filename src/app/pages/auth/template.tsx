import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BCSnackbar from "../../components/bc-snackbar/bc-snackbar";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import BCModal from "../../modals/bc-modal";
import BCSpinnerer from "../../components/bc-spinner/bc-spinner";
import styles from './template.styles';
import {withStyles} from "@material-ui/core/styles";
import moment from "moment/moment";
import SignUpSuccess from "./signup/components/signup_success";
import { info } from '../../../actions/snackbar/snackbar.action';


interface Props {
  isLoading: boolean;
  success?: boolean;
  children?: React.ReactNode;
  classes: any;
}

function AuthTemplatePage({isLoading, children, success = false, classes}: Props) : JSX.Element | null {
  const dispatch = useDispatch();
  const snackbarState = useSelector((state: any) => state.snackbar);

  const dispatchResetInfoSnackbar = () => {
    dispatch(info(''));
  }

  return (
    <div className={classes.root}>
      <BCSnackbar topRight dispatchResetInfoSnackbar={dispatchResetInfoSnackbar} snackbarState={snackbarState} />
      {success ? <SignUpSuccess /> :
        <>
          <Grid
            container
            style={{ 'flex': '1 1 100%' }}>
            <Grid
              className={classes.leftSection}
              item
              md={6}
            />
            <Grid
              className={classes.formGrid}
              item
              md={6}>
              {children}
            </Grid>
          </Grid>
        </>
      }
      <Grid
        className={classes.footer}
        container>
        <span>
          <Link
            className={classes.link}
            to={'https://www.blueclerk.com'}>
            {`BlueClerk © ${moment().format('YYYY')}`}
          </Link>
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


