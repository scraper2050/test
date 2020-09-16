import BCAdminCard from '../../../components/bc-admin-card/bc-admin-card';
import BuildIcon from '@material-ui/icons/Build';
import { Grid } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import React from 'react';
import styled from 'styled-components';

function RolesPermissionsPage() {
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
                cardText={'Manager'}
                color={'info'}
                link={'/main/admin/roles-permissions/manager-list'}>
                <GroupIcon />
              </BCAdminCard>
            </Grid>
            <Grid
              item>
              <BCAdminCard
                cardText={'Technician'}
                color={'primary'}
                link={'/main/admin/roles-permissions/technician-list'}>
                <BuildIcon />
              </BCAdminCard>
            </Grid>
            <Grid
              item>
              <BCAdminCard
                cardText={'Roles'}
                color={'secondary'}
                link={'/main/admin/roles-permissions/view-roles'}>
                <HowToRegIcon />
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

export default RolesPermissionsPage;
