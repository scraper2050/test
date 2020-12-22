import styled from 'styled-components';
import styles from './bc-new-customer-modal.styles';
import { withStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {CustomersState} from '../../../../src/actions/customer/customer.types'
import '../../../scss/index.scss';

interface Props {
  classes: any
}

function BCNewCustomerModal({ classes }: any) {
  const dispatch = useDispatch();
  const customers = useSelector(({ customers }: any) => customers);

  return (
    <>
      <MainContainer>
        <PageContainer >
            {customers.newMsg}
        </PageContainer>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
  text-align: center;
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

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCNewCustomerModal);

