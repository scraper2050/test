import BCTableContainer from "../../../../components/bc-table-container/bc-table-container";
import styled from "styled-components";
import styles from "./../equipment-type.styles";
import { withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEquipmentType,
  loadingEquipmentType,
} from "actions/equipment-type/equipment-type.action";
import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";

function EquipmentTypeListing({ classes }: any) {
  const dispatch = useDispatch();
  const equipmentType = useSelector((state: any) => state.equipmentType);
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
      Header: "Equipment Type",
      accessor: "title",
      className: "font-bold",
      sortable: true,
    }
  ];

  useEffect(() => {
    dispatch(getEquipmentType());
    dispatch(loadingEquipmentType());
  }, []);

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  return (
    <DataContainer id={"0"}>
      {equipmentType.loading ? (
        <BCCircularLoader heightValue={'200px'} />
      ) : (
        <BCTableContainer
          columns={columns}
          onRowClick={handleRowClick}
          search
          searchPlaceholder={"Search Equipment Types..."}
          tableData={equipmentType.data}
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

export default withStyles(styles, { withTheme: true })(EquipmentTypeListing);
