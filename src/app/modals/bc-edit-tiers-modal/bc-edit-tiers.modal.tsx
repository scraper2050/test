import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { updateTier } from 'api/items.api';
import { loadInvoiceItems, loadTierListItems } from 'actions/invoicing/items/items.action';
import { error as SnackBarError, success } from 'actions/snackbar/snackbar.action';


export default function BCEditTiersModal() {
  const { 'loading': tiersLoading, 'error': tiersError, tiers } = useSelector(({ invoiceItemsTiers }:any) => invoiceItemsTiers);
  const dispatch = useDispatch();

  if (!tiers) {
    return <BCCircularLoader heightValue={'100px'} />;
  }

  const handleClick = async (tier:any) => {
    const { _id, isActive, name } = tier;
    const result = await updateTier({ 'itemTierId': _id,
      'isActive': isActive
        ? '0'
        : '1',
      name }).catch(err => dispatch(SnackBarError(err.message)));
    if (result) {
      dispatch(success(isActive
        ? `Tier ${name} deactivated`
        : `Tier ${name} activated`));
      dispatch(loadTierListItems.fetch());
      dispatch(loadInvoiceItems.fetch());
    }
  };


  return <EditItemTierContainer>
    {
      tiers.map((item:any) => {
        const { tier } = item;
        return <div
          className={'tier-item'}
          key={tier._id}>
          <div>
            <h4>
              {'Tier '}
              {' '}
              {tier.name}
            </h4>
          </div>

          <Button
            color={tier.isActive
              ? 'secondary'
              : 'primary'}
            onClick={() => handleClick(tier)}
            size={'small'}
            variant={'contained'}>
            {tier.isActive
              ? 'Deactivate'
              : 'Activate'}
          </Button>
        </div>;
      })
    }
  </EditItemTierContainer>;
}

const EditItemTierContainer = styled.div`
padding: 30px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
.tier-item {
    padding: 0 20px;
    margin: 10px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    >div {
        margin-right: 30px;
    }
}`;
