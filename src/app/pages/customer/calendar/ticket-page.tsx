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
import {getAllServiceTicketAPI} from "../../../../api/service-tickets.api";

function TicketPage() {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<BCEVENT[]>([]);

  const { isLoading = true, tickets, refresh = true } = useSelector(({ serviceTicket }: any) => ({
    'isLoading': serviceTicket.isLoading,
    'refresh': serviceTicket.refresh,
    'tickets': serviceTicket.tickets
  }));

  useEffect(() => {
    const startDate = moment(currentDate).utc().startOf('month');
    const endDate = moment(currentDate).utc().endOf('month');

    const filtered = tickets.reduce((acc: any[], ticket: any) => {
      if (moment(ticket.dueDate).isBetween(startDate, endDate, 'day', '[]')) {
        acc.push({
          date: ticket.dueDate,
          hasTime: false,
          title: ticket.customer?.profile?.displayName,
          id: ticket._id,
          status: -1,
          data: ticket,
        })
      }
      return acc;
    }, []);
    setEvents(filtered);
  }, [tickets, currentDate]);

  useEffect(() => {
    if (refresh) {
      dispatch(getAllServiceTicketAPI());
    }
  }, [refresh]);

  // useEffect(() => {
  //   const params={
  //     startDate: moment(currentDate).utc().startOf('month').toDate(),
  //     endDate: moment(currentDate).utc().endOf('month').toDate(),
  //     pageSize: 1000,
  //   }
  //   setRefresh(true);
  //   setEvents([]);
  //   dispatch(clearSelectedEvent());
  //   getAllJobAPI(params).then((data) => {
  //     const {status, jobs, total} = data;
  //     if (status === 1) {
  //       const events = data.jobs.map((job: Job) => ({
  //         date: job.scheduledStartTime ? new Date(job.scheduledStartTime) : new Date(job.scheduleDate),
  //         hasTime: !!job.scheduledStartTime,
  //         title: job.customer?.profile?.displayName,
  //         id: job._id,
  //         status: job.status,
  //         data: job,
  //       }))
  //       setEvents(events);
  //     }
  //     setRefresh(false);
  //   }).catch((e) => {
  //     dispatch(error(e.message));
  //     setRefresh(false);
  //   })
  // }, [currentDate]);


  return (
    <DataContainer id={'0'}>
      <CalendarHeader
        date={currentDate}
        onChange={(date) => setCurrentDate(date)}
      />
      <BCMonth month={currentDate} isLoading={refresh} events={events}/>
    </DataContainer>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
`;

export default withStyles(styles, { withTheme: true })(TicketPage);
