import React from 'react';
import {ERROR_RED, GRAY4, PRIMARY_GREEN} from "../../../constants";
import {Tooltip, withStyles} from "@material-ui/core";
import {
  Sync as SyncIcon,
  SyncProblem as SyncProblemIcon
} from "@material-ui/icons";
import styles from './bc-manual-sync-modal.styles';

const BcSyncStatus = ({classes, data}: any) => {
  const color = data.quickbookId ? PRIMARY_GREEN : (data.error ? ERROR_RED : GRAY4);
  return (
    <Tooltip
      title={data.error}
      disableHoverListener={!data.error}
      classes={{tooltip: classes.tooltip}}
    >
      <div style={{display: 'flex'}}>
        {data.quickbookId ?
          <SyncIcon className={classes.syncIcon} style={{color}}/>
          :
          <SyncProblemIcon className={classes.syncIcon} style={{color}}/>
        }
      </div>
    </Tooltip>
  );
}

export default withStyles(
  styles,
  {'withTheme': true}
)(BcSyncStatus);
