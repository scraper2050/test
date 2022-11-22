import React, {useEffect, useRef, useState} from 'react';
import moment from 'moment';
import { Grid, withStyles } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';

import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import SidebarTickets from '../sidebar/sidebar-tickets';
import {io} from "socket.io-client";
import Config from "config";
import {SocketMessage} from "../../../../../helpers/contants";
import {getOpenServiceTicketsStream} from "api/service-tickets.api";
import {parseISOMoment} from "helpers/format";
import {RootState} from "reducers";
import {CompanyProfileStateType} from "actions/user/user.types";
import {
  refreshServiceTickets,
  setServiceTicket,
  streamServiceTickets,
  setTicket2JobID,
} from "actions/service-ticket/service-ticket.action";
import {setTicketSelected} from "actions/map/map.actions";
import { openModalAction, setModalDataAction } from "actions/bc-modal/bc-modal.action";
import { clearJobSiteStore, getJobSites, loadingJobSites } from "actions/job-site/job-site.action";
import { getAllJobTypesAPI } from 'api/job.api';
import {getServiceTicketDetail} from "api/service-tickets.api";
import { getJobLocation } from 'api/job-location.api';
import { getJobSite } from 'api/job-site.api';

function MapViewTicketsScreen({ classes, filter: filterTickets, selectedDate }: any) {
  const dispatch = useDispatch();
  const { token } = useSelector(({ auth }: any) => auth);
  const { ticket2Job } = useSelector(({ serviceTicket }: any) => ({ticket2Job: serviceTicket.ticket2Job}));
  const { refresh } = useSelector(({ serviceTicket }: any) => ({refresh: serviceTicket.refresh}));
  const { tickets } = useSelector(({ serviceTicket }: any) => ({tickets: serviceTicket.tickets}));
  const { streaming: streamingTickets } = useSelector(({ serviceTicket }: any) => ({
    streaming: serviceTicket.stream,
  }));
  const selected = useSelector((state: RootState) => state.map.ticketSelected);
  const {coordinates}: CompanyProfileStateType = useSelector((state: any) => state.profile);

  const tempRefTicket = useRef<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
        const offset = moment.parseZone().utcOffset();
        const parsedDate = moment(ticket.dueDate).subtract(offset, 'minutes').add(1, 'hours').hour(0).format();
        const parsedSelectedDate = moment(selectedDate).format();
        filter = filter && parseISOMoment(parsedDate).isSame(parseISOMoment(parsedSelectedDate), 'day');
      }
      return filter;
    });
  };

  useEffect(() => {
    dispatch(refreshServiceTickets(true));
    return () => {
      dispatch(refreshServiceTickets(false));
    }
  }, [])
  

  useEffect(() => {
    if(refresh){
      setIsLoading(true);
      setAllTickets([]);
      tempRefTicket.current = [];
      const socket = io(`${Config.socketServer}`, {
        'extraHeaders': { 'Authorization': token }
      });
  
      socket.on("connect", () => {
        getOpenServiceTicketsStream(socket.id);
        dispatch(streamServiceTickets(true));
      });
  
      socket.on(SocketMessage.SERVICE_TICKETS, data => {
        const {count, serviceTicket, jobRequest, total} = data;
        if (serviceTicket) {
          tempRefTicket.current.push(serviceTicket);
          if (count % 25 === 0 || count === total) {
            setIsLoading(false);
            setAllTickets([...tempRefTicket.current]);
          }
          if (count === total) {
            socket.close();
            dispatch(streamServiceTickets(false));
            dispatch(setServiceTicket(tempRefTicket.current));
            dispatch(refreshServiceTickets(false));
          }
        } else if (jobRequest) {
          const tempJobRequestObj = {
            ...jobRequest, 
            tasks: [], 
            note: jobRequest.requests?.filter((request:any)=>request.note).map((request:any)=>request.note).join('\n\n'), 
            images: jobRequest.requests?.map((request:any)=>request.images||[]).flat(1) || [],
          };
          tempRefTicket.current.push(tempJobRequestObj);
          if (count % 25 === 0 || count === total) {
            setIsLoading(false);
            setAllTickets([...tempRefTicket.current]);
          }
          if (count === total) {
            socket.close();
            dispatch(streamServiceTickets(false));
            dispatch(setServiceTicket(tempRefTicket.current));
            dispatch(refreshServiceTickets(false));
          }
        }
      });
  
      return () => {
        if(localStorage.getItem('prevPage') !== 'schedule'){
          socket.close();
          dispatch(streamServiceTickets(false));
          dispatch(refreshServiceTickets(false));
        }
        setIsLoading(false);
      };
    }
  }, [refresh]);

  useEffect(() => {
    setFilteredTickets(filterOpenTickets(allTickets));
  }, [allTickets, selectedDate, filterTickets])

  useEffect(() => {
    if(ticket2Job){
      const tempAll = allTickets.filter((ticket: any) => ticket._id !== ticket2Job);
      setAllTickets(tempAll);
      const tempTickets = tickets.filter((ticket: any) => ticket._id !== ticket2Job);
  
      dispatch(setServiceTicket(tempTickets));
      tempRefTicket.current = tempRefTicket.current?.filter((ticket: any) => ticket._id !== ticket2Job);
      dispatch(setTicket2JobID(''));
    }
  }, [ticket2Job])

  useEffect(() => {
    setAllTickets(tickets);
  }, [tickets]);

  const dispatchUnselectTicket = () => {
    dispatch(setTicketSelected({_id: ''}));
  }

  const openModalHandler = (modalDataAction: any) => {
    dispatch(setModalDataAction(modalDataAction));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  }

  const openEditTicketModalPrepDispatcher = (reqObj: any) => {
    if (reqObj.locationId !== undefined && reqObj.locationId !== null) {
      dispatch(loadingJobSites());
      dispatch(getJobSites(reqObj));
    } else {
      dispatch(clearJobSiteStore());
    }
    dispatch(getAllJobTypesAPI());
  }

  const setServiceTicketDispatcher = (updatedTickets:any) => {
    dispatch(setServiceTicket(updatedTickets));
  }

  return (
    <Grid container item lg={12}>
      <Grid
        container
        item
        lg={12}
        className="ticketsMapContainer"
      >
        <MemoizedMap
          reactAppGoogleKeyFromConfig={Config.REACT_APP_GOOGLE_KEY}
          list={filteredTickets}
          isTicket={true}
          streamingTickets={streamingTickets}
          selected={selected}
          coordinates={coordinates}
          tickets={tickets}
          dispatchUnselectTicket={dispatchUnselectTicket}
          openModalHandler={openModalHandler}
          openEditTicketModalPrepDispatcher={openEditTicketModalPrepDispatcher}
          setServiceTicketDispatcher={setServiceTicketDispatcher}
          getServiceTicketDetail={getServiceTicketDetail}
          getJobLocation={getJobLocation}
          getJobSite={getJobSite}
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
