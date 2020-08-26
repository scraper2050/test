import React, { useState, useEffect } from "react";

import styled from "styled-components";
import SwipeableViews from "react-swipeable-views";
import { useLocation, useHistory } from "react-router-dom";
import { List, Grid, ListItem, Button } from "@material-ui/core";

import Api from "../../../../util/Api";
import BCTabs from "../../../Components/BCTabs";
import BCTable from "../../../Components/BCTable";
import Sidebar from "../../../Components/Sidebar";
import SubHeader from "../../../Components/SubHeader";
import * as CONSTANTS from "../../../../constants";
import TableSearchInput from "../../../Components/TableSearchInput";
import ToolBarSearchInput from "../../../Components/ToolBarSearchInput";

import { UserModel } from "../../../Models/User";

const headCells = [
  {
    id: "name",
    label: "Name",
    sortable: true,
  },
  {
    id: "contactName",
    label: "Contact Name",
    sortable: true,
  },
  {
    id: "email",
    label: "Email",
    sortable: true,
  },
];

const table_data = [
  {
    id: 0,
    name: "Shelly Poehler",
    contactName: "BlueTest",
    email: "Blueclerktest@yopmail.com",
  },
];

const LINK_DATA = [
  { label: "Groups", link: "/employees/group" },
  { label: "Technicians", link: "/employees/technician" },
  { label: "Managers", link: "/employees/manager" },
  { label: "Office Admin", link: "/employees/office" },
];

const OfficeAdminPage = (): JSX.Element => {
  const location = useLocation();
  const pathName = location.pathname;
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);
  const [searchStr, setSearchStr] = useState("");
  const [officeAdminList, setOfficeAdminList] = useState<UserModel[]>([]);

  const onClickLink = (strLink: string): void => {
    history.push(strLink);
  };
  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  useEffect(() => {
    Api.post("/getOfficeAdmins", null)
      .then((res) => {
        if (res.data.status === 1) {
          setOfficeAdminList([...res.data.users]);
        }
      })
      .catch((err) => {
        console.log("Get Tech error =>", err);
      });
  }, []);

  return (
    <>
      <SubHeader title="Employees">
        <ToolBarSearchInput style={{ marginLeft: "auto", width: "321px" }} />
        <EmployeeButton variant="contained">New Employee</EmployeeButton>
      </SubHeader>

      <MainContainer>
        <Sidebar>
          <StyledList aria-label="employees sidebar list">
            {LINK_DATA.map((item, idx) => {
              if (item.label === "Groups")
                return (
                  <StyledListItem
                    key={idx}
                    button
                    selected={
                      pathName === item.link || pathName === "/employees"
                    }
                    onClick={() => onClickLink(item.link)}
                  >
                    {item.label}
                  </StyledListItem>
                );
              else
                return (
                  <StyledListItem
                    key={idx}
                    button
                    selected={pathName === item.link}
                    onClick={() => onClickLink(item.link)}
                  >
                    {item.label}
                  </StyledListItem>
                );
            })}
          </StyledList>
        </Sidebar>

        <PageContainer>
          <BCTabs
            curTab={curTab}
            onChangeTab={handleTabChange}
            indicatorColor="primary"
            tabsData={[
              { value: 0, label: "Office Admin List" },
              { value: 1, label: "Recent Activities" },
            ]}
          />
          <SwipeableViews index={curTab}>
            <DataContainer id="0" hidden={curTab !== 0}>
              <Grid container>
                <Grid item md={6} xs={12}>
                  <TableSearchInput
                    style={{ marginBottom: "11px" }}
                    searchStr={searchStr}
                    setSearchStr={setSearchStr}
                    onSearch={(str: string) => {
                      console.log("On Search");
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <BCTable
                    tableData={table_data}
                    headCells={headCells}
                    pagination={true}
                  />
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-transform: initial;
  color: ${CONSTANTS.PRIMARY_DARK};
  background-color: ${CONSTANTS.SECONDARY_GREY};
  box-shadow: 0px 4px 4px ${CONSTANTS.SECONDARY_DARK_GREY};
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
export default OfficeAdminPage;
