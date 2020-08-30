import * as CONSTANTS from '../../../../constants';
import Api from 'utils/api';
import BCTable from '../../../components/BCTable';
import BCTabs from '../../../components/BCTabs';
import Sidebar from '../../../components/Sidebar';
import SubHeader from '../../../components/SubHeader';
import SwipeableViews from 'react-swipeable-views';
import TableSearchInput from '../../../components/TableSearchInput';
import ToolBarSearchInput from '../../../components/ToolBarSearchInput';
import { UserModel } from '../../../models/user';
import styled from 'styled-components';
import { Button, Grid, List, ListItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

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

const LINK_DATA = [
  { 'label': 'Groups',
    'link': '/employees/group' },
  { 'label': 'Technicians',
    'link': '/employees/technician' },
  { 'label': 'Managers',
    'link': '/employees/manager' },
  { 'label': 'Office Admin',
    'link': '/employees/office' }
];

function ManagerPage(): JSX.Element {
  const location = useLocation();
  const pathName = location.pathname;
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);
  const [searchStr, setSearchStr] = useState('');
  const [managerList, setManagerList] = useState<UserModel[]>([]); // eslint-disable-line

  const onClickLink = (strLink: string): void => {
    history.push(strLink);
  };
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
    <>
      <SubHeader title={'Employees'}>
        <ToolBarSearchInput style={{ 'marginLeft': 'auto',
          'width': '321px' }}
        />
        <EmployeeButton variant={'contained'}>
          {'New Employee'}
        </EmployeeButton>
      </SubHeader>

      <MainContainer>
        <Sidebar>
          <StyledList aria-label={'employees sidebar list'}>
            {LINK_DATA.map((item, idx) => {
              if (item.label === 'Groups') {
                return (
                  <StyledListItem
                    button
                    key={idx}
                    onClick={() => onClickLink(item.link)}
                    selected={
                      pathName === item.link || pathName === '/employees'
                    }>
                    {item.label}
                  </StyledListItem>
                );
              }
              return (
                <StyledListItem
                  button
                  key={idx}
                  onClick={() => onClickLink(item.link)}
                  selected={pathName === item.link}>
                  {item.label}
                </StyledListItem>
              );
            })}
          </StyledList>
        </Sidebar>

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
                  <TableSearchInput
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
    </>
  );
}

const EmployeeButton = styled(Button)`
  margin-left: 25px;
  border-radius: 2px;
  width: 192px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-transform: initial;
  color: ${CONSTANTS.PRIMARY_DARK};
  background-color: ${CONSTANTS.SECONDARY_GREY};
  box-shadow: 0px 4px 4px ${CONSTANTS.SECONDARY_DARK_GREY};
`;

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

const StyledList = styled(List)``;

const StyledListItem = styled(ListItem)`
  font-size: 16px;
  line-height: 20px;
  height: 40px;
  color: #000;
  padding-left: 41px;
  &.Mui-selected {
    background-color: #c4c4c4;
  }
`;
export default ManagerPage;
