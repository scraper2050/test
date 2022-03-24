import React, { useContext, useState, useEffect } from "react";
import classNames from "classnames";
import moment from "moment";
import styles from "./calendar.style";
import {withStyles} from "@material-ui/core";
import {BCEVENT} from "../../pages/customer/calendar/calendar-types";
import {statusReference} from "../../../helpers/contants";

interface Props {
  classes: any,
  event: BCEVENT,
  selected: boolean,
}

function BCEvent({ event, classes, selected }:Props) {
  const [isSelected, setSelected] = useState(selected);
  const status = statusReference[event.status.toString()];
  const StatusIcon = status.icon;


  return (
    <div className={classNames({
        [classes.eventContainer]: true,
        [classes.eventContainerShadow]: isSelected,
      })}
         style={{backgroundColor: `${status.color}1E`}}
         onClick={() => setSelected((state) => !state)}
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
