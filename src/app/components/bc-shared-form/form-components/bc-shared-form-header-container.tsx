import React, { ChangeEvent, useEffect, useState } from 'react';
import styles, { FormHeaderContainer } from '../bc-shared-form.styles';
import { withStyles } from '@material-ui/core';
import BCDateTimePicker from 'app/components/bc-date-time-picker/bc-date-time-picker';
import BCInput from 'app/components/bc-input/bc-input';
import BCSelectOutlined from 'app/components/bc-select-outlined/bc-select-outlined';

interface Props {
  classes: any;
  values: any;
  handleChange: { (e: ChangeEvent<any>): void; <T_1 = string | ChangeEvent<any>>(field: T_1): T_1 extends ChangeEvent<any> ? void : (e: string | ChangeEvent<any>) => void; };
  formTypeValues: any;
  invoiceDetail: any;
  setFieldValue: any;
  jobId: any;
  customer: any;
  customers: any;
  getCustomerDetailActionHandler: any;
  getCustomersDispatcher: () => void;
}

function SharedFormHeaderContainer({ classes, values, handleChange, setFieldValue, formTypeValues, invoiceDetail, jobId, customer, customers, getCustomerDetailActionHandler, getCustomersDispatcher }:Props) {
  const [canEditNote, setCanEditNote] = useState(false);

  const dateChangeHandler = (type:string, date: Date) => {
    setFieldValue(type, date);
  };

  useEffect(() => {
    if (invoiceDetail) {
      dateChangeHandler('issueDate', invoiceDetail.createdAt);
      dateChangeHandler('dueDate', invoiceDetail.dueDate);
      setFieldValue('note', invoiceDetail.note);
    }
    getCustomersDispatcher();
  }, []);


  useEffect(() => {
    if (values.customerId) {
      getCustomerDetailActionHandler(values.customerId)
    }
  }, [values.customerId]);

  return <>
    <BCSelectOutlined
      disabled={Boolean(invoiceDetail) || jobId}
      formStyles={{
        'alignItems': 'center',
        'display': 'flex',
        'flexDirection': 'row'
      }}
      handleChange={handleChange}
      inputWidth={'300px'}
      items={{
        'data': [
          ...customers.map((customer: any) => {
            return {
              '_id': customer._id,
              'displayName': customer.profile.displayName
            };
          })
        ],
        'displayKey': 'displayName',
        'valueKey': '_id'
      }}
      label={'Customer'}
      name={'customerId'}
      required
      value={values.customerId}
    />
    <FormHeaderContainer>
      {customer?._id && values.customerId && <div className={'customerInfo'}>
        <h2>
          {'Customer info'}
        </h2>
        {customer.contact?.phone && <p>
          {'Phone: '}
          {customer.contact?.phone}
        </p>}

        {customer.info?.email && <p>
          {'Email: '}
          {customer.info.email}
        </p>}
        {customer.address && <p>
          {'Address: '}
          {customer.address?.street && `${customer.address?.street}, `}
          {customer.address?.city && `${customer.address?.city}, `}
          {customer.address?.state && `${customer.address?.state}, `}
          {customer.address?.zipCode && `${customer.address?.zipCode}`}
        </p>}
      </div> }
      <div className={'notes'}>
        {canEditNote
          ? <BCInput
            handleChange={handleChange}
            label={'Memo'}
            multiline
            name={'note'}
            placeholder={'Add memo here'}
            value={values.note}
          />
          : <p>
            {values.note || 'Add memo here'}
          </p>}

        <div className={classes.addItemAnchor}>
          <span
            onClick={() => setCanEditNote(!canEditNote)}>
            {canEditNote
              ? 'Save'
              : 'Edit'}
          </span>
        </div>
      </div>

      <div className={'formDetails'}>
        <BCInput
          disabled={invoiceDetail}
          handleChange={handleChange}
          label={formTypeValues.idText}
          name={'formNumber'}
          placeholder={'1001'}
          value={values.formNumber}
        />
        <BCDateTimePicker
          handleChange={(date: Date) => dateChangeHandler('issueDate', date)}
          label={values.issueDateText}
          name={'issueDate'}
          value={values.issueDate}
        />
        <BCDateTimePicker
          disablePast
          handleChange={(date: Date) => dateChangeHandler('dueDate', date)}
          label={'Due Date'}
          name={'dueDate'}
          value={values.dueDate}
        />
      </div>
    </FormHeaderContainer>
  </>;
}


export default withStyles(styles, { 'withTheme': true })(SharedFormHeaderContainer);
