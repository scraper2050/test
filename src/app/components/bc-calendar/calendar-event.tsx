import React, {useRef} from "react";
import classNames from "classnames";
import moment from "moment";
import styles from "./calendar.style";
import {withStyles} from "@material-ui/core";
import {BCEVENT} from "../../pages/customer/calendar/calendar-types";
import {statusReference} from "../../../helpers/contants";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reducers";
import {
  clearSelectedEvent,
  setSelectedEvent
} from "../../../actions/calendar/bc-calendar.action";

interface Props {
  classes: any,
  event: BCEVENT,
}

function BCEvent({ event, classes }:Props) {
  const dispatch = useDispatch();
  const eventRef = useRef<HTMLDivElement>(null);
  const { selectedEvent } = useSelector((state: RootState) => state.calendar);
  const status = statusReference[event.status.toString()];
  const StatusIcon = status.icon;
  const isSelected = selectedEvent === event.id;

  return (
    <div className={classNames({
        [classes.eventContainer]: true,
        [classes.eventContainerShadow]: isSelected,
      })}
         ref={eventRef}
         style={{backgroundColor: `${status.color}1E`}}
         onClick={() => dispatch(isSelected ? clearSelectedEvent() :
           setSelectedEvent({selectedEvent: event.id, anchor: eventRef.current, data: null})
         )}
    >
      <StatusIcon className={classes.eventIcon}/>
      <span className={classes.eventTitle}>{event.title}</span>
      {event.hasTime && <span className={classes.eventTime}>
        {moment(event.date).utc().format('h:mm A')}</span>}
    </div>
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCEvent);
