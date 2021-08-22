import styles from "./integrations.styles";
import { Grid, withStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QbIcon from "assets/img/img/intuitt_green.png";
import { quickbooksGetUri, quickbooksAuthenticate } from "../../../../api/quickbooks.api";
import SyncPage from "./SyncPage";
import { success, error } from 'actions/snackbar/snackbar.action';
import {setQBAuthStateToLocalStorage, getQBAuthStateFromLocalStorage} from "../../../../utils/local-storage.service";
import {setQuickbooksConnection} from "../../../../actions/quickbooks/quickbooks.actions";
const redirectUri = `${window.location.origin}/main/admin/integrations/callback`;

interface StatusTypes {
  status: number;
}

interface RowStatusTypes {
  row: {
    original: {
      status: number;
    };
  };
}

function AdminIntegrationsPage({ classes, callbackUrl }: any) {
  const dispatch = useDispatch();
  const showSyncInterface = useSelector((state:any) => state.quickbooks.connectionState);

  const parseURL = () => {
    const res: any = {}
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair: string[] = vars[i].split('=');
      res[pair[0]] = pair[1];
    }
    return res;
  }
  const togglePopUp = async () => {
    const response = await quickbooksGetUri({ redirectUri });
    const { data } = response;
    if (data.status === 1) {
      const {authUri} = data;
      let parameters = ` "location=1,width=800,height=650"`;
      parameters +=
        ",left=" +
        (window.screen.width - 800) / 2 +
        ",top=" +
        (window.screen.height - 650) / 2;

      let win: any = window.open(authUri, "connectPopup", parameters);

      let pollOAuth = window.setInterval(async function () {
        try {
          const returnUrl = win.document.URL;
          const index = returnUrl.indexOf("code");
          const errorIndex = returnUrl.indexOf("error");
          if (errorIndex != -1) {
            const msg = returnUrl.substring(errorIndex + 6, returnUrl.indexOf("&"));
            await window.clearInterval(pollOAuth);
            await win.close();
            dispatch(error(msg));
            return;
          }

          if (index != -1) {
            const data = {
              data: returnUrl.substring(index),
              redirectUri: encodeURIComponent(redirectUri)
            };
            // console.log({data});
            await window.clearInterval(pollOAuth);
            await win.close();
            const response = await quickbooksAuthenticate(data);
            if (response.data.status === 1) {
              dispatch(success(response.data.message))
              dispatch(setQuickbooksConnection(true));
            } else {
              dispatch(error(response.data.message));
              dispatch(setQuickbooksConnection(false));
            }
            // window.location.reload();
          }
        } catch (e) {
          console.log(e);
        }
      }, 100);
    } else {
      console.log (data.message);
    }
  };

  return showSyncInterface ? (
    <SyncPage />
  ) : (
    <>
      <div className={classes.pageMainContainer}>
        <div className={classes.pageContainer}>
          <div className={classes.pageContent}>
            <Grid container direction="column" spacing={5}>
              <Grid item onClick={togglePopUp}>
                <img
                  className={classes.buttonImage}
                  alt={"logo"}
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

export default withStyles(styles, { withTheme: true })(AdminIntegrationsPage);
