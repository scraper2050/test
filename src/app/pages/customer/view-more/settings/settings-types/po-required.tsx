import React, {useState} from 'react';
import styled from 'styled-components';
import { Customer } from 'reducers/customer.types';
import { CircularProgress, Fab, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import SettingHeader from '../settings-header';
import { getCustomerDetailAction, getCustomers, loadingSingleCustomers, updateCustomerAction } from 'actions/customer/customer.action';
import { Can, ability } from 'app/config/Can';

interface PORequiredProps {
    customer: Customer;
    header: any;
    dispatch: any;
}

export default function PORequired({ customer, header, dispatch }:PORequiredProps) {
  const [value, setValue] = useState(customer.isPORequired ? "Yes" : "No");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleChange = (e:any) => {
    setValue(e.target.value);
    const defaultValue = customer.isPORequired ? "Yes" : "No";
    if (defaultValue == e.target.value) {
      setIsSubmitDisabled(true);
    }else{
      setIsSubmitDisabled(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitDisabled(true);
    setIsSubmiting(true);
    const customerUpdate = { ...customer,
      'customerId': customer._id,
      'isPORequired': value == "Yes" ? true : false
    };
    await dispatch(updateCustomerAction(customerUpdate, () => {
      setIsSubmitDisabled(false);
      setIsSubmiting(false);
      dispatch(loadingSingleCustomers());
      dispatch(getCustomerDetailAction(customerUpdate));
      dispatch(getCustomers());
    }));
  };

  return <PORequiredContainer>
    <SettingHeader {...header} />
    <div className={'body'}>
      <FormControl
        fullWidth
        variant={'outlined'}>
        <InputLabel >
          {'PO Required'}
        </InputLabel>
        <Select
          disabled={!ability.can('edit', 'CustomerSettings')}
          label={'PO Required'}
          onChange={handleChange}
          value={value}>
          <MenuItem
            key={"No"}
            value={"No"}>
            No
          </MenuItem>
          <MenuItem
            key={"Yes"}
            value={"Yes"}>
            Yes
          </MenuItem>
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
  </PORequiredContainer>;
}


const PORequiredContainer = styled.div`
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
