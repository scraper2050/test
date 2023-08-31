import React, {useState} from 'react';
import styled from 'styled-components';
import { Customer } from 'reducers/customer.types';
import { CircularProgress, Fab, FormControl, Typography } from '@material-ui/core';
import SettingHeader from '../settings-header';
import { getCustomerDetailAction, getCustomers, loadingSingleCustomers, updateCustomerAction } from 'actions/customer/customer.action';
import BcInput from 'app/components/bc-input/bc-input';

interface NotesProps {
    customer: Customer;
    header: any;
    dispatch: any;
}

export default function Notes({ customer, header, dispatch }:NotesProps) {
  const [value, setValue] = useState(customer.notes);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);

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
    setIsSubmiting(true);
    const customerUpdate = { ...customer,
      'customerId': customer._id,
      'notes': value
    };
    await dispatch(updateCustomerAction(customerUpdate, () => {
      setIsSubmitDisabled(false);
      setIsSubmiting(false);
      dispatch(loadingSingleCustomers());
      dispatch(getCustomerDetailAction(customerUpdate));
      dispatch(getCustomers());
    }));
  };

  return <NotesContainer>
    <SettingHeader {...header} />
    <div className={'body'}>
      <FormControl
        fullWidth
        variant={'outlined'}>
        <Typography variant={'caption'} className={'notesTitle'}>
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
        onClick={handleSubmit}>
        {isSubmiting ? (
          <CircularProgress size={25} />
        ) : "Save"}
      </Fab>
    </div>
  </NotesContainer>;
}


const NotesContainer = styled.div`
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

    .MuiOutlinedInput-inputMultiline{
      padding: 9.5px 4px!important;
    }

    .notesTitle{
      text-align: left;
    }
`;
