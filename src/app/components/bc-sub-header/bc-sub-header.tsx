import * as CONSTANTS from '../../../constants';
import React from 'react';
import { Toolbar } from '@material-ui/core';
import styled from 'styled-components';


interface BCSubHeaderProps {
    title: string;
    children?: React.ReactNode;
}

function BCSubHeader({ title, children }: BCSubHeaderProps): JSX.Element {
    return (
        <StyledToolbar>
            <h1 className={'h1-typography title'}>
                {title}
            </h1>
            {children}
        </StyledToolbar>
    );
}

const StyledToolbar = styled(Toolbar)`
  width: 100%;
  height: 96px;
  background: ${CONSTANTS.PRIMARY_BLUE};
  padding: 30px 65px 21px 39px;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  .title {
    color: ${CONSTANTS.PRIMARY_WHITE};
    margin: 0;
    font-weight: normal;
  }
`;

export default BCSubHeader;
