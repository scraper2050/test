import React, { useEffect, useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MemoizedMap from 'app/components/bc-map-with-routes/bc-map-with-routes';
import { useDispatch, useSelector } from 'react-redux';
import BCMapFilterModal from '../../../../modals/bc-map-filter/bc-map-filter-jobs-popup/bc-map-filter-jobs-popup';
import { DatePicker } from '@material-ui/pickers';
import {
  refreshServiceTickets,
  setOpenServiceTicket,
  setOpenServiceTicketLoading
} from 'actions/service-ticket/service-ticket.action';
import { getOpenServiceTickets } from 'api/service-tickets.api';
import { formatDateYMD } from 'helpers/format';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import Pagination from '@material-ui/lab/Pagination';
import { info, warning } from 'actions/snackbar/snackbar.action';
import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import { getAllJobsAPI, getSearchJobs } from 'api/job.api';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { getCustomerDetail } from 'api/customer.api';
import SidebarRoutes from "../sidebar/sidebar-route";
import {JobRoute} from "../../../../../actions/job-routes/job-route.types";

const PAGE_SIZE = 6;

function MapViewRoutesScreen({ classes, today }: any) {
  const [routes, setRoutes] = useState<JobRoute[]>([]);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>({});


  useEffect(() => {
  }, []);


  return (
    <Grid
      container
      item
      lg={12} >
      <Grid
        container
        item
        lg={12}
        className={'ticketsMapContainer'}
      >
        {
          <MemoizedMap
            routes={routes}
            onJob
          />
        }
      </Grid>

      <SidebarRoutes onSelectJob={setSelectedJob} dispatchRoutes={setRoutes}/>

    </Grid>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(MapViewRoutesScreen);
