import React from 'react'
import { Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import BCSubHeader from './../bc-sub-header/bc-sub-header';
import BCToolBarSearchInput from './../bc-toolbar-search-input/bc-toolbar-search-input';
import styled from 'styled-components';
import * as CONSTANTS from '../../../constants';
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
export default function BcToolBar() {
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
  )
}

const SubToolBarButton = styled(Button)`
  margin-left: 25px;
  border-radius: 2px;
  width: 192px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-transform: initial;
  background-color: ${CONSTANTS.SECONDARY_GREY};
  box-shadow: 0px 4px 4px ${CONSTANTS.SECONDARY_DARK_GREY};

  a {
    text-decoration: none;
    color: ${CONSTANTS.PRIMARY_DARK};
  }
`;