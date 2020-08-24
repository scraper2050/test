import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import Api from '../../../../util/Api';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GroupList from './Components/GroupList';
import SubHeader from '../../../Components/SubHeader';
import ToolBarSearchInput from '../../../Components/ToolBarSearchInput';
import PeopleSidebar from '../Components/PeopleSidebar';
import BCTabs from '../../../Components/BCTabs';

import { GroupModel } from '../../../Models/Group';

const GroupPage = (): JSX.Element => {
  const [curTab, setCurTab] = useState(0);
  const [groupList, setGroupList] = useState<GroupModel[]>([]);
  useEffect(() => {
    Api.post('/getGroups', null)
      .then((res) => {
        if (res.data.status === 1) {
          setGroupList([...res.data.groups]);
        }
      })
      .catch((err) => {
        console.log(' get industries api res => ', err);
      });
  }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  return (
    <>
      <SubHeader title="People">
        <ToolBarSearchInput style={{ marginLeft: 'auto', width: '321px' }} />
        <EmployeeButton variant="contained">New Employee</EmployeeButton>
      </SubHeader>
      <MainContainer>
        <PeopleSidebar />
        <PageContainer>
          <BCTabs
            curTab={curTab}
            onChangeTab={handleTabChange}
            indicatorColor="primary"
            tabsData={[
              { value: 0, label: 'GROUP LIST' },
              { value: 1, label: 'RECENT ACTIVITIES' },
            ]}
          />
          <SwipeableViews index={curTab}>
            <DataContainer id="0" hidden={curTab !== 0}>
              <GroupList groupList={groupList} />
            </DataContainer>
            <DataContainer id="1" hidden={curTab !== 1}>
              <Grid container>
                <Grid item xs={12}>
                  {/* <BCTable tableData={table_data} headCells={headCells} pagination={true} /> */}
                </Grid>
              </Grid>
            </DataContainer>
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

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  margin-top: 12px;
`;

export default GroupPage;
