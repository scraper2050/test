import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import Fab from '@material-ui/core/Fab';
import styled from 'styled-components';
import styles from './../purchase-order.styles';
import { Button, createStyles, makeStyles, withStyles } from "@material-ui/core";
import React, { useEffect } from 'react';
import {
  getPurchaseOrder,
  loadingPurchaseOrder
} from 'actions/invoicing/invoicing.action';
import { useDispatch, useSelector } from 'react-redux';
import { Theme } from "@material-ui/core/styles";
import * as CONSTANTS from "../../../../../constants";
import { CSButton, useCustomStyles } from "../../../../../helpers/custom";
import {formatCurrency} from "../../../../../helpers/format";

function PurchaseOrderListing({ classes }: any) {
  const dispatch = useDispatch();
  const customStyles = useCustomStyles();
  const purchaseOrder = useSelector((state: any) => state.purchaseOrder);
  const columns: any = [
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          {row.index + 1}
        </div>;
      },
      'Header': 'No#',
      'sortable': true,
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          {
            row.original.items && row.original.items.length
              ? row.original.items.map((item: { name: string }, index: number) => `${item.name} ${index === row.original.items.length - 1
                ? ''
                : ','}`)
              : ''
          }
        </div>;
      },
      'Header': 'Items',
      'sortable': true,
      'width': 60
    },
    {
      'Header': 'Customer',
      'accessor': 'customer.profile.displayName',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'accessor': (originalRow: any) => formatCurrency(originalRow.total),
      'Header': 'Total',
      'sortable': true,
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return <CSButton
            aria-label={'create-job'}
            variant="contained"
            color="primary">
            Create Estimates
          </CSButton>;
      },
      'Header': 'Option',
      'id': 'action-create-job',
      'sortable': false,
      'width': 60
    }
  ];

  useEffect(() => {
    dispatch(getPurchaseOrder());
    dispatch(loadingPurchaseOrder());
  }, []);

  const handleRowClick = (event: any, row: any) => {
    // Console.log(event, row);
  };

  return (
    <DataContainer id={'0'}>
      <BCTableContainer
        columns={columns}
        isLoading={purchaseOrder.loading}
        onRowClick={handleRowClick}
        search
        searchPlaceholder={'Search invoices...'}
        tableData={purchaseOrder.data}
      />
    </DataContainer>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  overflow: hidden;
`;

export default withStyles(styles, { 'withTheme': true })(PurchaseOrderListing);
