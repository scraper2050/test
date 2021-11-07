import React, { useEffect, useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';

import {
  closeModalAction,
  setModalDataAction,
} from 'actions/bc-modal/bc-modal.action';
import {
  refreshServiceTickets,
  setOpenServiceTicket,
  setOpenServiceTicketLoading,
} from 'actions/service-ticket/service-ticket.action';
import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import SidebarTickets from '../sidebar/sidebar-tickets';
import { getCustomers } from 'actions/customer/customer.action';
import { getOpenServiceTickets } from 'api/service-tickets.api';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';

const PAGE_SIZE = 6;

function MapViewTicketsScreen({ classes }: any) {
  const dispatch = useDispatch();
  const openTickets = useSelector(
    (state: any) => state.serviceTicket.openTickets
  );
  const status = useSelector((state: any) => state.serviceTicket.status);
  const isLoadingTmp = useSelector((state: any) => state.serviceTicket.isLoading);
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [hasPhoto, setHasPhoto] = useState(false);
  const snackMessage = useSelector(({ snackbar }: any) => snackbar.message);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let rawData = {
      jobTypeTitle: "",
      dueDate: "",
      customerNames: "",
      ticketId: "",
      contactName: "",
    };
    const requestObj = { ...rawData, pageNo: 1, pageSize: PAGE_SIZE }; // TODO: page_size = 0
    setIsLoading(true);
    dispatch(getCustomers());
    getOpenTickets(requestObj);
    //setSelectedTicket({});
  }, []);

  useEffect(() => {
    let prevItemKey = localStorage.getItem("prevItemKey");
    if (prevItemKey) {
      let prevItem = document.getElementById(prevItemKey);
      if (prevItem) prevItem.style.border = "none";
    }
    localStorage.setItem("prevItemKey", "");
  }, []);

  useEffect(() => {
    if(snackMessage === 'Job created successfully.') {
      setPage(1);
    }
  }, [snackMessage])

  useEffect(() => {
    if (!isLoadingTmp) {
      setIsLoading(false);
    }
  }, [isLoadingTmp, status])

  useEffect(() => {
    if (openTickets.length) {
      setTickets(openTickets);
    }
  }, [openTickets]);

  const getOpenTickets = (requestObj: {
    pageNo?: number;
    pageSize?: number;
    jobTypeTitle?: string;
    dueDate?: string;
    customerNames?: any;
    ticketId?: string;
    companyId?: string;
  }) => {
    dispatch(setOpenServiceTicketLoading(true));
    getOpenServiceTickets(requestObj)
      .then((response: any) => {
        dispatch(setOpenServiceTicketLoading(false));
        dispatch(setOpenServiceTicket(response));
        dispatch(refreshServiceTickets(true));
        dispatch(closeModalAction());
        setTimeout(() => {
          dispatch(
            setModalDataAction({
              data: {},
              type: "",
            })
          );
        }, 200);
      })
      .catch((err: any) => {
        throw err;
      });
  };

  if (isLoading) {
    return <BCCircularLoader heightValue={"200px"} />;
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
          list={tickets}
          isTicket={true}
        />
      </Grid>

      <SidebarTickets/>
    </Grid>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(MapViewTicketsScreen);
