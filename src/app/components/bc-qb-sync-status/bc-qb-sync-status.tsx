import React from 'react';
import {useStyles} from './bc-qb-sync-status.style';
import qbLogo from "../../../assets/img/integration-bg/quickbooks.png";
import {SyncProblem as SyncProblemIcon, Sync as SyncIcon} from '@material-ui/icons';

interface Props {
  data: any;
  hasError?: boolean;
}

function isNotEmpty(str: string | undefined | null) {
  return !(!str || 0 === str.trim().length);
}

function BCQbSyncStatus({ data, hasError = false }: Props) {
  const classes = useStyles({isSynced: data.isSynced, hasError});
  return (
    <div className={classes.container}>
      {isNotEmpty(data.quickbookId) ?
        <img
          className={classes.logo}
          alt={'logo'}
          title={'synced with QuickBooks'}
          src={qbLogo}
        />
        :
        data.isSynced ? <SyncIcon  className={classes.syncIcon}/> : <SyncProblemIcon className={classes.syncIcon}/>
      }
    </div>
  );
}

export default BCQbSyncStatus;
