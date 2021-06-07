import ReplayIcon from '@material-ui/icons/Replay';
import { MenuItem } from '@material-ui/core';
import { NotificationItem } from '../bc-header-notification';
import React from 'react';
import { fromNow } from 'helpers/format';
import { modalTypes } from '../../../../constants';
import { useDispatch } from 'react-redux';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { getjobDetailAPI } from 'api/job.api';

export default function JobRescheduledNotication(item :NotificationItem) {
  const { metadata, message, createdAt, readStatus, ...props } = item;
  const dispatch = useDispatch();

  const openDetailTicketModal = async () => {
    const data = {
      jobId: item?.metadata?._id
    }
    let job: any = await getjobDetailAPI(data);
    job.jobRescheduled = item?._id;
    dispatch(setModalDataAction({
      'data': {
        'detail': true,
        'job': job,
        'modalTitle': 'View Job',
        'removeFooter': false
      },
      'type': modalTypes.EDIT_JOB_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  return <MenuItem
    className={readStatus.isRead
      ? ''
      : 'unread'}
    onClick={openDetailTicketModal}>

    <ReplayIcon color={'primary'} />
    <div className={'ticket-info'}>
      {message?.title}{' - '}
      <strong>
        {metadata.jobId}
      </strong>
      <span>
        {fromNow(new Date(createdAt))}
      </span>
    </div>
  </MenuItem>;
}


