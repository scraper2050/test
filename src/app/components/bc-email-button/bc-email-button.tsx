import React from 'react';
import { modalTypes } from '../../../constants';
import { useDispatch } from 'react-redux';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { resetEmailState } from 'actions/email/email.action';


interface EmailButtonProps {
    data: any,
    Component: any
}


export default function EmailButton({ data, Component }: EmailButtonProps) {
  const dispatch = useDispatch();


  const handleClick = (e: any) => {
    e.stopPropagation();
    dispatch(setModalDataAction({
      data,
      'type': modalTypes.EMAIL_JOB_REPORT_MODAL
    }));
    dispatch(resetEmailState());
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  return React.cloneElement(Component, { 'onClick': handleClick });
}


