import React, { useEffect, useState, useRef } from 'react';
import BuildIcon from '@material-ui/icons/Build';
import { MenuItem } from '@material-ui/core';
import { NotificationItemWithHandler } from '../bc-header-notification';
import { fromNow } from 'helpers/format';


export default function NewChatJobRequestNotication(item :NotificationItemWithHandler) {
  const { metadata, createdAt, readStatus, openModalHandler, jobRequests, ...props } = item;
  const [jobRequestObject, setJobRequestObject] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const requestIdRef = useRef()

  useEffect(() => {
    const matchedJobRequest = jobRequests.filter((jobRequest:any) => jobRequest._id === (metadata?.jobRequest?._id || metadata?.jobRequest))
    if(matchedJobRequest && matchedJobRequest.length){
      setJobRequestObject(matchedJobRequest[0])
    }
  }, [jobRequests])

  useEffect(() => {
    if(metadata?.jobRequest?.requestId){
      requestIdRef.current = metadata.jobRequest.requestId;
    }
  }, [metadata])

  const openDetailJobRequestModal = async () => {
    if(!isLoading){
      setIsLoading(true)
      openModalHandler('NewChatJobRequest', jobRequestObject, item?._id, metadata?.jobRequest)
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    }
  };

  return <MenuItem
    className={readStatus.isRead
      ? ''
      : 'unread'}
    onClick={openDetailJobRequestModal}
    style={{backgroundColor: isLoading ? 'grey' : 'initial'}}
    >

    <BuildIcon color={'primary'} />
    <div className={'ticket-info'}>
      {`You have new message for Job Request  `}
      <strong>
        {`${requestIdRef.current}`}
      </strong>
      <span>
        {fromNow(new Date(createdAt))}
      </span>
    </div>
  </MenuItem>;
}


