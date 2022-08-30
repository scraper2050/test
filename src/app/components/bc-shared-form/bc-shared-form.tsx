import { FormDefaultProps } from './bc-shared-form.types';
import { modalTypes } from '../../../constants';
import { useFormik } from 'formik';
import { Box, Paper, withStyles } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './bc-shared-form.styles';
import { useLocation } from 'react-router-dom';
import BCSharedFormTotalContainer from './form-components/bc-shared-form-total-container';
import BCSharedFormItemsContainer from './form-components/bc-shared-form-items-container';
import BCSharedFormHeaderContainer from './form-components/bc-shared-form-header-container';
import BCSharedFormTitleBar from './form-components/bc-shared-form-title-bar';
import EmailHistory from '../bc-job-report/email-history';

interface BCInvoiceFormProps {
  columnSchema: any;
  classes: any;
  itemSchema: {};
  pageTitle: string;
  data?: any;
  formTypeValues: FormDefaultProps;
  redirectUrl: string;
  onFormSubmit: (data: any)=> Promise<any>;
  edit?: boolean;
  customer: any;
  getCustomerDetailActionHandler: any;
  resetCustomerHandler: any;
  openPreviewFormModalHandler: (modalDataAction: any) => void;
  invoiceItems: any;
  taxes: any;
  getSharedFormInitialData: () => void;
  customers: any;
  getCustomersDispatcher: () => void;
}

interface FormProps {
  customerId: string;
  dueDate: string;
  formNumber: string;
  issueDate: string;
  note: string;
  reference: string;
  jobId?:string;
  invoiceId?: string;

}

function BCSharedForm({ classes,
  columnSchema = [],
  itemSchema = {},
  formTypeValues,
  pageTitle = '',
  data = {
    'customer': {
      '_id': ''
    },
    'note': ''
  },
  redirectUrl,
  onFormSubmit,
  edit,
  customer,
  getCustomerDetailActionHandler,
  resetCustomerHandler,
  openPreviewFormModalHandler,
  invoiceItems,
  taxes,
  getSharedFormInitialData,
  customers,
  getCustomersDispatcher,
}: BCInvoiceFormProps) {

  const { itemTier, isCustomPrice } = useMemo(() => customer, [customer]);

  const { state } = useLocation<any>();
  const reference = state
    ? state.purchaseOrderId || state.jobId || state.estimateId
    : '';
  const customerId = state
    ? state.customerId
    : data.customer._id;
  const date = new Date();
  const {
    'values': FormikValues,
    'handleChange': formikChange,
    setFieldValue,
    isSubmitting
  } = useFormik<FormProps>({
    'initialValues': {
      'customerId': customerId,
      'dueDate': new Date(date.setDate(date.getDate() + 30))
        .toString(),
      'formNumber': state?.invoiceDetail
        ? state.invoiceDetail.invoiceId
        : '',
      'issueDate': new Date(Date.now()).toString(),
      'note': data.note,
      'reference': reference
    },
    'onSubmit': (values, { setSubmitting }) => {
      setSubmitting(true);
    }
  });

  useEffect(() => {
    if (customerId) {
      getCustomerDetailActionHandler(customerId);
      return () => {
        resetCustomerHandler();
      };
    }
  }, []);

  const handleSubmit = () => {
    const data = {
      ...FormikValues,
      items
    };
    if (state?.jobId) {
      data.jobId = state.jobId;
    }

    if (state?.invoiceDetail) {
      data.invoiceId = state.invoiceDetail._id;
    }
    return onFormSubmit(data).then(res => {
      return res;
    });
  };

  const [totalAmount, setTotalAmount] = useState(state?.invoiceDetail?.total || 0);
  const [subTotal, setSubTotal] = useState(state?.invoiceDetail?.subTotal || 0);
  const [totalTax, setTotalTax] = useState(state?.invoiceDetail?.taxAmount || 0);
  const [items, setItems] = useState<any>(state?.invoiceDetail?.items
    ? state.invoiceDetail.items
    : []);

  const calculateTotal = (itemsArray:any) => {
    if (isCustomPrice && state?.invoiceDetail) {
      setTotalAmount(state.invoiceDetail.total);
    } else {
      const subtotalAmount = itemsArray.map((item:any) => item.price * item.quantity).reduce((a: any, b: any) => {
        return a + b;
      }, 0);

      const totalTax = itemsArray.map((item:any) => item.taxAmount).reduce((a: any, b: any) => {
        return a + b;
      }, 0);
      const amount = subtotalAmount + totalTax;
      setSubTotal(Math.round((subtotalAmount + Number.EPSILON) * 100) / 100);
      setTotalTax(Math.round((totalTax + Number.EPSILON) * 100) / 100);
      setTotalAmount(Math.round((amount + Number.EPSILON) * 100) / 100);
    }
  };


  const formData = {
    ...FormikValues,
    isSubmitting,
    items,
    subTotal,
    totalAmount,
    totalTax
  };

  if (state?.invoiceDetail) {
    formData.formNumber = state.invoiceDetail.invoiceId;
  }


  return (
    <form>
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
          <BCSharedFormTitleBar
            disabled={Boolean(!FormikValues.customerId)}
            formData={formData}
            handleSubmit={handleSubmit}
            modalTitle={formTypeValues.previewTitle}
            modalType={modalTypes.SHARED_FORM_MODAL}
            pageTitle={pageTitle}
            redirectUrl={redirectUrl}
            openPreviewFormModalHandler={openPreviewFormModalHandler}
          />
          <Paper
            elevation={1}
            style={{
              'padding': 20
            }}>
            <BCSharedFormHeaderContainer
              customer={customer}
              formTypeValues={formTypeValues}
              handleChange={formikChange}
              invoiceDetail={state?.invoiceDetail}
              jobId={state?.jobId}
              setFieldValue={setFieldValue}
              values={FormikValues}
              customers={customers}
              getCustomerDetailActionHandler={getCustomerDetailActionHandler}
              getCustomersDispatcher={getCustomersDispatcher}
            />
            <BCSharedFormItemsContainer
              addItemText={
                formTypeValues.addItemText
              }
              calculateTotal={calculateTotal}
              columnSchema={columnSchema}
              edit={edit}
              isCustomPrice={isCustomPrice}
              items={items}
              itemSchema={itemSchema}
              itemTier={itemTier}
              jobTypes={state?.invoiceDetail.job.tasks}
              setItems={setItems}
              invoiceItems={invoiceItems}
              taxes={taxes}
              getSharedFormInitialData={getSharedFormInitialData}
            />
            <BCSharedFormTotalContainer
              subTotal={subTotal}
              totalAmount={totalAmount}
              totalTax={totalTax}
            />
          </Paper>
          {state?.invoiceDetail?._id &&
          <Paper elevation={0}>
            <Box
              m={4}
              p={1}>
              <EmailHistory emailHistory={state.invoiceDetail.emailHistory} />
            </Box>
          </Paper>
          }
        </Paper>
      </Paper>
    </form>
  );
}

export default withStyles(styles, { 'withTheme': true })(BCSharedForm);
