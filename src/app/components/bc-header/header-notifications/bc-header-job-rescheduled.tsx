import ReplayIcon from '@material-ui/icons/Replay';
import { MenuItem } from '@material-ui/core';
import { NotificationItem } from '../bc-header-notification';
import React from 'react';
import { fromNow, shortenStringWithElipsis } from 'helpers/format';
import { modalTypes } from '../../../../constants';
import { useDispatch } from 'react-redux';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { getjobDetailAPI } from 'api/job.api';

export default function JobRescheduledNotication(item :NotificationItem) {
  const { metadata, message, createdAt, readStatus, ...props } = item;
  const dispatch = useDispatch();

  const openDetailTicketModal = async () => {
    const data = {
      'jobId': item?.metadata?._id
    };
    const job: any = await getjobDetailAPI(data);
    job.jobRescheduled = item?._id;
    dispatch(setModalDataAction({
      'data': {
        'job': job,
        'modalTitle': 'Edit Job - Rescheduled',
        'removeFooter': false
      },
      'type': modalTypes.EDIT_JOB_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };
  const filteredHistory: {note: string}[] = item.metadata.track.filter(history=>history.action.includes('rescheduling'))
  const rescheduleNote: string = filteredHistory.length ? filteredHistory[filteredHistory.length-1].note: '-'
  return <MenuItem
    className={readStatus.isRead
      ? ''
      : 'unread'}
    onClick={openDetailTicketModal}>

    <ReplayIcon color={'primary'} />
    <div className={'ticket-info'}>
      {message?.title}
      {' - '}
      <strong>
        {metadata.jobId}
      </strong>
      <span className='note'>
        {`Note: ${shortenStringWithElipsis(rescheduleNote || '', 24)}`}
      </span>
      <span>
        {fromNow(new Date(createdAt))}
      </span>
    </div>
  </MenuItem>;
}


