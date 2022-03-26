import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {withStyles} from '@material-ui/core';
import {getAllJobAPI, getAllJobsAPI} from 'api/job.api';
import styles from './calendar.styles';

import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import CalendarHeader from "../../../components/bc-calendar/calendar-header";
import BCMonth from "../../../components/bc-calendar/calnedar-month";
import {error} from "../../../../actions/snackbar/snackbar.action";
import {Job} from "../../../../actions/job/job.types";
import {BCEVENT} from "./calendar-types";
import {clearSelectedEvent} from "../../../../actions/calendar/bc-calendar.action";
import {getJobType, getVendor} from "../../../../helpers/job";
import BCJobFilter from "../../../components/bc-job-filter";

function JobPage() {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentStatus, setCurrentStatus] = useState(-1);
  const [currentTitle, setCurrentTitle] = useState('Customer');
  const [events, setEvents] = useState<BCEVENT[]>([]);
  const [refresh, setRefresh] = useState(true);

  const getTitle = (job: any, type: string) => {
    switch (type) {
      case 'Customer':
        return job.customer?.profile?.displayName;
        break;
      case 'Job Type':
        return getJobType(job);
      case 'Technician':
        return getVendor(job);
      default:
        return job.jobId;
    }
  }

  const filterEvents = () => {
    return currentStatus === -1 ? events : events.filter((event) => event.status === currentStatus);
  }

  useEffect(() => {
    const params={
      startDate: moment(currentDate).utc().startOf('month').toDate(),
      endDate: moment(currentDate).utc().endOf('month').toDate(),
      pageSize: 1000,
    }
    setRefresh(true);
    setEvents([]);
    dispatch(clearSelectedEvent());
    getAllJobAPI(params).then((data) => {
      const {status, jobs, total} = data;
      if (status === 1) {
        const events = jobs.map((job: Job) => ({
          date: job.scheduledStartTime ? new Date(job.scheduledStartTime) : new Date(job.scheduleDate),
          hasTime: !!job.scheduledStartTime,
          title: getTitle(job, currentTitle),
          id: job._id,
          status: job.status,
          data: job,
          })
        );
        setEvents(events);
      }
      setRefresh(false);
    }).catch((e) => {
      dispatch(error(e.message));
      setRefresh(false);
    })
  }, [currentDate]);

  const onTitleChange = (id: number, type: string) => {
    const eventsTemp = events.map((event) => ({...event, title: getTitle(event.data, type)}));
    setCurrentTitle(type);
    setEvents(eventsTemp);
  }

  return (
    <DataContainer id={'0'}>
      <CalendarHeader
        date={currentDate}
        titleItems={[{title: 'Customer'}, {title: 'Job Type'}, {title: 'Technician'}, {title: 'Job ID'},]}
        onDateChange={(date) => setCurrentDate(date)}
        onCalendarChange={(id, type) => console.log(type)}
        onTitleChange={onTitleChange}
      >
        <BCJobFilter onStatusChange={setCurrentStatus} />
      </CalendarHeader>
      <BCMonth month={currentDate} isLoading={refresh} events={filterEvents()}/>
    </DataContainer>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
`;

export default withStyles(styles, { withTheme: true })(JobPage);
