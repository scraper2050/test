import BCDateTimePicker from "../bc-date-time-picker/bc-date-time-picker";
import {ReactComponent as IconCalendar} from "../../../assets/img/icons/map/icon-calendar.svg";
import {formatShortDate} from "../../../helpers/format";
import {Button} from "@material-ui/core";
import React, {useEffect, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {DateRangePicker} from "react-date-range";
import {CSButtonSmall} from "../../../helpers/custom";
import {PRIMARY_BLUE} from "../../../constants";
import Popper from "@material-ui/core/Popper";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import classNames from "classnames";
import {Job} from "../../../actions/job/job.types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reducers";
import {clearSelectedEvent} from "../../../actions/calendar/bc-calendar.action";

const useStyles = makeStyles((theme) => ({
  cardPopup: {
    zIndex: 1,
    padding: 16,
    borderRadius: 8,
    //border: '1px solid #E0E0E0',
    boxShadow: '3px 3px 3px #E0E0E088',
    backgroundColor: 'white',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

function BCJobCard() {
  const dispatch = useDispatch();
  const { anchor, data, popperOpen } = useSelector((state: RootState) => state.calendar);
  const defaultClasses = useStyles();

  useEffect(() => {
  }, []);

  const closeDateRangePicker = () => {
    dispatch(clearSelectedEvent());
  }

  return (
    <Popper
      className={defaultClasses.cardPopup}
      open={popperOpen}
      anchorEl={anchor}
      role={undefined} transition>
      {({ TransitionProps, placement }) => (
        <Paper elevation={0}>
          <div className={defaultClasses.container}>
            Hello Popper
          </div>
        </Paper>
      )}
    </Popper>
  )
}


export default BCJobCard;
