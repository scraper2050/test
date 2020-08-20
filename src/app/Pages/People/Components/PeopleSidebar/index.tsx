import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Sidebar from '../../../../Components/Sidebar';

const LINK_DATA = [
  { label: 'Groups', link: '/people/group' },
  { label: 'Technicians', link: '/people/technician' },
  { label: 'Managers', link: '/people/manager' },
  { label: 'Office Admin', link: '/people/officeadmin' },
];

const PeopleSidebar = (): JSX.Element => {
  const location = useLocation();
  const pathName = location.pathname;
  const history = useHistory();

  const onClickLink = (strLink: string): void => {
    history.push(strLink);
  };

  return (
    <Sidebar>
      <StyledList aria-label="people sidebar list">
        {LINK_DATA.map((item, idx) => {
          if (item.label === 'Groups')
            return (
              <StyledListItem
                key={idx}
                button
                selected={pathName === item.link || pathName === '/people'}
                onClick={() => onClickLink(item.link)}
              >
                {item.label}
              </StyledListItem>
            );
          else
            return (
              <StyledListItem key={idx} button selected={pathName === item.link} onClick={() => onClickLink(item.link)}>
                {item.label}
              </StyledListItem>
            );
        })}
      </StyledList>
    </Sidebar>
  );
};

const StyledList = styled(List)``;

const StyledListItem = styled(ListItem)`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  height: 40px;
  color: #000;
  padding-left: 41px;
  &.Mui-selected {
    background-color: #c4c4c4;
  }
`;

export default PeopleSidebar;
