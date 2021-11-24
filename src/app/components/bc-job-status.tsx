import React from 'react';
import {STATUSES} from "../../helpers/contants";

interface Props {
  status: number;
}

function BCJobStatus({status}:Props) {
  const currentStatus = STATUSES.find((item) => item.id === status);
  if (!currentStatus) return null;


  const StatusIcon = currentStatus.icon;
  return <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', color: currentStatus.color}}>
    <StatusIcon />&nbsp;&nbsp;{currentStatus.title}
  </div>;
}

export default BCJobStatus;
