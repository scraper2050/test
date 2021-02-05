import styles from './integrations.styles';
import { Grid, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import QbIcon from 'assets/img/img/intuitt_green.png'
import OAuthClient from 'intuit-oauth';
import { useLocation } from "react-router-dom";
import config from '../../../../config';

interface StatusTypes {
  status: number;
}


interface RowStatusTypes {
  row: {
    original: {

      status: number
    }
  };
}

function AdminIntegrationsPage({ classes, callbackUrl }: any) {

  const oauthClient = new OAuthClient({
    clientId: config.quickbooks_clientId,
    clientSecret: config.quickbooks_clientSecret,
    environment: 'sandbox',
    // redirectUri: `${config.appBaseURL}main/admin/integrations/callback`,
    redirectUri: `${window.location.origin}/main/admin/integrations/callback`,
    // redirectUri: `https://testing.blueclerk.com/main/admin/integrations/callback`,
  });

  const authUri = oauthClient.authorizeUri({
    scope: [
      OAuthClient.scopes.Accounting,
      OAuthClient.scopes.Payments,
      OAuthClient.scopes.OpenId,
      OAuthClient.scopes.Profile,
      OAuthClient.scopes.Email,
      OAuthClient.scopes.Phone,
      OAuthClient.scopes.Address,
    ],
  });

  const togglePopUp = async () => {

    let parameters = ` "location=1,width=800,height=650"`;
    parameters += ",left=" + (window.screen.width - 800) / 2 + ",top=" + (window.screen.height - 650) / 2;

    let win: any = window.open(authUri, 'connectPopup', parameters);

    let pollOAuth = window.setInterval(async function () {
      try {
        if (win.document.URL.indexOf("code") != -1) {
          let resUri = win.document.URL
          await window.clearInterval(pollOAuth);
          await win.close();
          // window.location.reload();
        }
      } catch (e) {
        console.log(e)
      }
    }, 100);
  };

  return (
    <>
      <div className={classes.pageMainContainer}>
        <div className={classes.pageContainer}>
          <div className={classes.pageContent}>
            <Grid container direction="column" spacing={5}>
              <Grid item
                onClick={togglePopUp}>

                <img
                  className={classes.buttonImage}
                  alt={'logo'}
                  src={QbIcon}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(AdminIntegrationsPage);
