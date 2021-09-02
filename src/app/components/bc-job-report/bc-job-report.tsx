import React, { useState } from "react";
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
import { modalTypes } from '../../../constants';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import { callCreateInvoiceAPI } from 'api/invoicing.api';
import { loadJobReportActions } from 'actions/customer/job-report/job-report.action';
import {CSButton} from "../../../helpers/custom";


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

const getJobs = (jobs:any, jobTypes:any) => {
  const ids = jobs.map((job:any) => job.jobType._id);
  return jobTypes.filter((jobType:any) => ids.includes(jobType._id));
};


function BCJobReport({ classes, jobReportData, jobTypes }: any) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { job, invoiceCreated, invoice } = jobReportData;


  if (!jobReportData || !job) {
    return null;
  }

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
    const result:any = await callCreateInvoiceAPI({ 'jobId': job._id,
      'customerId': job.customer._id });
    if (result && result?.status !== 0) {
      const { 'invoice': newInvoice } = result;
      dispatch(loadJobReportActions.success({ ...jobReportData,
        'invoiceCreated': true,
        'invoice': newInvoice }));
      history.push({
        'pathname': `view/${newInvoice._id}`,
      });

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
                      {job.customer.profile.displayName || 'N/A'}
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
                      {job.customer.contact.phone || 'N/A'}
                    </p>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={6}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Email'}
                    </strong>
                    <p className={classes.noMargin}>
                      {job.customer.info.email || 'N/A'}
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
                      {job.customer.address.street && <>
                        {job.customer.address.street}
                        <br />
                      </>}
                      {job.customer.address.city && <>
                        {job.customer.address.city}
                        <br />
                      </>}
                      {job.customer.address.state && <>
                        {job.customer.address.state}
                        {' '}
                        {job.customer.address.zipCode}
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
                          {'Technician Name'}
                        </strong>
                        <p className={classes.noMargin}>
                          {job.technician.profile.displayName || 'N/A'}
                        </p>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}>
                      <div className={classes.addMargin}>
                        <strong>
                          {'Job Type(s)'}
                        </strong>
                        {jobs.map((item :any) =>
                          <p
                            className={job.tasks.length
                              ? classes.addMargin
                              : classes.noMargin}
                            key={item._id}>
                            {item.title || 'N/A'}
                          </p>)}

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
                      {job.ticket.customerPO || 'N/A'}
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
                      {job.ticket.note || 'N/A'}
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
              ? <CSButton
                variant="contained"
                onClick={showInvoice}
                color="primary">
                {'View Invoice'}
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
