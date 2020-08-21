import React from 'react';

import styled from 'styled-components';

import * as CONSTANTS from '../../../contants';

interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps): JSX.Element => {
  return <ComponentContainer>{children}</ComponentContainer>;
};

const ComponentContainer = styled.div`
  flex: 0 0 ${CONSTANTS.SIDEBAR_WIDTH}px;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  margin-left: 0;
`;

export default Sidebar;
