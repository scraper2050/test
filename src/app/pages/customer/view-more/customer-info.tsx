import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components';
import styles from './view-more.styles';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import '../../../../scss/index.scss';
import { modalTypes } from '../../../../constants';
import customer from '../customer';


function CustomerInfoPage({ classes, customerObj }: any) {

  const dispatch = useDispatch();

  const handleEditClick = (customer:any) => {
      dispatch(setModalDataAction({
        'data': {
          'customerObj': customer,
          'modalTitle': 'Edit Job Site',
          'removeFooter': false
        },
        'type': modalTypes.ADD_JOB_SITE
      }));
      setTimeout(() => {
        dispatch(openModalAction());
      }, 200);
    };
  
  return (

        <div className="customer_info_wrapper">
            <div className="customer_container">
              <div className="name_wrapper customer_details">
                <strong>Name:</strong> Jamal
              </div>
              <div className="customer_details"><strong>Address:</strong> {customerObj.address}</div>
              <div className="customer_details"><strong>Contact Name:</strong> {customerObj.contactName}</div>
              <div className="customer_details"><strong>Contact Name:</strong> {customerObj.contactName}</div>
              <div className="customer_details"><strong>Contact Name:</strong> {customerObj.contactName}</div>
            </div>
            <div className="edit_button">
              <button className="MuiFab-primary"><i className="material-icons">edit</i></button>
            </div>
        </div>
     
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(CustomerInfoPage);
