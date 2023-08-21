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
import { getJobInvoice, updatePartialJob } from 'api/job.api';
import { refreshJobs } from 'actions/job/job.action';
import { success, warning } from 'actions/snackbar/snackbar.action';
import { modalTypes } from "../../../constants";
import { useFormik } from 'formik';

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
    const tasks = job.tasks.map((task: any) => ({...task, jobTypes: getJobData(task.jobTypes)
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
  const [tabsData, setTabsData] = useState([]);
  const [curTab, setCurTab] = useState(0);
  const customers = useSelector(({ customers }: any) => customers.data);

  const form = useFormik({
    initialValues: {
      tasks: [{ ...initialTask }]
    },
    onSubmit: async (values: any) => {
      setLoading(true);


      const newTasks:any[] = [];
      let isUpdateable = false;

      values.tasks.forEach((task: any) => {
        const jobTypes:any[] = [];
        task.jobTypes.forEach((jobType: any) => {
          if (Number(jobType.completedCount) < jobType.quantity) {
            jobType.completedCount = Number(jobType.completedCount);
            jobTypes.push(jobType);
          }
        })

        if (jobTypes.length) {
          newTasks.push({...task,jobTypes: jobTypes});
          isUpdateable = true;
        }
      })


      console.log(newTasks);
      

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
        const type = idAction == "create-new-ticket" ? "Ticket" : "PO Request";

        let payload = {
          jobId: job._id,
          action: idAction,
          type: type,
          newJobTasks: JSON.stringify(tasks),
          isCompletedJob: true
        };

        const response = await updatePartialJob(payload);
        dispatch(success("Closed Job and Created New Ticket successfully"));
        dispatch(refreshJobs(true))

        if (type == "PO Request") {
          dispatch(setModalDataAction({
            'data': {
              'data': response.ticket,
              'modalTitle': `Send PO Request`,
              'type': "PO Request",
              'removeFooter': false,
            },
            'type': modalTypes.EMAIL_PO_REQUEST_MODAL
          }));
          setTimeout(() => {
            dispatch(openModalAction());
          }, 200);
        } else {
          dispatch(closeModalAction());
          setTimeout(() => {
            dispatch(
              setModalDataAction({
                data: {},
                type: '',
              })
            );
          }, 200);
        }
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

        console.log(newJobTasksMapped);
        
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
                               task?.jobTypes?.map((jobType: any, jobTypeIdx: number) =>{
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
                           return  <></>
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
              disabled={loading}
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
