import BCTableContainer from '../../bc-table-container/bc-table-container';
import React, { Dispatch, useEffect, useState } from 'react';
import styles from '../bc-shared-form.styles';
import { Button, InputBase, withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import BCSelectOutlined from 'app/components/bc-select-outlined/bc-select-outlined';
import { RootState } from 'reducers';
import { loadInvoiceItems } from 'actions/invoicing/items/items.action';
import { getAllSalesTaxAPI } from 'api/tax.api';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import { customer } from 'testData';


interface Props {
    classes: any;
    items: any;
    setItems: Dispatch<any>;
    itemSchema: any;
    columnSchema: any;
    addItemText: string;
    jobTypes: any[];
    calculateTotal: (array:any[])=> void;
    itemTier: any;
    isCustomPrice: boolean;
}


function SharedFormItemsContainer({ classes, columnSchema, addItemText, itemSchema, jobTypes, calculateTotal, items, setItems, itemTier, isCustomPrice }:Props) {
  const dispatch = useDispatch();
  const { 'items': invoiceItems } = useSelector(({ invoiceItems }:RootState) => invoiceItems);
  const [columns, setColumns] = useState([...columnSchema]);
  const [refereshColumns, setRefreshColumns] = useState(false);
  const taxes = useSelector(({ tax }: any) => tax.data);

  const handleItemChange = (value: string, index:number, fieldName:string) => {
    const tempArray = [...items];
    if (fieldName === 'name') {
      const item = invoiceItems?.find((item:any) => item.name === value);
      if (itemTier?._id) {
        const customerTier = item?.tiers.find(({ tier }) => tier._id === itemTier._id);
        tempArray[index].price = customerTier.charge || 0;
      } else {
        tempArray[index].price = item?.charges || 0;
      }

      tempArray[index].tax = item?.tax
        ? taxes[0].tax
        : 0;
    }
    tempArray[index][fieldName] = value;
    tempArray[index].taxAmount = parseFloat(((tempArray[index].price * tempArray[index].quantity) * (tempArray[index].tax / 100)).toFixed(2)); // eslint-disable-line
    tempArray[index].total = (tempArray[index].price * tempArray[index].quantity) + tempArray[index].taxAmount; // eslint-disable-line

    setItems(tempArray);
  };


  useEffect(() => {
    if (invoiceItems.length && items) {
      const newItems = items.map((invoiceItem:any) => {
        const { charges, name, isFixed, tax, tiers }:any = invoiceItems.find((item:any) => item.name === invoiceItem.name);
        const taxValue = invoiceItem.tax
          ? invoiceItem.tax
          : tax
            ? taxes[0].tax
            : 0;
        const taxAmount = invoiceItem.price * taxValue / 100;

        let price = charges || 0;
        if (itemTier?._id) {
          const customerTier = tiers.find(({ tier }:any) => tier._id === itemTier._id);
          price = customerTier.charge || 0;
        }

        if (jobTypes) {
          return {
            name,
            'price': price,
            'total': price + taxAmount,
            'unit': isFixed
              ? 'Fixed'
              : '/hr',
            'taxAmount': parseFloat(taxAmount.toFixed(2)),
            ...invoiceItem,
            'tax': taxValue
          };
        }
        return {
          name,
          ...invoiceItem,
          'price': price,
          'total': price + taxAmount,
          'unit': isFixed
            ? 'Fixed'
            : '/hr',
          'taxAmount': parseFloat(taxAmount.toFixed(2)),
          'tax': taxValue
        };
      });

      setItems([...newItems]);
    }
    if (invoiceItems.length && jobTypes) {
      const newItems = jobTypes.map(({ jobType }:any) => {
        const jobTypeItem = invoiceItems.find((item:any) => item.jobType === jobType);

        if (jobTypeItem) {
          const { charges, name, isFixed, tax, tiers }:any = jobTypeItem;

          let price = charges || 0;
          if (itemTier?._id) {
            const customerTier = tiers.find(({ tier }:any) => tier._id === itemTier._id);
            price = customerTier.charge || 0;
          }

          const taxValue = tax

            ? taxes[0].tax
            : 0;

          const taxAmount = charges * taxValue / 100;
          return {
            ...itemSchema,
            name,
            'price': price,
            'tax': taxValue,
            'total': charges + taxAmount,
            'taxAmount': taxAmount,
            'unit': isFixed
              ? 'Fixed'
              : '/hr'

          };
        }
      });

      setItems([...newItems]);
    }


    setRefreshColumns(true);
  }, [itemTier]);


  const addItem = () => {
    const newData = [{ ...itemSchema }];
    const tempArray = [
      ...items,
      ...newData
    ];
    setItems(tempArray);
    setRefreshColumns(true);
  };


  const removeItem = (rowIndex:number) => {
    const newItems = [...items];
    newItems.splice(rowIndex, 1);
    setItems(newItems);
    setRefreshColumns(true);
  };

  useEffect(() => {
    calculateTotal(items);
  }, [items]);

  useEffect(() => {
    setTimeout(() => setRefreshColumns(false), 100);
  }, [refereshColumns]);


  const taxFromItems = items.reduce((acc:any, item:any) => item.tax > 0
    ? item.tax
    : acc, 0);

  const taxItems = taxFromItems
    ? [{ 'tax': taxFromItems }]
    : taxes;


  useEffect(() => {
    if (taxes && invoiceItems && refereshColumns) {
      let columnData = [...columns];
      columnData = columnData.map(column => {
        if (!column.fieldType) {
          return column;
        }
        if (column.fieldType === 'select') {
              column.Cell = ({ row }: any) => { // eslint-disable-line
            return <div className={'flex items-center'}>
              <BCSelectOutlined
                formStyles={{
                  'marginBottom': '0'
                }}
                handleChange={(e: any) => handleItemChange(e.target.value, row.index, column.fieldName)}
                items={{
                  'data': [

                    ...taxItems.map((o: any) => {
                      return {
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
        } else if (column.fieldType === 'jobType') {
              column.Cell = ({ row }: any) => { // eslint-disable-line
            return <div className={'flex items-center'}>
              <BCSelectOutlined
                disabled={row.index <= jobTypes?.length}
                formStyles={{
                  'marginBottom': '0'
                }}
                handleChange={(e: any) => handleItemChange(e.target.value, row.index, column.fieldName)}
                items={{
                  'data': [
                    ...invoiceItems.map((item: any) => {
                      return {
                        'jobType': item.name,
                        'name': item.name
                      };
                    })
                  ],
                  'displayKey': 'name',
                  'valueKey': 'name'
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
        } else if (column.fieldType === 'action') {
              column.Cell = ({ row }: any) => { // eslint-disable-line
            return <div className={'flex items-center'}>
              <Button
                color={'secondary'}
                disabled={row.index <= jobTypes?.length}
                onClick={() => removeItem(row.index)}
                variant={'contained'}>
                {'Remove'}
              </Button>
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
                onChange={(e: any) => handleItemChange(e.target.value, row.index, column.fieldName)}
                type={column.inputType}
                value={row.original[column.fieldName]}
              />
            </div>;
          };
        }
        return column;
      });
      setColumns(columnData);
    }
  }, [refereshColumns, taxes]);

  useEffect(() => {
    dispatch(loadInvoiceItems.fetch());
    dispatch(getAllSalesTaxAPI());
  }, []);

  if (!invoiceItems.length) {
    return <BCCircularLoader heightValue={'50px'} />;
  }


  return <>
    <BCTableContainer
      columns={columns}
      pagination={false}
      search={false}
      tableData={items}
    />
    <div className={classes.addItemAnchor}>
      <span
        onClick={addItem}>
        {addItemText}
      </span>
    </div>
  </>;
}


export default withStyles(styles, { 'withTheme': true })(SharedFormItemsContainer);
