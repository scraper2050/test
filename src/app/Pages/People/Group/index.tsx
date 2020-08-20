import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

import SubHeader from '../../../Components/SubHeader';
import SearchInput from '../../../Components/SearchInput';

const GroupPage = (): JSX.Element => {
  return (
    <>
      <SubHeader title="People">
        <SearchInput style={{ marginLeft: 'auto', width: '321px' }} />
        <EmployeeButton variant="contained">New Employee</EmployeeButton>
      </SubHeader>
    </>
  );
};

const EmployeeButton = styled(Button)`
  margin-left: 25px;
  border-radius: 2px;
  width: 192px;
  height: 38px;
  background-color: #c4c4c4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Gothic A1;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 17px;
  color: #000;
`;

export default GroupPage;
