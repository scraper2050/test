import BCTabs from './../../../components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import styles from './payroll.styles';
import { withStyles } from '@material-ui/core';
import React, { useState } from 'react';

import Payroll from "./payroll-listing";

function AdminPayrollPage({ classes }: any) {
  const [curTab, setCurTab] = useState(0);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
          <BCTabs
            curTab={curTab}
            indicatorColor={'primary'}
            onChangeTab={handleTabChange}
            tabsData={[
              {
                'label': 'Vendors',
                'value': 0
              },
            ]}
          />
          <div className={classes.addButtonArea}>
            <SwipeableViews index={curTab}>
              <div
                className={classes.dataContainer}
                hidden={curTab !== 0}
                id={'0'}>
                <Payroll />
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
)(AdminPayrollPage);
