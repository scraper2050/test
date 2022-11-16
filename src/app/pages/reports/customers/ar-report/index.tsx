import BCTabs from 'app/components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import styles from './styles';
import { withStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import BCBackButton from 'app/components/bc-back-button/bc-back-button';
import ARStandardReports from "./ar-standard";
import ARMemorizedReports from "./ar-memorized";
import { setReportShowing } from 'actions/report/report.action'
import ARCustomReport from "./ar-custom";

const chartData = [
  ["Element", "Density", { role: "style" }],
  ["Copper", 8.94, "#b87333"], // RGB value
  ["Silver", 10.49, "silver"], // English color name
  ["Gold", 19.3, "gold"],
  ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
];

function ARReportPage({ classes }: any) {
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
                'label': 'Accounts Receivable',
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
                {location?.state?.type === 'custom' ? <ARCustomReport /> : <ARStandardReports />}

              </div>
              <div
                className={classes.dataContainer}
                hidden={curTab !== 1}
                id={'1'}>
                <ARMemorizedReports />
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
)(ARReportPage);
