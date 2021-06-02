import BCBackButton from '../../../../components/bc-back-button/bc-back-button';
import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import styles from './items.styles';
import { Fab, Grid, withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { loadInvoiceItems } from 'actions/invoicing/items/items.action';

import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { modalTypes } from '../../../../../constants';
import { Item } from 'actions/invoicing/items/items.types';
import { getAllSalesTaxAPI } from 'api/tax.api';


interface Props {
  classes: any;
}

function AdminInvoicingItemsPage({ classes }:Props) {
  const renderEdit = (item: Item) => {
    dispatch(setModalDataAction({
      'data': {
        item,
        'modalTitle': 'Edit Item'
      },
      'type': modalTypes.EDIT_ITEM_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const columns: any = [
    {
      'Header': 'Name',
      'accessor': 'name',
      'sortable': true,
      'width': 60
    },
    {
      Cell({ row }: any) {
        return (
          <p>
            {row.original.isFixed
              ? 'Fixed'
              : 'Hourly'}
          </p>
        );
      },
      'Header': 'Charge Type',
      'accessor': 'isFixed',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        return (
          <p>
            {'$'}
            {row.original.charges}
          </p>
        );
      },
      'Header': 'Charge',
      'accessor': 'charges',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        return (
          <p>
            {row.original.tax
              ? 'Yes'
              : 'No'}
          </p>
        );
      },
      'Header': 'Taxable',
      'accessor': 'tax',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        return (
          <div className={'flex items-center'}>
            <Fab
              aria-label={'edit'}
              classes={{
                'root': classes.fabRoot
              }}
              color={'primary'}
              onClick={() => renderEdit(row.original)}
              size={'small'}
              style={{
                'marginRight': 10,
                'width': 60
              }}
              variant={'extended'}>
              {'Edit'}
            </Fab>
          </div>
        );
      },
      'id': 'action',
      'sortable': false,
      'width': 60
    }
  ];
  const dispatch = useDispatch();
  const { loading, error, items } = useSelector(({ invoiceItems }:RootState) => invoiceItems);

  useEffect(() => {
    dispatch(loadInvoiceItems.fetch());
    dispatch(getAllSalesTaxAPI());
    localStorage.setItem('nestedRouteKey', 'items');
  }, []);

  return (
    <MainContainer>
      <BCBackButton
        link={'/main/admin/invoicing'}
      />
      <PageContainer>
        <Grid
          container
          spacing={4}>
          <Grid
            item
            xs={11}>
            <BCTableContainer
              columns={columns}
              idLoading={loading}
              isPageSaveEnabled
              search
              searchPlaceholder={'Search items'}
              tableData={items}
            />
          </Grid>
        </Grid>
      </PageContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
  flex-direction: column;
  a {
     position: absolute;
     width: 100%;
     margin-top: 30px;
   }
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


export default withStyles(styles, { 'withTheme': true })(AdminInvoicingItemsPage);
