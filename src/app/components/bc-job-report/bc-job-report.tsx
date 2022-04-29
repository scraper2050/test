import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Grid, withStyles } from '@material-ui/core';
import { formatDatTimell, formatDatTimelll, formatTime } from 'helpers/format';
import styles, {
  DataContainer,
  MainContainer,
  PageContainer
} from './job-reports.styles';
import EmailReportButton from 'app/pages/customer/job-reports/email-job-report';
import EmailHistory from './email-history';
import { useDispatch } from 'react-redux';
import { callCreateInvoiceAPI, getInvoiceDetail } from 'api/invoicing.api';
import { loadJobReportActions } from 'actions/customer/job-report/job-report.action';
import {CSButton} from "../../../helpers/custom";
import {error, success} from "../../../actions/snackbar/snackbar.action";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {getJobTypesFromJob} from "../../../helpers/utils";
import classNames from "classnames";
import BCDragAndDrop from 'app/components/bc-drag-drop/bc-drag-drop'


const renderTime = (startTime:Date, endTime: Date) => {
  if (!startTime && !endTime) {
    return 'N/A';
  }
  const start = formatTime(startTime);
  const end = formatTime(endTime);
  if (endTime) {
    return `${start} - ${end}`;
  }
  return start;
};

const getJobs = (tasks:any = [], jobTypes:any) => {
  const ids: string[] = [];
  const titles: string[] = [];
  tasks.forEach((task:any) => task.jobTypes.forEach((type:any) => {
    if (ids.indexOf(type.jobType) < 0) ids.push(type.jobType)
  }));
  return jobTypes.filter((jobType:any) => ids.includes(jobType._id));
};

function BCJobReport({ classes, jobReportData, jobTypes }: any) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [invoiceDetailResult, setInvoiceDetailResult] = useState<boolean>(false);

  const { job, invoiceCreated, invoice } = jobReportData;
  //console.log({jobReportData});

  if(job && !job.ticket){
    job.ticket = {}
  }

  useEffect(() => {
    if(invoice) {
      getInvoiceDetail(invoice._id).then((response) => {
        if (response.status === 1) {
          setInvoiceDetailResult(true);
        }
      })
    }
  }, []);

  if (!jobReportData || !job) {
    return null;
  }

  const technicianNotes = job?.tasks?.length ?  job.tasks.filter((task: any) => task.comment).map((task: any) => {
    return task.comment;
  }) : [];
  const technicianImages = job?.technicianImages?.length ? job.technicianImages : [];

  const jobs = job.tasks.length
    ? getJobs(job.tasks, jobTypes)
    : [job.type];


  const goBack = () => {
    const prevKey: any = localStorage.getItem('prevNestedRouteKey');
    const linkKey: any = localStorage.getItem('nestedRouteKey');

    localStorage.setItem('prevNestedRouteKey', linkKey);
    localStorage.setItem('nestedRouteKey', prevKey);


    const jobEquipmentInfo = linkKey.includes('job-equipment-info');


    if (jobEquipmentInfo) {
      history.push({
        'pathname': `/main/customers/${job.customer._id}/job-equipment-info/reports`
      });
    } else {
      history.push({
        'pathname': `/main/customers/job-reports`
      });
    }
  };

  const generateInvoice = async () => {
    const invoiceObj: {
      jobId: string;
      customerId: string;
      customerContactId?: string;
      customerPO?: string;
    } = {
      'jobId': job._id,
      'customerId': job.customer._id,
    };

    if(job?.customerContactId?._id) {
      invoiceObj.customerContactId = job.customerContactId._id;
    }
    if(job?.customerPO) {
      invoiceObj.customerPO = job.customerPO;
    }
    const result:any = await callCreateInvoiceAPI(invoiceObj);
    if (result && result?.status !== 0) {
      const { 'invoice': newInvoice } = result;
      dispatch(loadJobReportActions.success({ ...jobReportData,
        'invoiceCreated': true,
        'invoice': newInvoice }));
      history.push({
        'pathname': `view/${newInvoice._id}`,
      });
      dispatch(success(`Draft ${newInvoice.invoiceId} Created`));
/*      dispatch(setModalDataAction({
        'data': {
          'detail': true,
          'modalTitle': 'Invoice',
          'formId': newInvoice._id,
          'removeFooter': false
        },
        'type': modalTypes.SHARED_FORM_MODAL
      }));
      setTimeout(() => {
        dispatch(openModalAction());
      }, 10);*/
    } else {
      dispatch(error(result.message));
    }
  };

  const showInvoice = () => {
    // dispatch(setModalDataAction({
    //   'data': {
    //     'detail': true,
    //     'modalTitle': 'Invoice',
    //     'formId': invoice._id,
    //     'removeFooter': false
    //   },
    //   'type': modalTypes.SHARED_FORM_MODAL
    // }));
    // setTimeout(() => {
    //   dispatch(openModalAction());
    // }, 10);
    history.push({
      'pathname': `view/${invoice._id}`,
    });
  };

  return (
    <MainContainer>
      <PageContainer>
        <div style={{display: 'flex'}}>
          <IconButton
            color="default"
            size="small"
            className={classes.backButton}
            onClick={() => {
              history.goBack();
            }}
          >
            <ArrowBackIcon/>
          </IconButton>
        </div>
        <DataContainer>
          <Grid container>
            <Grid
              item
              xs={12}>
              <p className={classes.reportTag}>
                {`Work Report - ${job.jobId}`}
              </p>
            </Grid>

            <Grid
              className={classes.paper}
              item
              xs={6}>
              <p className={classes.subTitle}>
                {'customer information'}
              </p>
              <Grid container>
                <Grid
                  item
                  xs={6}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Name'}
                    </strong>
                    <p className={classes.noMargin}>
                      {job.customer?.profile?.displayName || 'N/A'}
                    </p>
                  </div>

                  {/* {jobReportData.workPerformedImage === "N/A" ? (
                      <WallpaperIcon className={classes.largeIcon} />
                    ) : (
                        jobReportData.workPerformedImage
                      )} */}
                </Grid>
                <Grid
                  item
                  xs={6}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Phone Number'}
                    </strong>
                    <p className={classes.noMargin}>
                      {job.customer?.contact?.phone || 'N/A'}
                    </p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Email'}
                    </strong>
                    <p className={classes.noMargin}>
                      {job.customer?.info?.email || 'N/A'}
                    </p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Address'}
                    </strong>
                    <p className={classes.noMargin}>
                      {job.customer?.address?.street && <>
                        {job.customer?.address?.street}
                        <br />
                      </>}
                      {job.customer?.address?.city && <>
                        {job.customer?.address?.city}
                        <br />
                      </>}
                      {job.customer?.address?.state && <>
                        {job.customer?.address?.state}
                        {' '}
                        {job.customer?.address?.zipCode}
                        <br />
                      </>}
                    </p>
                  </div>
                </Grid>

                {/* <Grid item xs={7}>
                    <div>
                      <strong>Phone Number</strong>
                      <p className={classes.noMargin}>
                        {jobReportData.phoneFormat}
                      </p>
                    </div>

                    <div className={classes.addMargin}>
                      <strong>Email</strong>
                      <p className={classes.noMargin}>
                        {jobReportData.customerEmail}
                      </p>
                    </div>

                    <div className={classes.addMargin}>
                      <strong>Address</strong>
                      <p className={classes.noMargin}>
                        {jobReportData.address}
                      </p>
                    </div>
                  </Grid> */}
              </Grid>
            </Grid>

            <Grid
              className={classes.paper}
              item
              xs={6}>
              <Grid container>
                <Grid
                  item
                  xs={12}>
                  <p className={classes.subTitle}>
                    {'job details'}
                  </p>
                </Grid>
                <Grid
                  item
                  xs={6}>
                  <div className={classes.addMargin}>
                    <div className={classes.noMargin}>
                      {job.ticket.customerPO
                        ? <img
                          alt={'job report'}
                          src={job.ticket.image}
                        />
                        : <div className={'no-image'} >
                          {' No Image Available'}
                        </div>}
                    </div>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={6}>
                  <Grid container>
                    <Grid
                      item
                      xs={12}>
                      <div className={classes.addMargin}>
                        <strong>
                          {'Technician(s) Name(s)'}
                        </strong>
                        {job.tasks.map((task: any) => <span className={classes.noMargin}>
                            {task.technician?.profile?.displayName || 'N/A'}
                          </span>
                        )}

                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}>
                      <div className={classes.addMargin}>
                        <strong>
                          {'Job Type(s)'}
                        </strong>
                        {getJobTypesFromJob(job).map((item :any, index: number) =>
                          <span
                            className={classes.noMargin}
                            key={index.toString()}>
                            {item || 'N/A'}
                          </span>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
              <Grid container>
                <Grid
                  item
                  xs={6}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Date'}
                    </strong>
                    <p className={classes.noMargin}>
                      {job.scheduleDate
                        ? formatDatTimell(job.scheduleDate)
                        : 'N/A'}
                    </p>
                  </div>
                </Grid>

                <Grid
                  item
                  xs={6}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Time'}
                    </strong>
                    <p className={classes.noMargin}>
                      {renderTime(job.scheduledStartTime, job.scheduledEndTime)}
                    </p>
                  </div>
                </Grid>
              </Grid>

              {(job.jobLocation || job.jobSite || job.customerContactId) && <Grid container>
                { job.jobLocation && <Grid
                  item
                  xs={6}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Job Location'}
                    </strong>
                    <p className={classes.noMargin}>
                      {job.jobLocation.name}
                    </p>
                  </div>
                </Grid>}
                { job.jobSite && <Grid
                  item
                  xs={6}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Job Site'}
                    </strong>
                    <p className={classes.noMargin}>
                      {job.jobSite.name}
                    </p>
                  </div>
                </Grid> }
                { job.customerContactId && <Grid
                  item
                  xs={6}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Contact'}
                    </strong>
                    <p className={classes.noMargin}>
                      {job.customerContactId?.name || 'N/A'}
                    </p>
                  </div>
                </Grid>}
              </Grid>}

              <Grid container>
                <Grid
                  item
                  xs={6}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Start Time'}
                    </strong>
                    <p className={classes.noMargin}>
                      {job.startTime
                        ? formatDatTimelll(job.startTime)
                        : 'N/A'}
                    </p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={6}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'End Time'}
                    </strong>
                    <p className={classes.noMargin}>
                      {job.endTime
                        ? formatDatTimelll(job.endTime)
                        : 'N/A'}
                    </p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={6}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Purchase Order'}
                    </strong>
                    <p className={classes.noMargin}>
                      {job.customerPO || job.ticket.customerPO || 'N/A'}
                    </p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={6}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Service Ticket Note'}
                    </strong>
                    <p className={classes.noMargin}>
                      {job.request?.requests?.filter((request:any)=>request.note).map((request:any)=>request.note).join('\n\n') || job.ticket?.note || 'N/A'}
                    </p>
                  </div>
                </Grid>

                <Grid
                  item
                  xs={6}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Job Notes'}
                    </strong>
                    <p className={classes.noMargin}>
                      {job.comment || 'N/A'}
                    </p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={6}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Technician\'s Comment'}
                    </strong>
                    {
                      technicianNotes.length
                        ? technicianNotes.map((note:string, index:number) =>
                          <p key={index} className={classNames(classes.noMargin, classes.noMarginBottom)}>{note}</p>)
                        : <p className={classNames(classes.noMargin)}>{'N/A'}</p>
                    }
                  </div>
                </Grid>
                {!!technicianImages.length && (
                  <Grid
                    item
                    xs={12}>
                    <div className={classes.addMargin}>
                      <strong>
                        {'Technician\'s Photos'}
                      </strong>
                      <BCDragAndDrop images={technicianImages.map((image: {imageUrl:string}) => image.imageUrl)} readonly={true}  />
                    </div>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid
            className={classes.paper}
            item
            xs={12}>
            <p className={classes.subTitle}>
              {'Company'}
            </p>
            <Grid container>
              <Grid
                item
                xs={3}>
                <div className={classes.avatarArea}>
                  <div
                    className={classes.imgArea}
                    style={{
                      'backgroundImage': `url(${job.company.info.logoUrl})`
                    }}
                  />
                </div>
              </Grid>
              <Grid
                item
                xs={9}>
                <Grid container>
                  <Grid
                    className={classes.mt_24}
                    item
                    xs={6}>
                    <div>
                      <strong className={classes.noMargin}>
                        {'Name'}
                      </strong>
                      <p className={classes.m_0}>
                        {job.company.info.companyName || 'N/A'}
                      </p>
                    </div>
                  </Grid>
                  <Grid
                    className={classes.mt_24}
                    item
                    xs={6}>
                    <div>
                      <strong className={classes.noMargin}>
                        {'Email'}
                      </strong>
                      <p className={classes.m_0}>
                        {job.company.info.companyEmail || 'N/A'}
                      </p>
                    </div>
                  </Grid>
                  <Grid
                    className={classes.mt_24}
                    item
                    xs={6}>
                    <div>
                      <strong className={classes.noMargin}>
                        {'Phone'}
                      </strong>
                      <p className={classes.m_0}>
                        {job.company.contact.phone || 'N/A'}
                      </p>
                    </div>
                  </Grid>
                  <Grid
                    className={classes.mt_24}
                    item
                    xs={6}>
                    <div>
                      <strong className={classes.noMargin}>
                        {'Fax'}
                      </strong>
                      <p className={classes.m_0}>
                        {job.company.contact.fax || 'N/A'}
                      </p>
                    </div>
                  </Grid>
                  <Grid
                    className={classes.mt_24}
                    item
                    xs={6}>
                    <div>
                      <strong className={classes.noMargin}>
                        {'Street'}
                      </strong>
                      <p className={classes.m_0}>
                        {job.company.address.street || 'N/A'}

                      </p>
                    </div>
                  </Grid>
                  <Grid
                    className={classes.mt_24}
                    item
                    xs={6}>
                    <div>
                      <strong className={classes.noMargin}>
                        {'City'}
                      </strong>
                      <p className={classes.m_0}>
                        {job.company.address.city || 'N/A'}

                      </p>
                    </div>
                  </Grid>
                  <Grid
                    className={classes.mt_24}
                    item
                    xs={6}>
                    <div>
                      <strong className={classes.noMargin}>
                        {'State'}
                      </strong>
                      <p className={classes.m_0}>
                        {job.company.address.state || 'N/A'}

                      </p>
                    </div>
                  </Grid>
                  <Grid
                    className={classes.mt_24}
                    item
                    xs={6}>
                    <div>
                      <strong className={classes.noMargin}>
                        {'Zip Code'}
                      </strong>
                      <p className={classes.m_0}>
                        {job.company.address.zipCode || 'N/A'}
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            className={classes.paper}
            item
            xs={12}>
            <p className={classes.subTitle}>
              {'Work performed'}
            </p>
            <Grid
              className={classes.addMargin}
              container>
              <Grid
                item
                xs={3}>
                <strong>
                  {'Unit Number/Location'}
                </strong>
                <p>
                  {/* {jobReportData.location} */}
                </p>
              </Grid>

              <Grid
                item
                xs={2}>
                <strong>
                  {'Date'}
                </strong>
                <p>
                  {/* {jobReportData.formatworkPerformedDate} */}
                </p>
              </Grid>

              <Grid
                item
                xs={2}>
                <strong>
                  {'Time of Scan'}
                </strong>
                <p>
                  {/* {jobReportData.formatworkPerformedTimeScan} */}
                </p>
              </Grid>

              <Grid
                item
                xs={2}>
                <strong>
                  {'Image'}
                </strong>
                <p>
                  {/* {jobReportData.workPerformedImage === 'N/A'
                    ? <WallpaperIcon className={classes.smallIcon} />
                    : jobReportData.workPerformedImage
                  } */}
                </p>
              </Grid>

              <Grid
                item
                xs={3}>
                <strong>
                  {'Note'}
                </strong>
                <p>
                  {/* {jobReportData.workPerformedNote} */}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </DataContainer>
        <Grid
          className={classes.btn}
          container
          item
          xs={12}>
          <Button
            className={classes.cancelBtn}
            onClick={goBack}>
            {'Cancel'}
          </Button>
          <EmailReportButton
            Component={
              <CSButton
                variant="contained"
                color="primary">
                {'Email Report'}
              </CSButton>
            }
            jobReport={jobReportData}
          />
          {
            invoiceCreated
              ? (invoice?.isDraft || invoiceDetailResult) && <CSButton
                variant="contained"
                onClick={showInvoice}
                color="primary">
                {invoice?.isDraft ? 'View Draft' : (invoiceDetailResult ? 'View Invoice' : '')}
              </CSButton>
              : <CSButton
                variant="contained"
                onClick={generateInvoice}
                color="primary">
                {'Generate Invoice'}
              </CSButton>
          }

        </Grid>
        <EmailHistory emailHistory={jobReportData.emailHistory} />
      </PageContainer>
    </MainContainer>
  );
}

export default withStyles(styles, { 'withTheme': true })(BCJobReport);
