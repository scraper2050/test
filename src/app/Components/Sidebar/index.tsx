import React from 'react';

import styled from 'styled-components';

import * as CONSTANTS from '../../../constants';

interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps): JSX.Element => {
  return <ComponentContainer>{children}</ComponentContainer>;
};

const ComponentContainer = styled.div`
  margin-left: 0;
  flex: 0 0 ${CONSTANTS.SIDEBAR_WIDTH}px;
  background-color: ${CONSTANTS.PRIMARY_WHITE};
  transition: all 0.3s ease-in-out;
`;

export default Sidebar;
