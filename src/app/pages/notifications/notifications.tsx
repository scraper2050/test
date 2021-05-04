import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import React from 'react';
import { fromNow } from 'helpers/format';
import { PRIMARY_BLUE, modalTypes } from '../../../constants';
import styled from 'styled-components';
import styles from './notification.styles';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Fab, Grid, IconButton, Typography, withStyles } from '@material-ui/core';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import AlertDialogSlide from 'app/components/bc-dialog/bc-dialog';
import { dismissNotificationAction } from 'actions/notifications/notifications.action';
import { NotificationItem } from 'app/components/bc-header/bc-header-notification';
import { Notification, NotificationTypeTypes } from 'reducers/notifications.types';
import { openContractModal, openDetailJobModal } from './notification-click-handlers';
import { getNotificationMethods, getNotificationValues } from './notification-dict';


const NoticationPageContainer = styled.div`
    flex: 1 1 100%;
    width: 100%;
    display: flex;
    overflow-x: hidden;
    padding: 30px;
    box-sizing: border-box;
    svg {
        cursor: pointer;
    }
    .actions {
      display: flex;
    }
    td {
      white-space: pre-wrap;
    }
    tr.unread {
        background: #f1f1f1;
        td {
          font-weight: 800;
          f
        }
    }
`;


function NotificationPage() {
  const dispatch = useDispatch();

  const handleClick = (notificationType:string, original: Notification) => {
    const clickHandler = getNotificationMethods(dispatch, notificationType, original);
    clickHandler();
  };

  const columns: any = [

    {
      'Cell'({ 'row': { original } }: {row: {original: Notification } }) {
        const { typeText } = getNotificationValues(original.notificationType, original);
        return (
          <div className={'type'}>
            {typeText}
          </div>
        );
      },
      'Header': 'Notification Type',
      'id': 'notificationType',
      'sortable': true,
      'width': 70
    },
    {
      'Cell'({ 'row': { original } }: {row: {original: Notification } }) {
        const { notificationType } = original;
        const { details } = getNotificationValues(notificationType, original);
        return (
          <div >
            {details}
          </div>
        );
      },

      'accessor': 'notificationType',
      'Header': 'Details',
      'id': 'id',
      'sortable': true

    },
    {
      'Cell'({ 'row': { original } }: {row: {original: Notification } }) {
        const { readStatus } = original;
        const date = new Date(readStatus.readAt);
        return (
          <div>
            {readStatus.isRead
              ? `Viewed by ${readStatus.readBy.profile.displayName} ${fromNow(date)}`
              : 'Unread'}
          </div>
        );
      },
      'accessor': 'readStatus.readAt',
      'Header': 'Status',
      'id': 'status',
      'sortable': true

    },
    {
      Cell({ 'row': { original } }: {row: {original: Notification } }) {
        return (
          <div className={'actions'}>
            <Button
              onClick={() => handleClick(original.notificationType, original)}
              size={'small'}
              style={{ 'marginRight': '20px' }}
              variant={'outlined'}>
              {'View'}
            </Button>
            <AlertDialogSlide
              buttonText={'Dismiss'}
              color={'secondary'}
              confirmMethod={() => dispatch(dismissNotificationAction.fetch({ 'id': original._id,
                'isDismissed': true }))}
              confirmText={'Dismiss'}
              size={'small'}
              variant={'outlined'}>
              <Typography variant={'h6'}>
                {'Are you sure you want to dismiss this notification?'}
              </Typography>
            </AlertDialogSlide>
          </div>
        );
      },
      'Header': 'Options',
      'id': 'action-options',
      'sortable': false,
      'width': 20
    }
  ];


  const { notifications, error, loading } = useSelector((state: any) => state.notifications);
  const activeNotifications = notifications.filter((notification:NotificationItem) => !notification.dismissedStatus.isDismissed);

  return (
    <NoticationPageContainer>
      <Grid
        alignItems={'flex-start'}
        container
        justify={'center'}>
        <Grid
          item
          lg={8}
          md={12}
          sm={12}
          xs={12}>
          <BCTableContainer
            cellSize
            columns={columns}
            hover
            initialMsg={'No notificatons'}
            isLoading={loading}
            pageSize={activeNotifications.length}
            pagination
            search
            searchPlaceholder={'Search Notifications'}
            tableData={activeNotifications}
          />
        </Grid>
      </Grid>
    </NoticationPageContainer>);
}

export default withStyles(styles, { 'withTheme': true })(NotificationPage);
