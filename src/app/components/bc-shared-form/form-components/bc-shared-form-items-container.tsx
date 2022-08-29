import BCTableContainer from '../../bc-table-container/bc-table-container';
import React, { Dispatch, useEffect, useState } from 'react';
import styles from '../bc-shared-form.styles';
import { Button, InputBase, withStyles } from '@material-ui/core';
import BCSelectOutlined from 'app/components/bc-select-outlined/bc-select-outlined';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';


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
    edit?: boolean;
    invoiceItems: any;
    taxes: any;
    getSharedFormInitialData: () => void;
}


function SharedFormItemsContainer({ classes,
  edit,
  columnSchema,
  addItemText,
  itemSchema,
  jobTypes,
  calculateTotal,
  items,
  setItems,
  itemTier,
  isCustomPrice ,
  invoiceItems,
  taxes,
  getSharedFormInitialData,
}:Props) {
  const [columns, setColumns] = useState([...columnSchema]);
  const [refereshColumns, setRefreshColumns] = useState(false);

  const handleItemChange = (value: string, index:number, fieldName:string) => {
    const tempArray = [...items];
    if (fieldName === 'name') {
      const item = invoiceItems?.find((item:any) => item.name === value);
      if (itemTier?._id) {
        const customerTier = item?.tiers.find(({ tier }:any) => tier._id === itemTier._id);
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
    //console.log('tempArray: '+JSON.stringify(tempArray, null, 4));

  };


  useEffect(() => {
    if (items) {

      const goodItems = items.filter((item: any) => !!item.item);
      const newItems = goodItems.map((invoiceItem:any) => {
        const { item: { name }, price, taxAmount, total, quantity, tax, isFixed }:any = invoiceItem;


        return {
          ...invoiceItem,
          name,
          price,
          total: (price * quantity ) + parseFloat(taxAmount.toFixed(2)),
          'unit': isFixed
            ? 'Fixed'
            : '/hr',
          'taxAmount': parseFloat(taxAmount.toFixed(2)),
          tax
        };
      });
     // console.log('newItems: '+ JSON.stringify(newItems, null, 4));
      setItems([...newItems]);
    }

    setRefreshColumns(true);
  }, [itemTier, isCustomPrice]);


  const addItem = () => {

    const newData = [{ ...itemSchema }];
    console.log('items before tempArray: '+JSON.stringify(items, null, 4));
    const tempArray = [
      ...items,
      ...newData
    ];
   //console.log('addItem: '+JSON.stringify(newData, null, 4));

    setItems(tempArray);
    console.log('tempArray: '+JSON.stringify(tempArray, null, 4));
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
  }, [items, isCustomPrice]);

  useEffect(() => {
    setTimeout(() => setRefreshColumns(false), 100);
  }, [refereshColumns]);

  const taxFromItems = items.reduce((acc:any, item:any) => item.tax > 0
    ? item.tax
    : acc, 0);

  const taxItems = taxFromItems
    ? [{ 'tax': taxFromItems }]
    : taxes;

// if(invoiceItems.length > 0) console.log('invoiceItems: '+JSON.stringify(invoiceItems, null, 4));

  useEffect(() => {
    if (taxes && invoiceItems && refereshColumns) {
      let columnData = [...columns];
     // console.log('columnData: '+JSON.stringify(columnData, null, 4));
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
                disabled={(row.index === 0 || row.index <= jobTypes?.length) && edit}
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
    getSharedFormInitialData();
  }, []);

  if (!invoiceItems.length) {
    return <BCCircularLoader heightValue={'50px'} />;
  }

  //console.log('jobTypes: '+JSON.stringify(jobTypes, null, 4));
  //console.log('invoiceItems: '+JSON.stringify(invoiceItems, null, 4));

  //console.log('log-items tableData: '+JSON.stringify(items, null, 4));

  return <>
    <BCTableContainer
      columns={columns}
      initialMsg={'No Items'}
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
