import React from 'react';
import {STATUSES} from "../../helpers/contants";

interface Props {
  status: number;
  size?: string;
}

function BCJobStatus({status, size= 'normal'}:Props) {
  const currentStatus = STATUSES.find((item) => item.id === status);
  if (!currentStatus) return null;

  const fontSize = size === 'small' ? 12 : 'auto';
  const dimensions = size === 'small' ? 14 : 'auto';

  const StatusIcon = currentStatus.icon;
  return <div style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: currentStatus.color,
    fontSize,
  }}>
    <StatusIcon style={{
      width: dimensions,
      height: dimensions,
    }} />&nbsp;&nbsp;{currentStatus.title}
  </div>;
}

export default BCJobStatus;
