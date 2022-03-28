import React from "react";
import {IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import CloseIcon from "@material-ui/icons/Close";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../reducers";
import {clearSelectedEvent} from "../../../../actions/calendar/bc-calendar.action";
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

function BCCard() {
  const dispatch = useDispatch();
  const { anchor, data, popperOpen } = useSelector((state: RootState) => state.calendar);
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
            onClick={() => dispatch(clearSelectedEvent())}
          >
            <CloseIcon fontSize={'small'} />
          </IconButton>
          {data.jobId ? <BCJobCard /> : <BCTicketCard />}
        </Paper>
      )}
    </Popper>
  )
}


export default BCCard;
