import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import Fab from '@material-ui/core/Fab';
import styled from 'styled-components';
import styles from './../estimates.styles';
import { Box, Button, createStyles, makeStyles, withStyles } from "@material-ui/core";
import React, { useEffect } from 'react';
import {
  getInvoicingEstimates,
  loadingInvoicingEstimates
} from 'actions/invoicing/invoicing.action';
import { useDispatch, useSelector } from 'react-redux';
import { Theme } from "@material-ui/core/styles";
import * as CONSTANTS from "../../../../../constants";
import {formatCurrency} from "../../../../../helpers/format";

const useCustomStyles = makeStyles((theme: Theme) =>
  createStyles({
    // items table
    centerContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    iconBtn: {
      fontSize: 18,
      color: CONSTANTS.PRIMARY_WHITE
    },
    csChip: {
      borderRadius: 2
    }
  }),
);


const CSButton = withStyles({
  root: {
    textTransform: 'none',
    fontSize: 13,
    padding: '5px 5px',
    lineHeight: 1.5,
    minWidth: 40,
    margin: '0 5px 0 0',
    color: CONSTANTS.PRIMARY_WHITE,
    backgroundColor: CONSTANTS.TABLE_ACTION_BUTTON,
    borderColor: CONSTANTS.TABLE_ACTION_BUTTON,
    '&:hover': {
      backgroundColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
      borderColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
    },
    '&:active': {
      backgroundColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
      borderColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

function EstimatesListing({ classes }: any) {
  const dispatch = useDispatch();
  const customStyles = useCustomStyles();
  const estimates = useSelector((state: any) => state.estimates);
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
        return <div className={'flex items-center'}>
          <Box display="inline" pr={1}>
            <CSButton
              aria-label={'create-invoice'}
              classes={{
                'root': classes.fabRoot
              }}
              variant="contained"
              color="primary"
              size="small">
              Create Invoice
              </CSButton>
          </Box>
          <CSButton
            aria-label={'create-purchase-order'}
            classes={{
              'root': classes.fabRoot
            }}
            variant="contained"
            color="primary"
            size="small">
            Create Purchase Order
          </CSButton>
        </div>;
      },
      "Header": 'Options',
      'id': 'action-create-invoice',
      'sortable': false,
      'width': 60
    },
  ];

  useEffect(() => {
    dispatch(getInvoicingEstimates());
    dispatch(loadingInvoicingEstimates());
  }, []);

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  return (
    <DataContainer id={'0'}>
      <BCTableContainer
        columns={columns}
        isLoading={estimates.loading}
        onRowClick={handleRowClick}
        search
        searchPlaceholder={'Search invoices...'}
        tableData={estimates.data}
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

export default withStyles(styles, { 'withTheme': true })(EstimatesListing);
