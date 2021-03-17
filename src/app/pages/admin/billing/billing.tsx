import BCAdminCard from '../../../components/bc-admin-card/bc-admin-card';
import { Grid } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import MoneyIcon from '@material-ui/icons/Money';
import React from 'react';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

function BillingPage() {
  const history = useHistory();


  const renderViewMore = (nestedRouteKey: string) => {
    localStorage.setItem("nestedRouteKey", `${nestedRouteKey}`);


    history.push({
      pathname: `/main/admin/billing/${nestedRouteKey}`,
    });
  }



  return (
    <>
      {/* <BCSubHeader title={'Admin'}>
        <BCToolBarSearchInput style={{
          'marginLeft': 'auto',
          'width': '321px'
        }}
        />
      </BCSubHeader> */}

      <MainContainer>
        <PageContainer>
          <Grid
            container
            spacing={4}>
            <Grid
              item>
              <BCAdminCard
                cardText={'Billing Methods'}
                color={'primary'}
                func={() => renderViewMore("billing-methods")}>
                <MoneyIcon />
              </BCAdminCard>
            </Grid>
            <Grid
              item>
              <BCAdminCard
                cardText={'History'}
                color={'secondary'}
                link={'/main/admin/billing/billing-history'}>
                <HistoryIcon />
              </BCAdminCard>
            </Grid>
            <Grid
              item>
              <BCAdminCard
                cardText={'Subscriptions'}
                color={'info'}
                link={'/main/admin/billing/subscription'}>
                <SubscriptionsIcon />
              </BCAdminCard>
            </Grid>
          </Grid>
        </PageContainer>
      </MainContainer>
    </>
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
  padding: 30px;
  width: 100%;
  padding-left: 65px;
  padding-right: 65px;
  margin: 0 auto;
`;

export default BillingPage;
