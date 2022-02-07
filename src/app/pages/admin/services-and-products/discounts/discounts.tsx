import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import styles from './discounts.styles';
import { Button, Fab, Grid, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { loadInvoiceItems } from 'actions/invoicing/items/items.action';

import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { PRIMARY_GREEN, PRIMARY_ORANGE, PRIMARY_RED, modalTypes } from '../../../../../constants';
import { Item } from 'actions/invoicing/items/items.types';
import { getAllSalesTaxAPI } from 'api/tax.api';
import BCDebouncedInput from 'app/components/bc-input/bc-debounced-input';
import { addTierApi, updateItems } from 'api/items.api';
import { error as SnackBarError, success } from 'actions/snackbar/snackbar.action';
import BCQbSyncStatus from "../../../../components/bc-qb-sync-status/bc-qb-sync-status";
import {CSButton, CSButtonSmall} from "../../../../../helpers/custom";
import {stringSortCaseInsensitive} from "../../../../../helpers/sort";


interface Props {
  classes: any;
}

const normalizeTiers = (tiers:any) => {
  const obj:any = {};

  tiers.forEach((tier:any) => {
    obj[tier.tier._id] = tier;
  });

  return obj;
};


function AdminInvoicingItemsPage({ classes }:Props) {
  const dispatch = useDispatch();
  const { loading, error, items } = useSelector(({ invoiceItems }:RootState) => invoiceItems);
  const [localItems, setLocalItems] = useState(stringSortCaseInsensitive(items, 'name'));
  const [columns, setColumns] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleUpdateAllTiers = async () => {
    setUpdating(true);
    let hasError:any = '';
    const payload = localItems.map((item:any) => {
      const tiers = Object.keys(item.tiers).map((tierId:any) => {
        if (item.tiers[tierId].tier.isActive && !item.tiers[tierId].charge) {
          if (!hasError) {
            hasError = tierId + item.tiers[tierId].tier.name;
          }
        }
        return {
          tierId,
          'charge': item.tiers[tierId].tier.isActive
            ? item.tiers[tierId].charge
            : undefined
        };
      });

      const activeTiers = tiers.filter(({ charge }) => charge);
      return {
        'itemId': item._id,
        'tiers': activeTiers
      };
    });

    if (hasError) {
      setUpdating(false);
      dispatch(SnackBarError('Please fill in all tier prices'));
    }

    if (payload && !hasError) {
      const response = await updateItems(payload).catch(err => {
        dispatch(SnackBarError(err.message));
        setEditMode(false);
      });
      if (response) {
        dispatch(success('Tier pricing successfully updated'));
        setEditMode(false);
        setUpdating(false);
      }
    }
  };

  function Toolbar() {
    return editMode
      ? <>
        <CSButton
          disabled={updating}
          disableElevation
          onClick={() => setEditMode(false)}
          size={'small'}
          variant={'contained'}>
          {'Cancel'}
        </CSButton>
        <CSButton
          disabled={updating}
          disableElevation
          onClick={handleUpdateAllTiers}
          size={'small'}
          style={{ 'backgroundColor': PRIMARY_RED,
            'color': 'white' }}
          variant={'contained'}>
          {'Submit'}
        </CSButton>
      </>
      : <>
        <CSButton
          disabled={updating}
          disableElevation
          // onClick={() => setEditMode(true)}
          size={'small'}
          style={{
            'color': 'white',
          }}
          variant={'contained'}>
          {'Bulk Edit Discounts'}
        </CSButton>
        <CSButton
          color={'primary'}
          disabled={updating}
          disableElevation
          onClick={renderAdd}
          size={'small'}
          style={{
            'color': 'white',
          }}
          variant={'contained'}>
          {'Add New'}
        </CSButton>
      </>;
  }


  useEffect(() => {
    if (items.length > 0) {
      const newItems = items.map((item:any) => ({
        ...item,
        'tiers': normalizeTiers(item.tiers)
      }));
      setLocalItems([...newItems]);
    }
  }, [items]);

  const renderEdit = (item: Item) => {
    dispatch(setModalDataAction({
      'data': {
        item,
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
        item: {
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


  useEffect(() => {
    if (items.length > 0) {
      const actions = [
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
                  }}>
                  <EditIcon />
                </CSButtonSmall>
              </div>
            );
          },
          'id': 'action',
          'sortable': false,
          'width': 60
        }
      ];

      const dbSync = [
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
        }
      ];

      const chargeColumn = [
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
        }
      ];

      const constructedColumns:any = [
        ...columns,
        ...chargeColumn,
        ...actions,
        ...dbSync,
      ];

      setColumns(constructedColumns);
    }
  }, [items, editMode]);


  useEffect(() => {
    dispatch(loadInvoiceItems.fetch());
    // dispatch(getAllSalesTaxAPI());
    localStorage.setItem('nestedRouteKey', 'services/discounts');
  }, []);

  return (
    <MainContainer>
      <PageContainer>
        <BCTableContainer
          columns={columns}
          isLoading={loading}
          isPageSaveEnabled
          search
          searchPlaceholder={'Search Items'}
          tableData={localItems}
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


export default withStyles(styles, { 'withTheme': true })(AdminInvoicingItemsPage);
