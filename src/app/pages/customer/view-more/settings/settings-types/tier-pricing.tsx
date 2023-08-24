import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import { Customer } from 'reducers/customer.types';
import Button from '@material-ui/core/Button/Button';
import { CircularProgress, Fab, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useSelector } from 'react-redux';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import SettingHeader from '../settings-header';
import { getCustomerDetailAction, loadingSingleCustomers, updateCustomerAction } from 'actions/customer/customer.action';
import {info, success} from 'actions/snackbar/snackbar.action';
import { Can, ability } from 'app/config/Can';


interface TierPricingProps {
    customer: Customer;
    header: any;
    dispatch: any;
}

export default function TierPricing({ customer, header, dispatch }:TierPricingProps) {
  const { loading, error, tiers } = useSelector(({ invoiceItemsTiers }:any) => invoiceItemsTiers);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [tier, setTier] = useState(customer.itemTier?.isActive
    ? customer.itemTier?._id
    : '');


  const activeTiers = useMemo(() => tiers.filter(({ tier }:any) => tier?.isActive), [tiers]);


  const isTier = !customer.isCustomPrice && customer.itemTier?.isActive;

/*  if (loading) {
    return <BCCircularLoader heightValue={'100px'} />;
  }*/

  const handleChange = (e:any) => {
    setTier(e.target.value);
    const defaultValue = customer.itemTier?._id;
    if (defaultValue == e.target.value) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  };


  const handleSubmit = async () => {
    setIsSubmitDisabled(true);
    setIsSubmiting(true);
    const customerUpdate = { ...customer,
      'customerId': customer._id,
      'itemTierId': tier,
      'isCustomPrice': false };
    await dispatch(updateCustomerAction(customerUpdate, () => {
      setIsSubmitDisabled(false);
      setIsSubmiting(false);
      dispatch(loadingSingleCustomers());
      dispatch(getCustomerDetailAction(customerUpdate));
    }));
    //dispatch(success('Update Customer Pricing Successful!'));
  };

  useEffect(() => {
    //if customer on Custom Pricing revert to Tier Pricing
    if (customer?.isCustomPrice) {
      dispatch(info('Default and Custom Pricing are no longer available, customer is reverted to Tier Pricing'))
      handleSubmit();
    }
  }, []);


  return <TierPricingContainer>
    <SettingHeader {...header} />
    <div className={'body'}>
      <FormControl
        fullWidth
        variant={'outlined'}>
        <InputLabel >
          {'Tier'}
        </InputLabel>
        <Select
          disabled={!ability.can('edit', 'CustomerSettings')}
          label={'Tier'}
          onChange={handleChange}
          value={tier}>
          <MenuItem value={''}>
            <em>
              {'None'}
            </em>
          </MenuItem>
          {activeTiers.map(({ tier }:any) => {
            return <MenuItem
              key={tier._id}
              value={tier._id}>
              {`Tier ${tier.name}`}
            </MenuItem>;
          })}
        </Select>
      </FormControl>

      <Can I={'edit'} a={'CustomerSettings'}>
        <Fab
          color={'primary'}
          disabled={isSubmitDisabled}
          onClick={handleSubmit}>
          {isSubmiting ? (
            <CircularProgress size={25} />
          ) : (isTier ? 'Save': 'Use Tier Pricing')
          }
        </Fab>
      </Can>  
    </div>
  </TierPricingContainer>;
}


const TierPricingContainer = styled.div`
    margin: 0 auto;
    text-align: center;

    h3 {
        max-width: 400px;
        margin: 40px auto ;
    }
    
    button {
        margin-top: 30px;
        color: #fff;
        width: 200px;
        border-radius: 30px;
    }
`;
