import React, {useRef} from "react";
import classNames from "classnames";
import styles from "./calendar.style";
import {withStyles} from "@material-ui/core";
import {BCEVENT} from "../../pages/customer/calendar/calendar-types";
import {statusReference} from "../../../helpers/contants";
import {formatTime} from "../../../helpers/format";

interface Props {
  classes: any,
  event: BCEVENT,
  eventClickHandler: (isSelected: boolean, eventProps: any) => void;
  calendarState: any;
}

function BCEvent({ event, classes, eventClickHandler, calendarState }:Props) {
  const eventRef = useRef<HTMLDivElement>(null);
  const status = statusReference[event.status.toString()];
  const StatusIcon =  status?.icon;
  const isSelected = calendarState?.selectedEvent === event.id;

  return (
    <div className={classNames({
        [classes.eventContainer]: true,
        [classes.eventContainerShadow]: isSelected,
      })}
        ref={eventRef}
        style={{backgroundColor: status ? `${status.color}1E` : isSelected ? '#E5F7FF' : '#EAECF3'}}
        onClick={() => eventClickHandler(isSelected, {selectedEvent: event.id, anchor: eventRef.current, data: event.data})}
    >
      {status &&
        <StatusIcon className={classes.eventIcon}/>
      }
      <span className={classes.eventTitle}>{event.title}</span>
      {event.hasTime && <span className={classes.eventTime}>{formatTime(event.date)}</span>}
    </div>
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCEvent);
