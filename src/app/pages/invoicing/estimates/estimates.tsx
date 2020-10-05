import BCTabs from '../../../components/bc-tab/bc-tab';
import EstimatesListing from './estimates-listing/estimates-listing';
import SwipeableViews from 'react-swipeable-views';
import styles from './estimates.styles';
import { useHistory } from 'react-router-dom';
import { Fab, useTheme, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

function Estimates({ classes }: any) {
  const [curTab, setCurTab] = useState(0);
  const theme = useTheme();
  const history = useHistory();

  useEffect(() => { }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };
  const openCreateEstimatesPage = () => {
    history.push('/main/invoicing/create-estimates');
  };

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.topActionBar}>
          <Fab
            aria-label={'new-ticket'}
            classes={{
              'root': classes.fabRoot
            }}
            color={'primary'}
            onClick={() => openCreateEstimatesPage()}
            variant={'extended'}>
            {'Create Estimate'}
          </Fab>
        </div>
        <div className={classes.pageContent}>
          <BCTabs
            curTab={curTab}
            indicatorColor={'primary'}
            onChangeTab={handleTabChange}
            tabsData={[
              {
                'label': 'Estimates List',
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
            <EstimatesListing hidden={curTab !== 0} />
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles, { 'withTheme': true })(Estimates);
