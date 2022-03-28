import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {withStyles} from '@material-ui/core';
import styles from './calendar.styles';

import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import CalendarHeader from "../../../components/bc-calendar/calendar-header";
import BCMonth from "../../../components/bc-calendar/calnedar-month";
import {BCEVENT} from "./calendar-types";
import {getAllServiceTicketAPI} from "../../../../api/service-tickets.api";

function TicketPage() {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTitle, setCurrentTitle] = useState('Customer');
  const [searchText, setSearchText] = useState('');
  const [events, setEvents] = useState<BCEVENT[]>([]);

  const { isLoading = true, tickets, refresh = true } = useSelector(({ serviceTicket }: any) => ({
    'isLoading': serviceTicket.isLoading,
    'refresh': serviceTicket.refresh,
    'tickets': serviceTicket.tickets
  }));

  const getTitle = (ticket: any, type: string) => {
    switch (type) {
      case 'Customer':
        return ticket.customer?.profile?.displayName;
      default:
        return ticket.ticketId;
    }
  }

  useEffect(() => {
    const startDate = moment(currentDate).utc().startOf('month');
    const endDate = moment(currentDate).utc().endOf('month');

    const filtered = tickets.reduce((acc: any[], ticket: any) => {
      if (moment(ticket.dueDate).isBetween(startDate, endDate, 'day', '[]')) {
        acc.push({
          date: ticket.dueDate,
          hasTime: false,
          title: getTitle(ticket, currentTitle),
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

  const onTitleChange = (id: number, type: string) => {
    const eventsTemp = events.map((event) => ({...event, title: getTitle(event.data, type)}));
    setCurrentTitle(type);
    setEvents(eventsTemp);
  };

  const filterEvents = () => {
    return searchText.trim() ? events.filter((event) =>
        event.title.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
    : events;
  }

  return (
    <DataContainer id={'0'}>
      <CalendarHeader
        date={currentDate}
        titleItems={[{title: 'Customer'}, {title: 'Ticket ID'},]}
        onDateChange={(date) => setCurrentDate(date)}
        onCalendarChange={(id, type) => console.log(type)}
        onTitleChange={onTitleChange}
        searchLabel={'Search Tickets...'}
        onSearchChange={setSearchText}
      />
      <BCMonth month={currentDate} isLoading={isLoading} events={filterEvents()}/>
    </DataContainer>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
`;

export default withStyles(styles, { withTheme: true })(TicketPage);
