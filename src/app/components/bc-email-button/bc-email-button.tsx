import React, {useState} from 'react';
import { modalTypes } from '../../../constants';
import { useDispatch } from 'react-redux';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { resetEmailState } from 'actions/email/email.action';
import BCCircularLoader from "../bc-circular-loader/bc-circular-loader";
import {getInvoiceEmailTemplate} from "../../../api/emailDefault.api";
import {error as errorSnackBar, error} from "../../../actions/snackbar/snackbar.action";


interface EmailButtonProps {
    data: any,
    Component: any,
    showLoader?: boolean,
}


export default function EmailButton({ data, Component, showLoader = true }: EmailButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();


  const handleClick = async(e: any) => {
    e.stopPropagation();
    if (data.typeText === 'Invoice') {
      setIsLoading(true);
      try {
        const response = await getInvoiceEmailTemplate(data.id);
        setIsLoading(false);
        const {emailTemplate: emailDefault, status, message} = response.data
        if (status === 1) {
          dispatch(setModalDataAction({
            data: {...data, emailDefault},
            'type': modalTypes.EMAIL_JOB_REPORT_MODAL
          }));
          dispatch(resetEmailState());
          setTimeout(() => {
            dispatch(openModalAction());
          }, 200);
        } else {
          dispatch(error(message));
        }
      } catch (e) {
        setIsLoading(false);
        dispatch(errorSnackBar(e));
        console.log(e);
      }
    } else {
      dispatch(setModalDataAction({
        data,
        'type': modalTypes.EMAIL_JOB_REPORT_MODAL_OLD
      }));
      dispatch(resetEmailState());
      setTimeout(() => {
        dispatch(openModalAction());
      }, 200);
    }
  };

  return isLoading && showLoader? <BCCircularLoader heightValue={'10px'} size={20}/> :
    React.cloneElement(Component, { 'onClick': handleClick });
}


