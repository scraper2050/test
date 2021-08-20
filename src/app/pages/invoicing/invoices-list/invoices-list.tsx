import BCTabs from '../../../components/bc-tab/bc-tab';
import InvoicingListListing from './invoices-list-listing/invoices-list-listing';
import SwipeableViews from 'react-swipeable-views';
import styles from './invoices-list.styles';
import { useHistory } from 'react-router-dom';
import { Fab, useTheme, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CSButton } from "../../../../helpers/custom";

function InvoiceList({ classes }: any) {
  const [curTab, setCurTab] = useState(0);
  const theme = useTheme();
  const history = useHistory();

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const openCreateInvoicePage = () => {
    history.push('/main/invoicing/create-invoice');
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
                'label': 'Invoices',
                'value': 0
              }
              // {
              //   'label': 'Recent Activities',

              //   'value': 1
              // }
            ]}
          />
          <div className={classes.addButtonArea}>
          <CSButton
            aria-label={'new-ticket'}
            color={'primary'}
            onClick={() => openCreateInvoicePage()}
            variant={'contained'}>
            {'Custom Invoice'}
          </CSButton>
          </div>
          <SwipeableViews
            axis={
              theme.direction === 'rtl'
                ? 'x-reverse'
                : 'x'}
            index={curTab}>
            <InvoicingListListing hidden={curTab !== 0} />
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles, { 'withTheme': true })(InvoiceList);
