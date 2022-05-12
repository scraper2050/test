import BuildIcon from '@material-ui/icons/Build';
import { MenuItem } from '@material-ui/core';
import { NotificationItem } from '../bc-header-notification';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fromNow } from 'helpers/format';
import { modalTypes } from '../../../../constants';
import { useDispatch } from 'react-redux';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { getAllJobRequestAPI } from 'api/job-request.api';
import { setCurrentPageIndex, setCurrentPageSize } from 'actions/job-request/job-request.action';
import { markNotificationAsRead } from 'actions/notifications/notifications.action';


export default function JobRequestNotication(item :NotificationItem) {
  const { metadata, createdAt, readStatus, ...props } = item;
  const dispatch = useDispatch();
  const [jobRequestObject, setJobRequestObject] = useState(null);
  const { jobRequests } = useSelector(
    ({ jobRequests }: any) => ({
      jobRequests: jobRequests.jobRequests,
    })
  );

  useEffect(() => {
    const matchedJobRequest = jobRequests.filter((jobRequest:any) => jobRequest._id === metadata)
    if(matchedJobRequest && matchedJobRequest.length){
      setJobRequestObject(matchedJobRequest[0])
    }
  }, [jobRequests])
  


  const openDetailJobRequestModal = async () => {
    dispatch(
      markNotificationAsRead.fetch({ id: item?._id, isRead: true })
    );
    if(jobRequestObject){
      dispatch(
        setModalDataAction({
          data: {
            jobRequest: jobRequestObject,
            removeFooter: false,
            maxHeight: '100%',
            modalTitle: 'Job Request',
          },
          type: modalTypes.VIEW_JOB_REQUEST_MODAL,
        })
      );
      setTimeout(() => {
        dispatch(openModalAction());
      }, 200);
    } else {
      dispatch(setCurrentPageIndex(0));
      dispatch(setCurrentPageSize(10));
      const result:any = await dispatch(getAllJobRequestAPI(undefined, undefined, undefined, '-1', '', undefined));
      const matchedJobRequest = result?.jobRequests?.filter((jobRequest:any) => jobRequest._id === metadata)
      if(matchedJobRequest && matchedJobRequest.length){
        dispatch(
          setModalDataAction({
            data: {
              jobRequest: matchedJobRequest[0],
              removeFooter: false,
              maxHeight: '100%',
              modalTitle: 'Job Request',
            },
            type: modalTypes.VIEW_JOB_REQUEST_MODAL,
          })
        );
        setTimeout(() => {
          dispatch(openModalAction());
        }, 200);
      }
    }
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


