import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import styles from './services-and-products.styles';
import { Button, Checkbox, Fab, FormControlLabel, Grid, TextField, Tooltip, withStyles, FormGroup } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { loadInvoiceItems } from 'actions/invoicing/items/items.action';
import ClearIcon from '@material-ui/icons/Clear';
import { loadQBAccounts } from 'actions/quickbookAccount/quickbook.action';

import {
  openModalAction,
  setModalDataAction,
} from 'actions/bc-modal/bc-modal.action';
import { PRIMARY_RED, modalTypes } from '../../../../../constants';
import { Item } from 'actions/invoicing/items/items.types';
import { getAllSalesTaxAPI } from 'api/tax.api';
import BCDebouncedInput from 'app/components/bc-input/bc-debounced-input';
import { updateItems } from 'api/items.api';
import {
  error as SnackBarError,
  success,
} from 'actions/snackbar/snackbar.action';
import BCQbSyncStatus from '../../../../components/bc-qb-sync-status/bc-qb-sync-status-item';
import { CSButton, CSButtonSmall } from '../../../../../helpers/custom';
import { stringSortCaseInsensitive } from '../../../../../helpers/sort';
import { Can, ability } from 'app/config/Can';
import BCInvoiceEditModal from '../../../../modals/bc-invoice-item-modal/bc-invoice-item-modal';

interface Props {
  classes: any;
  isView:boolean,
}

const normalizeTiers = (tiers: any) => {
  const obj: any = {};

  tiers.forEach((tier: any) => {
    obj[tier.tier._id] = tier;

    if (tier.charge % 1 !== 0 && tier.charge !== undefined) {
      obj[tier.tier._id].charge = Number(tier.charge).toFixed(2);
    }
  });

  return obj;
};

const normalizeJobCosting = (tiers: any, activeJobCostsIDs: string[]) => {
  const obj: any = {};

  tiers.forEach((tier: any) => {
    if (!activeJobCostsIDs?.includes(tier.tier._id)) return
    obj[tier.tier._id] = tier;

    if (tier.charge % 1 !== 0 && tier.charge !== undefined) {
      obj[tier.tier._id].charge = Number(tier.charge).toFixed(2);
    }
  });

  return obj;
};

function AdminServiceAndProductsPage({ classes }: Props) {
  const dispatch = useDispatch();
  const { loading, error, items } = useSelector(
    ({ invoiceItems }: RootState) => invoiceItems
  );
  const [localItems, setLocalItems] = useState<any>(
    // stringSortCaseInsensitive(items, 'name')
    []
  );
  const [columns, setColumns] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [includeDisabled, setIncludeDisabled] = useState<any>(false);
  const [updating, setUpdating] = useState(false);
  const [itemsLoading, setItemsLoading] = useState(false);
  
  const [qbAccounts, setQBAccounts] = useState([]);
  const [accounts, setAccounts]=useState([]);
  const { 'accounts': QB_Accounts, 'loading': loadingQB_Accounts, 'error': QB_AccountsError } = useSelector(({ accounts }: any) => accounts);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
  };
  const { loading: tiersLoading, error: tiersError, tiers } = useSelector(
    ({ invoiceItemsTiers }: any) => invoiceItemsTiers
  );
  const activeTiers = tiers.filter(({ tier }: any) => tier.isActive);
  const costingList = useSelector(
    ({ InvoiceJobCosting }: any) => InvoiceJobCosting.costingList
  );
  const activeJobCosts = costingList.filter(({ tier }: any) => tier.isActive);
 
  const handleTierChange = (id: number, value: string, tierId: string) => {
    const newItems: any = [...localItems];
    const index = newItems.findIndex((item: any) => item._id === id);
    const currentTier: any = newItems[index].tiers[tierId];
    currentTier.charge = value;
    newItems[index].tiers[tierId] = currentTier;
    setLocalItems(newItems);
  };
  const handleUpdateAllTiers = async () => {
    setUpdating(true);
    let hasError: any = '';
    const payload = localItems.map((item: any) => {
      const tiers = Object.keys(item.tiers).map((tierId: any) => {
        if (item.tiers[tierId].tier.isActive && !item.tiers[tierId].charge) {
          if (!hasError) {
            hasError = tierId + item.tiers[tierId].tier.name;
          }
        }
        return {
          tierId,
          charge: item.tiers[tierId].tier.isActive
            ? item.tiers[tierId].charge
            : undefined,
        };
      });

      const activeTiers = tiers.filter(({ charge }) => charge);
      return {
        itemId: item._id,
        tiers: activeTiers,
        costing: activeJobCosts,
      };
    });

    if (hasError) {
      setUpdating(false);
      dispatch(SnackBarError('Please fill in all tier prices'));
    }

    if (payload && !hasError) {
      const response = await updateItems(payload).catch((err) => {
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
  const handleDisableItemCheckBox=(event:any)=>{
  
  setIncludeDisabled(event.target.checked);


  }
  function Toolbar() {
    return editMode ? (
      <>
        <CSButton
          disabled={updating}
          disableElevation
          onClick={() => setEditMode(false)}
          size={'small'}
          variant={'contained'}
        >
          {'Cancel'}
        </CSButton>
        <CSButton
          disabled={updating}
          disableElevation
          onClick={handleUpdateAllTiers}
          size={'small'}
          style={{ backgroundColor: PRIMARY_RED, color: 'white' }}
          variant={'contained'}
        >
          {'Submit'}
        </CSButton>
      </>
    ) : (

      <>
          <FormGroup>
            <FormControlLabel control={<Checkbox style={{ }} color="primary" onChange={handleDisableItemCheckBox}/>} disabled={loading || itemsLoading} label="Include Inactive" />
            </FormGroup>
        
       <Can I={'manage'} a={'Items'}>
          {/* <CSButton
            disabled={updating}
            disableElevation
            onClick={() => setEditMode(true)}
            size={'small'}
            style={{ 'backgroundColor': PRIMARY_GREEN,
              'color': 'white' }}
            variant={'contained'}>
            {'Edit Prices'}
          </CSButton> */}
         <CSButton
            color={'primary'}
            disabled={updating}
            disableElevation
            onClick={renderAdd}
            size={'small'}
            style={{
              color: 'white',
            }}
            variant={'contained'}
          >
            {'New Item'}
          </CSButton>
        </Can>
      </>
    );
  }
  useEffect(() => { 
    if (QB_Accounts){
      setQBAccounts(QB_Accounts)

    }
  }, [QB_Accounts])

  useEffect(() => {
    setItemsLoading(false);

    if (items.length > 0) {
      const activeJobCostsIDs = activeJobCosts.map((item: any) => item.tier._id)
      const newItems = items.map((item: any) => {
        return {
        ...item,
        tiers: normalizeTiers(item.tiers),
        costing: normalizeJobCosting(item.costing, activeJobCostsIDs),
      }
      });
      setLocalItems([...newItems]);
    }
  }, [items, activeJobCosts?.length]);

  const renderEdit = (item: Item) => {
    dispatch(
      setModalDataAction({
        data: {
          item,
          includeDisabled:includeDisabled,
          isView:false,

          modalTitle: 'Edit Item',
        
        },
        type: modalTypes.EDIT_ITEM_MODAL,
      })
    );
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const renderView = (item: Item) => {
    dispatch(
      setModalDataAction({
        data: {
          isView: true,
          editHandler: renderEdit,
          item,
          includeDisabled: includeDisabled,
          modalTitle: 'View Item Details',

        },
        type: modalTypes.VIEW_ITEM_MODAL,
      })
    );
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const renderAdd = () => {
    dispatch(
      setModalDataAction({
        data: {
          includeDisabled: includeDisabled,
          item: {
            name: '',
            description: '',
            isFixed: true,
            itemType: "",
            productCost: '',
            isJobType: true,
            accounts: accounts,
            tax: 0,
            tiers: activeTiers.reduce(
              (total: any, currentValue: any) => ({
                ...total,
                [currentValue.tier._id]: currentValue,
              }),
              {}
            ),
            costing: activeJobCosts.reduce(
              (total: any, currentValue: any) => ({
                ...total,
                [currentValue.tier._id]: currentValue,
              }),
              {}
            ),
          },
          modalTitle: 'New Item',
        },
        type: modalTypes.ADD_ITEM_MODAL,
      })
    );
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };
 
  useEffect(() => {
    if (tiers.length || items) {
      const actions: never[] = [
        // {
        //   Cell({ row }: any) {
        //     return (
        //       <div className={'flex items-center'}>
        //         <CSButtonSmall
        //           aria-label={'edit'}
        //           color={'primary'}
        //           onClick={() => renderEdit(row.original)}
        //           size={'small'}
        //           style={{
        //             marginRight: 10,
        //             minWidth: 35,
        //             padding: '5px 10px',
        //           }}
        //         >
        //           <EditIcon />
        //         </CSButtonSmall>
        //       </div>
        //     );
        //   },
        //   id: 'action',
        //   sortable: false,
        //   width: 60,
        // },

      ];

      // const activateButton=[
      //   {
      //     Cell({ row }: any) {
      //       const handleActivateDeactivate = () => {

      //         const updatedItem = { ...row.original, isActive: !row.original.isActive };
      //         // Update the item in your localItems state
      //         const updatedLocalItems = localItems.map((item: Item) =>
      //           item._id === updatedItem._id ? updatedItem : item
      //         );
      //         setLocalItems(updatedLocalItems);
      //         console.log(`Toggled activation for item: ${row.original._id}`);
      //       };

      //       return (
      //         <div className="flex items-center">
      //           <Button
      //             variant="outlined"
      //             color={row.original.isActive ? 'secondary' : 'primary'}
      //             onClick={handleActivateDeactivate}
      //             disabled={!isRowEnabled}
      //           >
      //             {row.original.isActive ? 'Deactivate' : 'Activate'}
      //           </Button>
      //         </div>
      //       );
      //     },
      //     Header: 'Activate/Deactivate',
      //     id: 'activateDeactivate',
      //     sortable: false,
      //     width: 150, // Adjust the width as needed
      //   },  
      // ];

      const dbSync = [
        {
          Cell({ row }: any) {
            return <BCQbSyncStatus data={row.original}
            itemName={row.original.name} getAccounts={undefined} />;
          },
          id: 'qbSync',
          sortable: false,
          width: 30,
        },
      ];

      const columns: any = [
    
        {
          Header: 'Name',
          accessor: 'name',
          sortable: true,
          width: 60,
        },
        {
          Cell({ row }: any) {
            const { description } = row.original;
            return (
              <Tooltip arrow title={description}>
                <div className="flex items-center">
                  {description?.length > 30
                    ? `${description?.substr(0, 30)}...`
                    : description}
                </div>
              </Tooltip>
            );
          },
          Header: 'Description',
          accessor: 'description',
          sortable: false,
          width: 100,
        },
        {
          Cell({ row }: any) {

            return (
              <div className={'flex items-center'}>
                {row.original.itemType =='Product' ? 'Product' : 'Service'}
              </div>
            );
          },
          Header: 'Product Type',
          accessor: 'itemType',
          sortable: true,
        
        },
        {
          Cell({ row }: any): JSX.Element {
            return (
              <div className={'flex items-center'} >
                {
                  row.original.IncomeAccountRef?.name
                }
              </div >
            );
          },
          Header: 'Income Account',
          accessor: 'IncomeAccountRef',
          sortable: false,
          width: 30,
        },
        {
          Cell({ row }: any) {
            return (
              <div className={'flex items-center'}>
                {row.original.isFixed ? 'Fixed' : 'Hourly'}
              </div>
            );
          },
          Header: 'Charge Type',
          accessor: 'isFixed',
          sortable: true,
        },
        {
          Cell({ row }: any) {
            return (
              <div className={'flex items-center'}>
                {row.original.tax ? 'Yes' : 'No'}
              </div>
            );
          },
          Header: 'Taxable',
          accessor: 'tax',
          sortable: true,
        },
      ];
      if(includeDisabled){
      columns.unshift({
        Cell({ row }: any): JSX.Element {
          return (
            <div className={'flex items-center'} style={{display:"flex",justifyContent:"center"}} >
              {
                !row.original.isActive ? (
                  <ClearIcon
                    color="primary"
                    style={{ cursor: 'pointer', color: "red" }}
                  />
                ) : null
              }
            </div >
          );
        },
        Header: '',
        accessor: 'isActive',
        sortable: false,
        width:'25px'
      })
    }

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
          Header: 'Charge',
          accessor: 'charges',
          sortable: true,
        },
      ];
      // const tierColumns =
      //   activeTiers.map(({ tier }: any) => {
      //     return {
      //       Cell({ row }: any) {
      //         const currentTier = row.original.tiers[tier._id];
      //         return (
      //           <>
      //             {!editMode ? (
      //               currentTier?.charge
      //             ) : (
      //               <BCDebouncedInput
      //                 error={!currentTier?.charge}
      //                 id={tier._id + tier.name}
      //                 setValue={(val: string) =>
      //                   handleTierChange(
      //                     row.original._id,
      //                     val,
      //                     currentTier?.tier._id
      //                   )
      //                 }
      //                 value={currentTier?.charge}
      //               />
      //             )}
      //           </>
      //         );
      //       },
      //       Header: `Tier ${tier.name} Price`,
      //       accessor: tier.name,
      //     };
      //   }) || [];

      let constructedColumns: any = [
        ...columns,
        ...chargeColumn,
        ...ability.can('manage', 'Company')
          ? actions
          : [],
        ...dbSync,
      ];

      if (tiers.length > 0) {
        constructedColumns = [
          ...columns,
          // ...tierColumns,
          ...ability.can('manage', 'Company')
            ? actions
            : [],
          ...dbSync,
        ];
      }
      setColumns(constructedColumns);
    }
  }, [tiers, editMode, localItems]);

  // useEffect(()=>{
  //   if(qbAccounts){
  //     console.log("qbAccounts", qbAccounts);
  //   }
  // }, [qbAccounts]);

  useEffect(() => {
    setItemsLoading(true);
 
    dispatch(loadInvoiceItems.fetch());
    dispatch(loadQBAccounts.fetch());

    dispatch(getAllSalesTaxAPI());
    localStorage.setItem('nestedRouteKey', 'services/services-and-products');
  }, []);


  useEffect(() => {
    dispatch(loadInvoiceItems.fetch({ payload: { includeDisabled, includeDiscountItems: false } }))
  }, [includeDisabled]);

  return (
    <MainContainer>
      <PageContainer>
            <BCTableContainer
            columns={columns}
          isLoading={loading || tiersLoading || itemsLoading}
            isPageSaveEnabled
          toolbarPositionSpaceBetween={true}
            search
            searchPlaceholder={'Search Items'}
            tableData={localItems}
            toolbar={Toolbar()}
          onRowClick={(ev: any, row: any) => { renderView(row.original)}}
          
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
  width: 100%;
`;

export default withStyles(styles, { withTheme: true })(
  AdminServiceAndProductsPage
);

