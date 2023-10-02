import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import styles from './bc-job-modal.styles';
import {
  Button, Checkbox,
  DialogActions,
  FormControlLabel,
  Grid,
  Typography,
  withStyles,
  Dialog,
  DialogTitle,
  IconButton,
  Tooltip,
  CircularProgress
} from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  formatDate,
  formatTime
} from 'helpers/format';
import styled from 'styled-components';
import { getEmployeesForJobAction } from 'actions/employees-for-job/employees-for-job.action';
import '../../../scss/job-poup.scss';
import moment from 'moment';
import classNames from 'classnames';
import { getVendors } from '../../../actions/vendor/vendor.action';
import BCDragAndDrop from '../../components/bc-drag-drop/bc-drag-drop';
import EditIcon from '@material-ui/icons/Edit';
import {
  closeModalAction,
  openModalAction,
  setModalDataAction
} from '../../../actions/bc-modal/bc-modal.action';
import {modalTypes} from '../../../constants';
import {getContacts} from '../../../api/contacts.api';
import {callUpdateJobAPI, getAllJobTypesAPI, updatePartialJob} from '../../../api/job.api';
import {refreshJobs} from '../../../actions/job/job.action';
import {error, success} from '../../../actions/snackbar/snackbar.action';
import BCJobStatus from '../../components/bc-job-status';
import { Job } from 'actions/job/job.types';
import CloseIcon from '@material-ui/icons/Close';
import bcModalTransition from '../bc-modal-transition';
import BCMenuButton from 'app/components/bc-menu-more';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { clearJobSiteStore, getJobSites, loadingJobSites } from 'actions/job-site/job-site.action';

const initialJobState = {
  'customer': {
    '_id': ''
  },
  'description': '',
  'employeeType': false,
  'equipment': {
    '_id': ''
  },
  'dueDate': '',
  'scheduleDate': null,
  'scheduledEndTime': null,
  'scheduledStartTime': null,
  'technician': {
    '_id': ''
  },
  'contractor': {
    '_id': ''
  },
  'ticket': {
    '_id': ''
  },
  'type': {
    '_id': ''
  },
  'jobLocation': {
    '_id': ''
  },
  'jobSite': {
    '_id': ''
  },
  'jobRescheduled': false
};
function BCViewJobModal({
  classes,
  job = initialJobState
}: any): JSX.Element {
  const dispatch = useDispatch();
  const [customerPORequired, setCustomerPORequired] = useState(false);
  const [actionsLoading, setActionsLoading] = useState(false);
  const customers = useSelector(({ customers }: any) => customers.data);
  const items = useSelector((state: any) => state.invoiceItems.items);
  const [jobHistoryModal, setOpenJobHistoryModal] = useState(false);
  
  const calculateJobType = (task: any) => {
    const title: any[] = [];
    if (task.jobTypes) {
      task.jobTypes.forEach((type: any) => {
        const jobType = {
          title: type.jobType?.title,
          quantity: type.quantity || 1,
          price: type.price || 0,
          status: type.status,
          completedComment: type.completedComment,
          completedCount: type.completedCount
        };

        if (!('price' in type)) {
          const item = items.find((res: any) => res.jobType == type.jobType?._id);
          const customer = customers.find((res: any) => res._id == job?.customer?._id);

          if (item) {
            let price = item?.tiers?.find((res: any) => res.tier?._id == customer?.itemTier);
            if (customer && price) {
              jobType.price = price?.charge * jobType.quantity;
            } else {
              price = item?.tiers?.find((res: any) => res.tier?.isActive == true);
              jobType.price = price?.charge * jobType.quantity;
            }
          }
        }
        title.push(jobType);
      });
    }
    return title;
  };
  // Const equipments = useSelector(({ inventory }: any) => inventory.data);
  const { contacts } = useSelector((state: any) => state.contacts);
  const { loading, data } = useSelector(({ employeesForJob }: any) => employeesForJob);
  const vendorsList = useSelector(({ vendors }: any) =>
    vendors.data.filter((vendor: any) => vendor.status <= 1));

  const employeesForJob = useMemo(() => [...data], [data]);
  const [isSubmitting, SetIsSubmitting] = useState(false);

  const customerContact = job.customerContactId?.name ||
    contacts.find((contact :any) => contact._id === job.customerContactId)?.name;
  const vendorWithCommisionTier = job.tasks.filter((res: any) => res.contractorCommissionTier);

  useEffect(() => {
    const data: any = {
      'type': 'Customer',
      'referenceNumber': job.customer?._id
    };
    dispatch(getContacts(data));
    dispatch(getEmployeesForJobAction());
    dispatch(getVendors());
  }, []);

  const columns: any = [
    {
      'Header': 'User',
      'id': 'user',
      'sortable': true,
      Cell({ row }: any) {
        if (row.original.user === 'tech') {
          return <div>{'Technician\'s comment'}</div>;
        }
        const user = employeesForJob.filter((employee: any) => employee._id === row.original.user)[0];
        const vendor = vendorsList.find((v: any) => v.contractor.admin?._id === row.original.user);
        const { displayName } = user?.profile || vendor?.contractor.admin.profile || '';
        return <div>{displayName}</div>;
      }
    },
    {
      'Header': 'Date',
      'id': 'date',
      'sortable': true,
      Cell({ row }: any) {
        const dataTime = row.original.date ? moment(new Date(row.original.date)).format('MM/DD/YYYY h:mm A') : '-';
        return (
          <div style={{ 'color': 'gray',
            'fontStyle': 'italic' }}>
            {`${dataTime}`}
          </div>
        );
      }
    },
    {
      'Header': 'Actions',
      'id': 'action',
      'sortable': true,
      Cell({ row }: any) {
        const splittedActions = row.original.action.split('|');
        const actions = splittedActions.filter((action: any) => action !== '');
        if (row.original.note) {
          actions.push(`Note: ${row.original.note}`);
        }
        return (
          <>
            {actions.length === 0
              ? <div />
              : <ul className={classes.actionsList}>
                {actions.map((action: any) =>
                  <li>{action}</li>)}
              </ul>
            }
          </>
        );
      }
    }
  ];

  const { scheduleDate } = job;
  // Format time
  const startTime = job.scheduledStartTime ? formatTime(job.scheduledStartTime) : 'N/A';
  const endTime = job.scheduledEndTime ? formatTime(job.scheduledEndTime) : 'N/A';
  const scheduleTimeAMPM = job.scheduleTimeAMPM
    ? job.scheduleTimeAMPM === 1 ? 'AM'
      : job.scheduleTimeAMPM === 2 ? 'PM'
        : job.scheduleTimeAMPM === 3 ? 'All day' : 'N/A'
    : 'N/A';
  const canEdit = [0, 4, 6].indexOf(job.status) >= 0;
  const jobImages = job?.images?.length ? [...job.images] : [];
  const technicianImages = job?.technicianImages?.length ? job.technicianImages : [];
  let technicianNotes = job?.tasks?.length ? job.tasks.filter((task: any) => task.comment).map((task: any) => {
    return {
      user: 'tech',
      action: task.comment,
      date: '',
      userName: task.technician?.profile?.displayName || ""
    }
  }) : [];

  let rescheduleTrack = job.track.filter((res: { user: string, action: string, date: string, userName: string }) => res.action?.toLowerCase()?.includes("rescheduling"));
  rescheduleTrack = rescheduleTrack.filter((item: { user: any; }, index: any, arr: any[]) => {
    const currentIndex = arr.findIndex((obj) => obj.user === item.user);
    return currentIndex === index;
  });
  
  const rescheduleJob = () => {
    dispatch(setModalDataAction({
      'data': {
        job,
        'modalTitle': `Reschedule Job`,
        'removeFooter': false
      },
      'type': modalTypes.RESCEDULE_JOB_MODAL
    }));
  };

  const openEditJobModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'job': job,
        'modalTitle': 'Edit Job',
        'removeFooter': false
      },
      'type': modalTypes.EDIT_JOB_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const openCancelJobModal = async (jobOnly?: boolean) => {
    dispatch(setModalDataAction({
      'data': {
        job,
        jobOnly,
        'modalTitle': `Cancel Job`,
        'removeFooter': false
      },
      'type': modalTypes.CANCEL_JOB_MODAL
    }));
  };

  const openMarkCompleteJobModal = async (job: Job) => {
    dispatch(setModalDataAction({
      'data': {
        'job': job,
        'modalTitle': `Mark Job as Complete`,
        'removeFooter': false
      },
      'type': modalTypes.MARK_COMPLETE_JOB_MODAL
    }));
  };

  const completeJob = () => {
    SetIsSubmitting(true);
    const data = { 'jobId': job._id,
      'status': 2 };
    callUpdateJobAPI(data).then((response: any) => {
      if (response.status !== 0) {
        dispatch(refreshJobs(true));
        dispatch(success(`Job completed successfully!`));
        dispatch(closeModalAction());
        setTimeout(() => {
          dispatch(setModalDataAction({
            'data': {},
            'type': ''
          }));
        }, 200);
      } else {
        dispatch(error(response.message));
        SetIsSubmitting(false);
      }
    })
      .catch(e => {
        dispatch(error(e.message));
        SetIsSubmitting(false);
      });
  };

  const openEditJobCostingModal = () => {
    dispatch(setModalDataAction({
      'data': {
        job,
        'removeFooter': false,
        'maxHeight': '100%',
        'modalTitle': 'Job Costing'
      },
      'type': modalTypes.EDIT_JOB_COSTING_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };
  
  let ACTIONS_ITEM: any = [];

  useEffect(() => {
    const customer = customers.find((res: any) => res._id == job?.customer?._id);
    setCustomerPORequired(customer.isPORequired);
  }, [customers]);

  if (job.status == 2){
    ACTIONS_ITEM = [
      { id: "create-new-ticket", title: 'Reopen Job-Create New Ticket' },
      { id: "reschedule", title: 'Reopen Job-Reschedule' }
    ];

    if (customerPORequired) {
      ACTIONS_ITEM.unshift({ id: "create-new-po-request", title: 'Reopen Job-Create New P0 Request' });
    }
  } else if(job.status == 7){
    ACTIONS_ITEM = [
      { id: "close-job", title: 'Close Job-No Further Action' },
      { id: "create-new-ticket", title: 'Close Job-Create New Ticket' },
      { id: "reschedule", title: 'Reschedule Job' }
    ];

    if (customerPORequired) {
      ACTIONS_ITEM.splice(1,0,{ id: "create-new-po-request", title: 'Close Job-Create New PO Request' });
    }
  }

  const handleMenuButtonClick = (event: any, id: string) => {
    if (job.status == 2) {
      dispatch(setModalDataAction({
        'data': {
          'job': job,
          'action': id,
          'modalTitle': `Edit Completed Job`,
          'removeFooter': false,
        },
        'type': modalTypes.EDIT_COMPLETED_JOB
      }));
      setTimeout(() => {
        dispatch(openModalAction());
      }, 200);
    } else {
      executeJobActions(id);
    }
  }

  const executeJobActions = async (idAction:string) => {
    let payload;
    
    setActionsLoading(true);
    switch (idAction) {
      case "close-job":
        payload = {
          jobId: job._id,
          action: idAction
        }
        await updatePartialJob(payload);
        dispatch(refreshJobs(true));
        dispatch(closeModalAction());
        setTimeout(() => {
          dispatch(
            setModalDataAction({
              data: {},
              type: '',
            })
          );
        }, 200);
        dispatch(success("Closed Job-No Further Action successfully"));
        break;
      case "create-new-ticket":
      case "create-new-po-request":
        const newTicketTasks: any = [];
        job.tasks.forEach((task: any) => {
          task.jobTypes.forEach((jobType: any) => {
            if ((jobType.completedCount || 0) < jobType.quantity && jobType.status != 2) {
              //Split Quantity
              newTicketTasks.push({
                quantity: jobType.quantity - (jobType.completedCount || 0),
                jobType: jobType.jobType?._id,
                price: jobType.price,
                completedCount: (jobType.completedCount || 0),
                allQuantitiy: jobType.quantity,
                status: 7
              });
            }
          });
        });

        const ticket = { 
          ...job.ticketObj[0], 
          tasks: newTicketTasks, 
          _id: null, 
          jobCreated: false,
          customer: job.customerObj[0], 
          source: `${job.jobId} partially completed`, 
          customerPO: idAction == "create-new-po-request" ? null : job.ticketObj[0].customerPO,
          images: job.images,
          jobStatus: 7, 
          jobId: job._id,
          type: null,
          partialJobPayload: {
            jobId: job._id,
            action: idAction
          }
        };

        const reqObj = {
          'customerId': ticket.customer?._id,
          'locationId': ticket.jobLocation
        };
        /*
         * Dispatch(loadingJobLocations());
         * dispatch(getJobLocationsAction({customerId: reqObj.customerId}));
         */
        if (reqObj.locationId !== undefined && reqObj.locationId !== null) {
          dispatch(loadingJobSites());
          dispatch(getJobSites(reqObj));
        } else {
          dispatch(clearJobSiteStore());
        }
        dispatch(getAllJobTypesAPI());
      
        dispatch(setModalDataAction({
          'data': {
            'modalTitle': `Create ${idAction == "create-new-po-request" ? "PO Request" : "Ticket" }`,
            'removeFooter': false,
            'ticketData': ticket,
            'className': 'serviceTicketTitle',
            'maxHeight': '900px',
          },
          'type': modalTypes.CREATE_TICKET_MODAL
        }));
        setTimeout(() => {
          dispatch(openModalAction());
        }, 200);
      break;
      case "reschedule":
        const newJobTasks: any = [];

        job.tasks.forEach((task: any) => {
          const newJobTypes: any = [];
          task.jobTypes.forEach((jobType: any) => {
            if ((jobType.completedCount || 0) < jobType.quantity && jobType.status != 2) {
              //Split Quantity
              newJobTypes.push({
                quantity: jobType.quantity - (jobType.completedCount || 0),
                jobType: jobType.jobType,
                price: jobType.price,
                completedCount: (jobType.completedCount || 0),
                allQuantitiy: jobType.quantity
              });
            }
          });
          if (newJobTypes.length) {
            newJobTasks.push({ ...task, jobTypes: newJobTypes });
          }
        });

        dispatch(setModalDataAction({
          'data': {
            'job': { ...job, oldJobId: job._id, _id: null, scheduleDate: null, tasks: newJobTasks },
            'modalTitle': 'Reschedule Job',
            'removeFooter': false
          },
          'type': modalTypes.EDIT_JOB_MODAL
        }));
        setTimeout(() => {
          dispatch(openModalAction());
        }, 200);
        break;
      default:
        break;
    }

    setActionsLoading(false);
  }
  
  const openJobHistory = () => {
    setOpenJobHistoryModal(true);
  }
  
  return (
    <>
    <DataContainer className={'new-modal-design'}>
      {(technicianImages.length > 0 || rescheduleTrack.length > 0 || technicianNotes.length > 0) && 
        <Button
          color='primary'
          variant="outlined"
          className='jobCommentBtn'
          onClick={openJobHistory}
        >
          Job History
        </Button>
      }
      <Grid container className={'modalPreview'} justify={'space-around'}>
        <Grid container xs={12} className={classes.toolbarButton} >
        {(vendorWithCommisionTier.length > 0 && job.status ==2) &&
            <Button
              color={'primary'}
              variant={'outlined'}
              className={'whiteButtonBg'}
              onClick={openEditJobCostingModal}>
              {'Job Costing'}
            </Button>
        }
        {(job.status == 7 || job.status == 2) && (
          <div className={classes.actionButton}>
            <span className={classes.actionButtonLabel}>Actions</span>
              {actionsLoading && (
                <CircularProgress size={17} />
              )}
              <BCMenuButton
                icon={ArrowDropDownIcon}
                items={ACTIONS_ITEM}
                
                handleClick={handleMenuButtonClick}
              />
          </div>
        )}
        </Grid>
        <Grid item style={{width: '40%'}}>
          {canEdit &&
            <>
              <Button size={'small'}
                classes={{ 'root': classes.editButton,
                  'label': classes.editButtonText }}
                startIcon={<EditIcon />}
                onClick={openEditJobModal}>{'Edit Job '}{job.jobId.replace('Job ', '#')}</Button><br/></>
          }
          <Typography variant={'caption'} className={'previewCaption'}>{'customer'}</Typography>
          <Typography variant={'h6'} className={'bigText'}>{job.customer?.profile?.displayName || 'N/A'}</Typography>
        </Grid>
        <Grid item xs className={classNames({ [classes.editButtonPadding]: canEdit })}>
          <Typography variant={'caption'} className={'previewCaption'}>{'schedule date'}</Typography>
          <Typography variant={'h6'} className={'previewTextTitle'}>{scheduleDate ? formatDate(scheduleDate) : 'N/A'}</Typography>
        </Grid>
        <Grid item xs className={classNames({ [classes.editButtonPadding]: canEdit })}>
          <Typography variant={'caption'} className={'previewCaption'}>{'open time'}</Typography>
          <Typography variant={'h6'} className={'previewTextTitle'}>{startTime}</Typography>
        </Grid>
        <Grid item xs className={classNames({ [classes.editButtonPadding]: canEdit })}>
          <Typography variant={'caption'} className={'previewCaption'}>{'close time'}</Typography>
          <Typography variant={'h6'} className={'previewTextTitle'}>{endTime}</Typography>
        </Grid>
        <Grid item xs className={classNames({ [classes.editButtonPadding]: canEdit })}>
          <Typography variant={'caption'} className={'previewCaption'}>{'time range'}</Typography>
          <Typography variant={'h6'} className={'previewTextTitle'}>{scheduleTimeAMPM}</Typography>
        </Grid>
      </Grid>
      <div className={'modalDataContainer'}>
        {job.tasks.map((task: any) =>
          <>
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
              <Grid item style={{ width: 140 }}>
              </Grid>
            </Grid>
            <Grid container className={classNames(classes.taskList)} justify={'space-around'}>
              <Grid container className={classNames(classes.task)}>
                <Grid item xs>
                  <Typography variant={'h6'} className={'previewText'} style={{ borderTop: 1, borderColor: 'black' }}>{task.employeeType ? 'Contractor' : 'Employee'}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant={'h6'} className={'previewText'} style={{ borderTop: 1 }}>{task.technician?.profile?.displayName || 'N/A'}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant={'h6'} className={'previewText'} style={{ borderTop: 1 }}>{
                    calculateJobType(task).map((type: any, i: number) => {
                      if (type.completedCount || type.status == 7) {
                        if (type.completedComment) {
                          return <Tooltip
                            arrow
                            title={type.completedComment}
                          >
                            <span key={i} className={'jobTypeText jobTypeList'}>{type.title} - {type.completedCount || 0}/{type.quantity} - ${type.price}</span>
                          </Tooltip>
                        } else {
                          if (type.completedCount != type.quantity) {
                            return <span key={i} className={'jobTypeText jobTypeList'}>{type.title} - {type.completedCount || 0}/{type.quantity} - ${type.price}</span>
                          } else {
                            return <span key={i} className={'jobTypeText jobTypeList'}>{type.title} - {type.quantity} - ${type.price}</span>
                          }
                        }
                      } else {
                        return <span key={i} className={'jobTypeText jobTypeList'}>{type.title} - {type.quantity} - ${type.price}</span>
                      }
                    })
                  }</Typography>
                </Grid>
                <Grid item style={{ width: 140 }}>
                  <BCJobStatus status={task.status || 0} size={'small'} />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        <Grid container className={'modalContent'} justify={'space-around'}>
          <Grid item xs>
            <Typography variant={'caption'} className={'previewCaption'}>{'Subdivision'}</Typography>
            <Typography variant={'h6'} className={'previewText'}>{job.jobLocation?.name || 'N/A'}</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant={'caption'} className={'previewCaption'}>{'Job Address'}</Typography>
            <Typography variant={'h6'} className={'previewText'}>{job.jobSite?.name || 'N/A'}</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant={'caption'} className={'previewCaption'}>{'equipment'}</Typography>
            <Typography variant={'h6'} className={'previewText'}>{'N/A'}</Typography>
          </Grid>
        </Grid>
        <Grid container className={'modalContent'} justify={'space-around'}>
          <Grid container xs={8}>
            <Grid container xs={12}>
              <Grid item xs>
                <Typography variant={'caption'} className={'previewCaption'}>{'contact associated'}</Typography>
                <Typography variant={'h6'} className={'previewText'}>{customerContact || 'N/A'}</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant={'caption'} className={'previewCaption'}>{'Customer PO'}</Typography>
                <Typography variant={'h6'} className={'previewText'}>{job.ticket.customerPO || 'N/A'}</Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.innerRow} xs={6}>
              <Grid item xs>
                <Typography variant={'caption'} className={'previewCaption'}>{'description'}</Typography>
                <Typography variant={'h6'} className={classNames('previewText', 'description')}>{job.description || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={4}>
            <Grid item xs>
              <Typography variant={'caption'} className={'previewCaption'}>{'photo(s);'}</Typography>
              <BCDragAndDrop images={jobImages.map((image: any) => image.imageUrl)} readonly={true} />
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={'modalContent'} justify={'space-between'}>
          <Grid container xs={12}>
            <FormControlLabel
              classes={{ 'label': classes.checkboxLabel }}
              control={
                <Checkbox
                  color={'primary'}
                  checked={job.isHomeOccupied }
                  name={'isHomeOccupied'}
                  classes={{ 'root': classes.checkboxInput }}
                  disabled={true}
                />
              }
              label={`HOUSE IS OCCUPIED`}
            />
          </Grid>
          {
            job.isHomeOccupied
              ? <Grid container xs={12}>
                <Grid justify={'space-between'} xs>
                  <Typography variant={'caption'} className={'previewCaption'}>
                    {'First name'}
                  </Typography>
                    <Typography variant={'h6'} className={'previewText'}>{(job?.homeOwnerObj?.[0]?.profile?.firstName || job?.homeOwner?.profile?.firstName) || 'N/A'}</Typography>
                </Grid>
                <Grid justify={'space-between'} xs>
                  <Typography variant={'caption'} className={'previewCaption'}>
                    {'Last name'}
                  </Typography>
                    <Typography variant={'h6'} className={'previewText'}>{(job?.homeOwnerObj?.[0]?.profile?.lastName || job?.homeOwner?.profile?.lastName ) || 'N/A'}</Typography>
                </Grid>
                <Grid justify={'space-between'} xs>
                  <Typography variant={'caption'} className={'previewCaption'}>{'Email'}</Typography>
                    <Typography variant={'h6'} className={'previewText'}>{(job?.homeOwnerObj?.[0]?.info?.email || job?.homeOwner?.info?.email ) || 'N/A'}</Typography>
                </Grid>
                <Grid justify={'space-between'} xs>
                  <Typography variant={'caption'} className={'previewCaption'}>{'Phone'}</Typography>
                    <Typography variant={'h6'} className={'previewText'}>{(job?.homeOwnerObj?.[0]?.contact?.phone || job?.homeOwner?.contact?.phone ) || 'N/A'}</Typography>
                </Grid>
              </Grid>
              : null
          }
        </Grid>
        <Grid container className={classNames('modalContent', classes.lastRow)} justify={'space-between'}>
          <Grid item xs>
            <Typography variant={'caption'} className={'previewCaption'}>&nbsp;&nbsp;job history Change Log</Typography>
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
                tableData={[...job.track, ...technicianNotes]}
              />
            </div>
          </Grid>
        </Grid>
        {job.status === 1 &&
          <DialogActions>
            <div className={classes.markCompleteContainer}>
              <Button
                color={'primary'}
                disabled={isSubmitting}
                onClick={() => openMarkCompleteJobModal(job)}
                style={{ 'marginLeft': 0 }}
                variant={'contained'}>{'Mark as Complete'}</Button>
            </div>
          </DialogActions>
        }
        {job.status === 6 &&
        <DialogActions>
          <Button
            disabled={isSubmitting}
            color={'secondary'}
            onClick={() => openCancelJobModal(true)}
            variant={'contained'}>{'Cancel Job'}</Button>
          {job?.ticket?.ticketId &&
            <Button
              disabled={isSubmitting}
              color={'secondary'}
              onClick={() => openCancelJobModal(false)}
              variant={'contained'}>{'Cancel Job and Service Ticket'}</Button>
          }
          <Button
            disabled={isSubmitting}
            color={'primary'}
            onClick={completeJob}
            variant={'contained'}
            style={{ 'marginLeft': 30 }}>{'Complete'}</Button>
          {/* <Button
            disabled={isSubmitting}
            color={'primary'}
            onClick={completeJob}
            variant={'contained'}
          >Reschedule</Button>*/}
        </DialogActions>
        }
      </div>
    </DataContainer>

    {/* Job History Modal. */ }
    <Dialog
      aria-labelledby={'responsive-dialog-title'}
      disableEscapeKeyDown={true}
      fullWidth={true}
      maxWidth={"md"}
      onClose={() => {
        setOpenJobHistoryModal(false);
      }}
      open={jobHistoryModal}
      PaperProps={{
        'style': {
          'maxHeight': `100%`
        }
      }}
      scroll={'paper'}
      TransitionComponent={bcModalTransition}>
      <DialogTitle className='new-modal-design'>
        <Typography
          key={"sendPORequest"}
          variant={'h6'}>
          <strong>
            Job History
          </strong>
        </Typography>
        <IconButton
          aria-label={'close'}
          onClick={() => {
            setOpenJobHistoryModal(false);
          }}
          style={{
            'position': 'absolute',
            'right': 1,
            'top': 1
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DataContainer>
          <Grid container className={'modalContent jobHistoryModal new-modal-design'} style={{padding: 15}} justify={'flex-start'} alignItems="flex-start">
          <Grid item container xs={12} spacing={4} >
              <Grid item xs={5}>
                <Typography variant={'caption'} className={'previewCaption'}>Technician's Comments</Typography>
                {
                  technicianNotes.map((note: {user: string, action: string, date:string, userName: string}, index: number) => 
                    <div>
                      <Typography variant={'caption'} className={classes.jobHistoryTechName}>{note.userName}</Typography>
                      <Typography variant={'caption'} className={classes.jobHistoryTechComment}>{note.action}</Typography>
                    </div>
                  )
                }
              </Grid>
            <Grid item xs={5}>
              <Typography variant={'caption'} className={'previewCaption'}>Technician's Photos</Typography>
              <BCDragAndDrop images={technicianImages.map((image: any) => image.imageUrl)} readonly={true} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
              <Typography variant={'caption'} className={'previewCaption'}>Reschedule Notes</Typography>
              <ul>
                {
                  rescheduleTrack.map((track: { user: string, action: string, date: string, userName: string, note: string}, index: number) =>
                    <li>
                      <Typography variant={'caption'} className={classes.jobHistoryTechComment}>{track.note}</Typography>
                    </li>
                  )
                }
              </ul>
          </Grid>
        </Grid>
      </DataContainer>
    </Dialog>
    </>
  );
}

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

  .whiteButtonBg {
    background-color: #ffffff;
    border-radius: 8px;
    margin-right: 20px;
  }

  .jobTypeList{
    cursor: pointer;
  }

  .MuiButton-containedSecondary {
    margin-left: 15px !important;
  }
  
  .jobCommentBtn{
    position: absolute;
    top: 12px;
    right: 55px;
    background: #fff;
  }
`;

export default withStyles(styles, { 'withTheme': true })(BCViewJobModal);
