import BCTableContainer from '../../components/bc-table-container/bc-table-container';
import BCTabs from '../../components/bc-tab/bc-tab';
import Fab from '@material-ui/core/Fab';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';
import styles from './customer.styles';
import { Grid, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

function CustomersPage({ classes }: any) {
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

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  return (
    <>
      {/* <BCSubHeader title={'Customers'}>
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
      </BCSubHeader> */}

      <MainContainer>
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
