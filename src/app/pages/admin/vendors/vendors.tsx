import BCSidebar from '../../../components/bc-sidebar/bc-sidebar';
import BCSubHeader from '../../../components/bc-sub-header/bc-sub-header';
import BCToolBarSearchInput from '../../../components/bc-toolbar-search-input/bc-toolbar-search-input';
import React from 'react';
import styled from 'styled-components';
import { List, ListItem } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

const LINK_DATA = [
  {
    'label': 'Billing',
    'link': '/admin/billing'
  },
  {
    'label': 'Brands',
    'link': '/admin/brands'
  },
  {
    'label': 'Company Profile',
    'link': '/admin/company-profile'
  },
  {
    'label': 'Employees',
    'link': '/admin/employees'
  },
  {
    'label': 'Equipment Type',
    'link': '/admin/equipment-type'
  },
  {
    'label': 'Groups',
    'link': '/admin/groups'
  },
  {
    'label': 'Invoicing',
    'link': '/admin/invoicing'
  },
  {
    'label': 'Job Types',
    'link': '/admin/job-types'
  },
  {
    'label': 'Report Number',
    'link': '/admin/report-number'
  },
  {
    'label': 'Roles/Permissions',
    'link': '/admin/roles-permissions'
  },
  {
    'label': 'Vendors',
    'link': '/admin/vendors'
  }
];

function AdminVendorsPage() {
  const location = useLocation();
  const pathName = location.pathname;
  const history = useHistory();

  const onClickLink = (strLink: string): void => {
    history.push(strLink);
  };

  return (
    <>
      <BCSubHeader title={'Admin'}>
        <BCToolBarSearchInput style={{
          'marginLeft': 'auto',
          'width': '321px'
        }}
        />
      </BCSubHeader>

      <MainContainer>
        <BCSidebar>
          <StyledList aria-label={'admin sidebar list'}>
            {LINK_DATA.map((item, idx) => {
              if (item.label === 'Billing') {
                return (
                  <StyledListItem
                    button
                    key={idx}
                    onClick={() => onClickLink(item.link)}
                    selected={
                      pathName === item.link || pathName === '/admin'
                    }>
                    {item.label}
                  </StyledListItem>
                );
              }
              return (
                <StyledListItem
                  button
                  key={idx}
                  onClick={() => onClickLink(item.link)}
                  selected={pathName === item.link}>
                  {item.label}
                </StyledListItem>
              );
            })}
          </StyledList>
        </BCSidebar>
        <PageContainer />
      </MainContainer>
    </>
  );
}

const StyledList = styled(List)``;

const StyledListItem = styled(ListItem)`
  font-size: 16px;
  line-height: 20px;
  height: 40px;
  color: #000;
  padding-left: 41px;
  &.Mui-selected {
    background-color: #c4c4c4;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
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

export default AdminVendorsPage;
