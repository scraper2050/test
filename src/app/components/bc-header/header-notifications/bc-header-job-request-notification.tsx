import React, { useEffect, useState } from 'react';
import BuildIcon from '@material-ui/icons/Build';
import { MenuItem } from '@material-ui/core';
import { NotificationItemWithHandler } from '../bc-header-notification';
import { fromNow } from 'helpers/format';


export default function JobRequestNotication(item :NotificationItemWithHandler) {
  const { metadata, createdAt, readStatus, openModalHandler, jobRequests, ...props } = item;
  const [jobRequestObject, setJobRequestObject] = useState(null);

  useEffect(() => {
    const matchedJobRequest = jobRequests.filter((jobRequest:any) => jobRequest._id === metadata?._id)
    if(matchedJobRequest && matchedJobRequest.length){
      setJobRequestObject(matchedJobRequest[0])
    }
  }, [jobRequests])
  


  const openDetailJobRequestModal = async () => {
    openModalHandler('JobRequestCreated', jobRequestObject, item?._id, metadata)
  };


  return <MenuItem
    className={readStatus.isRead
      ? ''
      : 'unread'}
    onClick={openDetailJobRequestModal}>

    <BuildIcon color={'primary'} />
    <div className={'ticket-info'}>
      {`${props.message.body.split(':')[0]} `}
      <strong>
        {`${props.message.body.split(':')[1]}`}
      </strong>
      <span>
        {fromNow(new Date(createdAt))}
      </span>
    </div>
  </MenuItem>;
}


