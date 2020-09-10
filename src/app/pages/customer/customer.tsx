import * as CONSTANTS from '../../../constants';
import BCSidebar from '../../components/bc-sidebar/bc-sidebar';
import BCSubHeader from '../../components/bc-sub-header/bc-sub-header';
import BCTableContainer from '../../components/bc-table-container/bc-table-container';
import BCTabs from '../../components/bc-tab/bc-tab';
import BCToolBarSearchInput from '../../components/bc-toolbar-search-input/bc-toolbar-search-input';
import Fab from '@material-ui/core/Fab';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';
import styles from './customer.styles';
import { Button, Grid, List, ListItem, withStyles } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const LINK_DATA = [
  {
    'label': 'Customer List',
    'link': '/customers/customer-list'
  },
  {
    'label': 'New Customer',
    'link': '/customers/new-customer'
  },
  {
    'label': 'Schedule/Jobs',
    'link': '/customers/schedule'
  }
];

function CustomersPage({ classes }: any) {
  const location = useLocation();
  const pathName = location.pathname;
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);
  const [contacts] = useState([
    {
      'email': 'test@gmail.com',
      'name': 'Faraz Sarwar',
      'phone': '12345678910'
    },
    {
      'email': 'test123@gmail.com',
      'name': 'Test User',
      'phone': '22222222222'
    },
    {
      'email': 'admin@gmail.com',
      'name': 'Admin User',
      'phone': '12331123212'
    }
  ]);
  const columns: any = [
    {
      'Header': 'First Name',
      'accessor': 'name',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Phone',
      'accessor': 'phone',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Email',
      'accessor': 'email',
      'sortable': true
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          <Fab
            aria-label={'delete'}
            classes={{
              'root': classes.fabRoot
            }}
            color={'primary'}
            variant={'extended'}>
            {'View More'}
          </Fab>
        </div>;
      },
      'id': 'action',
      'sortable': false,
      'width': 60
    }
  ];

  useEffect(() => {
  }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const onClickLink = (strLink: string): void => {
    history.push(strLink);
  };

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  return (
    <>
      <BCSubHeader title={'Customers'}>
        <BCToolBarSearchInput style={{
          'marginLeft': 'auto',
          'width': '321px'
        }}
        />
        <CustomerButton variant={'contained'}>
          <Link to={'/customers/new-customer'}>
            {'New Customer'}
          </Link>
        </CustomerButton>
      </BCSubHeader>

      <MainContainer>
        <BCSidebar>
          <StyledList aria-label={'customers sidebar list'}>
            {LINK_DATA.map((item, idx) => {
              if (item.label === 'Customer List') {
                return (
                  <StyledListItem
                    button
                    key={idx}
                    onClick={() => onClickLink(item.link)}
                    selected={
                      pathName === item.link || pathName === '/customers'
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
        </BCSidebar>
        <PageContainer>
          <BCTabs
            curTab={curTab}
            indicatorColor={'primary'}
            onChangeTab={handleTabChange}
            tabsData={[
              {
                'label': 'Customer List',
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
              <BCTableContainer
                columns={columns}
                onRowClick={handleRowClick}
                search
                tableData={contacts}
              />
            </DataContainer>
            <DataContainer
              hidden={curTab !== 1}
              id={'1'}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                />
              </Grid>
            </DataContainer>
          </SwipeableViews>
        </PageContainer>
      </MainContainer>
    </>
  );
}

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
  background-color: ${CONSTANTS.SECONDARY_GREY};
  box-shadow: 0px 4px 4px ${CONSTANTS.SECONDARY_DARK_GREY};

  a {
    text-decoration: none;
    color: ${CONSTANTS.PRIMARY_DARK};
  }
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

export default withStyles(
  styles,
  { 'withTheme': true }
)(CustomersPage);
