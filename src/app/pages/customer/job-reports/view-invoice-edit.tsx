import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, withStyles } from "@material-ui/core";
import styles from "../customer.styles";
import styled from "styled-components";
import * as CONSTANTS from "../../../../constants";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { loadInvoiceDetail } from "../../../../actions/invoicing/invoicing.action";
import { getCompanyProfileAction } from "../../../../actions/user/user.action";
import BCCircularLoader from "../../../components/bc-circular-loader/bc-circular-loader";
import BCEditInvoice from "../../../components/bc-invoice/bc-edit-invoice";
import { getAllPaymentTermsAPI } from "../../../../api/payment-terms.api";
import {loadInvoiceItems} from "../../../../actions/invoicing/items/items.action";
import {getAllSalesTaxAPI} from "../../../../api/tax.api";

const invoicePageStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    margin: {
      margin: theme.spacing(1),
    },
    white: {
      color: '#fff',
    },
    invoiceTop: {
      backgroundColor: CONSTANTS.PRIMARY_GRAY,
    },
    bgDark: {
      backgroundColor: '#D0D3DC',
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

function ViewInvoice({ classes, theme }: any) {
  const dispatch = useDispatch();
  let { invoice } = useParams();
  const { user } = useSelector(({ auth }:any) => auth);
  const { 'data': invoiceDetail, 'loading': loadingInvoiceDetail, 'error': invoiceDetailError } = useSelector(({ invoiceDetail }:any) => invoiceDetail);

  useEffect(() => {
    if (invoice) {
      dispatch(loadInvoiceDetail.fetch(invoice));
    }
    if (user) {
      dispatch(getCompanyProfileAction(user.company as string));
    }
    dispatch(loadInvoiceItems.fetch());
    dispatch(getAllPaymentTermsAPI());
    dispatch(getAllSalesTaxAPI());
  }, []);

  return (
    <MainContainer>
      <PageContainer>
        {loadingInvoiceDetail || Object.keys(invoiceDetail).length === 0?
          <BCCircularLoader heightValue={'200px'} /> :
          <BCEditInvoice invoiceData={invoiceDetail} isOld={invoice}/>
        }
      </PageContainer>
    </MainContainer>
  )
}


export const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding: 30px;
  width: 100%;
  padding-left: 65px;
  padding-right: 65px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 18px;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1 1 100%;
  padding: 10px 0;
  width: 100%;
  margin: 0 auto;
  align-items: center;
`;

export default withStyles(styles, { 'withTheme': true })(ViewInvoice);
