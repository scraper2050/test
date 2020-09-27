import BCTableContainer from './../../../components/bc-table-container/bc-table-container';
import BCTabs from './../../../components/bc-tab/bc-tab';
import Fab from '@material-ui/core/Fab';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';
import styles from './vendors.styles';
import { Grid, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVendors, loadingVendors } from 'actions/vendor/vendor.action';

function AdminVendorsPage({ classes }: any) {
  const dispatch = useDispatch();
  const vendors = useSelector((state: any) => state.vendors);
  const [curTab, setCurTab] = useState(0);
  const columns: any = [
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>{ row.index + 1 }</div>;
      },
      'Header': 'No#',
      'sortable': true,
      'width': 60
    },
    {
      'Header': 'Company Name',
      'accessor': 'contractor.info.companyName',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Status',
      'accessor': 'status',
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
    dispatch(loadingVendors());
    dispatch(getVendors());
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
                'label': 'Vendors List',
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
              (vendors.loading && !vendors.data.length)
              ? <div>Is Loading</div>
              : <DataContainer
                hidden={curTab !== 0}
                id={'0'}>
                <BCTableContainer
                  columns={columns}
                  onRowClick={handleRowClick}
                  search
                  tableData={vendors.data}
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
)(AdminVendorsPage);