import {ReactComponent as IconCalendar} from "../../../assets/img/icons/map/icon-calendar.svg";
import {DatePicker} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import {ReactComponent as IconFunnel} from "../../../assets/img/icons/map/icon-funnel.svg";
import React, {useEffect, useState} from "react";
import {ClickAwayListener, withStyles} from "@material-ui/core";
import styles from "./bc-map-filter.styles";
import {makeStyles} from "@material-ui/core/styles";
import * as CONSTANTS from "../../../constants";
import {formatDateYMD} from "../../../helpers/format";
import BCMapFilter
  from "../../pages/customer/tickets-map-view/sidebar/bc-map-filter";

const useStyles = makeStyles(theme => ({
  funnel: {
    minHeight: 'unset',
    height: theme.spacing(5),
    minWidth: theme.spacing(5),
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    height: '40px',
    marginRight: '4px',
    borderRadius: '8px',
    border: '1px solid #E0E0E0',
  },
}));


function BCMapFilterHead({ startDate = null, placeholder = '', disableDate = false, onChangeDate, filter, isTicket }: any): JSX.Element {
  const mapStyles = useStyles();
  const [dateValue, setDateValue] = useState<any>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    setDateValue(startDate)
  }, [startDate])

  const handleButtonClickMinusDay = () => {
    const previousDay = dateValue ? new Date(dateValue.getTime() - 24 * 60 * 60 * 1000) : new Date();
    const formattedDate = formatDateYMD(previousDay);
    dateChangeHandler(formattedDate);
  };

  const handleButtonClickPlusDay = () => {
    const nextDay =  dateValue ? new Date(dateValue.getTime() + 24 * 60 * 60 * 1000) : new Date();
    const formattedDate = formatDateYMD(nextDay);
    dateChangeHandler(formattedDate);
  };


  const dateChangeHandler = (date: string) => {
    const dateObj = new Date(date);
    onChangeDate(dateObj);
    setDateValue(dateObj);
  };

  const handleFilter =  (f: any) => {
    setShowFilterModal(false);
    if (f) {
      filter[1](f);
    }
  };

  const resetFilter = async () => {
    setShowFilterModal(false);

    filter[1]({
      'customerNames': null,
      'jobId': '',
      'contact': null,
      'jobStatus': [-1],
    });
  }

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };


  return (
    <div className="filterHeadContainer">
      <div className="filter_wrapper">
        <Button className={mapStyles.funnel} onClick={toggleFilterModal}>
          <IconFunnel/>
        </Button>
        {
          showFilterModal
            ? <ClickAwayListener onClickAway={toggleFilterModal} mouseEvent={'onMouseUp'}>
              <div className={'dropdown_wrapper dropdown_wrapper_filter elevation-5'}>
                <BCMapFilter
                  callback={handleFilter}
                  currentFilter={filter[0]}
                  resetFilter={resetFilter}
                  isTicket={isTicket}
                />
              </div>
            </ClickAwayListener>
            : null
        }
      </div>
      <span className={"datepicker_wrapper"} >
        <button
          className="prev_btn"
          disabled={disableDate}
          onClick={() => handleButtonClickMinusDay()}
        >
          <i className="material-icons">keyboard_arrow_left</i>
        </button>

        <IconCalendar className="calendar_icon"/>
        <DatePicker
          autoOk
          disabled={disableDate}
          disablePast={false}
          format={"MMM d, yyyy"}
          id={`datepicker-${"scheduleDate"}`}
          inputProps={{
            name: "scheduleDate",
            placeholder,
          }}
          inputVariant={"outlined"}
          name={"scheduleDate"}
          onChange={(e: any) => dateChangeHandler(e)}
          required={false}
          value={dateValue}
          variant={"inline"}
        />
        <button
          className="next_btn"
          disabled={disableDate}
          onClick={() => handleButtonClickPlusDay()}
        >
          <i className="material-icons" >keyboard_arrow_right</i>
        </button>
      </span>
    </div>
  )
}

export default withStyles(
  styles,
  {'withTheme': true},
)(BCMapFilterHead);
