import BCTableContainer from "../../../../components/bc-table-container/bc-table-container";
import Fab from "@material-ui/core/Fab";
import styled from "styled-components";
import styles from "./../purchased-tags.styles";
import { withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPurchasedTags,
  loadingPurchasedTags,
} from "actions/tags/tags.action";
import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";

function PurchasedTagsListing({ classes }: any) {
  const dispatch = useDispatch();
  const purchasedTags = useSelector((state: any) => state.purchasedTags);
  const columns: any = [
    {
      Header: "Invoice#",
      accessor: "_id",
      className: "font-bold",
      sortable: true,
    },
    {
      Header: "Count",
      accessor: "info.noOfTags",
      className: "font-bold",
      sortable: true,
    },
    {
      Cell({ row }: any) {
        return <div className={"flex items-center"}>{'$' + row.original.total || 0}</div>;
      },
      Header: "Total",
      sortable: true,
      width: 60,
    },
    {
      Cell({ row }: any) {
        return <div className={"flex items-center"}>{'$' + row.original.dateTime || ''}</div>;
      },
      Header: "Date",
      sortable: true,
      width: 60,
    },
  ];

  useEffect(() => {
    dispatch(getPurchasedTags());
    dispatch(loadingPurchasedTags());
  }, []);

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  return (
    <DataContainer id={"0"}>
      {purchasedTags.loading ? (
        <BCCircularLoader heightValue={'200px'} />
      ) : (
          <BCTableContainer
            columns={columns}
            onRowClick={handleRowClick}
            search
            searchPlaceholder={"Search Purchases..."}
            tableData={purchasedTags.data}
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

export default withStyles(styles, { withTheme: true })(PurchasedTagsListing);
