import React, { useEffect } from "react";
import { Paper, withStyles } from "@material-ui/core";
import styled from "styled-components";
import { connect, useDispatch, useSelector } from "react-redux";
import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";
import { getAllPaymentTermsAPI } from "api/payment-terms.api";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { updateCustomerPaymentTermsAction } from "actions/payment-terms/payment.terms.action";
import { CompanyProfileStateType } from "../../../actions/user/user.types";
import { success } from "../../../actions/snackbar/snackbar.action";
import { closeModalAction } from "../../../actions/bc-modal/bc-modal.action";
import { getCustomerDetailAction } from "../../../actions/customer/customer.action";


const BCPaymentTermsModalContainer = styled(Paper)`
padding: 30px;
.actions-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}
.MuiFab-primary {
    color: white;
    width: 200px;
    border-radius: 30px;
    margin-top: 20px;
}
`;

interface BCSidebarProps {
  token: string;
  user: any;
  customerId: string;
}

function BcUpdatePaymentTermsModal({ token, user, customerId }: BCSidebarProps) {
  const dispatch = useDispatch();
  const { 'data': paymentTerms, isLoading, done, updating, error } = useSelector(({ paymentTerms }: any) => paymentTerms);
  const companyProfile: CompanyProfileStateType = useSelector((state: any) => state.profile);
  const { customerObj, loading } = useSelector((state: any) => state.customers);
  const [value, setValue] = React.useState<any>();


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateCustomerPaymentTermsAction((event.target as HTMLInputElement).value, customerId as string));
    setValue((event.target as HTMLInputElement).value);
    setTimeout(() => {
      dispatch(closeModalAction());
      dispatch(getCustomerDetailAction({ customerId }));
    }, 500);
  };

  useEffect(() => {
    dispatch(getAllPaymentTermsAPI());
    dispatch(getCustomerDetailAction({ customerId }));
  }, []);

  useEffect(() => {
    setValue(customerObj?.paymentTerm?._id);
  }, []);

  if (isLoading) {
    return <BCCircularLoader heightValue={'100px'} />;
  }

  return <BCPaymentTermsModalContainer>
    <FormControl component="fieldset">
      <FormLabel component="legend">Select payment terms to set as default</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        {
          paymentTerms.map((pitem: any, pindex: number) => {
            return (
              <FormControlLabel key={pitem._id} value={pitem._id} control={<Radio />} label={pitem.name} />
            )
          })
        }
      </RadioGroup>
    </FormControl>
  </BCPaymentTermsModalContainer>;
}


const mapStateToProps = (state: {
  auth: {
    token: string;
    user: any;
  };
}) => ({
  'token': state.auth.token,
  'user': state.auth.user
});


export default withStyles(
  {},
  { 'withTheme': true }
)(connect(mapStateToProps)(BcUpdatePaymentTermsModal));
