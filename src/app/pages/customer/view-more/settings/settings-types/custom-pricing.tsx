import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Customer } from 'reducers/customer.types';
import Button from '@material-ui/core/Button/Button';
import { Fab, Input, Paper, TextField } from '@material-ui/core';
import SettingHeader from '../settings-header';
import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import { getCustomerDetailAction, loadingSingleCustomers, updateCustomerAction } from 'actions/customer/customer.action';
import { error, success } from 'actions/snackbar/snackbar.action';
import { updateCustomPrices } from 'api/customer.api';
import classNames from "classnames";


interface CustomPricingProps {
    customer: Customer;
    header: any;
    dispatch: any;
}


export default function CustomPricing({ customer, header, dispatch }:CustomPricingProps) {
  const [tableData, setTableData] = useState(customer.customPrices);
  const [fieldData, setFieldData] = useState<any>({
    'quantity': '',
    'price': ''
  });
  const [priceError, setPriceError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);

  const [addMode, setAddMode] = useState(false);

  const handleSubmit = async () => {
    const newTableData = tableData.map((data:any) => ({ 'quantity': parseInt(data.quantity),
      'price': parseInt(data.price) }));


    const response = await updateCustomPrices(customer._id, newTableData).catch(err => dispatch(error('Update failed')));
    if (response.type === 'error' || response.status === 0) {
      dispatch(error('Update failed, quantity must be not skip a number'));
    } else {
      dispatch(loadingSingleCustomers());
      dispatch(getCustomerDetailAction({ 'customerId': customer._id }));
      dispatch(success('Custom pricing successfully updated'));
    }
  };

  const activate = async () => {
    const customerUpdate = { ...customer,
      'customerId': customer._id,
      'isCustomPrice': true
    };
    await dispatch(updateCustomerAction(customerUpdate, () => {
      dispatch(loadingSingleCustomers());
      dispatch(getCustomerDetailAction(customerUpdate));
    }));
    dispatch(success('Custom pricing activated'));
  };


  const handleChange = (e:any) => {
    e.persist();
    if (e.target) {
      const data = { ...fieldData,
        [e.target.name]: parseInt(e.target.value) };
      setFieldData(data);
      switch(e.target.name) {
        case 'price':
          setPriceError(false);
          break;
        case 'quantity':
          setQuantityError(false);
          break;
      }
    }
  };

  const handleAdd = () => {
    if (parseInt(fieldData.quantity) - tableData[tableData.length - 1]?.quantity > 1) {
      dispatch(error(`Missing quantity ${tableData[tableData.length - 1].quantity + 1}`));
      return;
    }

    if (!fieldData.quantity) {
      setQuantityError(true);
      return;
    }

    if (!fieldData.price && fieldData.price !== 0) {
      setPriceError(true);
      return;
    }


    const present = tableData.find((data:any) => data.quantity === fieldData.quantity);
    if (present) {
      const newData = tableData.map((data:any) => {
        if (data.quantity === fieldData.quantity) {
          return fieldData;
        }
        return data;
      });
      const sorted = newData.sort((a, b) => a.quantity - b.quantity);

      setTableData([...sorted]);
    } else {
      const newData = [...tableData, fieldData].sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity));
      setTableData([...newData]);
    }
  };

  const handleAddMode = () => {
    setAddMode(!addMode);
  };

  const handleRemove = () => {
    const newData = [...tableData];
    newData.splice(-1);
    setTableData(newData);
  };


  const columns:any = [
    {
      'Header': 'Quantity',
      'accessor': 'quantity',
      'sortable': true,
      'width': 60
    },
    {
      Cell({ row }: any) {
        return (
          <p>
            {'$'}
            {row.original.price
            }
          </p>
        );
      },
      'Header': 'Price',
      'accessor': 'price',
      'sortable': true
    }
  ];


  if (!customer.isCustomPrice) {
    return <CustomPricingContainer>
      <SettingHeader {...header} />
      <div className={'body'}>
        <Fab
          color={'primary'}
          onClick={activate}>
          {'Use Custom Pricing'}
        </Fab>
      </div>
    </CustomPricingContainer>;
  }

  return <CustomPricingContainer>
    <SettingHeader {...header} />
    <div className={'body'}>
      {!addMode
        ? <div className={'actions'}>
          <Fab
            color={'primary'}
            onClick={handleAddMode}>
            {'Add/Edit Price'}
          </Fab>
          <Fab
            color={'secondary'}
            disabled={tableData.length <= 1}
            onClick={handleRemove}>
            {'Remove Highest Quantity'}
          </Fab>
        </div>
        : <Paper
          className={'input-container'}
          elevation={0}
          variant={'outlined'}>
          <TextField
            id={'outlined-basic'}
            label={'Quantity'}
            name={'quantity'}
            onChange={handleChange}
            variant={'outlined'}
            className={classNames({'alerts-border': quantityError})}
          />
          <TextField
            id={'outlined-basic'}
            label={'Price'}
            name={'price'}
            onChange={handleChange}
            variant={'outlined'}
            classes={{root: classNames({'alerts-border': priceError})}}
          />
          <Fab
            color={'primary'}
            onClick={handleAdd}>
            {'Add'}
          </Fab>
          <Fab onClick={handleAddMode}>
            {'Close'}
          </Fab>
        </Paper>
      }
      <BCTableContainer
        columns={columns}
        tableData={tableData}
      />
      <Fab
        color={'primary'}
        onClick={handleSubmit}>
        {'Save'}
      </Fab>
    </div>
  </CustomPricingContainer>;
}


const CustomPricingContainer = styled.div`
    text-align: center;
    h3 {
        font-weight: 400;
        max-width: 400px;
        margin: 20px auto 30px;
    }
    span {
        font-weight: 800;
    }
    .MuiFab-root {
        margin-top: 30px;
        color: #fff;
        min-width: 200px;
        border-radius: 30px;
    }
    .actions {
        box-sizing: border-box;
        padding: 20px 0 ;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        .MuiFab-root {
            padding: 0 24px;
            margin-left: 16px;
            width: unset;
        }
    }
    .input-container {
        justify-content: center;
        padding: 20px;
        width: 100%;
        display: flex;
        margin-bottom: 20px;
        .MuiButtonBase-root,.MuiTextField-root {
            margin: 8px;
        }
        .MuiButtonBase-root {
            color: white;
            width: 120px;
        }

    }
      .alerts-border {
      & fieldset {
          border: 1px #ff0000 solid;
         
          animation: blink 1s;
          animation-iteration-count: 2;
        }
    }
    
    @keyframes blink { 50% { border-color:#fff ; }  }
`;
