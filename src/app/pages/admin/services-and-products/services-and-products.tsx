import BCAdminCard from '../../../components/bc-admin-card/bc-admin-card';
import { Grid } from '@material-ui/core';
import React, { useEffect } from "react";
import ReceiptIcon from '@material-ui/icons/Receipt';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import styled from 'styled-components';
import { connect, useDispatch } from "react-redux";
import { getCompanyProfileAction } from "../../../../actions/user/user.action";

function AdminServicesAndProductsPage({ user }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanyProfileAction(user?.company as string));
  }, [])

  return (
    <>
      <MainContainer>
        <PageContainer>
          <Grid
            container
            spacing={4}>
            <Grid
              item>
              <BCAdminCard
                cardText={'Items'}
                color={'secondary'}
                link={'/main/admin/services-and-products/services/services-and-products'}>
                <ReceiptIcon />
              </BCAdminCard>
            </Grid>
            <Grid
              item>
              <BCAdminCard
                cardText={'Discounts'}
                color={'primary-red'}
                link={'/main/admin/services-and-products/services/discounts'}>
                <LocalOfferIcon />
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

const mapStateToProps = (state: {
  auth: {
    user: any;
  };
}) => ({
  'user': state.auth.user
});

export default (connect(mapStateToProps)(AdminServicesAndProductsPage));
