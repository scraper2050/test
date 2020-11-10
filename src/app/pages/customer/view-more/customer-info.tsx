import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components';
import styles from './view-more.styles';

import '../../../../scss/index.scss';


function CustomerInfoPage({ classes, customerObj }: any) {

  return (

        <div className="customer_info_wrapper">
            <div className="name_wrapper customer_details">
              <strong>Name:</strong> {customerObj.name}
              <button className="MuiFab-primary"><i className="material-icons">edit</i></button>
              
              </div>
            <div className="customer_details"><strong>Address:</strong> {customerObj.address}</div>
           <div className="customer_details"><strong>Contact Name:</strong> {customerObj.contactName}</div>
        </div>
     
  );
}
const InfoContainer = styled.div`
  margin: 7px 0;
`;
const ButtonContainer = styled.span`
  position :relative;
  left: 86%;
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(CustomerInfoPage);
