import React, { useContext, useState, useEffect } from "react";
import classNames from "classnames";
import moment from "moment";
import styles from "./calendar.style";
import {withStyles} from "@material-ui/core";
import {BCEVENT} from "../../pages/customer/calendar/calendar-types";
import BCEvent from "./calendar-event";
import styled from "styled-components";

interface Props {
  classes: any,
  day: Date,
  events?: BCEVENT[],
  row: number,
  column: number,
  isLastRow: boolean,
}

function BCDay({ day, events = [], row, column, isLastRow, classes }:Props) {
  const [dayEvents, setDayEvents] = useState(events);
  const isToday = moment(day).isSame(new Date(), 'day');
  console.log({events})
  useEffect(() => {
    //setDayEvents(events);
  }, [events]);

  return (
    <div className={classNames({
      [classes.monthDayContainer]: true,
      [classes.monthDayContainerLastRow]: isLastRow,
      [classes.monthDayContainerLastColumn]: column === 6,

    })}>
      <header className={classes.monthDayDateContainer}>
        <p
          className={classNames({[classes.monthDayDate]: true, [classes.monthDayDateToday]: isToday})}
        >
          {moment(day).format('D')}
        </p>
        {moment(day).date() === 1 &&
          <p className={classes.monthDayMonth}>
            {moment(day).format('MMMM')}
          </p>
        }
      </header>
      <EventContainer>
        {events.map((evt, idx) => (
          <BCEvent
            event={evt}
            key={idx}
            selected={false}
            // onClick={() => setSelectedEvent(evt)}
            //className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </BCEvent>
        ))}
      </EventContainer>
    </div>
  );
}

const EventContainer = styled.div`
  flex: 1;
  flex-direction: column;
  padding: 4px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
      -webkit-border-radius: 2px;
      border-radius: 2px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px;
      border-radius: 2px;
      background: rgba(0,0,0,0.2);
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
  }
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCDay);
