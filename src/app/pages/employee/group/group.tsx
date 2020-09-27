import BCTabs from '../../../components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import styles from './group.styles';
import GroupListing from './group-listing/group-listing';
import React, { useEffect, useState } from 'react';
import { useTheme, withStyles } from '@material-ui/core';

function Group({ classes }: any) {
  const [curTab, setCurTab] = useState(0);
  const theme = useTheme();

  useEffect(() => {
  }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  return (
    <div className={classes.groupMainContainer}>
      <div className={classes.groupPageConatiner}>
        <BCTabs
          curTab={curTab}
          indicatorColor={'primary'}
          onChangeTab={handleTabChange}
          tabsData={[
            {
              'label': 'Group List',
              'value': 0
            },
            {
              'label': 'Recent Activities',
              'value': 1
            }
          ]}
        />
        <SwipeableViews
          axis={theme.direction === 'rtl'
            ? 'x-reverse'
            : 'x'}
          index={curTab}>
          <GroupListing hidden={curTab !== 0} />
        </SwipeableViews>
      </div>
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(Group);
