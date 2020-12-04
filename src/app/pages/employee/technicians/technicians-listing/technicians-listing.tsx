import BCTableContainer from "../../../../components/bc-table-container/bc-table-container";
import styled from "styled-components";
import styles from "./../technicians.styles";
import { withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTechnicians,
  loadingTechnicians,
} from "actions/technicians/technicians.action";
import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";

function TechniciansListing({ classes }: any) {
  const dispatch = useDispatch();
  const technicians = useSelector((state: any) => state.technicians);
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
    },
  ];

  useEffect(() => {
    dispatch(getTechnicians());
    dispatch(loadingTechnicians());
  }, []);

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  return (
    <DataContainer id={"0"}>
      {technicians.loading ? (
        <BCCircularLoader heightValue={'200px'} />
      ) : (
          <BCTableContainer
            columns={columns}
            onRowClick={handleRowClick}
            search
            searchPlaceholder={"Search Groups..."}
            tableData={technicians.data}
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

export default withStyles(styles, { withTheme: true })(TechniciansListing);
