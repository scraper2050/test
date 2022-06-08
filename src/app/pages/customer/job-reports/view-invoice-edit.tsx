import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from "@material-ui/core";
import styles from "../customer.styles";
import styled from "styled-components";
import {useLocation, useParams} from "react-router-dom";
import BCCircularLoader from "../../../components/bc-circular-loader/bc-circular-loader";
import BCEditInvoice from "../../../components/bc-invoice/bc-edit-invoice";
import { getAllPaymentTermsAPI } from "../../../../api/payment-terms.api";
import {loadInvoiceItems} from "../../../../actions/invoicing/items/items.action";
import {getAllSalesTaxAPI} from "../../../../api/tax.api";
import {getCustomerDetailAction, getCustomers, resetCustomer} from "../../../../actions/customer/customer.action";
import {getCompanyProfile} from "../../../../api/user.api";

const newInvoice = {
  createdAt: new Date(),
  items:[],
  isDraft: true,
}

function ViewInvoice() {
  const dispatch = useDispatch();
  let { invoice } = useParams<any>();
  const { user } = useSelector(({ auth }:any) => auth);
  const { state } = useLocation<any>();
  const [invoiceDetail, setInvoiceDetail] = useState(state ? state.invoiceDetail : newInvoice);

  const customerId = state ? state.customerId : '';

  //const { 'data': invoiceDetail, 'loading': loadingInvoiceDetail, 'error': invoiceDetailError } = useSelector(({ invoiceDetail }:any) => invoiceDetail);
  const {customerObj: customer, customers} = useSelector(({ customers }:any) => customers);
  useEffect(() => {
    async function getCompany (company: string) {
      const res = await getCompanyProfile(user.company as string);
      setInvoiceDetail({...invoiceDetail, company: res.company});

    }
    if (user && !invoice) {
      getCompany(user.company as string);
      //dispatch(getCompanyProfileAction(user.company as string));
    }

    if (customerId) {
      dispatch(getCustomerDetailAction({customerId}));
    } else {
      dispatch(resetCustomer());
      dispatch(getCustomers());
    }

    dispatch(loadInvoiceItems.fetch());
    dispatch(getAllPaymentTermsAPI());
    dispatch(getAllSalesTaxAPI());

  }, []);

  if ((customerId && !customer._id) || (!customerId && customers?.length === 0) || !invoiceDetail.company)
    return<BCCircularLoader heightValue={'200px'} />

  return (
    <MainContainer>
      <PageContainer>
        <BCEditInvoice invoiceData={invoiceDetail} isOld={!!invoice}/>
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
