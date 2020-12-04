import BCInvoiceForm from 'app/components/bc-invoice-form/bc-invoice-form';
import React from 'react';
import { callCreateEstimatesAPI } from 'api/invoicing.api';
import styles from '../estimates.styles';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

function CreateEstimates({ classes }: any) {
  const history = useHistory();
  const columns = [
    {
      'Cell'({ row }: any) {
        return null;
      },
      'Header': 'Item',
      'borderRight': true,
      'fieldName': 'name',
      'fieldType': 'input',
      'id': 'invoice-name',
      'inputType': 'text',
      'sortable': false,
      'width': 450
    },
    {
      'Cell'({ row }: any) {
        return null;
      },
      'Header': 'Quantity',
      'borderRight': true,
      'className': 'font-bold',
      'fieldName': 'quantity',
      'fieldType': 'input',
      'id': 'invoice-quantity',
      'inputType': 'number',
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return null;
      },
      'Header': 'Price',
      'borderRight': true,
      'className': 'font-bold',
      'fieldName': 'price',
      'fieldType': 'input',
      'id': 'invoice-price',
      'inputType': 'number',
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return null;
      },
      'Header': 'Tax %',
      'borderRight': true,
      'className': 'font-bold',
      'fieldName': 'tax',
      'fieldType': 'select',
      'id': 'invoice-tax',
      'inputType': null,
      'width': 80
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          {`$${row.original.taxAmount}`}
        </div>;
      },
      'Header': 'Tax Amount',
      'borderRight': true,
      'currency': true,
      'fieldName': 'taxAmount',
      'fieldType': 'text',
      'id': 'invoice-taxAmount',
      'inputType': null,
      'sortable': false,
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          {`$${row.original.total}`}
        </div>;
      },
      'Header': 'Total',
      'borderRight': true,
      'currency': true,
      'fieldName': 'total',
      'fieldType': 'text',
      'id': 'invoice-total',
      'inputType': null,
      'sortable': false,
      'width': 60
    }
  ];
  const item = {
    'description': '',
    'name': '',
    'price': 0,
    'quantity': 1,
    'tax': 0,
    'taxAmount': 0,
    'total': 0,
    'unit': 'Fixed'
  };

  const redirectURL = '/main/invoicing/estimates';

  const handleFormSubmit = (data: any) => {
    return new Promise((resolve, reject) => {
      data.items = JSON.stringify(data.items.map((o: any) => {
        o.description = o.name;
        o.price = parseFloat(o.price);
        o.quantity = parseInt(o.quantity);
        delete o.taxAmount;
        delete o.total;
        delete o.unit;
        return o;
      }));
      console.log(data);
      callCreateEstimatesAPI(data).then((response: any) => {
        console.log(response);
        history.push(redirectURL);
        return resolve();
      })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    });
  };

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
          <BCInvoiceForm
            addItemText={'+  Service/Product'}
            columnSchema={columns}
            itemSchema={item}
            onFormSubmit={handleFormSubmit}
            pageTitle={'New Estimate'}
            redirectUrl={redirectURL}
          />
        </div>
      </div>
    </div >
  );
}

export default withStyles(styles, { 'withTheme': true })(CreateEstimates);
