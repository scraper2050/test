import React, {useState} from "react";
import {
  Button,
  IconButton,
  InputBase,
  withStyles
} from "@material-ui/core";
import styles from "./calendar.style";
import moment from "moment";
import {ChevronLeft, ChevronRight, Search} from "@material-ui/icons";
import BCMenuButton, {MenuButtonItem} from "./bc-menu-button";
import {GridOn, ViewWeek, CalendarViewDay} from '@material-ui/icons';

interface Props {
  classes: any;
  children?: React.ReactNode;
  date: Date;
  titleItems: MenuButtonItem[];
  onDateChange: (date: Date) => void;
  onCalendarChange: (id: number, title: string) => void;
  onTitleChange: (id: number, title: string) => void;
  searchLabel?: string;
  onSearchChange?: (text: string) => void;
}

function CalendarHeader({
                          classes, children, date, titleItems,
                          onDateChange, onCalendarChange, onTitleChange,
                          searchLabel = 'Search...', onSearchChange} : Props) {
  const [currentDate, setCurrentDate] = useState(date);
  const [currentCalender, setCurrentCalendar] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(0);

  function handlePrevMonth() {
    const date = moment(currentDate).add(-1, 'month').toDate();
    setCurrentDate(date);
    onDateChange(date);
  }
  function handleNextMonth() {
    const date = moment(currentDate).add(1, 'month').toDate();
    setCurrentDate(date);
    onDateChange(date);
  }
  function handleReset() {
    const date = moment().toDate();
    setCurrentDate(date);
    onDateChange(date);
  }

  function _onCalendarChange(id: number, title: string) {
    // setCurrentCalendar(id);
    onCalendarChange(id, title);
  }

  function _onTitleChange(id: number, title: string) {
    setCurrentTitle(id);
    onTitleChange(id, title);
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

      &nbsp;&nbsp;

      <BCMenuButton
        items={[{title: 'Month', icon: GridOn}, {title: 'Week', icon: ViewWeek}, {title: 'Day', icon: CalendarViewDay}]}
        selectedIndex={currentCalender}
        handleClick={_onCalendarChange}
      />

      &nbsp;&nbsp;

      <BCMenuButton
        items={titleItems}
        selectedIndex={currentTitle}
        handleClick={_onTitleChange}
      />

      &nbsp;&nbsp;

      <Button
        onClick={handleReset}
        variant={'outlined'}
        className={classes.headerTodayButton}
      >
        Today
      </Button>

      &nbsp;&nbsp;&nbsp;&nbsp;

      {onSearchChange &&
      <InputBase
        onChange={e => onSearchChange(e.target.value)}
        placeholder={searchLabel}
        //value={searchStr}
        endAdornment={
          <Search style={{color: '#777777'}}/>
        }
        classes={{
          root: classes.searchBox,
          focused: classes.searchBoxFocused,
          input: classes.searchBoxInput,
        }}
      />
      }

      &nbsp;&nbsp;&nbsp;&nbsp;

      {children ? children : null}

    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(CalendarHeader);
