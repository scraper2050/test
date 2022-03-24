import React, {useContext, useState} from "react";
import {Button, IconButton, withStyles} from "@material-ui/core";
import styles from "./calendar.style";
import moment from "moment";
import {CSIconButton} from "../../../helpers/custom";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";

interface Props {
  classes: any;
  date: Date;
  onChange: (date: Date) => void;
}

function CalendarHeader({classes, date, onChange} : Props) {
  const [currentDate, setCurrentDate] = useState(date);

  function handlePrevMonth() {
    const date = moment(currentDate).add(-1, 'month').toDate();
    setCurrentDate(date);
    onChange(date);
  }
  function handleNextMonth() {
    const date = moment(currentDate).add(1, 'month').toDate();
    setCurrentDate(date);
    onChange(date);
  }
  function handleReset() {
    const date = moment().toDate();
    setCurrentDate(date);
    onChange(date);
  }

  return (
    <div className={classes.headerContainer}>
      <h3 className={classes.headerDate}>
        {moment(currentDate).format('MMMM YYYY')}
      </h3>

      <IconButton
        onClick={handlePrevMonth}
        className={classes.headerArrow}
      >
        <ChevronLeft className={classes.headerArrowIcon} />
      </IconButton>

      <IconButton
        onClick={handleNextMonth}
        className={classes.headerArrow}
      >
        <ChevronRight className={classes.headerArrowIcon} />
      </IconButton>

      <Button
        onClick={handleReset}
        variant={'outlined'}
        className={classes.headerTodayButton}
      >
        Today
      </Button>


    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(CalendarHeader);
