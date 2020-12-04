import BCTabs from '../../../components/bc-tab/bc-tab';
import PurchaseOrderListing from './purchase-order-listing/purchase-order-listing';
import SwipeableViews from 'react-swipeable-views';
import styles from './purchase-order.styles';
import { useHistory } from 'react-router-dom';
import { Fab, useTheme, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

function PurchaseOrder({ classes }: any) {
  const [curTab, setCurTab] = useState(0);
  const theme = useTheme();
  const history = useHistory();

  useEffect(() => { }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };
  const openCreatePurchaseOrderPage = () => {
    history.push('/main/invoicing/create-purchase-order');
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
            onClick={() => openCreatePurchaseOrderPage()}
            variant={'extended'}>
            {'Create Purchase Order'}
          </Fab>
        </div>
        <div className={classes.pageContent}>
          <BCTabs
            curTab={curTab}
            indicatorColor={'primary'}
            onChangeTab={handleTabChange}
            tabsData={[
              {
                'label': 'Purchase Order',
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
            <PurchaseOrderListing hidden={curTab !== 0} />
          </SwipeableViews>
        </div>
      </div >
    </div >
  );
}

export default withStyles(styles, { 'withTheme': true })(PurchaseOrder);
