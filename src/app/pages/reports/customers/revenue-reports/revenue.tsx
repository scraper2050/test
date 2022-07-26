import BCTabs from 'app/components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import styles from './revenue.styles';
import { withStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import BCBackButton from 'app/components/bc-back-button/bc-back-button';
import RevenueStandardReports from "./revenue-standard";
import RevenueMemorizedReports from "./revenue-memorized";
import { setReportShowing } from 'actions/report/report.action'

function AdminPayrollPage({ classes }: any) {
  const dispatch = useDispatch();
  const location = useLocation<any>();
  const isReportShowing = useSelector(({reportState}:any) => reportState.isReportShowing)
  const [curTab, setCurTab] = useState(0);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  useEffect(() => {
    dispatch(setReportShowing(false))
  }, []);

  useEffect(() => {
    if(location?.state?.tab !== undefined){
      setCurTab(location.state.tab);
    } 
  }, [location]);
  

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
          {isReportShowing && (
            <span className={classes.backButton}>
              <BCBackButton
                link={'/main/reports/'}
              />
            </span>
          )}
          <BCTabs
            curTab={curTab}
            indicatorColor={'primary'}
            onChangeTab={handleTabChange}
            tabsData={[
              {
                'label': 'Standard',
                'value': 0
              },
              {
                'label': 'Memorized',
                'value': 1
              },
            ]}
          />
          <div className={classes.addButtonArea}>
            <SwipeableViews index={curTab}>
              <div
                className={classes.dataContainer}
                hidden={curTab !== 0}
                id={'0'}>
                <RevenueStandardReports />
              </div>
              <div
                className={classes.dataContainer}
                hidden={curTab !== 1}
                id={'1'}>
                <RevenueMemorizedReports />
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
