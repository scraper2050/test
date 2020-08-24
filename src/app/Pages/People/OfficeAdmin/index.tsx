import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';

import SubHeader from '../../../Components/SubHeader';
import ToolBarSearchInput from '../../../Components/ToolBarSearchInput';
import PeopleSidebar from '../Components/PeopleSidebar';
import BCTabs from '../../../Components/BCTabs';
import UserTable from '../Components/UserTable';
import { UserModel } from '../../../Models/User';

import Api from '../../../../util/Api';

const OfficeAdminPage = (): JSX.Element => {
  const [curTab, setCurTab] = useState(0);
  const [officeAdminList, setOfficeAdminList] = useState<UserModel[]>([]);

  useEffect(() => {
    Api.post('/getOfficeAdmins', null)
      .then((res) => {
        if (res.data.status === 1) {
          setOfficeAdminList([...res.data.users]);
        }
      })
      .catch((err) => {
        console.log('Get Tech error =>', err);
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
              { value: 0, label: 'OFFICE ADMIN LIST' },
              { value: 1, label: 'RECENT ACTIVITIES' },
            ]}
          />
          <SwipeableViews index={curTab}>
            <DataContainer id="0" hidden={curTab !== 0}>
              <UserTable userList={officeAdminList} />
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

export default OfficeAdminPage;
