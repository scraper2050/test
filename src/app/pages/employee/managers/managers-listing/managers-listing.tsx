import BCTableContainer from "../../../../components/bc-table-container/bc-table-container";
import Fab from "@material-ui/core/Fab";
import styled from "styled-components";
import styles from "./../managers.styles";
import { withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getManagers,
  loadingManagers,
} from "actions/managers/managers.action";
import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";

function ManagersListing({ classes }: any) {
  const dispatch = useDispatch();
  const managers = useSelector((state: any) => state.managers);
  const columns: any = [
    {
      Cell({ row }: any) {
        return <div className={"flex items-center"}>{row.index + 1}</div>;
      },
      Header: "No#",
      sortable: true,
      width: 60,
    },
    {
      Header: "Name",
      accessor: "profile.displayName",
      className: "font-bold",
      sortable: true,
    },
    {
      Header: "Email",
      accessor: "auth.email",
      className: "font-bold",
      sortable: true,
    },
    {
      Header: "Phone Number",
      accessor: "contact.phone",
      className: "font-bold",
      sortable: true,
    }
  ];

  useEffect(() => {
    dispatch(getManagers());
    dispatch(loadingManagers());
  }, []);

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  return (
    <DataContainer id={"0"}>
      {managers.loading ? (
        <BCCircularLoader heightValue={'200px'} />
      ) : (
        <BCTableContainer
          columns={columns}
          onRowClick={handleRowClick}
          search
          searchPlaceholder={"Search Managers..."}
          tableData={managers.data}
        />
      )}
    </DataContainer>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

export default withStyles(styles, { withTheme: true })(ManagersListing);
