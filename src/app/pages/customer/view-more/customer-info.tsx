import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components';
import styles from './view-more.styles';


function CustomerInfoPage({ classes, customerObj }: any) {

  return (

        <div>
            <div>Name: {customerObj.name}
                <Fab
                aria-label={'delete'}
                classes={{
                  'root': classes.fabRoot
                }}
                color={'primary'}
                variant={'extended'}>
                {'Edit'}
              </Fab></div>
            <div>Address : {customerObj.address}</div>
           <div>Contact Name : {customerObj.contactName}</div>
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