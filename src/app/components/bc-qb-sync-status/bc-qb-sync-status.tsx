import React from 'react';
import {useStyles} from './bc-qb-sync-status.style';
import qbLogo from "../../../assets/img/integration-bg/quickbooks.png";
import {SyncProblem as SyncProblemIcon, Sync as SyncIcon} from '@material-ui/icons';

interface Props {
  data: any;
  showStatus?: boolean;
}

function isNotEmpty(str: string | undefined | null) {
  return !(!str || 0 === str.trim().length);
}

function BCQbSyncStatus({ data, showStatus = false }: Props) {
  const classes = useStyles({isSynced: data.isSynced});
  return (
    isNotEmpty(data.quickbookId) ?
      <div className={classes.container}>
        <img className={classes.logo}
             alt={'logo'}
             title={'synced with QuickBooks'}
             src={qbLogo}
        />
        {showStatus && (
          data.isSynced ? <SyncIcon  className={classes.syncIcon}/> : <SyncProblemIcon className={classes.syncIcon}/>
        )}
      </div> :
      null
  );
}

export default BCQbSyncStatus;
