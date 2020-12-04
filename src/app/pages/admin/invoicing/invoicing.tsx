import BCAdminCard from '../../../components/bc-admin-card/bc-admin-card';
import { Grid } from '@material-ui/core';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import MoneyIcon from '@material-ui/icons/Money';
import React from 'react';
import ReceiptIcon from '@material-ui/icons/Receipt';
import styled from 'styled-components';

function AdminInvoicingPage() {
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
                cardText={'Sales Tax'}
                color={'primary'}
                link={''}>
                <MoneyIcon />
              </BCAdminCard>
            </Grid>
            <Grid
              item>
              <BCAdminCard
                cardText={'Items'}
                color={'secondary'}
                link={'/main/admin/invoicing/items'}>
                <ReceiptIcon />
              </BCAdminCard>
            </Grid>
            <Grid
              item>
              <BCAdminCard
                cardText={'Invoice Number'}
                color={'info'}
                link={''}>
                <InsertDriveFileIcon />
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

export default AdminInvoicingPage;
