import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chip, createStyles, Divider, Grid, withStyles } from "@material-ui/core";
import styles from "./bc-invoice.styles";
import { makeStyles, Theme } from "@material-ui/core/styles";
import * as CONSTANTS from "../../../constants";
import styled from "styled-components";
import { getCustomerDetailAction } from "../../../actions/customer/customer.action";
import moment from "moment";

import classNames from "classnames";
import { getContacts } from "../../../api/contacts.api";
import {getAllSalesTaxAPI} from "../../../api/tax.api";

interface Props {
  classes?: any;
  invoiceDetail?: any;
}

const invoicePageStyles = makeStyles((theme: Theme) =>
  createStyles({
    invoiceTop: {
      backgroundColor: CONSTANTS.INVOICE_TOP,
      paddingTop: theme.spacing(8),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
    companyDetails: {
      display: 'flex',
      flex: '1 1 0%',
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      minHeight: 350,
    },
    companyLogo: {
      width: '40%',
      '& > img': {
        width: '100%',
      }
    },
    companyInfo: {
      '& > span': {
        color: CONSTANTS.PRIMARY_DARK_GREY,
        display: 'flex',
      },
      '& > small': {
        color: CONSTANTS.PRIMARY_DARK_GREY,
        display: 'flex',
        fontSize: 10,
        marginBottom: 5
      },
      '& > h4': {
        marginTop: 0
      }
    },
    invoiceDetails: {
      display: 'flex',
      flex: '1 1 0%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      minHeight: 350,
      '& > div': {
        '& > h2': {
          color: CONSTANTS.INVOICE_HEADING,
          textAlign: 'right'
        },
      },
    },
    dateContainer: {
      display: 'flex',
      flex: '1 1 0%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      '& > div': {
        '& > label': {
          fontSize: 10,
          display: 'block',
          textAlign: 'right',
          color: CONSTANTS.PRIMARY_DARK_GREY,
          '& > span': {
            fontSize: 14,
            color: CONSTANTS.INVOICE_HEADING,
            marginLeft: 20,
            fontWeight: 200
          },
        }
      }
    },
    divider: {
      margin: '0 20px',
    },
    totalContainer: {
      backgroundColor: CONSTANTS.INVOICE_TOTAL_CONTAINER,
      width: '100%',
      padding: 10,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      minHeight: 100,
      '& > div': {
        '& > small': {
          color: CONSTANTS.PRIMARY_DARK_GREY,
          fontSize: 10,
          marginBottom: 5
        },
      },
    },
    totalEnd: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      '& > h1': {
        margin: 0,
        padding: 0
      }
    },
    invoiceBottom: {
      backgroundColor: CONSTANTS.PRIMARY_WHITE,
      marginTop: theme.spacing(6),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
      paddingBottom: theme.spacing(10),
    },
    invoiceBottomInner: {
      backgroundColor: CONSTANTS.INVOICE_TOP,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      '& > div': {
        '&:first-child': {
          width: '60%'
        },
        '&:last-child': {
          width: '40%'
        },
        '& > div > span': {
          color: CONSTANTS.PRIMARY_DARK_GREY,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          fontSize: 10,
          marginBottom: 5
        },
        '& > div > h3': {
          margin: 0,
          fontWeight: 400,
          color: CONSTANTS.PRIMARY_DARK_GREY,
        },
        '& > div > h2': {
          margin: 0,
          fontWeight: 400,
          color: CONSTANTS.PRIMARY_DARK_GREY,
        },
      }
    },
    invoiceBottomSubTotal: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      '& > div': {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '15px 10px',
      }
    },
    invoiceBottomTotal: {
      backgroundColor: CONSTANTS.INVOICE_TOTAL_CONTAINER,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      '& > div': {
        paddingRight: 10,
        '& > span': {
          justifyContent: 'flex-end!important'
        }
      }
    },
    invoiceBottomInfo: {
      '& > p': {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        fontSize: 11,
        fontWeight: 400,
      }
    }
  }),
);

const invoiceTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    // items table
    itemsTable: {
      backgroundColor: CONSTANTS.PRIMARY_WHITE,
    },
    itemsTableHeader: {
      backgroundColor: CONSTANTS.INVOICE_TOP,
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
    itemsTableHeaderText: {
      fontSize: 10,
      fontWeight: 200,
      color: CONSTANTS.INVOICE_TABLE_HEADING,
      display: 'block',
      padding: '20px 0',
      borderRight: `1px solid ${CONSTANTS.PRIMARY_WHITE}`
    },
    itemsTableHeaderTextCenter: {
      textAlign: 'center',
    },
    itemsTableHeaderTextRight: {
      textAlign: 'right',
      paddingRight: '10px!important'
    },
    itemsTableBody: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
    itemsTableBodyText: {
      fontSize: 14,
      fontWeight: 600,
      color: CONSTANTS.INVOICE_TABLE_HEADING,
      display: 'block',
      padding: '20px 0',
      borderRight: `1px solid ${CONSTANTS.PRIMARY_WHITE}`
    },
  }),
);

function BCInvoice({ classes, invoiceDetail }: Props) {
  const invoiceStyles = invoicePageStyles();
  const invoiceTableStyle = invoiceTableStyles();
/*  const dispatch = useDispatch();
  if (invoiceDetail.customer) {
    dispatch(getCustomerDetailAction({customerId: invoiceDetail.customer._id}));
  }
  dispatch(getAllSalesTaxAPI());*/

  return (
    <DataContainer>
      <div className={invoiceStyles.invoiceTop}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <div className={invoiceStyles.companyDetails}>
              <div className={invoiceStyles.companyLogo}>
                <img src={invoiceDetail?.company?.info?.logoUrl}/>
              </div>
              <div></div>
              <div className={invoiceStyles.companyInfo}>
                <small>BILL TO</small>
                <h4>{invoiceDetail?.customer?.profile?.lastName} {invoiceDetail?.customer?.profile?.firstName}</h4>
                <span>{invoiceDetail?.customer?.contact?.phone}</span>
                <span>{invoiceDetail?.customer?.info?.email}</span>
                <span>{invoiceDetail?.customer?.address?.street}</span>
                <span>{invoiceDetail?.customer?.address?.city}, {invoiceDetail?.customer?.address?.state} {invoiceDetail?.customer?.address?.zipCode}</span>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={3}>
            <div className={invoiceStyles.companyDetails}>
              <div className={invoiceStyles.companyInfo}>
                <h4>{invoiceDetail?.company?.info?.companyName}</h4>
                <span>{invoiceDetail?.company?.contact?.phone}</span>
                <span>{invoiceDetail?.company?.info?.companyEmail}</span>
                <span>{invoiceDetail?.company?.address?.street}</span>
                <span>{invoiceDetail?.company?.address?.city}, {invoiceDetail?.company?.address?.state} {invoiceDetail?.company?.address?.zipCode}</span>
              </div>
              <div className={invoiceStyles.companyInfo}>
                <small>CONTACT DETAILS</small>
                <h4>{invoiceDetail?.customer?.contactName ? invoiceDetail?.customer?.contactName : 'no contact found'}</h4>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={invoiceStyles.invoiceDetails}>
              <div>
                { invoiceDetail.paid
                  ? <Chip
                    label={'Paid'}
                    style={{ 'backgroundColor': CONSTANTS.PRIMARY_GREEN,
                      'color': '#fff' }}
                  />
                  : <Chip
                    color={'secondary'}
                    label={'Unpaid'}
                  />}
              </div>
              <div>
                <h2>INVOICE</h2>
                <div className={invoiceStyles.dateContainer}>
                  <div>
                    <label>INVOICE #: <span>{invoiceDetail.invoiceId}</span></label>
                    <label>CUSTOMER P.O. : <span>{invoiceDetail.invoiceId}</span></label>
                    <label>Payment Terms : <span>{invoiceDetail?.paymentTerm?.name}</span></label>
                  </div>
                  <Divider className={invoiceStyles.divider} orientation="vertical" flexItem />
                  <div>
                    <label>INVOICE DATE #: <span>{moment(invoiceDetail.createdAt).format('MMM. DD, YYYY')}</span></label>
                    <label>DUE DATE #: <span>{moment(invoiceDetail.dueDate).format('MMM. DD, YYYY')}</span></label>
                  </div>
                </div>
              </div>
              <div className={invoiceStyles.totalContainer}>
                <div>
                  <small>Total</small>
                </div>
                <div className={invoiceStyles.totalEnd}>
                  <h1>${invoiceDetail.total}</h1>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className={invoiceTableStyle.itemsTable}>

        <div className={invoiceTableStyle.itemsTableHeader}>
          <Grid container>
            <Grid item xs={12} lg={6}>
              <span className={invoiceTableStyle.itemsTableHeaderText}>SERVICE / PRODUCT</span>
            </Grid>
            <Grid item xs={12} lg={1}>
              <span className={classNames(invoiceTableStyle.itemsTableHeaderText, invoiceTableStyle.itemsTableHeaderTextCenter)}>QUANTITY</span>
            </Grid>
            <Grid item xs={12} lg={1}>
              <span className={classNames(invoiceTableStyle.itemsTableHeaderText, invoiceTableStyle.itemsTableHeaderTextCenter)}>PRICE</span>
            </Grid>
            <Grid item xs={12} lg={1}>
              <span className={classNames(invoiceTableStyle.itemsTableHeaderText, invoiceTableStyle.itemsTableHeaderTextCenter)}>UNIT</span>
            </Grid>
            <Grid item xs={12} lg={1}>
              <span className={classNames(invoiceTableStyle.itemsTableHeaderText, invoiceTableStyle.itemsTableHeaderTextCenter)}>TAX</span>
            </Grid>
            <Grid item xs={12} lg={1}>
              <span className={classNames(invoiceTableStyle.itemsTableHeaderText, invoiceTableStyle.itemsTableHeaderTextCenter)}>TAX AMOUNT</span>
            </Grid>
            <Grid item xs={12} lg={1}>
              <span className={classNames(invoiceTableStyle.itemsTableHeaderText, invoiceTableStyle.itemsTableHeaderTextRight)}>AMOUNT</span>
            </Grid>
          </Grid>
        </div>
        <div className={invoiceTableStyle.itemsTableBody}>
          {invoiceDetail?.items && invoiceDetail?.items.map((row: any) => (
            <Grid container>
              <Grid item xs={12} lg={6}>
                <span className={invoiceTableStyle.itemsTableBodyText}>{row?.item?.name}</span>
              </Grid>
              <Grid item xs={12} lg={1}>
                <span className={classNames(
                  invoiceTableStyle.itemsTableBodyText,
                  invoiceTableStyle.itemsTableHeaderTextCenter
                )}>{row?.quantity}</span>
              </Grid>
              <Grid item xs={12} lg={1}>
                <span className={classNames(
                  invoiceTableStyle.itemsTableBodyText,
                  invoiceTableStyle.itemsTableHeaderTextCenter
                )}>${parseFloat(row?.price).toFixed(2)}</span>
              </Grid>
              <Grid item xs={12} lg={1}>
                <span className={classNames(
                  invoiceTableStyle.itemsTableBodyText,
                  invoiceTableStyle.itemsTableHeaderTextCenter
                )}>{row?.quantity}</span>
              </Grid>
              <Grid item xs={12} lg={1}>
                <span className={classNames(
                  invoiceTableStyle.itemsTableBodyText,
                  invoiceTableStyle.itemsTableHeaderTextCenter
                )}>{row?.tax > 0 ? parseFloat(row?.tax).toFixed(2) : 'N/A'}</span>
              </Grid>
              <Grid item xs={12} lg={1}>
                <span className={classNames(
                  invoiceTableStyle.itemsTableBodyText,
                  invoiceTableStyle.itemsTableHeaderTextCenter
                )}>${parseFloat(row?.taxAmount).toFixed(2)}</span>
              </Grid>
              <Grid item xs={12} lg={1}>
                <span className={classNames(
                  invoiceTableStyle.itemsTableBodyText,
                  invoiceTableStyle.itemsTableHeaderTextRight
                )}>${parseFloat(row?.subTotal).toFixed(2)}</span>
              </Grid>
            </Grid>
          ))}
        </div>

      </div>
      <div className={invoiceStyles.invoiceBottom}>
        <div className={invoiceStyles.invoiceBottomInner}>
          <div className={invoiceStyles.invoiceBottomSubTotal}>
            <div>
              <span>SUBTOTAL</span>
              <h3>${parseFloat(invoiceDetail.subTotal).toFixed(2)}</h3>
            </div>
            <div>
              <h3>+</h3>
            </div>
            <div>
              <span>TAX</span>
              <h3>${parseFloat(invoiceDetail.taxAmount).toFixed(2)}</h3>
            </div>
          </div>
          <div className={invoiceStyles.invoiceBottomTotal}>
            <div>
              <span>TOTAL</span>
              <h2>${parseFloat(invoiceDetail.total).toFixed(2)}</h2>
            </div>
          </div>
        </div>
        <div className={invoiceStyles.invoiceBottomInfo}>
          <p>Please pay within 15 days.</p>
        </div>
        <Divider/>
        <h3>idiservice.net</h3>
      </div>
    </DataContainer>
  )
}

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  background-color: ${CONSTANTS.PRIMARY_WHITE};
  border: 1px solid ${CONSTANTS.INVOICE_BORDER};
`;


export default withStyles(styles)(BCInvoice);
