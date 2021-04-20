import { Button } from '@material-ui/core';
import { ReactComponent as EmailIcon } from '../../../assets/img/email.svg';
import React from 'react';
import { closeModalAction } from 'actions/bc-modal/bc-modal.action';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

const EmailJobReportModalContainer = styled.div`
display: flex;
flex-direction: column;
padding: 40px 40px 10px;
text-align: center;
svg {
  margin: 0 auto;
  width: 50%;
  height: 150px;
}

p {
  line-height: 30px;
  font-weight: 400;
  font-size: 18px;
  span {
    font-weight: 800;
    font-size: 22px;
  }
} 
> div {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    .MuiButton-containedPrimary {
      color: white;
    }
    button {
      width: 50%;
    }
}
`;

export default function EmailJobReportModal({ jobId, customerEmail, customer, onClick }:any) {
  const { sent, sending, error } = useSelector(({ JobReport }:any) => JobReport.email);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(closeModalAction());
  };

  const variant = sent
    ? 'outlined'
    : 'contained';

  const text = sent
    ? 'Send Again'
    : 'Send';


  function renderMessage() {
    if (!sent) {
      return <p>
        {`Email Job Report for`}
        <br />
        <span>
          {`${jobId}`}
        </span>
        <br />
        {`to ${customerEmail || customer}?`}
      </p>;
    }
    return <p>
      {`Successfully sent email to ${customerEmail || customer}`}
    </p>;
  }

  return <EmailJobReportModalContainer>
    <EmailIcon />
    {renderMessage()}
    <div>
      <Button
        onClick={closeModal}>
        {'cancel'}
      </Button>
      <Button
        color={'primary'}
        disabled={sending}
        onClick={onClick}
        variant={variant}>
        {text}
      </Button>
    </div>
  </EmailJobReportModalContainer>;
}
