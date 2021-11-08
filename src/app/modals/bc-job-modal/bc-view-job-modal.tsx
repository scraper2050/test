import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import emptyImage from 'assets/img/dummy-big.jpg';
import styles from './bc-view-job-modal.styles';
import {
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  formatDate,
  formatTime,
} from 'helpers/format';
import styled from 'styled-components';
import { getEmployeesForJobAction } from 'actions/employees-for-job/employees-for-job.action';
import '../../../scss/job-poup.scss';
import './bc-job-modal.scss';
import moment from 'moment';
import classNames from "classnames";

const initialJobState = {
  customer: {
    _id: '',
  },
  description: '',
  employeeType: false,
  equipment: {
    _id: '',
  },
  dueDate: '',
  scheduleDate: null,
  scheduledEndTime: null,
  scheduledStartTime: null,
  technician: {
    _id: '',
  },
  contractor: {
    _id: '',
  },
  ticket: {
    _id: '',
  },
  type: {
    _id: '',
  },
  jobLocation: {
    _id: '',
  },
  jobSite: {
    _id: '',
  },
  jobRescheduled: false,
};

function BCViewJobModal({
  classes,
  job = initialJobState,
}: any): JSX.Element {
  const dispatch = useDispatch();
  console.log(job);
  const calculateJobType = () => {
    let title = [];
    if (job.tasks) {
      job.tasks.forEach((task: any) => title.push(task.jobType?.title))
    } else if (job.jobType) {
      title.push(job.jobType.title || 'N/A');
    }
    return title;
  }

  // Selected variable with useSelector from the store
  const equipments = useSelector(({ inventory }: any) => inventory.data);
  const { loading, data } = useSelector(
    ({ employeesForJob }: any) => employeesForJob
  );
  const employeesForJob = useMemo(() => [...data], [data]);

  useEffect(() => {
    dispatch(getEmployeesForJobAction());
  }, []);

  const columns: any = [
    {
      Header: 'User',
      id: 'user',
      sortable: true,
      Cell({ row }: any) {
        const user = employeesForJob.filter(
          (employee: any) => employee._id === row.original.user
        )[0];
        const { displayName } = user?.profile || '';
        return <div>{displayName}</div>;
      },
    },
    {
      Header: 'Date',
      id: 'date',
      sortable: true,
      Cell({ row }: any) {
        const dataTime = moment(new Date(row.original.date)).format(
          'MM/DD/YYYY h:mm A'
        );
        return (
          <div style={{ color: 'gray', fontStyle: 'italic' }}>
            {`${dataTime}`}
          </div>
        );
      },
    },
    {
      Header: 'Actions',
      id: 'action',
      sortable: true,
      Cell({ row }: any) {
        const splittedActions = row.original.action.split('|');
        const actions = splittedActions.filter((action: any) => action !== '');
        return (
          <>
            {actions.length === 0 ? (
              <div />
            ) : (
              <ul className={classes.actionsList}>
                {actions.map((action: any) => (
                  <li>{action}</li>
                ))}
              </ul>
            )}
          </>
        );
      },
    },
  ];

  const startTime = job.startTime ? formatTime(job.startTime) : 'N/A';
  const endTime = job.endTime ? formatTime(job.endTime) : 'N/A';

  return (
    <DataContainer >
      <Grid container className={classes.modalPreview} justify={'space-around'}>
        <Grid item style={{width: '40%'}}>
          <Typography variant={'caption'} className={classes.previewCaption}>CUSTOMER</Typography>
          <Typography variant={'h6'} className={classes.bigText}>{job.customer?.profile?.displayName || 'N/A'}</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant={'caption'} className={classes.previewCaption}>SCHEDULE DATE</Typography>
          <Typography variant={'h6'} className={classes.previewText}>{formatDate(job.scheduleDate)}</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant={'caption'} className={classes.previewCaption}>START TIME</Typography>
          <Typography variant={'h6'} className={classes.previewText}>{startTime}</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant={'caption'} className={classes.previewCaption}>END TIME</Typography>
          <Typography variant={'h6'} className={classes.previewText}>{endTime}</Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.modalContent} justify={'space-around'}>
        <Grid item xs>
          <Typography variant={'caption'} className={classes.previewCaption}>technician type</Typography>
          <Typography variant={'h6'} className={classes.previewText}>{job.employeeType ? 'Employee' : 'Contractor'}</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant={'caption'} className={classes.previewCaption}>technician name</Typography>
          <Typography variant={'h6'} className={classes.previewText}>{job.technician?.profile.displayName || 'N/A'}</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant={'caption'} className={classes.previewCaption}>job type</Typography>
          <Typography variant={'h6'} className={classes.previewText}>
            {calculateJobType().map((type:string) => <span className={classes.jobTypeText}>{type}</span>)}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant={'caption'} className={classes.previewCaption}>job location</Typography>
          <Typography variant={'h6'} className={classes.previewText}>{job.jobLocation?.name || 'N/A'}</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant={'caption'} className={classes.previewCaption}>job site</Typography>
          <Typography variant={'h6'} className={classes.previewText}>{job.jobSite?.name || 'N/A'}</Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.modalContent} justify={'space-around'}>
        <Grid item xs>
          <Typography variant={'caption'} className={classes.previewCaption}>contact associated</Typography>
          <Typography variant={'h6'} className={classes.previewText}>{job.customer?.contactName || 'N/A'}</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant={'caption'} className={classes.previewCaption}>Customer PO</Typography>
          <Typography variant={'h6'} className={classes.previewText}>{job.customerPO || 'N/A'}</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant={'caption'} className={classes.previewCaption}>equipment</Typography>
          <Typography variant={'h6'} className={classes.previewText}>N/A</Typography>
        </Grid>
        <Grid item style={{width: '40%'}}>
          <Typography variant={'caption'} className={classes.previewCaption}>description</Typography>
          <Typography variant={'h6'} className={classNames(classes.previewText, classes.description)}>{job.description || 'N/A'}</Typography>
        </Grid>
      </Grid>
      <Grid container className={classNames(classes.modalContent, classes.lastContent)} justify={'space-around'}>
        <Grid item style={{width: '40%'}}>
          <img className={classes.jobImage}
               src={job.images.length > 0 ? job.images[0].imageUrl : emptyImage}/>
        </Grid>
        <Grid item style={{width: '60%'}}>
          <Typography variant={'caption'} className={classes.previewCaption}>Job History</Typography>
          <div style={{height: 180, overflowY: 'auto'}}>
            <BCTableContainer
              className={classes.tableContainer}
              columns={columns}
              initialMsg={'No history yet'}
              isDefault
              isLoading={loading}
              onRowClick={() => {}}
              pageSize={5}
              pagination={true}
              stickyHeader
              tableData={job.track}
            />
          </div>
        </Grid>
      </Grid>
    </DataContainer>
  );
}

const Label = styled.div`
  color: red;
  font-size: 15px;
`;

const DataContainer = styled.div`
  margin: auto 0;

  ::-webkit-scrollbar {
    width: 12px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      -webkit-border-radius: 10px;
      border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px;
      border-radius: 10px;
      background: rgba(255,0,0,0.8);
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
  }
  .MuiTableCell-root {
    line-height: normal;
  }

  .MuiTableCell-sizeSmall {
    padding: 0px 16px;
  }

`;

export default withStyles(styles, { withTheme: true })(BCViewJobModal);
