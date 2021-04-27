import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import InfoIcon from '@material-ui/icons/Info';
import React from 'react';
import { fromNow } from 'helpers/format';
import { PRIMARY_BLUE, modalTypes } from '../../../constants';
import styled from 'styled-components';
import styles from './notification.styles';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, withStyles } from '@material-ui/core';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';


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
        background: #fafafa;
        td {
            color: white;
        }
    }
    `;


const NotificationTypes:any = {
  'CreateServiceTicket': 'Service Ticket'
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
          <div >
            <div
              className={'flex items-center'}
              onClick={() => openDetailJobModal(row.original.metadata._id, row.original._id)}
              style={{
                'alignItems': 'center',
                'display': 'flex',
                'height': 34,
                'marginLeft': '.5rem'

              }}>
              <InfoIcon style={{ 'margin': 'auto, 0' }} />
            </div>
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
  if (loading) {
    return <BCCircularLoader />;
  }

  return <NoticationPageContainer>
    <Grid container>
      <Grid
        item
        xs={8}>
        <BCTableContainer
          cellSize
          columns={columns}
          initialMsg={'No notificatons'}
          pageSize={notifications.length}
          pagination={false}
          search
          searchPlaceholder={'Search Notifications'}
          tableData={notifications}
        />
      </Grid>
    </Grid>
  </NoticationPageContainer>;
}

export default withStyles(styles, { 'withTheme': true })(NotificationPage);
