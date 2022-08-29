import React, {useEffect, useState} from "react";
import Day from "./calnedar-day";
import {withStyles} from "@material-ui/core";
import styles from "./calendar.style";
import moment from "moment";
import BCCircularLoader from "../bc-circular-loader/bc-circular-loader";
import {BCEVENT} from "../../pages/customer/calendar/calendar-types";
import BCCard from "./bc-card/bc-card";

interface Props {
  classes: any,
  month: Date,
  isLoading?: boolean,
  events: BCEVENT[],
  eventClickHandler: (isSelected: boolean, eventProps: any) => void;
  calendarState: any;
  openJobModalHandler?: (job:any) => void;
  openTicketModalHandler?: (data:any,status:any,message:any) => void;
  getServiceTicketDetail: any;
}

function getDateArray (month: Date) {
  const startDate = moment(month).add(-1, 'month').endOf('month').day(1);
  const endDate =  moment(month).endOf('month').add(1, 'week').day(0);

  const daysArray = [];
  let weekArray = [];
  for (let m=startDate; m.isSameOrBefore(endDate); m.add(1, 'day')) {
    weekArray.push(m.toDate());
    if (m.day() === 0) {
      daysArray.push(weekArray);
      weekArray = [];
    }
  }
  return daysArray;
}

function sortEvents (a: BCEVENT, b: BCEVENT) {
  if (a.hasTime && b.hasTime) {
    if (a.date > b.date) return 1;
    else if (a.date < b.date) return -1;
    else return a.title > b.title ? 1 : -1;
  } else if (a.hasTime) {
    return 1;
  } else if (b.hasTime) {
    return -1;
  } else {
    return a.title > b.title ? 1 : -1;
  }
}

function BCMonth({
  classes,
  month,
  events,
  isLoading = false,
  eventClickHandler,
  calendarState,
  openJobModalHandler,
  openTicketModalHandler,
  getServiceTicketDetail,
}: Props) {
  const [daysArray, setDaysArray] = useState<any[]>([]);
  useEffect(() => {
    setDaysArray(getDateArray(month));
  }, [month]);

  return (
    <>
    {isLoading &&
    <div className={classes.monthSpinnerContainer}>
      <BCCircularLoader heightValue={'70vh'} />
    </div>
    }
    <BCCard
      eventClickHandler={eventClickHandler}
      calendarState={calendarState}
      openJobModalHandler={openJobModalHandler}
      openTicketModalHandler={openTicketModalHandler}
      getServiceTicketDetail={getServiceTicketDetail}
    />

    <div className={classes.monthContainer}>
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day)=> (
        <p key={day} className={classes.dayName}>{day}</p>
      ))}
      {daysArray.map((week, i) => (
        <React.Fragment key={i}>
          {week.map((day: Date, idx: number) => {
            const dayEvents = events.filter((event) => moment(event.date).isSame(moment(day), 'day'))
            dayEvents.sort(sortEvents);
            return (
              <Day
                day={day}
                key={idx}
                column={idx}
                row={i}
                isLastRow={i === daysArray.length - 1}
                events={dayEvents}
                eventClickHandler={eventClickHandler}
                calendarState={calendarState}
              />
            )
          })}
        </React.Fragment>
      ))}
    </div>
    </>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCMonth);
