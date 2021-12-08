import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import styles from './bc-job-modal.styles';
import {
  Button,
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
import moment from 'moment';
import classNames from "classnames";
import {getVendors} from "../../../actions/vendor/vendor.action";
import BCDragAndDrop from "../../components/bc-drag-drop/bc-drag-drop";
import EditIcon from '@material-ui/icons/Edit';

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
  const calculateJobType = (task: any) => {
    let title: string[] = [];
    task.jobTypes.forEach((type: any) => title.push(type.jobType?.title))
    return title;
  }

  const equipments = useSelector(({ inventory }: any) => inventory.data);
  const { loading, data } = useSelector(
    ({ employeesForJob }: any) => employeesForJob
  );
  const vendorsList = useSelector(({ vendors }: any) =>
    vendors.data.filter((vendor: any) => vendor.status <= 1)
  );
  const employeesForJob = useMemo(() => [...data], [data]);

  useEffect(() => {
    dispatch(getEmployeesForJobAction());
    dispatch(getVendors());
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
        const vendor = vendorsList.find((v: any) => v.contractor.admin?._id === row.original.user);
        const { displayName } = user?.profile || vendor?.contractor.admin.profile || '';
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

  const scheduleDate = job.scheduleDate;
  const startTime = job.startTime ? formatTime(job.startTime) : 'N/A';
  const endTime = job.endTime ? formatTime(job.endTime) : 'N/A';
  const canEdit = job.status === 0 || job.status === 4;

  return (
    <DataContainer className={'new-modal-design'}>
      <Grid container className={'modalPreview'} justify={'space-around'}>
        <Grid item style={{width: '40%'}}>
          {canEdit &&
            <>
            <Button size='small'
              classes={{root: classes.editButton, label: classes.editButtonText}}
              startIcon={<EditIcon />}
            >Edit Job</Button><br/></>
          }
          <Typography variant={'caption'} className={'previewCaption'}>customer</Typography>
          <Typography variant={'h6'} className={'bigText'}>{job.customer?.profile?.displayName || 'N/A'}</Typography>
        </Grid>
        <Grid item xs className={classNames({[classes.editButtonPadding]: canEdit})}>
          <Typography variant={'caption'} className={'previewCaption'}>schedule date</Typography>
          <Typography variant={'h6'} className={'previewTextTitle'}>{scheduleDate ? formatDate(scheduleDate) : 'N/A'}</Typography>
        </Grid>
        <Grid item xs className={classNames({[classes.editButtonPadding]: canEdit})}>
          <Typography variant={'caption'} className={'previewCaption'}>start time</Typography>
          <Typography variant={'h6'} className={'previewTextTitle'}>{startTime}</Typography>
        </Grid>
        <Grid item xs className={classNames({[classes.editButtonPadding]: canEdit})}>
          <Typography variant={'caption'} className={'previewCaption'}>end time</Typography>
          <Typography variant={'h6'} className={'previewTextTitle'}>{endTime}</Typography>
        </Grid>
      </Grid>
      <div className={'modalDataContainer'}>
        <Grid container className={'modalContent'} justify={'space-around'}>
          <Grid item xs>
            <Typography variant={'caption'} className={'previewCaption'}>technician type</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant={'caption'} className={'previewCaption'}>technician name</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant={'caption'} className={'previewCaption'}>job type</Typography>
          </Grid>
        </Grid>
        {job.tasks.map((task: any) =>
          <Grid container className={classNames(classes.taskList)} justify={'space-around'}>
            <Grid container className={classNames(classes.task)}>
            <Grid item xs>
              <Typography variant={'h6'} className={'previewText'} style={{borderTop: 1, borderColor: 'black'}}>{task.employeeType ? 'Employee' : 'Contractor'}</Typography>
            </Grid>
            <Grid item xs>
              <Typography variant={'h6'} className={'previewText'} style={{borderTop: 1}}>{task.technician?.profile?.displayName || 'N/A'}</Typography>
            </Grid>
            <Grid item xs>
              <Typography variant={'h6'} className={'previewText'} style={{borderTop: 1}}>{calculateJobType(task).map((type:string) => <span className={'jobTypeText'}>{type}</span>)}</Typography>
            </Grid>
            </Grid>
          </Grid>
        )}
        <Grid container className={'modalContent'} justify={'space-around'}>
          <Grid item xs>
            <Typography variant={'caption'} className={'previewCaption'}>job location</Typography>
            <Typography variant={'h6'} className={'previewText'}>{job.jobLocation?.name || 'N/A'}</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant={'caption'} className={'previewCaption'}>job site</Typography>
            <Typography variant={'h6'} className={'previewText'}>{job.jobSite?.name || 'N/A'}</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant={'caption'} className={'previewCaption'}>equipment</Typography>
            <Typography variant={'h6'} className={'previewText'}>N/A</Typography>
          </Grid>
        </Grid>
        <Grid container className={'modalContent'} justify={'space-around'}>
          <Grid container xs={8}>
            <Grid container xs={12}>
              <Grid item xs>
                <Typography variant={'caption'} className={'previewCaption'}>contact associated</Typography>
                <Typography variant={'h6'} className={'previewText'}>{job.customer?.contactName || 'N/A'}</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant={'caption'} className={'previewCaption'}>Customer PO</Typography>
                <Typography variant={'h6'} className={'previewText'}>{job.customerPO || 'N/A'}</Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.innerRow} xs={12}>
              <Grid item xs>
                <Typography variant={'caption'} className={'previewCaption'}>description</Typography>
                <Typography variant={'h6'} className={classNames('previewText', 'description')}>{job.description || 'N/A'}</Typography>
              </Grid>
        </Grid>
          </Grid>
          <Grid item container xs={4}>
            <Grid item xs>
              <Typography variant={'caption'} className={'previewCaption'}>photo(s);</Typography>
              <BCDragAndDrop images={job.images.map((image: any) => image.imageUrl)} readonly={true}  />
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classNames('modalContent', classes.lastRow)}  justify={'space-between'}>
          <Grid item xs>
            <Typography variant={'caption'} className={'previewCaption'}>&nbsp;&nbsp;job history</Typography>
            <div >
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
      </div>
    </DataContainer>
  );
}

const Label = styled.div`
  color: red;
  font-size: 15px;
`;

const DataContainer = styled.div`
  margin: auto 0;

  .modalContent {
    padding-top: 15px !important;
  }

  .MuiTableCell-root {
    line-height: normal;
  }

  .MuiTableCell-sizeSmall {
    padding: 0px 16px;
  }

`;

const DialogContainer = styled.div`
   overflow-y: auto;
   max-height: 75vh;

   ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;

  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #BDBDBD;
    border-radius: 4px;
    border: solid 3px transparent;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default withStyles(styles, { withTheme: true })(BCViewJobModal);
