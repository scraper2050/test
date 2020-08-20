import React from 'react';

import styled from 'styled-components';
import { Toolbar } from '@material-ui/core';

import * as CONSTANTS from '../../../contants';

interface SubHeaderProps {
  title: string;
  children?: React.ReactNode;
}

const SubHeader = ({ title, children }: SubHeaderProps): JSX.Element => {
  return (
    <StyledToolbar>
      <h1 className="h1-typography title">{title}</h1>
      {children}
    </StyledToolbar>
  );
};

const StyledToolbar = styled(Toolbar)`
  width: 100%;
  height: 96px;
  background: ${CONSTANTS.PRIMARY_BLUE};
  padding: 30px 65px 21px 39px;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  .title {
    color: #fff;
    margin: 0;
  }
`;

export default SubHeader;
