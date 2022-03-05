import BCTabs from '../../../components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import styles from '../payroll.styles';
import {Grid, withStyles} from '@material-ui/core';
import React, { useState } from 'react';

import PayrollListing from "./past-payment-listing";
import BCBackButtonNoLink
  from "../../../components/bc-back-button/bc-back-button-no-link";
import {useHistory, useLocation} from "react-router-dom";

function PayrollPastPaymentPage({ classes }: any) {
  const history = useHistory();
  const location = useLocation();
  const obj: any = location.state;
  const [curTab, setCurTab] = useState(0);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const renderGoBack = () => {
    history.goBack();
  }

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
          <Grid container>
            {obj?.contractor && <BCBackButtonNoLink func={() => renderGoBack()} /> }
            <BCTabs
              curTab={curTab}
              indicatorColor={'primary'}
              onChangeTab={handleTabChange}
              tabsData={[
                {
                  'label': 'Payments',
                  'value': 0
                },
              ]}
            />
          </Grid>
          <div className={classes.addButtonArea}>
            <SwipeableViews index={curTab}>
              <div
                className={classes.dataContainer}
                hidden={curTab !== 0}
                id={'0'}>
                <PayrollListing />
              </div>
            </SwipeableViews>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(PayrollPastPaymentPage);
