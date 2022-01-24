import React, {useEffect, useRef, useState} from 'react';
import { Grid, withStyles } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';

import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import SidebarTickets from '../sidebar/sidebar-tickets';
import {io} from "socket.io-client";
import Config from "../../../../../config";
import {SocketMessage} from "../../../../../helpers/contants";
import {getOpenServiceTicketsStream} from "../../../../../api/service-tickets.api";
import {parseISOMoment} from "../../../../../helpers/format";
import {
  refreshServiceTickets,
  setServiceTicket,
  streamServiceTickets
} from "../../../../../actions/service-ticket/service-ticket.action";

function MapViewTicketsScreen({ classes, filter: filterTickets, selectedDate }: any) {
  const dispatch = useDispatch();
  const { token } = useSelector(({ auth }: any) => auth);
  const { ticket2Job } = useSelector(({ serviceTicket }: any) => ({ticket2Job: serviceTicket.ticket2Job}));

  const tempTokens = useRef<any[]>([]);
  const totalTickets = useRef<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [allTickets, setAllTickets] = useState<any[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<any[]>([]);

  const filterOpenTickets = (tickets: any) => {
    return tickets.filter((ticket: any) => {
      let filter = true;

      if (filterTickets.jobId) {
        filter = filter && (ticket.ticketId.indexOf(filterTickets.jobId) >= 0);
      }

      if (filterTickets.customerNames) {
        filter = filter && (ticket.customer?._id === filterTickets.customerNames._id);
        if (filterTickets.contact) {
          filter = filter && (ticket.customerContactId?._id === filterTickets.contact._id);
        }
      }

      if(selectedDate) {
        filter = filter && parseISOMoment(ticket.dueDate).isSame(selectedDate, 'day');
      }
      return filter;
    });
  };

  useEffect(() => {
    const socket = io(`${Config.socketSever}`, {
      'extraHeaders': { 'Authorization': token }
    });

    socket.on("connect", () => {
      getOpenServiceTicketsStream();
      dispatch(streamServiceTickets(true));
    });

    socket.on(SocketMessage.SERVICE_TICKETS, data => {
      const {count, serviceTicket, total} = data;
      if (serviceTicket) {
        tempTokens.current.push(serviceTicket);
        if (count % 25 === 0 || count === total) {
          totalTickets.current = total;
          setIsLoading(false);
          setAllTickets([...tempTokens.current]);
        }
        if (count === total) {
          socket.close();
          dispatch(streamServiceTickets(false));
          dispatch(setServiceTicket(tempTokens.current));
          dispatch(refreshServiceTickets(false));
        }
      }
    });

    return () => {
      socket.close();
    };
  }, [token]);

  useEffect(() => {
    setFilteredTickets(filterOpenTickets(allTickets));
  }, [allTickets, selectedDate, filterTickets])

  useEffect(() => {
    const tempAll = allTickets.filter((ticket: any) => ticket._id !== ticket2Job);
    setAllTickets(tempAll);

  }, [ticket2Job])

  return (
    <Grid container item lg={12}>
      <Grid
        container
        item
        lg={12}
        className="ticketsMapContainer"
      >
        <MemoizedMap
          list={filteredTickets}
          isTicket={true}
        />
      </Grid>

      <SidebarTickets tickets={filteredTickets} isLoading={isLoading}/>
    </Grid>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(MapViewTicketsScreen);
