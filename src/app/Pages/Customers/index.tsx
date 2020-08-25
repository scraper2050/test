import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import styled from 'styled-components';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import SwipeableViews from 'react-swipeable-views';

import * as CONSTANTS from '../../../constants';

import Header from '../../../app/Components/Header';
import SubHeader from '../../../app/Components/SubHeader';
import BCTabs from '../../../app/Components/BCTabs';
import BCTable from '../../../app/Components/BCTable';
import CountListMaterialExperiment from '../../../app/Components/TableTest';
import Sidebar from '../../../app/Components/Sidebar';
import ToolBarSearchInput from '../../../app/Components/ToolBarSearchInput';

const LINK_DATA = [
  { label: 'Customer List', link: '/customers/customer-list' },
  { label: 'New Customer', link: '/customers/new-customer' },
  { label: 'Schedule/Jobs', link: '/customers/manager' },
];

const headCells = [
  {
    id: 'no',
    label: 'No',
    sortable: true,
  },
  {
    id: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    id: 'phone',
    label: 'Phone',
    sortable: true,
  },
  {
    id: 'email',
    label: 'Email',
    sortable: true,
  },
  {
    id: 'view',
    label: 'View',
    sortable: false,
  },
];

const table_data = [
  {
    id: 0,
    no: 1,
    name: 'Shelly Poehler',
    phone: '972816823',
    email: 'Blueclerktest@yopmail.com',
  },
];

const CustomersPage = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const onClickLink = (strLink: string): void => {
    history.push(strLink);
  };

  return (
    <>
      <Header />
      <div className="main-container">
        <SubHeader title="Customers">
          <ToolBarSearchInput style={{ marginLeft: 'auto', width: '321px' }} />
          <ImportButton variant="contained">Import</ImportButton>
          <CustomerButton variant="contained">New Customer</CustomerButton>
        </SubHeader>

        <MainContainer>
          <Sidebar>
            <StyledList aria-label="people sidebar list">
              {LINK_DATA.map((item, idx) => (
                <StyledListItem
                  key={idx}
                  button
                  selected={pathName === item.link}
                  onClick={() => onClickLink(item.link)}
                >
                  {item.label}
                </StyledListItem>
              ))}
            </StyledList>
          </Sidebar>

          <PageContainer>
            <BCTabs
              curTab={curTab}
              onChangeTab={handleTabChange}
              indicatorColor="primary"
              tabsData={[
                { value: 0, label: 'Customer List' },
                { value: 1, label: 'Recent Activities' },
              ]}
            />
            <SwipeableViews index={curTab}>
              <DataContainer id="0" hidden={curTab !== 0}>
                <BCTable tableData={table_data} headCells={headCells} pagination={true} />
              </DataContainer>
              <DataContainer id="1" hidden={curTab !== 1}>
                <Grid container>
                  <Grid item xs={12}></Grid>
                </Grid>
              </DataContainer>
            </SwipeableViews>
          </PageContainer>
        </MainContainer>
      </div>
    </>
  );
};

const ImportButton = styled(Button)`
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
  background-color: ${CONSTANTS.PRIMARY_WHITE};
  box-shadow: 0px 4px 4px ${CONSTANTS.SECONDARY_DARK_GREY};
`;

const CustomerButton = styled(Button)`
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

export default CustomersPage;
