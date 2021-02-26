import * as CONSTANTS from '../../../constants';
import BCSubHeader from './../bc-sub-header/bc-sub-header';
import BCToolBarSearchInput from './../bc-toolbar-search-input/bc-toolbar-search-input';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
interface RootState {
  routeData: {
    title: string,
    actionData: {
      link: string,
      title: string
    }
  }
}
export default function BCToolBar() {
  const title = useSelector(({ routeData }: RootState) => routeData.title);
  const actionData = useSelector(({ routeData }: RootState) => routeData.actionData);
  return (
    <BCSubHeader title={title}>
      <BCToolBarSearchInput style={{
        'marginLeft': 'auto',
        'width': '321px'
      }}
      />
      {
        actionData && actionData.link
          ? <SubToolBarButton variant={'contained'}>
            <Link to={actionData.link}>
              {actionData.title}
            </Link>
          </SubToolBarButton>
          : null
      }

    </BCSubHeader>
  );
}

const SubToolBarButton = styled(Button)`
  margin-left: 25px !important;
  border-radius: 2px !important;
  width: 192px !important;
  height: 38px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 16px !important;
  text-transform: initial !important;
  background-color: ${CONSTANTS.SECONDARY_GREY} !important;
  box-shadow: 0px 4px 4px ${CONSTANTS.SECONDARY_DARK_GREY} !important;

  a {
    text-decoration: none !important;
    color: ${CONSTANTS.PRIMARY_DARK} !important;
  }
`;
