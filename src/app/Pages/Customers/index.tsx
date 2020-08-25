import React from 'react';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import * as CONSTANTS from '../../../constants';

import Header from '../../../app/Components/Header';
import SubHeader from '../../../app/Components/SubHeader';
import ToolBarSearchInput from '../../../app/Components/ToolBarSearchInput';

const CustomersPage = () => {
  return (
    <>
      <Header />
      <div className="main-container">
        <SubHeader title="Customers">
          <ToolBarSearchInput style={{ marginLeft: 'auto', width: '321px' }} />
          <ImportButton variant="contained">Import</ImportButton>
          <CustomerButton variant="contained">New Customer</CustomerButton>
        </SubHeader>
      </div>
    </>
  );
};

const ImportButton = styled(Button)`
  margin-left: 25px;
  border-radius: 2px;
  width: 192px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-transform: initial;
  color: ${CONSTANTS.PRIMARY_DARK};
  background-color: ${CONSTANTS.PRIMARY_WHITE};
  box-shadow: 0px 4px 4px ${CONSTANTS.SECONDARY_DARK_GREY};
`;

const CustomerButton = styled(Button)`
  margin-left: 25px;
  border-radius: 2px;
  width: 192px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-transform: initial;
  color: ${CONSTANTS.PRIMARY_DARK};
  background-color: ${CONSTANTS.SECONDARY_GREY};
  box-shadow: 0px 4px 4px ${CONSTANTS.SECONDARY_DARK_GREY};
`;

export default CustomersPage;
