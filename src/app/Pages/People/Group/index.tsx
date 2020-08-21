import React, { useState } from 'react';

import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import SubHeader from '../../../Components/SubHeader';
import SearchInput from '../../../Components/SearchInput';
import PeopleSidebar from '../Components/PeopleSidebar';

import * as CONSTANTS from '../../../../contants';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: CONSTANTS.PRIMARY_BLUE,
    },
  },
});

const GroupPage = (): JSX.Element => {
  const [curTab, setCurTab] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurTab(newValue);
  };

  return (
    <>
      <SubHeader title="People">
        <SearchInput style={{ marginLeft: 'auto', width: '321px' }} />
        <EmployeeButton variant="contained">New Employee</EmployeeButton>
      </SubHeader>
      <MainContainer>
        <PeopleSidebar />
        <PageContainer>
          <ThemeProvider theme={theme}>
            <StyledTabs value={curTab} onChange={handleTabChange} indicatorColor="primary">
              <Tab value={0} label="GROUP LIST" />
              <Tab value={1} label="RECENT ACTIVITIES" />
            </StyledTabs>
          </ThemeProvider>
          <SwipeableViews index={curTab}>
            <div id="0" hidden={curTab !== 0}>
              Item One
            </div>
            <div id="1" hidden={curTab !== 1}>
              Item Two
            </div>
          </SwipeableViews>
        </PageContainer>
      </MainContainer>
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
  color: #000;
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

const StyledTabs = styled(Tabs)`
  .MuiTab-root {
    font-family: Gothic A1;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #000;
    width: 190px;
  }

  .MuiTabs-indicator {
    height: 6px;
  }
`;

export default GroupPage;
