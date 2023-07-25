import React, {useState} from 'react';
import styled from 'styled-components';
import { Customer } from 'reducers/customer.types';
import { Fab, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import SettingHeader from '../settings-header';
import { getCustomerDetailAction, loadingSingleCustomers, updateCustomerAction } from 'actions/customer/customer.action';
import BcInput from 'app/components/bc-input/bc-input';


interface NotesProps {
    customer: Customer;
    header: any;
    dispatch: any;
}

export default function Notes({ customer, header, dispatch }:NotesProps) {
  const [value, setValue] = useState(customer.notes);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const handleChange = (e:any) => {
    setValue(e.target.value);
    const defaultValue = customer.notes;
    if (defaultValue == e.target.value) {
      setIsSubmitDisabled(true);
    }else{
      setIsSubmitDisabled(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitDisabled(true);
    const customerUpdate = { ...customer,
      'customerId': customer._id,
      'notes': value
    };
    await dispatch(updateCustomerAction(customerUpdate, () => {
      setIsSubmitDisabled(false);
      dispatch(loadingSingleCustomers());
      dispatch(getCustomerDetailAction(customerUpdate));
    }));
  };

  return <NotesContainer>
    <SettingHeader {...header} />
    <div className={'body'}>
      <FormControl
        fullWidth
        variant={'outlined'}>
        <Typography variant={'caption'} className={'previewCaption'}>
          Notes
        </Typography>
        <BcInput
          handleChange={handleChange}
          multiline
          name={'notes'}
          rows={5}
          value={value}
        />
      </FormControl>
    
      <Fab
        color={'primary'}
        disabled={isSubmitDisabled}
        onClick={handleSubmit}>Save
      </Fab>
    </div>
  </NotesContainer>;
}


const NotesContainer = styled.div`
    margin: 0 auto;
    text-align: left;

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

    .MuiOutlinedInput-inputMultiline{
      padding: 9.5px 4px!important;
    }
`;
