import React, {useState} from 'react';
import { modalTypes } from '../../../constants';
import { useDispatch } from 'react-redux';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { resetEmailState } from 'actions/email/email.action';
import BCCircularLoader from "../bc-circular-loader/bc-circular-loader";
import {getEmailDefault} from "../../../api/emailDefault.api";
import {error} from "../../../actions/snackbar/snackbar.action";


interface EmailButtonProps {
    data: any,
    Component: any
}


export default function EmailButton({ data, Component }: EmailButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();


  const handleClick = async(e: any) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      const response = await getEmailDefault();
      setIsLoading(false);
      const {emailDefault} = response.data
      dispatch(setModalDataAction({
        data: {...data, emailDefault},
        'type': modalTypes.EMAIL_JOB_REPORT_MODAL
      }));
      dispatch(resetEmailState());
      setTimeout(() => {
        dispatch(openModalAction());
      }, 200);
    } catch (e) {
      setIsLoading(false);
      dispatch(error(e))
      console.log(e);
    }
  };

  return isLoading? <BCCircularLoader heightValue={'10px'} size={20}/> :
    React.cloneElement(Component, { 'onClick': handleClick });
}


