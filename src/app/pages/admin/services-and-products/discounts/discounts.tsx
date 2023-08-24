import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import styles from './discounts.styles';
import { withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { getAllDiscountItemsAPI } from 'api/discount.api'

import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { modalTypes } from '../../../../../constants';
import { DiscountItem } from 'actions/discount/discount.types';
import { getAllSalesTaxAPI } from 'api/tax.api';
import {CSButton, CSButtonSmall} from "../../../../../helpers/custom";

interface Props {
  classes: any;
}


function AdminDiscountPage({ classes }:Props) {
  const dispatch = useDispatch();
  const { isLoading, discountItems} = useSelector(({ discountItems }:RootState) => discountItems);

  function Toolbar() {
    return (
      <>
        <CSButton
          color={'primary'}
          disableElevation
          onClick={renderAdd}
          size={'small'}
          style={{
            'color': 'white',
          }}
          variant={'contained'}>
          {'Add New'}
        </CSButton>
      </>
    )
  }

  const renderEdit = (discountItem: DiscountItem) => {
    dispatch(setModalDataAction({
      'data': {
        discountItem,
        'modalTitle': 'Edit Discount'
      },
      'type': modalTypes.EDIT_DISCOUNT_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const renderAdd = () => {
    dispatch(setModalDataAction({
      'data': {
        discountItem: {
          name: '',
          description: '',
          tax: 0,
          charges: 0,
        },
        'modalTitle': 'Add New Discount'
      },
      'type': modalTypes.ADD_DISCOUNT_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const columns: any = [
    {
      Cell({ row }: any) {
        return (
          <>
            <div style={{fontSize: 14, lineHeight: '16px', marginBottom: 7}}>
              {row.original.name}
            </div>
            <div style={{fontSize: 12, lineHeight: '14px', color: '#828282'}}>
              {row.original.description}
            </div>
          </>
        );
      },
      'Header': 'Name',
      'accessor': 'name',
      'sortable': true,
      'width': 100
    },
    {
      Cell({ row }: any) {
        return (
          <div>
            {row.original.isActive
              ? 'Active'
              : 'Inactive'}
          </div>
        );
      },
      'Header': 'Status',
      'accessor': 'isActive',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        return (
          <div>
            {row.original.isFixed
              ? 'Fixed'
              : 'Hourly'}
          </div>
        );
      },
      'Header': 'Charge Type',
      'accessor': 'isFixed',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        return (
          <div>
            {row.original.tax
              ? 'Yes'
              : 'No'}
          </div>
        );
      },
      'Header': 'Taxable',
      'accessor': 'tax',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        return (
          <div>
            {`-$ ${Math.abs(row.original.charges)}`}
          </div>
        );
      },
      'Header': 'Amount',
      'accessor': 'charges',
      'sortable': true
    },
    {
      'Header': 'Customer',
      'accessor': 'customer.profile.displayName',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        return (
          <div style={{textAlign: 'center'}}>
            {row.original.noOfItems || ''}
          </div>
        );
      },
      'Header': 'Minimum No. of Items',
      'accessor': 'noOfItems',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        return (
          <div className={'flex items-center'}>
            <CSButtonSmall
              aria-label={'edit'}
              color={'primary'}
              onClick={() => renderEdit(row.original)}
              size={'small'}
              style={{
                'marginRight': 10,
                'minWidth': 35,
                'padding': '5px 10px',
                'marginTop': 20,
                'marginBottom': 20,
              }}>
              <EditIcon />
            </CSButtonSmall>
          </div>
        );
      },
      'Header': 'Actions',
      'id': 'action',
      'sortable': false,
      'width': 60
    }
  ];


  useEffect(() => {
    dispatch(getAllDiscountItemsAPI());
    dispatch(getAllSalesTaxAPI());
    localStorage.setItem('nestedRouteKey', 'services/discounts');
  }, []);

  return (
    <MainContainer>
      <PageContainer>
        <BCTableContainer
          columns={columns}
          isLoading={isLoading}
          isPageSaveEnabled
          search
          searchPlaceholder={'Search Discount Item'}
          tableData={discountItems}
          toolbar={Toolbar()}
        />
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
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding: 30px;
  width: 100%;
`;


export default withStyles(styles, { 'withTheme': true })(AdminDiscountPage);
