import styled from 'styled-components';
import styles from './company-settings.style';
import { withStyles } from '@material-ui/core';
import AdminIntegrationsPage from './integrations/integrations'

import React, { useState } from 'react';
import BCTabs from 'app/components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import AdminPricingItemsPage from './pricing-items-inside/pricing-items-inside';

interface Props {
  classes: any;
  children?: React.ReactNode;
}

function AdminCompanySettingsPage ({ classes, children }: Props) {
  const [curTab, setCurTab] = useState(0);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  return (
    <MainContainer>
      <div className={classes.tabContainer}>
        <BCTabs
          curTab={curTab}
          indicatorColor={'primary'}
          onChangeTab={handleTabChange}
          orientaion='vertical'
          
          tabsData={[
            {
              'label': 'Company Settings',
              'value': 0
            },
            {
              'label': 'Pricing/Items-inside',
              'value': 1
            },
            {
              'label': 'Integrations',
              'value': 2
            }
          ]}
        />
      </div>
      <PageContainer>
        <SwipeableViews index={curTab} className={'swipe_wrapper'}>
          <div
            className={`${classes.dataContainer} `}
            hidden={curTab !== 0}
            id={'0'}></div>
          <div
            hidden={curTab !== 1}
            id={'1'}>
            <AdminPricingItemsPage />
          </div>

          <div
            className={`${classes.dataContainer} `}
            hidden={curTab !== 2}
            id={'2'}>
              <AdminIntegrationsPage />
          </div>
          
        </SwipeableViews>
      </PageContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding-bottom: 30px;
  width: 100%;
  padding-left: 65px;
  padding-right: 65px;
  margin: 0 auto;
`;


export default withStyles(
  styles,
  { 'withTheme': true }
)(AdminCompanySettingsPage);
