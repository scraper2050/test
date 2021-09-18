import BCTableContainer from '../../components/bc-table-container/bc-table-container';
import BCTabs from '../../components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import styles from './customer.styles';
import { Button, Grid, withStyles } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import {
  getCustomerDetailAction,
  getCustomers,
  loadingCustomers,
  loadingSingleCustomers
} from 'actions/customer/customer.action';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import BCQbSyncStatus from "../../components/bc-qb-sync-status/bc-qb-sync-status";

function CustomersPage({ classes }: any) {
  const dispatch = useDispatch();
  const customers = useSelector((state: any) => state.customers);
  const [curTab, setCurTab] = useState(0);
  const history = useHistory();

  const location = useLocation<any>();
  const locationState = location.state;

  const prevPage =
    locationState && locationState.prevPage ? locationState.prevPage : null;

  const [currentPage, setCurrentPage] = useState({
    'page': prevPage ? prevPage.page : 0,
    'pageSize': prevPage ? prevPage.pageSize : 10,
    'sortBy': prevPage ? prevPage.sortBy : []
  });

  const columns: any = [
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
      Cell({ row }: any) {
        return (
          <BCQbSyncStatus data={row.original} />
        );
      },
      'id': 'qbSync',
      'sortable': false,
      'width': 30
    }
  ];

  useEffect(() => {
    dispatch(loadingCustomers());
    dispatch(getCustomers());
  }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const handleRowClick = (event: any, row: any) => renderViewMore(row);

  const renderViewMore = (row: any) => {
    const baseObj = row.original;
    let customerName =
      baseObj.profile && baseObj.profile !== undefined
        ? baseObj.profile.displayName
        : 'N/A';
    const customerId = row.original._id;
    const customerObj = { customerName,
      customerId,
      currentPage };
    customerName =
      customerName !== undefined
        ? customerName.replace(/ /g, '')
        : 'customername';
    localStorage.setItem('nestedRouteKey', `${customerName}`);
    dispatch(loadingSingleCustomers());
    dispatch(getCustomerDetailAction(customerObj));
    history.push({
      'pathname': `customers/${customerName}`,
      'state': customerObj
    });
  };

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
          <BCTabs
            curTab={curTab}
            indicatorColor={'primary'}
            onChangeTab={handleTabChange}
            tabsData={[
              {
                'label': 'Customer List',
                'value': 0
              }
              /*
               * {
               *   label: "Recent Activities",
               *   value: 1,
               * },
               */
            ]}
          />
          <SwipeableViews index={curTab}>
            <div
              className={classes.dataContainer}
              hidden={curTab !== 0}
              id={'0'}>
              <BCTableContainer
                columns={columns}
                currentPage={currentPage}
                isLoading={customers.loading}
                isPageSaveEnabled
                onRowClick={handleRowClick}
                search
                setPage={setCurrentPage}
                tableData={customers.data}
              />
            </div>
            <div
              hidden={curTab !== 1}
              id={'1'}>
                <Grid
                  item
                  xs={12}
                />
            </div>
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles, { 'withTheme': true })(CustomersPage);
