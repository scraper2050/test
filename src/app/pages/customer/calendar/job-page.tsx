import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { Checkbox, FormControlLabel, withStyles, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {getAllJobAPI, getAllJobsAPI} from 'api/job.api';
import styles from './calendar.styles';
import { statusReference } from 'helpers/contants';
import { convertMilitaryTime, formatDate } from 'helpers/format';
import {
  openModalAction,
  setModalDataAction,
} from 'actions/bc-modal/bc-modal.action';
import { setCurrentPageIndex, setCurrentPageSize } from 'actions/job/job.action';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import moment from "moment";
import CalendarHeader from "../../../components/bc-calendar/calendar-header";
import BCMonth from "../../../components/bc-calendar/calnedar-month";
import BCSpinner from "../../../components/bc-spinner/bc-spinner";
import {error} from "../../../../actions/snackbar/snackbar.action";
import {Job} from "../../../../actions/job/job.types";
import {BCEVENT} from "./calendar-types";

function JobPage({ classes, currentPage, setCurrentPage }: any) {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<BCEVENT[]>([]);
  const [refresh, setRefresh] = useState(true);
  const customers = useSelector(({ customers }: any) => customers.data);
  // const [showAllJobs, toggleShowAllJobs] = useState(true);
  const { _id } = useSelector(({ auth }: RootState) => auth);
  // const { isLoading = true, jobs, refresh = true, total, prevCursor, nextCursor, currentPageIndex, currentPageSize} = useSelector(
  //   ({ jobState }: any) => ({
  //     isLoading: jobState.isLoading,
  //     jobs: jobState.data,
  //     refresh: jobState.refresh,
  //     prevCursor: jobState.prevCursor,
  //     nextCursor: jobState.nextCursor,
  //     total: jobState.total,
  //     currentPageIndex: jobState.currentPageIndex,
  //     currentPageSize: jobState.currentPageSize,
  //   })
  //);

  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState<null | HTMLElement>(null);


  useEffect(() => {
    const params={
      startDate: moment(currentDate).utc().startOf('month').toDate(),
      endDate: moment(currentDate).utc().endOf('month').toDate(),
      pageSize: 1000,
    }
    setRefresh(true);
    getAllJobAPI(params).then((data) => {
      const {status, jobs, total} = data;
      if (status === 1) {
        const events = data.jobs.map((job: Job) => ({
          date: job.scheduledStartTime ? new Date(job.scheduledStartTime) : new Date(job.scheduleDate),
          hasTime: !!job.scheduledStartTime,
          title: job.customer?.profile?.displayName,
          id: job._id,
          status: job.status,
        }))
        setEvents(events);
      }

      setRefresh(false);
    }).catch((e) => {
      dispatch(error(e.message));
      setRefresh(false);
    })
  }, [currentDate]);


  return (
    <DataContainer id={'0'}>
      <CalendarHeader date={currentDate}
                      onChange={(date) => setCurrentDate(date)}/>
      <BCMonth month={currentDate} isLoading={refresh} events={events}/>
    </DataContainer>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
`;

export default withStyles(styles, { withTheme: true })(JobPage);
