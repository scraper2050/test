import BCBackButton from '../../../../components/bc-back-button/bc-back-button';
import { Grid } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

function AdminInvoicingItemsPage() {
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
            <BCBackButton
              link={'/main/admin/invoicing'}
            />
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

export default AdminInvoicingItemsPage;
