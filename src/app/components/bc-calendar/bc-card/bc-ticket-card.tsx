import React from "react";
import {
  formatShortDateNoYear,
} from "../../../../helpers/format";
import {IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/InfoOutlined";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: '10px 0',
    minWidth: 450,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    padding: '5px 10px',
    alignItems: 'center',
  },
  extraLine: {
    marginBottom: 5,
  },
  eventIcon: {
    width: 16,
    height: 16,
    marginRight: 16,
  },
  eventTitle: {
    fontSize: 14,
    color: '#4F4F4F',
    fontWeight: 'bold',
  },
  eventText: {
    fontSize: 12,
    color: '#4F4F4F',
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

function BCTicketCard({calendarState,openTicketModalHandler,getServiceTicketDetail}:any) {
  const { data } = calendarState;
  const defaultClasses = useStyles();

  if (!data) return null;

  const openDetailTicketModal = async () => {
    const {status, message} = await getServiceTicketDetail(data._id);
    openTicketModalHandler(data, status, message)
  };

  return (
    <div className={defaultClasses.container}>
      <div className={`${defaultClasses.row} ${defaultClasses.extraLine}`}>
        <span className={defaultClasses.eventTitle}>{data.customer?.profile?.displayName}</span>
      </div>
      <div className={`${defaultClasses.row} ${defaultClasses.extraLine}`}>
        <span className={defaultClasses.eventText}>{formatShortDateNoYear(data.dueDate)}</span>
        <span className={defaultClasses.eventText}>{data.ticketId.toUpperCase()}</span>
        <div style={{flex: 0.6}}>
          <IconButton onClick={() => openDetailTicketModal()}>
            <InfoIcon fontSize={'default'} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default BCTicketCard;
