import React from "react";
import {IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import CloseIcon from "@material-ui/icons/Close";
import BCJobCard from "./bc-job-card";
import BCTicketCard from "./bc-ticket-card";

const useStyles = makeStyles((theme) => ({
  cardPopup: {
    zIndex: 10000,
    padding: 16,
    borderRadius: 8,
    boxShadow: '0 0 5px 5px #e0e0e044;',
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: '#BDBDBD',
    zIndex: 10,
  },
}));

function BCCard({eventClickHandler, calendarState, openJobModalHandler, openTicketModalHandler, getServiceTicketDetail}:any) {
  const { anchor, data, popperOpen } = calendarState;
  const defaultClasses = useStyles();

  if (!data) return null;

  return (
    <Popper
      className={defaultClasses.cardPopup}
      open={popperOpen}
      anchorEl={anchor}
      placement={'bottom-start'}
      role={undefined} transition>
      {({ TransitionProps, placement }) => (
        <Paper elevation={0}>
          <IconButton className={defaultClasses.closeButton}
            onClick={() => eventClickHandler(true)}
          >
            <CloseIcon fontSize={'small'} />
          </IconButton>
          {data.jobId 
            ? <BCJobCard calendarState={calendarState} openJobModalHandler={openJobModalHandler} /> 
            : <BCTicketCard calendarState={calendarState} openTicketModalHandler={openTicketModalHandler} getServiceTicketDetail={getServiceTicketDetail} />}
        </Paper>
      )}
    </Popper>
  )
}


export default BCCard;
