import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import { getCompanyProfileAction } from 'actions/user/user.action';
import { BCSharedFormModalContainer, EmailContainer, FormContainer, TotalContainer } from './bc-shared-form-modal.styles';
import { Button, Chip, Grid, Paper, Typography, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getCustomerDetailAction, loadingSingleCustomers } from 'actions/customer/customer.action';
import { useDispatch, useSelector } from 'react-redux';
import { formatDatTimell } from 'helpers/format';
import { loadInvoiceDetail } from 'actions/invoicing/invoicing.action';
import { useHistory } from 'react-router-dom';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import RoomIcon from '@material-ui/icons/Room';
import EmailHistory from 'app/components/bc-job-report/email-history';
import { getContacts } from 'api/contacts.api';


function BCSharedFormModal({ onSubmit, formData, formId, onClose, theme }:any) {
  const [data, setData] = useState(formData);
  const [customerContact, setCustomerContact] = useState<any>(undefined);
  const { contacts } = useSelector((state: any) => state.contacts);
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector(({ auth }:any) => auth);
  const [error, setError] = useState();
  const { 'data': invoiceDetail, 'loading': loadingInvoiceDetail, 'error': invoiceDetailError } = useSelector(({ invoiceDetail }:any) => invoiceDetail);
  const { customerObj, loading } = useSelector(({ customers }:any) => customers);
  const { companyName, companyEmail, logoUrl, phone, city, state, street, zipCode } = useSelector(({ profile }:any) => profile);


  const columns = [
    {
      'Header': 'Service/Product',
      'accessor': formId ? 'item.name' : 'name',
      'width': 450
    },
    {
      'Header': 'Quantity',
      'accessor': 'quantity',
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          {'$'}
          {row.original.price}
        </div>;
      },
      'Header': 'Price',
      'accessor': 'price',
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          {row.original.isFixed
            ? 'Fixed'
            : '/hr'}
        </div>;
      },
      'Header': 'Unit',
      'accessor': 'isFixed',
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          {row.original.tax
            ? `${row.original.tax}%`
            : 'N/A'}
        </div>;
      },
      'Header': 'Tax',
      'accessor': 'tax',
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          {'$'}
          {row.original.taxAmount}
        </div>;
      },
      'Header': 'Tax Amount',
      'accessor': 'taxAmount',
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          {'$'}
          {row.original.total}
        </div>;
      },
      'Header': 'Total',
      'accessor': 'total',
      'width': 60
    }
  ];

  const handleSubmit = async () => {
    const response = await onSubmit();
    if (response) {
      onClose();
      return true;
    }

    setError(response.error);
  };

  const handleEdit = () => {
    dispatch(setModalDataAction({
      'data': {}
    }));
    dispatch(closeModalAction());

    setTimeout(() => {
      history.push({
        'pathname': `/main/invoicing/update-invoice`,
        'state': {
          'customerId': invoiceDetail.customer?._id,
          'customerName': invoiceDetail.customer.profile.displayName,
          'jobId': invoiceDetail.job?._id,
          'jobType': invoiceDetail.job?.type?._id,
          'invoiceDetail': invoiceDetail
        }
      });
    }, 200);
  };

  useEffect(() => {
    if (data && customerId) {
      if (customerId !== customerObj._id || !customerObj._id) {
        dispatch(loadingSingleCustomers());
        dispatch(getCustomerDetailAction({ customerId }));
      }
    }

    if (formId) {
      dispatch(loadInvoiceDetail.fetch(formId));
    }


    if (user) {
      dispatch(getCompanyProfileAction(user.company as string));
    }
  }, []);


  useEffect(() => {
    if (invoiceDetail._id && !formData) {
      const processedItems = [...invoiceDetail.items]?.map((item:any) => {
        item.taxAmount = parseFloat((item.price * item.tax / 100 * item.quantity).toFixed(2));
        item.total = item.price * item.quantity + item.taxAmount;
        return item;
      });


      const subTotal = invoiceDetail.items.reduce((acc:any, item:any) => acc += item.price, 0);
      const taxAmount = invoiceDetail.items.reduce((acc:any, item:any) => acc += item.taxAmount, 0);

      const dataObj = {
        'customerId': invoiceDetail.customer?._id,
        'items': processedItems,
        'issueDate': invoiceDetail.createdAt,
        'dueDate': invoiceDetail.dueDate,
        'formNumber': invoiceDetail.invoiceId,
        'subTotal': subTotal,
        'totalAmount': invoiceDetail.total,
        'totalTax': taxAmount
      };

      setData(dataObj);
    }

    if (invoiceDetail._id) {
      dispatch(getContacts({ 'type': 'Customer',
        'referenceNumber': invoiceDetail.customer?._id }));
    }
  }, [invoiceDetail]);

  useEffect(() => {
    if (data && invoiceDetail.customer?._id) {
      if (invoiceDetail.customer?._id !== customerObj._id) {
        dispatch(getCustomerDetailAction({ 'customerId': invoiceDetail.customer?._id }));
      }
    }
  }, [data]);

  useEffect(() => {
    if (invoiceDetail._id && contacts.length) {
      const invoiceContact = contacts.find((contact:any) => contact._id === invoiceDetail.job.ticket.customerContactId);
      setCustomerContact(invoiceContact);
    }
  //  SetCustomerContact()
  }, [contacts]);

  if (loading || !data || loadingInvoiceDetail || !customerObj) {
    return <BCCircularLoader heightValue={'200px'} />;
  }


  const { customerId, items, issueDate, dueDate, formNumber, subTotal, totalAmount, totalTax, note } = data;


  return <BCSharedFormModalContainer >
    <hr />
    <div className={'form-actions-container'}>
      <div>
        {/* { formNumber && <Button
          aria-label={'new-job'}
          color={'primary'}
          variant={'outlined'}>
          {'Edit'}
        </Button> } */}
        <Button
          aria-label={'new-job'}
          color={'primary'}
          onClick={() => window.print()}
          variant={'outlined'}>
          {'Print'}
        </Button>
      </div>
      {
        formId && <div>
          <Button
            aria-label={'new-job'}
            className={'save-button'}
            color={'primary'}
            onClick={handleEdit}
            variant={'contained'}>
            {'Edit'}
          </Button>
        </div>
      }
      { onSubmit && <div>
        <Button
          aria-label={'new-job'}
          className={'save-button'}
          color={'primary'}
          onClick={handleSubmit}
          variant={'contained'}>
          {'Save'}
        </Button>
      </div>}
    </div>
    <FormContainer id={'printable-form'}>
      {formId && invoiceDetail._id && <div className={'status'}>
        { invoiceDetail.paid
          ? <Chip
            label={'Paid'}
            style={{ 'backgroundColor': theme.palette.success.light,
              'color': '#fff' }}
          />
          : <Chip
            color={'secondary'}
            label={'Unpaid'}
          />}
      </div>}
      <Grid container>
        <Grid
          item
          xs={4}>
          <div className={'image-container'}>
            <img src={logoUrl} />
          </div>
          <div className={'company-info'}>
            <Typography variant={'h6'}>
              {companyName}
            </Typography>
            <p>
              {user.profile.displayName}
            </p>
            {companyEmail && <p>
              {companyEmail}
            </p>}
            {phone && <p>
              {phone}
            </p>}
            {zipCode && <p>
              {street && `${street}, `}
              {city && `${city}, `}
              {state && `${state}, `}
              {zipCode && `${zipCode}`}
            </p>}
            {invoiceDetail?.customer?.vendorId && <p>
              {'Vendor ID: '}
              {' '}
              {invoiceDetail?.customer?.vendorId}
            </p>}
          </div>
        </Grid>
        <Grid
          item
          xs={4}
        />
        <Grid
          item
          xs={4}>
          <Typography variant={'h3'}>
            {'Invoice'}
          </Typography>
          <ul>
            <li>
              {formNumber && `Invoice #: ${formNumber}`}
            </li>
            {invoiceDetail.job?.ticket?.customerPO && <li>
              {'Customer PO: '}
              {invoiceDetail.job.ticket.customerPO}
            </li>}
            <li>
              {`Invoice Date: ${formatDatTimell(issueDate)}`}
            </li>
            <li>
              {`Due Date: ${formatDatTimell(dueDate)}`}
            </li>
          </ul>
          <div>
            <div className={'total'}>
              <p>
                {'Amount due:'}
              </p>
              <h5>
                {'$'}
                {totalAmount}
              </h5>
            </div>
          </div>
        </Grid>
      </Grid>
      <hr />
      <Grid container>
        {
          customerObj &&
          <Grid
            item
            xs={4}>
            <div className={'bill-details'}>
              <p>
                {'Bill To: '}
              </p>
              <h4>
                {customerObj.profile.displayName}
              </h4>
              <div className={'customer-details'}>
                {customerObj.contact?.phone && <p>
                  <PhoneIcon />
                  {customerObj.contact?.phone}
                </p>}

                {customerObj.info?.email && <p>
                  <span>
                    <EmailIcon />
                  </span>
                  {customerObj.info.email}
                </p>}
                {customerObj.address && <p>
                  <RoomIcon />
                  {customerObj.address?.street && `${customerObj.address?.street}, `}
                  {customerObj.address?.city && `${customerObj.address?.city}, `}
                  {customerObj.address?.state && `${customerObj.address?.state}, `}
                  {customerObj.address?.zipCode && `${customerObj.address?.zipCode}`}
                </p>}


              </div>
            </div>
          </Grid>
        }
        {
          customerContact &&
          <Grid
            item
            xs={4}>
            <div className={'bill-details'}>
              <p>
                {'Contact Details '}
              </p>
              <h4>
                {customerContact.name}
              </h4>
              <div className={'customer-details'}>
                {customerContact.phone && <p>
                  <PhoneIcon />
                  {customerContact.phone}
                </p>}

                {customerContact.email && <p>
                  <span>
                    <EmailIcon />
                  </span>
                  {customerContact.email}
                </p>}

              </div>
            </div>
          </Grid>
        }
      </Grid>
      <BCTableContainer
        columns={columns}
        pagination={false}
        search={false}
        tableData={items}
      />
      <TotalContainer>
        <Paper>
          <div>
            <div>
              {'Subtotal'}
            </div>
            <div >
              {'Tax'}
            </div>
            <div>
              {'Total'}
            </div>
          </div>
          <div>
            <div>
              {'$'}
              {subTotal}
            </div>
            <div>
              {'$'}
              {totalTax}
            </div>
            <div>
              {'$'}
              {totalAmount}
            </div>
          </div>
        </Paper>
      </TotalContainer>
      {note && <p>
        {'Note: '}
        {note}
      </p>}
    </FormContainer>
    { }
  </BCSharedFormModalContainer>;
}


export default withStyles({}, { 'withTheme': true })(BCSharedFormModal);
