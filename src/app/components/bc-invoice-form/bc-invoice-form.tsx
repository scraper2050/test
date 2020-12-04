import BCInput from '../bc-input/bc-input';
import BCSelectOutlined from '../bc-select-outlined/bc-select-outlined';
import BCTableContainer from '../bc-table-container/bc-table-container';
import { getAllSalesTaxAPI } from 'api/tax.api';
import { getCustomers } from 'actions/customer/customer.action';
import styles from './bc-invoice-form.styles';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Fab, InputBase, Paper, Typography, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function BCInvoiceForm({ classes,
  addItemText = '+  Item',
  columnSchema = [],
  itemSchema = {},
  pageTitle = '',
  data = {
    'customer': {
      '_id': ''
    },
    'note': ''
  },
  redirectUrl,
  onFormSubmit
}: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    'values': FormikValues,
    'handleChange': formikChange,
    'handleSubmit': FormikSubmit,
    isSubmitting
  } = useFormik({
    'initialValues': {
      'customerId': data.customer._id,
      'note': data.note
    },
    'onSubmit': (values, { setSubmitting }) => {
      setSubmitting(true);
      const data = {
        ...values,
        'charges': totalAmount,
        items
      };
      onFormSubmit(data).then(() => {
        setSubmitting(false);
      })
        .catch(() => {
          setSubmitting(false);
        });
    }
  });
  const customers = useSelector(({ customers }: any) => customers.data);
  const taxes = useSelector(({ tax }: any) => tax.data);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isItemUpdate, setIsItemUpdate] = useState(false);
  const [items, setItems] = useState<any>([{ ...itemSchema }]);
  const [columns, setColumData] = useState<any>([...columnSchema]);

  const handleItemChange = (e: any, index: number, fieldName: string) => {
    const tempArray = [...items];
    tempArray[index][fieldName] = e.target.value;
    tempArray[index].taxAmount = parseFloat(((tempArray[index].price * tempArray[index].quantity) * (tempArray[index].tax / 100)).toFixed(2)); // eslint-disable-line
    tempArray[index].total = (tempArray[index].price * tempArray[index].quantity) + tempArray[index].taxAmount; // eslint-disable-line
    setItems(tempArray);
    if (fieldName !== 'name') {
      const amount = tempArray.map(o => o.total).reduce((a, b) => {
        return a + b;
      }, 0);
      setTotalAmount(Math.round((amount + Number.EPSILON) * 100) / 100);
    }
  };

  const addItem = () => {
    const newData = [{ ...itemSchema }];
    const tempArray = [
      ...items,
      ...newData
    ];
    setItems(tempArray);
    refreshColums();
  };

  const refreshColums = () => {
    setIsItemUpdate(true);
    setTimeout(() => {
      setIsItemUpdate(false);
    }, 10);
  };

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getAllSalesTaxAPI()).then(() => {
      refreshColums();
    });
  }, []);

  useEffect(() => {
    if (isItemUpdate) {
      let columnData = [...columns];
      columnData = columnData.map(column => {
        if (column.fieldType === 'select') {
          column.Cell = ({ row }: any) => { // eslint-disable-line
            return <div className={'flex items-center'}>
              <BCSelectOutlined
                formStyles={{
                  'marginBottom': '0'
                }}
                handleChange={(e: any) => handleItemChange(e, row.index, column.fieldName)}
                items={{
                  'data': [
                    {
                      '_id': '',
                      'tax': 0
                    },
                    ...taxes.map((o: any) => {
                      return {
                        '_id': o._id,
                        'tax': o.tax
                      };
                    })
                  ],
                  'displayKey': 'tax',
                  'valueKey': 'tax'
                }}
                label={''}
                nakedSelect
                name={column.fieldName}
                value={row.original[column.fieldName]}
              />
            </div>;
          };
        } else if (column.fieldType === 'text') {
          column.Cell = ({ row }: any) => { // eslint-disable-line
            return <div className={'flex items-center'}>
              {`${column.currency
                ? '$'
                : ''}${row.original[column.fieldName]}`}
            </div>;
          };
        } else {
          column.Cell = ({ row }: any) => { // eslint-disable-line
            return <div className={'flex items-center'}>
              <InputBase
                classes={{
                  'root': classes.invoiceInputBaseRoot
                }}
                inputProps={{ 'aria-label': column.id }}
                onChange={(e: any) => handleItemChange(e, row.index, column.fieldName)}
                type={column.inputType}
                value={row.original[column.fieldName]}
              />
            </div>;
          };
        }
        return column;
      });
      setColumData(columnData);
    }
  }, [taxes, isItemUpdate]);

  const cancelForm = () => {
    history.push(redirectUrl);
  };

  return (
    <form onSubmit={FormikSubmit}>
      <Paper
        square
        style={{
          'padding': 10
        }}>
        <Paper
          style={{
            'padding': 20
          }}
          variant={'outlined'}>
          <div className={classes.titleBar}>
            <Typography
              variant={'h5'}>
              {pageTitle}
            </Typography>
            <div className={classes.actionBar}>
              <Typography
                className={classes.cancelText}
                onClick={() => cancelForm()}
                variant={'body1'}>
                {'Cancel'}
              </Typography>
              <Fab
                aria-label={'new-job'}
                classes={{
                  'root': classes.fabRoot
                }}
                color={'primary'}
                disabled={isSubmitting}
                type={'submit'}
                variant={'extended'}>
                {'Save'}
              </Fab>
            </div>
          </div>
          <Paper
            elevation={1}
            style={{
              'padding': 20
            }}>
            <BCSelectOutlined
              formStyles={{
                'alignItems': 'center',
                'display': 'flex',
                'flexDirection': 'row'
              }}
              handleChange={formikChange}
              inputWidth={'300px'}
              items={{
                'data': [
                  ...customers.map((o: any) => {
                    return {
                      '_id': o._id,
                      'displayName': o.profile.displayName
                    };
                  })
                ],
                'displayKey': 'displayName',
                'valueKey': '_id'
              }}
              label={'Customer'}
              name={'customerId'}
              required
              value={FormikValues.customerId}
            />
            <BCTableContainer
              columns={columns}
              pagination={false}
              search={false}
              tableData={items}
            />
            <div className={classes.addItemAnchor}>
              <span
                onClick={() => addItem()}
              >
                {addItemText}
              </span>
            </div>
            <BCInput
              handleChange={formikChange}
              label={'Note'}
              multiline
              name={'note'}
              value={FormikValues.note}
            />
            <div className={classes.totalContainer}>
              <Paper
                style={{
                  'padding': 12,
                  'textAlign': 'center',
                  'width': 150
                }}
                variant={'outlined'}>
                <div>
                  {'Subtotal:'}
                  <span className={classes.totalAmountText}>
                    {`$${totalAmount}`}
                  </span>
                </div>
                <div>
                  {'Total:'}
                  <span className={classes.totalAmountText}>
                    {`$${totalAmount}`}
                  </span>
                </div>
              </Paper>
            </div>
          </Paper>
        </Paper>
      </Paper>
    </form>
  );
}

export default withStyles(styles, { 'withTheme': true })(BCInvoiceForm);
