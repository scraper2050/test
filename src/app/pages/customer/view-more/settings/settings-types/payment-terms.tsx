import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Customer } from 'reducers/customer.types';
import { CircularProgress, Fab, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import SettingHeader from '../settings-header';
import { getCustomerDetailAction, loadingSingleCustomers } from 'actions/customer/customer.action';
import { useSelector } from 'react-redux';
import { getAllPaymentTermsAPI } from 'api/payment-terms.api';
import { updateCustomerPaymentTermsAction } from 'actions/payment-terms/payment.terms.action';
import { Can, ability } from 'app/config/Can';


interface PaymentTermsProps {
    customer: Customer;
    header: any;
    dispatch: any;
}

export default function PaymentTerms({ customer, header, dispatch }:PaymentTermsProps) {
  const { 'data': paymentTerms } = useSelector(({ paymentTerms }: any) => paymentTerms);
  const [value, setValue] = useState<string>(customer?.paymentTerm?._id as string);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);

  useEffect(() => {
    dispatch(getAllPaymentTermsAPI());
    dispatch(getCustomerDetailAction({ customerId: customer._id }));
  }, []);

  const handleChange = (e:any) => {
    setValue(e.target.value);
    const defaultValue = customer?.paymentTerm?._id;
    if (defaultValue == e.target.value) {
      setIsSubmitDisabled(true);
    }else{
      setIsSubmitDisabled(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitDisabled(true);
    setIsSubmiting(true);
    await dispatch(updateCustomerPaymentTermsAction(value, customer._id));
    setIsSubmitDisabled(false);
    setIsSubmiting(false);
    dispatch(loadingSingleCustomers());
    const customerUpdate = {
      ...customer,
      'customerId': customer._id
    };
    dispatch(getCustomerDetailAction(customerUpdate));    
  };

  return <PaymentTermsContainer>
    <SettingHeader {...header} />
    <div className={'body'}>
      <FormControl
        fullWidth
        variant={'outlined'}>
        <InputLabel >
          {'Payment Terms'}
        </InputLabel>
        <Select
          disabled={!ability.can('edit', 'CustomerSettings')}
          label={'Payment Terms'}
          onChange={handleChange}
          value={value}>
          {
            paymentTerms.map((pitem: any, pindex: number) => {
              return (
                 <MenuItem
                  key={pitem._id}
                  value={pitem._id}>
                  {pitem.name}
                </MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    
      <Can I={'edit'} a={'CustomerSettings'}>
        <Fab
          color={'primary'}
          disabled={isSubmitDisabled}
          onClick={handleSubmit}>
          {isSubmiting ? (
            <CircularProgress size={25} />
          ) : "Save"}
        </Fab>
      </Can>
    </div>
  </PaymentTermsContainer>;
}


const PaymentTermsContainer = styled.div`
    margin: 0 auto;
    text-align: center;

    h3 {
        max-width: 400px;
        margin: 40px auto ;
    }
    
    button {
        margin-top: 30px;
        color: #fff;
        width: 200px;
        border-radius: 30px;
    }
`;
