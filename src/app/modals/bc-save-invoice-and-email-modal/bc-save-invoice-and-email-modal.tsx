import {
  DialogActions,
  Typography, Button,
} from '@material-ui/core';
import React, { useState } from 'react';
import moment from 'moment';
import {
  closeModalAction,
  openModalAction,
  setModalDataAction
} from 'actions/bc-modal/bc-modal.action';
import { resetEmailState } from 'actions/email/email.action';
import {updateInvoice} from "api/invoicing.api";
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { modalTypes } from "../../../constants";
import {error, success} from "actions/snackbar/snackbar.action";
import { loadInvoiceDetail } from "actions/invoicing/invoicing.action";

function BCSaveInvoiceAndEmailModal({
  data: {
    customer,
    customerEmail,
    handleClick,
    id,
    typeText,
    className,
    customerId,
    emailDefault,
    invoice,
  }
}: any): JSX.Element {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };
  
  const calculateDueDate = () => {
    if (invoice?.paymentTerm) {
      return moment(new Date()).add(invoice.paymentTerm.dueDays, 'day').toISOString();
    }
    return invoice.createdAt.toISOString();
  }

  const saveAndEmailInvoice = () => {
    setIsSubmitting(true);
    const params ={
      invoiceId: id,
      isDraft: false,
      charges: 0,
      items: JSON.stringify(invoice.items),
      issuedDate: new Date().toISOString(),
      dueDate: calculateDueDate(),
    };

    updateInvoice(params).then((response: any) => {
      if (response.status === 1) {
        dispatch(success('Invoice saved successfully'));
        dispatch(loadInvoiceDetail.fetch(id));
        setIsSubmitting(false);
        dispatch(setModalDataAction({
          data: {
            modalTitle: 'Send this invoice',
            customer,
            customerEmail,
            handleClick,
            id,
            typeText,
            className,
            customerId,
            emailDefault,
          },
          'type': modalTypes.EMAIL_JOB_REPORT_MODAL
        }));
        dispatch(resetEmailState());
        setTimeout(() => {
          dispatch(openModalAction());
        }, 200);
      } else {
        setIsSubmitting(false);
        dispatch(error(response.message));
      }
    }).catch((err: any) => {
      setIsSubmitting(false);
      dispatch(error(JSON.stringify(err)));
    });
  };


  return (
    <DataContainer className={'new-modal-design'} >
      <ContentContainer>
        <Typography>{`This invoice is still a draft. Do you want to save it as an invoice and email it to the customer?`}</Typography>
      </ContentContainer>
      <DialogActions>
        <Button
          disabled={isSubmitting}
          onClick={closeModal}
          variant={'outlined'}
        >Cancel</Button>
        <Button
          color={'primary'}
          disabled={isSubmitting}
          onClick={saveAndEmailInvoice}
          variant={'contained'}
        >Save & Send</Button>
      </DialogActions>
    </DataContainer>
  );
}

const DataContainer = styled.div`
  margin: auto 0;
`;
const ContentContainer = styled.div`
  padding: 15px 50px 15px 50px
`


export default BCSaveInvoiceAndEmailModal;
