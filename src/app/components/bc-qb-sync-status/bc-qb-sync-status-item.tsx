import React, { useState } from 'react';
import { useStyles } from './bc-qb-sync-status.style';
import qbLogo from "../../../assets/img/integration-bg/quickbooks.png";
import { SyncProblem as SyncProblemIcon, Sync as SyncIcon } from '@material-ui/icons';
import { CSButtonSmall } from '../../../helpers/custom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { quickbooksItemSync } from 'api/quickbooks.api';
import { useDispatch, useSelector } from 'react-redux';
import {
  error as SnackBarError,
  success,
} from 'actions/snackbar/snackbar.action';
import { loadInvoiceItems } from 'actions/invoicing/items/items.action';


interface Props {
  qbAccounts:any;
  data: any;
  hasError?: boolean;
}

function isNotEmpty(str: string | undefined | null) {
  return !(!str || 0 === str.trim().length);
}

function BCQbSyncStatus({ data, qbAccounts, hasError = false }: Props) {
  const dispatch = useDispatch();
  console.log("qb_accounts", qbAccounts);


  const [resyncing, setResyncing] = useState(false);
  const [resyncStatus, setResyncStatus] = useState(false);
  const classes = useStyles({ isSynced: data.isSynced, hasError });
  const resyncItem = async (data: any) => {
    setResyncing(true);

    const itemSynced = await quickbooksItemSync({ itemId: data?._id });
    setResyncing(false);


    if (itemSynced?.data?.status) {
      setResyncStatus(true);
      dispatch(success('Item synced successfully'));
      // dispatch(loadInvoiceItems.fetch());
    }
    else {
      setResyncStatus(false);

      dispatch(SnackBarError('Item sync failed'));

    }
  }

  return (
    <div className={classes.container} style={{ justifyContent: "center" }}>
      {isNotEmpty(data.quickbookId) ?
        <img
          className={classes.logo}
          alt={'logo'}
          title={'synced with QuickBooks'}
          src={qbLogo}
        />
        :
        data.isSynced ? 
        <SyncIcon className={classes.syncIcon} /> :
          resyncStatus ? <img
            className={classes.logo}
            alt={'logo'}
            title={'synced with QuickBooks'}
            src={qbLogo}
          /> :
          resyncing ?
            <div className={'flex items-center'} >  <div style={{
              marginRight: 10,
              padding: '0px 10px',
              height:"30px"
            }}>
              <CircularProgress size={28} className={classes.fabProgress} /></div></div> 
              :
              <div className={'flex items-center'}>
              <CSButtonSmall
                aria-label={'edit'}
                onClick={() => resyncItem(data)}
                size={'small'}
                style={{
                  marginRight: 10,
                  minWidth: 35,
                  padding: '5px 10px',
                  background: "transparent"
                }}
              ><SyncProblemIcon className={classes.syncIcon} />
              </CSButtonSmall>
            </div>
      }
    </div>
  );
}

export default BCQbSyncStatus;
