import React, { useState } from 'react';
import styled from 'styled-components';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import { blue, green, orange, yellow } from '@material-ui/core/colors';
import { Customer } from 'reducers/customer.types';
import { Card } from '@material-ui/core';
import SettingsCards from './settings-cards';
import TierPricing from './settings-types/tier-pricing';
import { useDispatch } from 'react-redux';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import PORequired from './settings-types/po-required';
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PaymentTerms from './settings-types/payment-terms';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Notes from './settings-types/notes';
import AssignmentIcon from '@material-ui/icons/Assignment';

interface SettingsProps {
    customer: Customer;
}

const SettingsTypes = [
/*  {
    'color': green,
    'icon': MoneyIcon,
    'subtitle': 'Use default pricing for all invoice items',
    'title': 'Default Pricing'

  },*/
  {
    'color': orange,
    'icon': SignalCellularAltIcon,
    'subtitle': 'Assign a Tier Pricing level',
    'title': 'Tier Pricing'
  },
  {
    'color': green,
    'icon': ShoppingCartIcon,
    'subtitle': 'Set Customer PO Required',
    'title': 'PO Required'
  },
  {
    'color': blue,
    'icon': MonetizationOnIcon,
    'subtitle': 'Set Customer Payment Terms',
    'title': 'Payment Terms'
  },
  {
    'color': blue,
    'icon': AssignmentIcon,
    'subtitle': 'Set Customer Notes',
    'title': 'Notes'
  },
/*  {
    'color': yellow,
    'icon': BuildIcon,
    'subtitle': 'Create custom prices for customer',
    'title': 'Custom Pricing'
  }*/
];


export default function Settings({ customer }:SettingsProps) {
  const dispatch = useDispatch();
/*  const currentActive = customer?.isCustomPrice
    ? 2
    : customer?.itemTier?.isActive
      ? 1
      : 0;*/

  const [active, setActive] = useState(0);

  const handleClick = (index:number) => {
    setActive(index);
  };

  if (!customer) {
    return <BCCircularLoader heightValue={'100px'} />;
  }


  return (
    <PricingContainer>
      <div className={'pricing-select'}>
        <SettingsCards
          active={active}
          pricing={SettingsTypes}
          setActive={handleClick}
        />
      </div>
      <Card className={'pricing-detail'}>
{/*        {active === 0 && <DefaultPricing
          customer={customer}
          dispatch={dispatch}
          header={SettingsTypes[active]}
        />}*/}
        {active === 0 && <TierPricing
          customer={customer}
          dispatch={dispatch}
          header={SettingsTypes[active]}
        />}
{/*        {active === 2 && <CustomPricing
          customer={customer}
          dispatch={dispatch}
          header={SettingsTypes[active]}
        />}*/}
        {active === 1 && <PORequired
          customer={customer}
          dispatch={dispatch}
          header={SettingsTypes[active]}
        />}
        {active === 2 && <PaymentTerms
          customer={customer}
          dispatch={dispatch}
          header={SettingsTypes[active]}
        />}
        {active === 3 && <Notes
          customer={customer}
          dispatch={dispatch}
          header={SettingsTypes[active]}
        />}
      </Card>
    </PricingContainer>
  );
}

const PricingContainer = styled.div`
display: flex;
    .pricing-select {
        flex: 2;
        margin-right: 16px;
    }

    .pricing-detail {
        flex: 4;
        background: white;
        .body {
            padding: 20px 30px 50px;
        }
    }

`;

