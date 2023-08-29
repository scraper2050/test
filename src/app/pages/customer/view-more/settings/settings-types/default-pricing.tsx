import React from 'react';
import styled from 'styled-components';
import { Customer } from 'reducers/customer.types';
import Button from '@material-ui/core/Button/Button';
import { Fab } from '@material-ui/core';
import SettingHeader from '../settings-header';
import { getCustomerDetailAction, loadingSingleCustomers, updateCustomerAction } from 'actions/customer/customer.action';
import { success } from 'actions/snackbar/snackbar.action';


interface DefaultPricingProps {
    customer: Customer;
    header: any;
    dispatch: any;
}

export default function DefaultPricing({ customer, header, dispatch }:DefaultPricingProps) {
  const currentPricing = customer.isCustomPrice
    ? 'Custom Pricing'
    : customer?.itemTier?.isActive
      ? 'Tier Pricing'
      : 'default';

  const isDefault = currentPricing === 'default';


  const handleSubmit = async () => {
    const customerUpdate = { ...customer,
      'customerId': customer._id };
    await dispatch(updateCustomerAction(customerUpdate, () => {
      dispatch(loadingSingleCustomers());
      dispatch(getCustomerDetailAction(customerUpdate));
    }));
    dispatch(success('Update Customer Pricing Successful!'));
  };


  return <DefaultPricingContainer>
    <SettingHeader {...header} />
    <div className={'body'}>
      <h3>
        {!isDefault && <>
          {'You are currently using '}
          <span>
            {currentPricing}
          </span>
          {' for '}
          <span>
            {customer.profile.displayName}
          </span>
          {', do you want to revert to default?'}
        </>}
        {isDefault && <>
          <span>
            {customer.profile.displayName}
          </span>
          {' is using default pricing'}
        </>}
      </h3>
      {!isDefault && <Fab
        color={'primary'}
        onClick={handleSubmit}>
        {'Revert to default'}
      </Fab>}
    </div>
  </DefaultPricingContainer>;
}


const DefaultPricingContainer = styled.div`
text-align: center;
    h3 {
        font-weight: 400;
        max-width: 400px;
        margin: 20px auto 30px;
    }
    span {
        font-weight: 800;
    }
    button {
        color: #fff;
        width: 200px;
        border-radius: 30px;
    }
`;
