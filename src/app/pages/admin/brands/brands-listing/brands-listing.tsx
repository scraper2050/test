import BCTableContainer from "../../../../components/bc-table-container/bc-table-container";
import styled from "styled-components";
import styles from "./../brands.styles";
import { withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  loadingBrands,
} from "actions/brands/brands.action";
import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";

function BrandsListing({ classes }: any) {
  const dispatch = useDispatch();
  const brands = useSelector((state: any) => state.brands);
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
      Header: "Brand",
      accessor: "title",
      className: "font-bold",
      sortable: true,
    }
  ];

  useEffect(() => {
    dispatch(getBrands());
    dispatch(loadingBrands());
  }, []);

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  return (
    <DataContainer id={"0"}>
      {brands.loading ? (
        <BCCircularLoader heightValue={'200px'} />
      ) : (
        <BCTableContainer
          columns={columns}
          onRowClick={handleRowClick}
          search
          searchPlaceholder={"Search Brands..."}
          tableData={brands.data}
        />
      )}
    </DataContainer>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  overflow: hidden;
`;

export default withStyles(styles, { withTheme: true })(BrandsListing);
