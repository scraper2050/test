import React, {useEffect, useState} from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';
import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import SidebarJobs from "../sidebar/sidebar-jobs";
import {getSearchJobs} from "../../../../../api/job.api";
import moment from "moment";
import {FilterJobs} from "../tickets-map-view";
import {useDispatch, useSelector} from "react-redux";
import {refreshJobs} from "../../../../../actions/job/job.action";

interface Props {
  classes: any;
  selectedDate: Date | null;
  filter: FilterJobs;
}

function MapViewJobsScreen({ classes, selectedDate, filter: filterJobs }: Props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [allJobs, setAllJobs] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const { refresh = false } = useSelector(
    ({ jobState }: any) => ({
      refresh: jobState.refresh,
    }));

  const filterScheduledJobs = (jobs: any) => {
    return jobs.filter((job: any) => {
      let filter = true;
      if (filterJobs.jobStatus.indexOf(-1) === -1) {
        filter = filterJobs.jobStatus.indexOf(job.status) >= 0;
      }

      if (filterJobs.customerNames && filterJobs.contact) {
        filter = filter && (job.customerContactId === filterJobs.contact._id);
      }

      if(selectedDate) {
        filter = filter && moment(job.scheduleDate).isSame(selectedDate, 'day');
      }
      return filter;
    });
  };

  const getScheduledJobs = async (
    requestObj: {
      page?: number,
      pageSize?: number,
      customerNames?: any,
      jobId?: string,
    }, saveAll = false
  ) => {
    setIsLoading(true);
    const response: any = await getSearchJobs(requestObj);

    const { data } = response;

    if (data.status) {
      if (saveAll) setAllJobs(data.jobs);
      setJobs(filterScheduledJobs(data.jobs));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setJobs(filterScheduledJobs(allJobs));
  }, [selectedDate])

  useEffect(() => {
    const rawData = {
      customerNames: filterJobs.customerNames?.profile?.displayName || '',
      jobId:  filterJobs.jobId || '',
      contactName: filterJobs.contact?.name || '',
    }

    const requestObj = {
      ...rawData,
      page: 1,
      pageSize: 0,
    };
    getScheduledJobs(requestObj, true);
  }, [filterJobs]);

  useEffect(() => {
    const rawData = {
      customerNames: filterJobs.customerNames?.profile?.displayName || '',
      jobId:  filterJobs.jobId || '',
      contactName: filterJobs.contact?.name || '',
    }

    const requestObj = {
      ...rawData,
      page: 1,
      pageSize: 0,
    };
    if (refresh) {
      getScheduledJobs(requestObj, false);
      dispatch(refreshJobs(false));
    }
  }, [refresh]);


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
            list={jobs}
          />
        }
      </Grid>

      <SidebarJobs jobs={jobs} isLoading={isLoading}/>
    </Grid>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(MapViewJobsScreen);
