import styles from './bc-job-modal.styles';
import {
  Button, DialogActions,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../../../scss/job-poup.scss';
import { useDispatch, useSelector } from 'react-redux';
import BcInput from 'app/components/bc-input/bc-input';
import BCTabs from 'app/components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import { closeModalAction, openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { getAllJobTypesAPI, getJobInvoice, updatePartialJob } from 'api/job.api';
import { refreshJobs } from 'actions/job/job.action';
import { success, warning } from 'actions/snackbar/snackbar.action';
import { modalTypes } from "../../../constants";
import { useFormik } from 'formik';
import { clearJobSiteStore, getJobSites, loadingJobSites } from 'actions/job-site/job-site.action';

const initialJobType = {
  jobTypeId: null,
  price: null,
  quantity: 1,
  isPriceEditable: false
};

const initialTask = {
  employeeType: 1,
  contractor: null,
  employee: null,
  jobTypes: [{ ...initialJobType }],
}

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

const getJobTasks = (job: any) => {
  const tasks = job.tasks.map((task: any) => ({
    ...task, jobTypes: getJobData(task.jobTypes)
  }));
  return tasks;
};


/**
 * Helper function to get job data from jobTypes
 */
const getJobData = (jobTypes: any) => {
  if (!jobTypes) {
    return;
  }
  return jobTypes.map((item: any) => {
    let jobType = {
      ...item,
      completedCount: item.completedCount || item.quantity,
      lastCompletedCount: item.completedCount
    }

    return jobType;
  })
};


function BCEditCompletedJobModal({
  classes,
  job = initialJobState,
  action,
}: any): JSX.Element {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isUpdateable, setIsUpdateable] = useState(false);
  const [tabsData, setTabsData] = useState([]);
  const [curTab, setCurTab] = useState(0);
  const customers = useSelector(({ customers }: any) => customers.data);

  const form = useFormik({
    initialValues: {
      tasks: [{ ...initialTask }]
    },
    onSubmit: async (values: any) => {
      setLoading(true);
      const newTasks = validateQuantity();

      if (isUpdateable) {
        const { invoice } = await getJobInvoice(job._id);
        if (invoice) {
          const yesAction = () => {
            executeJobEdit(newTasks);
          }

          dispatch(setModalDataAction({
            'data': {
              'message': `This job has already been invoiced${invoice.paid ? " and paid" : ""}. Here are the details of <a href="/main/invoicing/view/${invoice._id}" target="_blank">${invoice.invoiceId}</a>. Would you still like to update this job?`,
              'actionText': "Yes",
              'action': yesAction
            },
            'type': modalTypes.WARNING_MODAL_V2
          }));
          setTimeout(() => {
            dispatch(openModalAction());
          }, 200);
        } else {
          executeJobEdit(newTasks);
        }
      } else {
        setLoading(false);
      }
    }
  });

  const {
    errors: FormikErrors,
    values: FormikValues,
    handleChange: formikChange,
    handleSubmit: FormikSubmit,
    setFieldValue
  } = form;

  const validateQuantity = (parseValue: boolean = true) => {
    const newTasks: any[] = [];
    const allJobTypes: any[] = [];

    FormikValues.tasks.forEach((task: any) => {
      const jobTypes: any[] = [];
      task.jobTypes.forEach((jobType: any) => {
        if (Number(jobType.completedCount) < jobType.quantity && (Number(jobType.completedCount) % 1 === 0)) {
          if(parseValue) jobType.completedCount = Number(jobType.completedCount);
          jobTypes.push(jobType);
          allJobTypes.push(jobType);
        }
      })

      if (jobTypes.length) {
        newTasks.push({ ...task, jobTypes: jobTypes });
      }
    })

    if (allJobTypes.length) {
      setIsUpdateable(true);
    } else {
      setIsUpdateable(false);
    };

    return newTasks;
  }


  useEffect(() => {
    const newTabsData: any = job.tasks.filter((res: any) => res.contractor?.commissionTier).map((res: any, index: number) => {
      return {
        label: "Task " + (index + 1),
        task: res,
        value: index,
      }
    })

    setTabsData(newTabsData);
  }, []);

  useEffect(() => {
    const jobTasks = getJobTasks(job);
    setFieldValue('tasks', jobTasks);
  }, [job.tasks]);

  const handleClose = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  useEffect(() => {
    handleTabChange(0);
  }, [tabsData])


  const executeJobEdit = async (tasks: any[]) => {
    const idAction = action;
    switch (idAction) {
      case "create-new-ticket":
      case "create-new-po-request":
        const newTicketTasks: any = [];
        tasks.forEach((task: any) => {
          task.jobTypes.forEach((jobType: any) => {
            if ((jobType.completedCount || 0) < jobType.quantity) {
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
          jobId: job._id,
          jobStatus: 7,
          type: null,
          partialJobPayload: {
            jobId: job._id,
            action: idAction,
            newJobTasks: JSON.stringify(tasks),
            isCompletedJob: true
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
            'modalTitle': `Create ${idAction == "create-new-po-request" ? "PO Request" : "Ticket"}`,
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
        const newJobTasksMapped: any = [];

        tasks.forEach((task: any) => {
          const newJobTypes: any = [];
          task.jobTypes.forEach((jobType: any) => {
            if ((jobType.completedCount || 0) < jobType.quantity) {
              //Split Quantity
              newJobTypes.push({
                quantity: jobType.quantity - jobType.completedCount,
                jobType: jobType.jobType,
                price: jobType.price,
                completedCount: jobType.completedCount,
                allQuantitiy: jobType.quantity
              });
            }
          });
          if (newJobTypes.length) {
            newJobTasksMapped.push({ ...task, jobTypes: newJobTypes, status: 0 });
          }
        });
        dispatch(setModalDataAction({
          'data': {
            'job': { ...job, oldJobId: job._id, _id: null, scheduleDate: null, tasks: newJobTasksMapped, isCompletedJob: true, status: 7, newJobTasks: JSON.stringify(tasks) },
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

    setLoading(false);
  }

  const handleJobTypeChange = (value: any, index: number, taskIndex: number) => {
    const jobTypes: any[] = [...FormikValues.tasks[taskIndex]?.jobTypes];
    jobTypes[index].completedCount = value;

    if (!value) {
      jobTypes[index].status = 7;
    }

    let newTasks = [...FormikValues.tasks];
    newTasks[taskIndex].jobTypes = jobTypes;
    setFieldValue('tasks', newTasks);
    validateQuantity(false);
  };

  return (
    <form onSubmit={FormikSubmit}>
      <DataContainer className={'new-modal-design'}>
        <Grid container className={'modalPreview'} justify={'space-around'}>
          <Grid item xs={12}>
            <Typography variant="body1">{job.jobId?.replace(" ", " #")}</Typography>
          </Grid>
        </Grid>
        <div>
          <div className={'modalContent'}>
            <BCTabs
              curTab={curTab}
              indicatorColor={'primary'}
              onChangeTab={handleTabChange}
              tabsData={tabsData}
            />
            <SwipeableViews index={curTab}>
              {tabsData.map((res: any) => {
                return (
                  <div
                    className={classes.jobCostingContent}
                    hidden={false}
                    id={res.value}>
                    <Grid container className={'pt'}>
                      <Grid item sm={7}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography variant={'body1'} className={'previewCaption'}>technician</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant={'subtitle1'} className={'previewCaption'}>{res.task.contractor.info.displayName || res.task.contractor.info.companyName}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      {
                        FormikValues.tasks.map((task: any, index: number) => {
                          if (task._id == res.task._id) {
                            return <>
                              {
                                task?.jobTypes?.map((jobType: any, jobTypeIdx: number) => {
                                  return <Grid container alignItems='center' spacing={4} style={{ paddingBottom: 0 }}>
                                    <Grid item xs={3} style={{ paddingBottom: 0 }}>
                                      <Typography variant={'body1'} className={'previewCaption'}>{jobType.jobType?.title}</Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{ paddingBottom: 0 }}>
                                      <BcInput
                                        name='completed_count'
                                        value={jobType.completedCount}
                                        margin={'none'}
                                        type="number"
                                        placeholder="Completed Count"
                                        handleChange={(ev: any, newValue: any) =>
                                          handleJobTypeChange(ev.target?.value, jobTypeIdx, index)
                                        }
                                        inputProps={{
                                          style: {
                                            padding: '12px 14px',
                                          }
                                        }}
                                        InputProps={{
                                          style: {
                                            borderRadius: 8,
                                          },
                                        }}
                                      />
                                    </Grid>
                                    <Grid item xs={5} style={{ paddingBottom: 0 }}>
                                      {jobType.status == 2 ? jobType.completedCount || jobType.quantity : jobType.completedCount || 0}/{jobType.quantity} Are Completed
                                    </Grid>
                                    <Grid item xs={3} style={{ paddingTop: 0 }}></Grid>
                                    <Grid item xs={8} style={{ paddingTop: 0 }}>
                                      <Typography variant={'body1'} className={'redText'}>{jobType.completedCount > jobType.quantity ? `Please input the quantity of completed tasks, ensuring it is under ${jobType.quantity}` : ''}</Typography>
                                    </Grid>
                                  </Grid>
                                })
                              }
                            </>
                          } else {
                            return <></>
                          }
                        })
                      }
                    </Grid>
                  </div>)
              })}
            </SwipeableViews>
          </div>
          <DialogActions>
            <Button
              disabled={loading}
              disableElevation={true}
              onClick={() => handleClose()}
              variant={'outlined'}
            >
              Close
            </Button>
            <Button
              color='primary'
              disabled={loading || !isUpdateable}
              type='submit'
              variant='contained'
            >Submit</Button>
          </DialogActions>
        </div>
      </DataContainer>
    </form>
  );
}

const DataContainer = styled.div`
  margin: auto 0;

  .modalContent {
    padding-top: 15px !important;
  }

  .addition {
    margin-top: 25px !important;
  }

  .MuiButton-containedSecondary {
    margin-left: 15px !important;
  }

  .redText {
    color: red!important;
    font-size: 13px!important;
    margin-bottom: 10px;
  }

`;

export default withStyles(styles, { withTheme: true })(BCEditCompletedJobModal);
