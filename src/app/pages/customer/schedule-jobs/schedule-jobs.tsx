import BCTabs from '../../../components/bc-tab/bc-tab';
import JobPage from './job-page/job-page';
import ServiceTicket from './service-ticket/service-ticket';
import SwipeableViews from 'react-swipeable-views';
import styles from './schedule-jobs.styles';
import React, { useEffect, useState } from 'react';
import { useTheme, withStyles } from '@material-ui/core';

function ScheduleJobsPage({ classes }: any) {
  console.log(classes);
  const [curTab, setCurTab] = useState(0);
  const theme = useTheme();

  useEffect(() => {
  }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  return (
    <div className={classes.scheduleMainContainer}>
      <div className={classes.schedulePageConatiner}>
        <BCTabs
          curTab={curTab}
          indicatorColor={'primary'}
          onChangeTab={handleTabChange}
          tabsData={[
            {
              'label': 'Jobs',
              'value': 0
            },
            {
              'label': 'Service Tickets',
              'value': 1
            }
          ]}
        />
        <SwipeableViews
          axis={theme.direction === 'rtl'
            ? 'x-reverse'
            : 'x'}
          index={curTab}>
          <JobPage hidden={curTab !== 0} />
          <ServiceTicket hidden={curTab !== 1} />
        </SwipeableViews>
      </div>
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(ScheduleJobsPage);
