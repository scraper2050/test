import React, { useEffect, useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';

import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import SidebarTickets from '../sidebar/sidebar-tickets';

function MapViewTicketsScreen({ classes }: any) {
  const openTickets = useSelector(
    (state: any) => state.serviceTicket.openTickets
  );

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setTickets(openTickets);
  }, [openTickets]);


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
