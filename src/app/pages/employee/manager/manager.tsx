import Api from 'utils/api';
import BCTable from '../../../components/bc-table/bc-table';
import BCTableSearchInput from '../../../components/bc-table-search-input/bc-table-search-input';
import BCTabs from '../../../components/bc-tab/bc-tab';
import { Grid } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { UserModel } from '../../../models/user';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

const headCells = [
  {
    'id': 'name',
    'label': 'Name',
    'sortable': true
  },
  {
    'id': 'contactName',
    'label': 'Contact Name',
    'sortable': true
  },
  {
    'id': 'email',
    'label': 'Email',
    'sortable': true
  }
];

const tableData = [
  {
    'contactName': 'BlueTest',
    'email': 'Blueclerktest@yopmail.com',
    'id': 0,
    'name': 'Shelly Poehler'
  }
];

function ManagerPage(): JSX.Element {
  const [curTab, setCurTab] = useState(0);
  const [searchStr, setSearchStr] = useState('');
  const [managerList, setManagerList] = useState<UserModel[]>([]); // eslint-disable-line

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  useEffect(
    () => {
      Api.post(
        '/getManagers',
        null
      )
        .then(res => {
          if (res.data.status === 1) {
            setManagerList([...res.data.users]);
          }
        })
        .catch(err => {
          console.log(
            'Get managers err:',
            err
          );
        });
    },
    []
  );

  return (
    <MainContainer>
      <PageContainer>
        <BCTabs
          curTab={curTab}
          indicatorColor={'primary'}
          onChangeTab={handleTabChange}
          tabsData={[
            {
              'label': 'Managers List',
              'value': 0
            },
            {
              'label': 'Recent Activities',
              'value': 1
            }
          ]}
        />
        <SwipeableViews index={curTab}>
          <DataContainer
            hidden={curTab !== 0}
            id={'0'}>
            <Grid container>
              <Grid
                item
                md={6}
                xs={12}>
                <BCTableSearchInput
                  onSearch={(str: string) => {
                    console.log('On Search');
                  }}
                  searchStr={searchStr}
                  setSearchStr={setSearchStr}
                  style={{ 'marginBottom': '11px' }}
                />
              </Grid>
              <Grid
                item
                md={12}>
                <BCTable
                  headCells={headCells}
                  pagination
                  tableData={tableData}
                />
              </Grid>
            </Grid>
          </DataContainer>
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
  padding: 30px;
  width: 100%;
  padding-left: 65px;
  padding-right: 65px;
  margin: 0 auto;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  margin-top: 12px;
`;

export default ManagerPage;
