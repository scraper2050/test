import React from 'react';
import styles from '../pages/customer/customer.styles';
import {withStyles} from "@material-ui/core";

interface Props {
  status: number;
  classes: any;
}
function BCJobStatus({classes, status}:Props) {
  const statusArray = [
    {
      'class': classes.statusPendingText,
      'text': 'Scheduled'
    },
    {
      'class': classes.statusStartedText,
      'text': 'Started'
    },
    {
      'class': classes.statusFinishedText,
      'text': 'Finished'
    },
    {
      'class': classes.statusCanceledText,
      'text': 'Canceled'
    },
    {
      'class': classes.statusResheduledText,
      'text': 'Rescheduled'
    },
    {
      'class': classes.statusPausedText,
      'text': 'Paused'
    },
    {
      'class': classes.statusIncompleteText,
      'text': 'Incomplete'
    }
  ];
  const textStatus = statusArray[status]?.text;
  return <div className={statusArray[status]?.class}>
    {textStatus}
  </div>;
}

export default withStyles(styles, { 'withTheme': true })(BCJobStatus);
