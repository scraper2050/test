import BCTableContainer from "../../../../components/bc-table-container/bc-table-container";
import styled from "styled-components";
import styles from "./../todos.styles";
import { withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodos,
  loadingTodos,
} from "actions/invoicing/invoicing.action";
import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";

function TodosListing({ classes }: any) {
  const dispatch = useDispatch();
  const invoiceTodos = useSelector((state: any) => state.invoiceTodos);
  const columns: any = [
    {
      Header: "Job Id",
      accessor: "jobId",
      className: "font-bold",
      sortable: true,
    },
    {
      Header: "Status",
      accessor: "status",
      className: "font-bold",
      sortable: true,
    },
    {
      Header: "Technician",
      accessor: "technician.profile.displayName",
      className: "font-bold",
      sortable: true,
    },
    {
      Header: "Customer",
      accessor: "customer.profile.displayName",
      className: "font-bold",
      sortable: true,
    },
    {
      Header: "Type",
      accessor: "type.title",
      className: "font-bold",
      sortable: true,
    },
    {
      Header: "Start Date",
      accessor: "scheduledStartTime",
      className: "font-bold",
      sortable: true,
    }
  ];

  useEffect(() => {
    dispatch(getTodos());
    dispatch(loadingTodos());
  }, []);

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  return (
    <DataContainer id={"0"}>
      {invoiceTodos.loading ? (
        <BCCircularLoader heightValue={'200px'} />
      ) : (
          <BCTableContainer
            columns={columns}
            onRowClick={handleRowClick}
            search
            searchPlaceholder={"Search Managers..."}
            tableData={invoiceTodos.data}
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

export default withStyles(styles, { withTheme: true })(TodosListing);
