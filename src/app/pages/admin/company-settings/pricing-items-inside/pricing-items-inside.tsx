import styled from 'styled-components';
import styles from './pricing-items-inside.style';
import { withStyles } from '@material-ui/core';
import BCItemTiers from '../../../../components/bc-item-tiers/bc-item-tiers';

import React, { useState } from 'react';

import BCTabs from 'app/components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import BCSalesTax from 'app/components/bc-sales-tax/bc-sales-tax';
import BCJobCosting from 'app/components/bc-job-costing/bc-job-costing'

interface Props {
    classes: any;
    children?: React.ReactNode;
}

function AdminPricingItemsPage({ classes, children }: Props) {
    const [curTab, setCurTab] = useState(0);

    const handleTabChange = (newValue: number) => {
        setCurTab(newValue);
    };

    return (
        <MainContainer>
            
            <PageContainer>
                <div className={'tab_wrapper'}>
                    <BCTabs
                        curTab={curTab}
                        indicatorColor={'primary'}
                        onChangeTab={handleTabChange}
                        tabsData={[
                            {
                                'label': 'Pricing Tiers',
                                'value': 0
                            },
                            {
                                'label': 'Job Costing Tiers',
                                'value': 1
                            },
                            
                            {
                                'label': 'Sales tax',
                                'value': 2
                            }
                        ]}
                    />
                </div>

                <SwipeableViews index={curTab} className={'swipe_wrapper'}>
                    <div
                        className={`${classes.dataContainer} `}
                        hidden={curTab !== 0}
                        id={'0'}>
                        <BCItemTiers />
                    </div>
                    <div
                        hidden={curTab !== 1}
                        id={'1'}>
                        <BCJobCosting />
                    </div>
                    <div
                        hidden={curTab !== 2}
                        id={'2'}>
                        <BCSalesTax />
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
)(AdminPricingItemsPage);
