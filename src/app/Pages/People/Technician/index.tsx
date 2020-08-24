import React, { useState } from 'react';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';

import SubHeader from '../../../Components/SubHeader';
import ToolBarSearchInput from '../../../Components/ToolBarSearchInput';
import PeopleSidebar from '../Components/PeopleSidebar';
import SearchInput from '../Components/SearchInput';
import BCTabs from '../../../Components/BCTabs';
import BCTable from '../../../Components/BCTable';

import AvatarImg1 from '../../../../assets/img/avatars/1.jpg';
import AvatarImg2 from '../../../../assets/img/avatars/2.jpg';
import AvatarImg3 from '../../../../assets/img/avatars/3.jpg';
import AvatarImg4 from '../../../../assets/img/avatars/4.jpg';
import AvatarImg5 from '../../../../assets/img/avatars/5.jpg';
import AvatarImg6 from '../../../../assets/img/avatars/6.jpg';

const TechnicianPage = (): JSX.Element => {
  const [searchStr, setSearchStr] = useState('');
  const [headCells, setHeadCells] = useState([
    {
      id: 'Name',
      label: 'Name',
      sortable: true,
      width: '20%',
    },
    {
      id: 'Email',
      label: 'Email',
      sortable: true,
      width: '20%',
    },
    {
      id: 'Phone_Number',
      label: 'Phone Number',
      sortable: true,
      width: '20%',
    },
    {
      id: 'View',
      label: 'View',
      sortable: false,
      isImage: true,
    },
  ]);
  const table_data = [
    {
      Name: 'Andl siels',
      Email: 'ee@gmail.com',
      Phone_Number: '1984-22032-33',
      View: AvatarImg1,
    },
    {
      Name: 'ssde sienhd',
      Email: 'ttt@gmail.com',
      Phone_Number: '1984-22032-35',
      View: AvatarImg2,
    },
    {
      id: 'phone_number',
      Name: 'swwed sss',
      Email: 'uuu@gmail.com',
      Phone_Number: '1984-22032-36',
      View: AvatarImg3,
    },
    {
      Name: 'eetss ddd',
      Email: 'uurd@gmail.com',
      Phone_Number: '1984-22032-32',
      View: AvatarImg4,
    },
    {
      Name: 'tteexs sss',
      Email: 'wwaq@gmail.com',
      Phone_Number: '1984-22032-31',
      View: AvatarImg5,
    },
    {
      Name: 'asdf sdf',
      Email: 'wwaq@gmail.com',
      Phone_Number: '1984-2321-31',
      View: AvatarImg6,
    },
  ];

  const [curTab, setCurTab] = useState(0);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };
  const searchTable = (str: string): void => {
    console.log('searchTable');
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
              { value: 0, label: 'TECHNICIANS LIST' },
              { value: 1, label: 'RECENT ACTIVITIES' },
            ]}
          />
          <SwipeableViews index={curTab}>
            <DataContainer id="0" hidden={curTab !== 0}>
              <Grid container>
                <Grid item xs={6}>
                  <SearchInput
                    style={{ marginBottom: '11px' }}
                    searchStr={searchStr}
                    setSearchStr={setSearchStr}
                    onSearch={(str: string) => searchTable(str)}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <BCTable tableData={table_data} headCells={headCells} pagination={true} />
                </Grid>
              </Grid>
            </DataContainer>
            <DataContainer id="1" hidden={curTab !== 0}>
              <Grid container>
                <Grid item xs={12}>
                  <BCTable tableData={table_data} headCells={headCells} pagination={true} />
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

export default TechnicianPage;
