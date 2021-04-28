import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import VisibilityIcon from '@material-ui/icons/Visibility';
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
    tr.unread {
        background: #f1f1f1;
        td {
          font-weight: 800;
        }
    }
    `;


const NotificationTypes:any = {
  'ServiceTicketCreated': 'Service Ticket'
};


function NotificationPage() {
  const dispatch = useDispatch();
  const openDetailJobModal = (id:string, notificationId:string) => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Service Ticket Details',
        'removeFooter': false,
        'className': 'serviceTicketTitle',
        'maxHeight': '754px',
        'height': '100%',
        'ticketId': id,
        'notificationId': notificationId
      },
      'type': modalTypes.VIEW_SERVICE_TICKET_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };


  const columns: any = [

    {
      'Cell'({ row }: any) {
        return (
          <div className={'type'}>
            {NotificationTypes[row.original.notificationType]}
          </div>
        );
      },
      'Header': 'Notification Type',
      'id': 'notificationType',
      'sortable': true,
      'width': 70
    },
    {

      'accessor': 'metadata.ticketId',
      'Header': 'Details',
      'id': 'id',
      'sortable': true

    },
    {
      'Cell'({ row }: any) {
        const { readStatus } = row.original;
        return (
          <div>
            {readStatus.isRead
              ? `Viewed by ${readStatus.readBy.profile.displayName} ${fromNow(readStatus.readAt)}`
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
      Cell({ row }: any) {
        return (
          <div>
            <Button
              onClick={() => openDetailJobModal(row.original.metadata._id, row.original._id)}
              size={'small'}
              style={{ 'marginRight': '20px' }}
              variant={'outlined'}>
              {'View'}

            </Button>


            <AlertDialogSlide
              buttonText={'Dismiss'}
              color={'secondary'}
              confirmMethod={() => dispatch(dismissNotificationAction.fetch({ 'id': row.original._id,
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
          xs={8}>
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
