import React, { useState } from 'react';
import { useStyles } from './bc-qb-sync-status.style';
import qbLogo from "../../../assets/img/integration-bg/quickbooks.png";
import { SyncProblem as SyncProblemIcon, Sync as SyncIcon } from '@material-ui/icons';
import { CSButtonSmall } from '../../../helpers/custom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { quickbooksGetAccounts } from 'api/quickbooks.api';
import { useDispatch, useSelector } from 'react-redux';
import {
  error as SnackBarError,
  success,
} from 'actions/snackbar/snackbar.action';
import { loadInvoiceItems } from 'actions/invoicing/items/items.action';
import QbSyncDialog from '../bc-qbsync-popup';
import { quickbooksItemSync } from 'api/quickbooks.api';


interface Props {
  qbAccounts:any;
  data: any;
  itemName: string;   
  hasError?: boolean;
}

function isNotEmpty(str: string | undefined | null) {
  return !(!str || 0 === str.trim().length);
}

function BCQbSyncStatus({ data, qbAccounts, itemName,hasError = false }: Props) {
  const dispatch = useDispatch();


  const [resyncing, setResyncing] = useState(false);
  const [resyncStatus, setResyncStatus] = useState(false);
  const [qbSyncDialogOpen,setQbSyncDialogOpen]=useState(false);
  const classes = useStyles({ isSynced: data.isSynced, hasError });
  const resyncItem = async (data: any) => {
    setResyncing(true);

    const itemSynced = await quickbooksItemSync({ itemId: data?._id });
    setResyncing(false);
    const getAccounts = await quickbooksGetAccounts();
    qbAccounts = getAccounts.data.accounts;
    console.log("qb_accounts", qbAccounts );

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
const handleOpenQbSyncDialog=()=>
{
  setQbSyncDialogOpen(true);
  console.log("dialog open");
};
const handleCloseQbSyncDialog=()=>
{
  setQbSyncDialogOpen(false);
  console.log("dialog close");
};
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
                onClick={() => {resyncItem(data);
                handleOpenQbSyncDialog();
              }}
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
      <QbSyncDialog
        open={qbSyncDialogOpen}
        handleClose={handleCloseQbSyncDialog}    
        itemName={itemName}
        qbAccounts={qbAccounts}
      />
    </div>
  );
}

export default BCQbSyncStatus;
