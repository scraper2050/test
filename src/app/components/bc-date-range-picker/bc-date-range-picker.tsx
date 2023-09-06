import BCDateTimePicker from "../bc-date-time-picker/bc-date-time-picker";
import {ReactComponent as IconCalendar} from "../../../assets/img/icons/map/icon-calendar.svg";
import {formatShortDate, formatShortDateNoDay} from "../../../helpers/format";
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
import { Place } from "@material-ui/icons";

export interface Range {
  startDate: Date;
  endDate: Date;
}

const calcWidth=(props:any)=>{
  if(props.smallerView ){
    return 320
  }
  if(props.showClearButton){
    return 350;
  }
  return 315;
}

interface Props {
  range: Range|null;
  disabled?: boolean;
  showClearButton?: boolean,
  onChange?: (range: Range | null) => void;
  title?: string;
  noDay? : boolean;
  classes?: {
    button?:string;
  }
  placement?: 'bottom' | 'bottom-start' | 'right';
  preventOverflow?: boolean;
  biggerButton?: boolean;
  smallerView?:boolean;
}

const useStyles = makeStyles((theme) => ({
  rangePickerButton: (props: any) => ({
    textTransform: 'none',
    borderRadius: 8,
    '& .MuiButton-startIcon': {
      marginTop: -4,
      padding: 0,
    },
    width: calcWidth(props),
    justifyContent: 'flex-start',
  }),
  rangePickerPopup: {
    zIndex: 1500,
    //padding: 4,
    //borderRadius: 8,
    border: '1px solid #E0E0E0',
    boxShadow: '3px 3px 3px #E0E0E088',
    backgroundColor: 'white',
  },
  rangePickerWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  rangePicker: {
    borderBottom: '1px solid #E0E0E0',
  },
  buttonsWrapper: {
    alignSelf: 'flex-end',
    padding: 16,
  },
  clearRangeButton: {
    position: 'absolute',
    right: '1rem',
    color: 'grey',
  },
  biggerButton: {
    padding: '9px 15px',
    width: '100% !important',
    maxWidth: '100%',
  }
}));

const DEFAULT_RANGE = {
  startDate: new Date(),
  endDate: new Date(),
}


function BCDateRangePicker({classes, range, disabled = false, showClearButton = false, onChange, title, noDay = false, placement = 'bottom', preventOverflow = false, biggerButton = false, smallerView = false}: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const defaultClasses = useStyles({showClearButton,smallerView});
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [selectionRange, setSelectionRange] = useState(range);
  const [tempSelectionRange, setTempSelectionRange] = useState(range ? range : {
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    setSelectionRange(range);
  }, [range]);

  const handleSelect = (date: any) => {
    setTempSelectionRange(date.range1 || date);
  }

  const openDateRangePicker = () => {
    if (selectionRange) {
      setTempSelectionRange(selectionRange);
    } else {
      setTempSelectionRange(DEFAULT_RANGE);
    }
    setShowDateRangePicker(true);
  }

  const closeDateRangePicker = () => {
    setShowDateRangePicker(false);
  }

  const saveDateRange = () => {
    setSelectionRange(tempSelectionRange);
    setShowDateRangePicker(false);
    if (onChange) onChange(tempSelectionRange);
  }

  const clearRange = (e: any) => {
    e.stopPropagation();
    if (selectionRange) {
      setSelectionRange(null);
      if (onChange) onChange(null);
    }
  }


  return (
    <>
      <div>
        <Button
          ref={buttonRef}
          variant={'outlined'}
          disabled={disabled}
          classes={{
            root: classNames(defaultClasses.rangePickerButton, classes?.button, biggerButton ? defaultClasses.biggerButton : ''),
            endIcon: defaultClasses.clearRangeButton,
          }}
          startIcon={<IconCalendar style={{fontSize: 14}}/>}
          endIcon={showClearButton ? <HighlightOffIcon onClick={clearRange}/> : null}
          onClick={openDateRangePicker}
        >
          {selectionRange ?
            noDay ?
              formatShortDateNoDay(selectionRange.startDate) + ' - ' + formatShortDateNoDay(selectionRange.endDate)
              : formatShortDate(selectionRange.startDate) + ' - ' + formatShortDate(selectionRange.endDate)
            : title ? title : 'Pick a range...'
          }
        </Button>
      </div>
      <Popper
        className={defaultClasses.rangePickerPopup}
        open={showDateRangePicker}
        anchorEl={buttonRef.current}
        placement={placement}
        modifiers={{
          flip: {
            enabled: false,
          },
          preventOverflow: {
            enabled: preventOverflow ? true : false,
            boundariesElement: 'scrollParent',
          },
        }}
        role={undefined} transition>
        {({ TransitionProps, placement }) => (
          // <Fade timeout={500}
          //       {...TransitionProps}
          // >
            <Paper elevation={0}>
              <ClickAwayListener onClickAway={closeDateRangePicker}>
                <div className={defaultClasses.rangePickerWrapper}>
                  <DateRangePicker
                    ranges={[tempSelectionRange]}
                    onChange={handleSelect}
                    className={defaultClasses.rangePicker}
                    // moveRangeOnFirstSelection={true}
                    // retainEndDateOnFirstSelection={true}
                    months={2}
                    direction={'horizontal'}
                  />
                  <div className={defaultClasses.buttonsWrapper}>
                    <CSButtonSmall
                      style={{
                        color: PRIMARY_BLUE,
                        backgroundColor: 'white',
                        border: `1px solid ${PRIMARY_BLUE}`
                      }}
                      onClick={closeDateRangePicker}
                    >Cancel</CSButtonSmall>
                    <CSButtonSmall
                      onClick={saveDateRange}
                    >OK</CSButtonSmall>
                  </div>
                </div>
              </ClickAwayListener>
            </Paper>
          // </Fade>
        )}
      </Popper>
    </>
  )
}


export default BCDateRangePicker;
