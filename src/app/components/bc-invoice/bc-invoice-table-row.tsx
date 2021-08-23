import React from 'react';
import { createMuiTheme, makeStyles, MuiThemeProvider, Theme } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  createStyles, Divider,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  withStyles
} from "@material-ui/core";
import * as CONSTANTS from "../../../constants";
import styles from "./bc-invoice.styles";
import classNames from "classnames";
import { blue } from "@material-ui/core/colors";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";


const useInvoiceTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    // items table
    itemsTableHeader: {
      padding: '18px 20px',
      backgroundColor: CONSTANTS.INVOICE_TOP,
     /* color: CONSTANTS.INVOICE_TABLE_HEADING,*/
      fontStyle: 'normal',
fontWeight: 500,
fontSize: '14px',
lineHeight: '16px',
textTransform: 'uppercase',
color: '#828282',
    },
    itemsTableRoot: {
      padding: '35px 20px',
      borderBottom: '1px solid #D0D3DC',
    },
    textCenter: {
      textAlign: 'center'
    },
    textRight: {
      textAlign: 'right'
    },

    // custom input
    formField: {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    formFieldFullWidth: {
      margin: theme.spacing(1),
      width: '100%'
    },
    formFieldRow: {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    bootstrapRoot: {
      'label + &': {
        marginTop: 0,
        display: 'flex',
        minWidth: '50%'
      },
      '&': {
        marginTop: 0,
        display: 'flex',
        minWidth: '50%'
      },
    },
    bootstrapRootError: {
      borderRadius: 8,
      border: `1px solid ${CONSTANTS.PRIMARY_ORANGE}`,
    },
    bootstrapInput: {
      borderRadius: 8,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #E0E0E0',
      fontSize: 14,
      width: '100%',
      padding: '8px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 8,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
    bootstrapFormLabel: {
      fontSize: 14,
      textTransform: 'uppercase',
      transform: 'none',
      marginRight: 20,
      color: CONSTANTS.PRIMARY_DARK_GREY
    },
  }),
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
  overrides: {
    MuiCard: {
      root: {
        margin: 10,
        borderRadius: 5
      },
    },
  },
});

interface Props {
  classes?: any;
  rowDatas?: any;
  values?: any;
  handleChange(fieldName: string): any
  errors?: any;
}

function BCInvoiceItemsTableRow({ classes, rowDatas, values, handleChange, errors }: Props) {
  const { 'items': invoiceItems } = useSelector(({ invoiceItems }:RootState) => invoiceItems);

  const invoiceTableStyle = useInvoiceTableStyles();
  console.log("log-rowData?.item?._id", rowDatas?.item?._id);

  return (
    <>
      <Grid container spacing={1} className={invoiceTableStyle.itemsTableHeader}>
        <Grid item xs={5}>Service / Product</Grid>
        <Grid item xs={1} className={invoiceTableStyle.textCenter}>Quantity</Grid>
        <Grid item xs={2} className={invoiceTableStyle.textCenter}>Price</Grid>
        <Grid item xs={1} className={invoiceTableStyle.textCenter}>Unit</Grid>
        <Grid item xs={1} className={invoiceTableStyle.textCenter}>Tax</Grid>
        <Grid item xs={1} className={invoiceTableStyle.textRight}>Amount</Grid>
        <Grid item xs={1} className={invoiceTableStyle.textCenter}></Grid>
      </Grid>
      {
        rowDatas.map((rowData: any, rowIndex: number) => {
          return (
            <div className={invoiceTableStyle.itemsTableRoot}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={5}>
                  <FormControl className={invoiceTableStyle.formFieldFullWidth}>
                    <Select
                      placeholder="Select Service/Product"
                      onChange={handleChange('company')}
                      value={rowData?.item?._id}
                      input={<InputBase
                        classes={{
                          root: classNames(invoiceTableStyle.bootstrapRoot, {
                            [invoiceTableStyle.bootstrapRootError]: !!errors.terms
                          }),
                          input: invoiceTableStyle.bootstrapInput,
                        }}
                        error={!!errors.terms} />}
                    >
                      <MenuItem value={""}>
                        <em>None</em>
                      </MenuItem>
                      {
                        invoiceItems.map((invitem, invindex) => {
                          return (
                            <MenuItem key={invindex} value={invitem?._id}>{invitem?.name}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}>
                  <FormControl className={invoiceTableStyle.formField}>
                    <InputBase
                      id="one"
                      name="quantity"
                      type="number"
                      value={rowData?.quantity}
                      error={!!errors.quantity}
                      onChange={handleChange('quantity')}
                      classes={{
                        root: classNames(invoiceTableStyle.bootstrapRoot, {
                          [invoiceTableStyle.bootstrapRootError]: !!errors.quantity
                        }),
                        input: invoiceTableStyle.bootstrapInput,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={invoiceTableStyle.formField}>
                    <InputBase
                      id="one"
                      name="price"
                      type="number"
                      value={rowData?.price}
                      error={!!errors.price}
                      onChange={handleChange('price')}
                      classes={{
                        root: classNames(invoiceTableStyle.bootstrapRoot, {
                          [invoiceTableStyle.bootstrapRootError]: !!errors.price
                        }),
                        input: invoiceTableStyle.bootstrapInput,
                      }}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={1}>
                  <FormControl className={invoiceTableStyle.formFieldFullWidth}>
                    <Select
                      onChange={handleChange('unit')}
                      value={values.unit}
                      input={<InputBase
                        classes={{
                          root: classNames(invoiceTableStyle.bootstrapRoot, {
                            [invoiceTableStyle.bootstrapRootError]: !!errors.unit
                          }),
                          input: invoiceTableStyle.bootstrapInput,
                        }}
                        error={!!errors.unit} />}
                    >
                      <MenuItem value={"fixed"}>
                        Fixed
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}>
                  <FormControl className={invoiceTableStyle.formFieldFullWidth}>
                    <Select
                      onChange={handleChange('tax')}
                      value={values.tax}
                      input={<InputBase
                        classes={{
                          root: classNames(invoiceTableStyle.bootstrapRoot, {
                            [invoiceTableStyle.bootstrapRootError]: !!errors.tax
                          }),
                          input: invoiceTableStyle.bootstrapInput,
                        }}
                        error={!!errors.tax} />}
                    >
                      <MenuItem value={"8.25"}>
                        8.25 %
                      </MenuItem>
                      <MenuItem value={"10.25"}>
                        10.25 %
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1} className={invoiceTableStyle.textRight}>
            <span>
              $ {rowData?.subTotal}
            </span>
                </Grid>
                <Grid item xs={1} className={invoiceTableStyle.textCenter}>
                  <IconButton aria-label="delete" color="primary" size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container spacing={1} justify="space-between" alignItems="center">
                <Grid item xs={9}>
                  <FormControl className={invoiceTableStyle.formFieldFullWidth}>
                    <InputBase
                      id="one"
                      name="message"
                      value={values.message}
                      error={!!errors.message}
                      onChange={handleChange('message')}
                      classes={{
                        root: classNames(invoiceTableStyle.bootstrapRoot, {
                          [invoiceTableStyle.bootstrapRootError]: !!errors.message
                        }),
                        input: invoiceTableStyle.bootstrapInput,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  --
                </Grid>
              </Grid>

              

            </div>
          )
        })
      }
    </>
  )
}

export default withStyles(styles)(BCInvoiceItemsTableRow);
