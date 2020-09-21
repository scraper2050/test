import BCTableContainer from '../../components/bc-table-container/bc-table-container';
import BCTabs from '../../components/bc-tab/bc-tab';
import Fab from '@material-ui/core/Fab';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';
import styles from './customer.styles';
import { Grid, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Customer } from './../../../actions/customer/customer.types';
import { getCustomers, loadingCustomers } from 'actions/customer/customer.action';

function CustomersPage({ classes }: any) {
  const dispatch = useDispatch();
  const customers = useSelector((state: any) => state.customers);


  // const initialCustomersState = [
  //   {
  //     'email': '',
  //     'name': '',
  //     'phone': ''
  //   }
  // ];
  // const [customers, setCustomers] = useState(initialCustomersState);
  const [curTab, setCurTab] = useState(0);
  const columns: any = [
    {
      'Header': 'Id',
      'accessor': '_id',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Name',
      'accessor': 'profile.displayName',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Phone',
      'accessor': 'contact.phone',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Email',
      'accessor': 'info.email',
      'className': 'font-bold',
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
    dispatch(loadingCustomers());
    dispatch(getCustomers());
  }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  return (
    <>
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

            { 
              (customers.loading && !customers.data.length)
              ? <div>Is Loading</div>
              : <DataContainer
                hidden={curTab !== 0}
                id={'0'}>
                <BCTableContainer
                  columns={columns}
                  onRowClick={handleRowClick}
                  search
                  tableData={customers.data}
                />
              </DataContainer>
            }          

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
