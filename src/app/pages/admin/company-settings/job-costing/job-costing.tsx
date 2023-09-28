import styled from 'styled-components';
import styles from './job-costing.style';
import { withStyles } from '@material-ui/core';
import BCItemTiers from '../../../../components/bc-item-tiers/bc-item-tiers';
import BCInvoiceNumber from 'app/components/bc-invoice-number/bc-invoice-number';

import React, { useState } from 'react';

import BCTabs from 'app/components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import BCSalesTax from 'app/components/bc-sales-tax/bc-sales-tax';
import BCJobCosting from 'app/components/bc-job-costing/bc-job-costing'
import BCPayementTerms from 'app/components/bc-payement-terms/bc-payement-terms';

interface Props {
    classes: any;
    children?: React.ReactNode;
}

function AdminJobCostingPage({ classes, children }: Props) {
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
                                'label': 'Job Costing',
                                'value': 0
                            }
                        ]}
                    />
                </div>

                <SwipeableViews index={curTab} className={'swipe_wrapper'}>
                    <div
                        hidden={curTab !== 0}
                        id={'0'}>
                        <BCJobCosting />
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
)(AdminJobCostingPage);
