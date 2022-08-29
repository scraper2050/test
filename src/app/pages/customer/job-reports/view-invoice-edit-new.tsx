// TODO this component is never used, should we get rid of it?
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, createStyles, withStyles, Grid, Paper } from "@material-ui/core";
import styles from "../customer.styles";
import BCInvoice from "../../../components/bc-invoice/bc-invoice";
import IconButton from '@material-ui/core/IconButton';
import styled from "styled-components";
import * as CONSTANTS from "../../../../constants";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PrintIcon from '@material-ui/icons/Print';
import EmailIcon from '@material-ui/icons/Email';
import classNames from "classnames";
import { useHistory, useParams } from "react-router-dom";
import { getCustomerDetailAction, loadingSingleCustomers } from "../../../../actions/customer/customer.action";
import { loadInvoiceDetail } from "../../../../actions/invoicing/invoicing.action";
import { getCompanyProfileAction } from "../../../../actions/user/user.action";
import { INVOICE_BORDER, PRIMARY_GRAY } from "../../../../constants";
import BCCircularLoader from "../../../components/bc-circular-loader/bc-circular-loader";
import BCEditInvoice from "../../../components/bc-invoice/bc-edit-invoice";
import { getAllPaymentTermsAPI } from "../../../../api/payment-terms.api";

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
  const invoiceStyles = invoicePageStyles();
  let history = useHistory();
  let { invoice } = useParams<any>();
  const { user } = useSelector(({ auth }:any) => auth);
  const { 'data': invoiceDetail, 'loading': loadingInvoiceDetail, 'error': invoiceDetailError } = useSelector(({ invoiceDetail }:any) => invoiceDetail);

  useEffect(() => {
    if (invoice) {
      dispatch(loadInvoiceDetail.fetch(invoice));
    }

    if (user) {
      dispatch(getCompanyProfileAction(user.company as string));
    }
    dispatch(getAllPaymentTermsAPI());
  }, []);

  if (loadingInvoiceDetail) {
    return <BCCircularLoader heightValue={'200px'} />;
  }

  const goToEdit = () => {
    history.push({
      'pathname': `edit/${invoice._id}`,
    });
  }

  const goToEditNew = () => {
    history.push({
      'pathname': `edit-new/${invoice._id}`,
    });
  }

  return (
    <MainContainer>
      <PageContainer>
        {/* <BCEditInvoice invoiceData={invoiceDetail} isOld={invoice}/> */}
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
