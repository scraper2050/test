import BCTableContainer from "../../../components/bc-table-container/bc-table-container";
import Fab from "@material-ui/core/Fab";
import styled from "styled-components";
import styles from "./../inventory.styles";
import { withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getInventory,
    loadingInventory,
} from "actions/inventory/inventory.action";
import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";

function InventoryListing({ classes }: any) {
    const dispatch = useDispatch();
    const inventory = useSelector((state: any) => state.inventory);
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
            Cell({ row }: any) {
                return (<div className={"flex items-center"}>
                    <img src={row.original.imgUrl} alt={row.original.info.serialNumber} />
                </div>)
            },
            Header: "Image",
            sortable: true,
            width: 60,
        },
        {
            Header: "Brand",
            accessor: "brand.title",
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
            Header: "Model",
            accessor: "info.model",
            className: "font-bold",
            sortable: true,
        },
        {
            Header: "Serial",
            accessor: "info.serialNumber",
            className: "font-bold",
            sortable: true,
        }
    ];

    useEffect(() => {
        dispatch(getInventory());
        dispatch(loadingInventory());
    }, []);

    const handleRowClick = (event: any, row: any) => {
        console.log(event, row);
    };

    return (
        <DataContainer id={"0"}>
            {inventory.loading ? (
                <BCCircularLoader heightValue={'200px'} />
            ) : (
                    <BCTableContainer
                        columns={columns}
                        onRowClick={handleRowClick}
                        search
                        searchPlaceholder={"Search Company Inventory..."}
                        tableData={inventory.data}
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

export default withStyles(styles, { withTheme: true })(InventoryListing);
