import BCTabs from '../../../components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import styles from './job-types.styles';
import JobTypesListing from './job-types-listing/job-types-listing';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Fab, useTheme, withStyles } from '@material-ui/core';
import { modalTypes } from '../../../../constants';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';

function JobTypesPage({ classes }: any) {
  const dispatch = useDispatch();
  const [curTab, setCurTab] = useState(0);
  const theme = useTheme();

  useEffect(() => { }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const openAddJobTypeModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Add Job Type',
        'removeFooter': false
      },
      'type': modalTypes.ADD_JOB_TYPE
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
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
                'label': 'Job Types List',
                'value': 0
              }
            ]}
          />
          <div className={classes.addButtonArea} >
            <Fab
              aria-label={'new-ticket'}
              classes={{
                'root': classes.fabRoot
              }}
              color={'primary'}
              onClick={() => openAddJobTypeModal()}
              variant={'extended'}>
              {'New Job Type'}
            </Fab>
          </div>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={curTab}>
            <JobTypesListing hidden={curTab !== 0} />
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles, { 'withTheme': true })(JobTypesPage);
