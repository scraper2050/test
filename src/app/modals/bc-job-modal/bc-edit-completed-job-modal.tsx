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
function BCEditCompletedJobModal({
  classes,
  job = initialJobState,
  action,
}: any): JSX.Element {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState<any>({});
  const [tabsData, setTabsData] = useState([]);
  const [curTab, setCurTab] = useState(0);
  const [isUpdateable, setUpdateable] = useState(false);
  const [newJobTasks, setNewJobTasks] = useState<any>([]);
  const customers = useSelector(({ customers }: any) => customers.data);
  
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
    const res: any = tabsData.find((res: any) => res.value == newValue);

    if (res) {
      let newValues: any = {};
      res.task.jobTypes.forEach((taskJobType: any) => {
        newValues[taskJobType._id] = taskJobType.completedCount || taskJobType.quantity;
      });
      setFormValue(newValues)
    }
  };

  useEffect(()=> {
    handleTabChange(0);
  }, [tabsData])

  const submitCompletedCount = async () => {
    setLoading(true);

    if (isUpdateable) {
      const { invoice } = await getJobInvoice(job._id);
      if (invoice) {
        const yesAction = () => {
          executeJobEdit();
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
        executeJobEdit();
      }
    } else {
      setLoading(false);
      dispatch(warning("Please update the completed count between 0 and the quantity."));
    }
  }

  const executeJobEdit = async () => {
    const idAction = action;
    switch (idAction) {
      case "create-new-ticket":
      case "create-new-po-request":
          const type = idAction == "create-new-ticket" ? "Ticket" : "PO Request";

          let payload = {
            jobId: job._id,
            action: idAction,
            type: type,
            newJobTasks: JSON.stringify(newJobTasks),
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

        newJobTasks.forEach((task: any) => {
          const newJobTypes: any = [];
          task.jobTypes.forEach((jobType: any) => {
            if ((jobType.completedCount || 0) < jobType.quantity && ((jobType.status != 2) && jobType.completedCount)) {
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
            newJobTasksMapped.push({ ...task, jobTypes: newJobTypes });
          }
        });

        dispatch(setModalDataAction({
          'data': {
            'job': { ...job, oldJobId: job._id, _id: null, scheduleDate: null, tasks: newJobTasksMapped, isCompletedJob: true, status: 7, newJobTasks: JSON.stringify(newJobTasks)},
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

  return (
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
                      {res.task?.jobTypes?.map((jobType: any) => {
                        const handleChange = (event: any) => {
                          const value = event.target?.value;
                          let newValues: any = {};
                          const newJobTypes:any = [];
                          res.task.jobTypes.forEach((taskJobType: any) => {
                            if (taskJobType._id == jobType._id) {
                              newValues[taskJobType._id] = value;
                              if (value < taskJobType.quantity) {
                                newJobTypes.push({...taskJobType, completedCount: Number(value), status: 7});
                                setUpdateable(true);
                              }
                            } else {
                              newValues[taskJobType._id] = taskJobType.completedCount || taskJobType.quantity;
                            }
                          });

                          if (newJobTypes.length) {
                            setNewJobTasks(newJobTasks.concat([{...res.task, jobTypes: newJobTypes}]))
                          }
                          setFormValue(newValues)
                        }
                        
                        return <Grid container alignItems='center' spacing={4}>
                          <Grid item xs={3}>
                            <Typography variant={'body1'} className={'previewCaption'}>{jobType.jobType?.title}</Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <BcInput
                              name='completed_count'
                              value={formValue[jobType._id]}
                              margin={'none'}
                              type="number"
                              placeholder="Completed Count"
                              handleChange={handleChange}
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
                          <Grid item xs={5}>
                            {jobType.completedCount || jobType.quantity}/{jobType.quantity} Are Completed
                          </Grid>
                        </Grid>
                      })}
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
                onClick={submitCompletedCount}
                variant='contained'
            >Submit</Button>
          </DialogActions>
      </div>
    </DataContainer>
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

`;

export default withStyles(styles, { withTheme: true })(BCEditCompletedJobModal);
