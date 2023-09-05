import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Grid, Theme, Tooltip, Typography, withStyles } from '@material-ui/core';
import { formatDatTimell, formatTime } from 'helpers/format';
import styles, {
  DataContainer,
  MainContainer,
  PageContainer
} from './job-reports.styles';
import EmailReportButton from 'app/pages/customer/job-reports/email-job-report';
import EmailHistory from './email-history';
import {CSButton} from "../../../helpers/custom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {getJobTypesFromJob} from "../../../helpers/utils";
import classNames from "classnames";
import BCDragAndDrop from 'app/components/bc-drag-drop/bc-drag-drop'
import { useDispatch, useSelector } from "react-redux";
import { ISelectedDivision } from "actions/filter-division/fiter-division.types";
import LogoSvg from "../../../assets/img/header-logo.svg";
import { callGetJobReportPDF } from 'api/job.api';
import {
  error as SnackBarError,
  success,
} from 'actions/snackbar/snackbar.action';
import InfoIcon from '@material-ui/icons/Info';

const getJobs = (tasks:any = [], jobTypes:any) => {
  const ids: string[] = [];
  const titles: string[] = [];
  tasks.forEach((task:any) => task.jobTypes.forEach((type:any) => {
    if (ids.indexOf(type.jobType) < 0) ids.push(type.jobType)
  }));
  return jobTypes.filter((jobType:any) => ids.includes(jobType._id));
};

function BCJobReport({ classes, jobReportData, jobTypes, generateInvoiceHandler, getInvoiceDetailHandler }: any) {
  const history = useHistory();
  const location = useLocation<any>();
  const dispatch = useDispatch();
  const [invoiceDetailResult, setInvoiceDetailResult] = useState<boolean>(false);
  const currentDivision: ISelectedDivision = useSelector((state: any) => state.currentDivision);
  const divisions = useSelector((state: any) => state.divisions);

  const { job, invoiceCreated, invoice } = jobReportData;

  if(job && !job.ticket){
    job.ticket = {}
  }

  useEffect(() => {
    if(invoice) {
      getInvoiceDetailHandler(invoice._id).then((response:any) => {
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

  const listener = history.listen((loc, action) => {
    if (action === 'POP'){
      handleBackButtonClick();
      listener();
    }
  });

  const handleBackButtonClick = () => {
    if(location?.state?.keyword || location?.state?.currentPageSize || location?.state?.dateFilterRange){
      history.push({
        'pathname': currentDivision.urlParams ?  `/main/customers/job-reports/${currentDivision.urlParams}` : `/main/customers/job-reports`,
        'state': {
          'option': {
            search: location?.state?.keyword || '',
            pageIndex: location?.state?.currentPageIndex || 0,
            pageSize: location?.state?.currentPageSize || 10,
            dateFilterRange: location?.state?.dateFilterRange || null,
          },
        }

      });
    } else {
      history.goBack();
    }
  }

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
    } else if(location?.state?.keyword || location?.state?.currentPageSize || location?.state?.dateFilterRange){
      history.push({
        'pathname': currentDivision.urlParams ?  `/main/customers/job-reports/${currentDivision.urlParams}` : `/main/customers/job-reports`,
        'state': {
          'option': {
            search: location?.state?.keyword || '',
            pageSize: location?.state?.currentPageSize || 10,
            pageIndex: location?.state?.pageIndex || 0,
            dateFilterRange: location?.state?.dateFilterRange || null,
          },
        }

      });
    } else {
      history.push({
        'pathname': currentDivision.urlParams ?  `/main/customers/job-reports/${currentDivision.urlParams}` : `/main/customers/job-reports`
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
        generateInvoiceHandler(invoiceObj)
  };

  const showInvoice = () => {
    history.push({
      'pathname': `/main/customers/job-reports/view/${invoice._id}`,
    });
  };

  const downloadReport = async () => {
    const response : any = await callGetJobReportPDF(jobReportData._id);
    if(response.status === 200) {
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `Report_${job.jobId}.pdf`;
      link.click();
      dispatch(success("PDF generated. Check your downloads"));
    }
    else {
      dispatch(SnackBarError("Something went wrong during PDF generation"));
    }
  }

  const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: "1rem",
    },
  }))(Tooltip);


  const getJobTypesQty = (job: any) => job.tasks.reduce((acc: number[], task: any) => {
    let qtyMaps: { [p: string]: number } = {};
    task.jobTypes.forEach((type: any) => {
      if (type.jobType) {
        const qty = type.quantity || 1;
        if (qtyMaps[type.jobType?._id]) {
          qtyMaps[type.jobType?._id] += qty;
        } else {
          qtyMaps[type.jobType?._id] = qty;
        }
      }
    });

    acc = Object.values(qtyMaps);
    return acc;
  }, []);

  const endTime = job?.scheduledEndTime ? `:${formatTime(job?.scheduledEndTime)}` : '';
  const specificTime = `${formatTime(job?.scheduledStartTime)}${endTime}`
  let time = 'N/A';
  switch (job?.scheduleTimeAMPM) {
    case 0:
      time = specificTime;
      break;
    case 1:
      time = 'AM';
      break;
    case 2:
      time = 'PM';
      break;
  }
  let match = time.match(/(.*[APap][Mm]):(.*)/);

  let startingTime = "N/A";
  let closingTime = "N/A";

  if (match) {
    startingTime = match[1].trim();
    closingTime = match[2].trim();
  } else {
    startingTime = time.trim();
  }

  const serviceTicketNotes = job.request?.requests?.filter((request: any) => request.note).map((request: any) => request.note).join('\n\n') || job.ticket?.note;
  return (
    <MainContainer>
      <PageContainer>
        <div style={{ display: 'flex', alignItems: "flex-start"}}>
          <IconButton
            color="default"
            size="small"
            className={classes.backButton}
            onClick={handleBackButtonClick}
          >
            <ArrowBackIcon/>
          </IconButton>
        </div>
        <Grid
          className={classes.btn}
          container
          item
          xs={12}>
          {job.customer?.notes && (
            <LightTooltip title={job.customer?.notes}>
              <div className={classes.customerNoteContainer}>
                <IconButton
                  component="span"
                  color={'primary'}
                  size="small"
                >
                  <InfoIcon></InfoIcon>
                </IconButton>
                <Typography variant={'subtitle1'} className={classes.customerNoteText}>
                  Customer Notes
                </Typography>
              </div>
            </LightTooltip>
          )}
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
          <CSButton
            variant="contained"
            onClick={downloadReport}
            color="primary">
            {'Download PDF'}
          </CSButton>

        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={2}></Grid>
          <Grid
            container
            item
            xs={8}>

            <DataContainer id="pdf">
              <Grid container>
                {/* COMPANY INFO */}
                <Grid container className={classes.headerBackground}>
                  <Grid container>
                    {/* Logo */}
                    <Grid
                      item
                      xs={2}>
                      <div className={classes.imgArea}>
                        <img
                          className={classes.iconImage}
                          src={job.company.info.logoUrl}
                        />
                      </div>
                    </Grid>
                    {/* Company name, adress and contact info */}
                    <Grid
                      item
                      xs={3}>
                      <p className={classes.companyName}>
                        {job.company.info.companyName || 'N/A'}
                      </p>
                      <p className={classes.grayBoldTextM_0}>
                        {job.company.address.street || 'N/A' + ','}
                      </p>
                      <p className={classes.grayBoldTextM_0}>
                        {(job.company.address.city || 'N/A') + ', ' + (job.company.address.state || 'N/A') + ', ' + (job.company.address.zipCode || 'N/A')}
                      </p>
                      {job.company.contact?.phone && <p className={classes.grayBoldTextM_0}>
                        {job.company.contact.phone}
                      </p>}
                      {job.company.info?.companyEmail && <p className={classes.grayBoldTextM_0}>
                        {job.company.info.companyEmail}
                      </p>}
                    </Grid>
                    <Grid
                      item
                      xs={7}>
                      <div className={classes.rightAlign}>
                        <p className={classes.reportTag}>
                          {`Job Report - ${job.jobId}`}
                        </p>
                        <br />
                        <p className={classes.attributeKey}>Job date</p>
                        <p className={classes.grayBoldTextM_0}>
                          {job.scheduleDate
                            ? formatDatTimell(job.scheduleDate)
                            : 'N/A'}
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                  <hr className={classes.separator} />
                  {/* Customer info */}
                  <Grid container>
                    <Grid
                      className={classes.paper}
                      item
                      xs={12}>
                      <p className={classes.subTitle}>
                        {'customer information'}
                      </p>
                      <Grid container>
                        <Grid
                          item
                          xs={3}>
                          <div className={classes.addMargin}>
                            <p className={classes.attributeKey}>
                              {'Name'}
                            </p>
                            <p className={classes.grayBoldTextM_0}>
                              {job.customer?.profile?.displayName || 'N/A'}
                            </p>
                          </div>
                        </Grid>
                        <Grid
                          item
                          xs={3}>
                          <div className={classes.addMargin}>
                            <p className={classes.attributeKey}>
                              {'Address'}
                            </p>
                            <p className={classes.grayBoldTextM_0}>
                              {job.customer?.address?.street && <>
                                {job.customer?.address?.street}
                                <br />
                              </>}
                              {job.customer?.address?.city && <>
                                {job.customer?.address?.city + ', '}
                              </>}
                              {job.customer?.address?.state && <>
                                {job.customer?.address?.state}
                                {' '}
                                {job.customer?.address?.zipCode}
                              </>}
                            </p>
                          </div>
                        </Grid>
                        {job.customer?.contact?.phone && <Grid item xs={3}>
                          <div className={classes.addMargin}>
                            <p className={classes.attributeKey}>
                              {'Phone Number'}
                            </p>
                            <p className={classes.grayBoldTextM_0}>
                              {job.customer?.contact?.phone}
                            </p>
                          </div>
                        </Grid>}
                        {job.customer?.info?.email && <Grid item xs={3}>
                          <div className={classes.addMargin}>
                            <p className={classes.attributeKey}>
                              {'Email'}
                            </p>
                            <p className={classes.grayBoldTextM_0}>
                              {job.customer?.info?.email}
                            </p>
                          </div>
                        </Grid>}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container className={classes.bodyContainer}>
                  {/* Job details */}
                  <Grid container>
                    <Grid
                      item
                      xs={12}>
                      <p className={classes.subTitle}>
                        {'job details'}
                      </p>
                    </Grid>
                    <Grid container>
                      {job.jobLocation && <Grid
                        item
                        xs={3}>
                        <div className={classes.addMargin}>
                          <p className={classes.attributeKey}>
                            {'Subdivision'}
                          </p>
                          <p className={classes.grayBoldTextM_0}>
                            {job.jobLocation.name}
                          </p>
                        </div>
                      </Grid>}
                      {job.jobSite && <Grid
                        item
                        xs={2}>
                        <div className={classes.addMargin}>
                          <p className={classes.attributeKey}>
                            {'Job Address'}
                          </p>
                          <p className={classes.grayBoldTextM_0}>
                            {job.jobSite.name}
                          </p>
                        </div>
                      </Grid>}
                      <Grid
                        item
                        xs={2}>
                        <div className={classes.addMargin}>
                          <p className={classes.attributeKey}>
                            {'House status'}
                          </p>
                          <p className={job.isHomeOccupied ? classes.occupiedHouseText : classes.grayBoldTextM_0}>
                            {job.isHomeOccupied ? 'Occupied' : 'Not occuppied'}
                          </p>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={5}>
                        <div className={classes.addMargin}>
                          <p className={classes.attributeKey}>
                            {'Starting Time'}
                          </p>
                          <p className={classes.grayBoldTextM_0}>
                            {startingTime}
                          </p>

                          <p className={classes.attributeKey}>
                            {'Ending Time'}
                          </p>
                          <p className={classes.grayBoldTextM_0}>
                            {closingTime}
                          </p>
                        </div>

                      </Grid>
                      { /* Customer contact info */}
                      {job.customerContactId && <Grid
                        item
                        xs={3}>
                        <div className={classes.addMargin}>
                          <p className={classes.attributeKey}>
                            {'Contact'}
                          </p>
                          <p className={classes.grayBoldTextM_0}>
                            {job.customerContactId?.name || 'N/A'}
                          </p>
                        </div>
                      </Grid>}
                      {job.customerContactId?.phone && <Grid
                        item
                        xs={2}>
                        <div className={classes.addMargin}>
                          <p className={classes.attributeKey}>
                            {'Phone number'}
                          </p>
                          <p className={classes.grayBoldTextM_0}>
                            {job.customerContactId?.phone || 'N/A'}
                          </p>
                        </div>
                      </Grid>}
                      {job.customerContactId?.email && <Grid
                        item
                        xs={4}>
                        <div className={classes.addMargin}>
                          <p className={classes.attributeKey}>
                            {'Email'}
                          </p>
                          <p className={classes.grayBoldTextM_0}>
                            {job.customerContactId?.email || 'N/A'}
                          </p>
                        </div>
                      </Grid>}
                      {(job.customerPO || job.ticket.customerPO) && <Grid
                        item
                        xs={2}>
                        <div className={classes.addMargin}>
                          <p className={classes.attributeKey}>
                            {'Purchase Order'}
                          </p>
                          <p className={classes.grayBoldTextM_0}>
                            {job.customerPO || job.ticket.customerPO}
                          </p>
                        </div>
                      </Grid>}
                      <Grid
                        item
                        xs={12}>
                        <Grid container>
                          <Grid
                            item
                            xs={3}>
                            <div className={classes.addMargin}>
                              <p className={classes.attributeKey}>
                                {'Technician(s) Name(s)'}
                              </p>
                                {job.tasks.map((task: any, idx: number, array: any[]) => (
                                    <span key={idx}>
                                        {task.technician?.profile?.displayName || 'N/A'}
                                        {idx < array.length - 1 ? ' | ' : ''}
                                        <br />
                                    </span>
                                ))}
                            </div>
                          </Grid>
                          <Grid
                            item
                            xs={2}>
                            <div className={classes.addMargin}>
                              <p className={classes.attributeKey}>
                                {'Job Type(s)'}
                              </p>
                              <span className={classes.grayBoldTextM_0}>
                                {getJobTypesFromJob(job).map((item: any, idx: number, array: any[]) => (
                                    <span key={idx}>
                                        {item || 'N/A'}
                                        {idx < array.length - 1 ? ' | ' : ''}
                                    </span>
                                ))}
                              </span>
                            </div>
                          </Grid>
                          <Grid
                            item
                            xs={2}>
                            <div className={classes.addMargin}>
                              <p className={classes.attributeKey}>
                                {'Quantity'}
                              </p>
                              <span className={classes.grayBoldTextM_0}>
                                {getJobTypesQty(job).map((item: any, idx: number, array: any[]) => (
                                    <div key={idx}>
                                        {`${item || '1'}`}
                                        {idx < array.length - 1 ? ' | ' : ''}
                                    </div>
                                ))}
                              </span>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <hr className={classes.separator} />
                    {job.isHomeOccupied && <Grid container>
                      <Grid
                        item
                        xs={12}>
                        <p className={classes.subTitle}>
                          {'Home owner information'}
                        </p>
                      </Grid>
                      { job.homeOwner?.profile?.firstName && <Grid item xs={3}>
                        <div className={classes.addMargin}>
                          <p className={classes.attributeKey}>
                            {'First Name'}
                          </p>
                          <p className={classes.grayBoldTextM_0}>
                            {job.homeOwner?.profile?.firstName}
                          </p>
                        </div>
                      </Grid>}
                      { job.homeOwner?.profile?.lastName && <Grid item xs={3}>
                        <div className={classes.addMargin}>
                          <p className={classes.attributeKey}>
                            {'Last Name'}
                          </p>
                          <p className={classes.grayBoldTextM_0}>
                            {job.homeOwner?.profile?.lastName}
                          </p>
                        </div>
                      </Grid>}
                      {job.homeOwner?.contact?.phoneNumber && <Grid item xs={2}>
                        <div className={classes.addMargin}>
                          <p className={classes.attributeKey}>
                            {'Phone number'}
                          </p>
                          <p className={classes.grayBoldTextM_0}>
                            {job.homeOwner?.contact?.phoneNumber}
                          </p>
                        </div>
                      </Grid>}
                      {job.homeOwner?.info?.email && <Grid item xs={3}>
                        <div className={classes.addMargin}>
                          <p className={classes.attributeKey}>
                            {'Email'}
                          </p>
                          <p className={classes.grayBoldTextM_0}>
                            {job.homeOwner?.info?.email}
                          </p>
                        </div>
                      </Grid>}
                      <hr className={classes.separator} />
                    </Grid>}
                    <Grid container>
                      {/* Notes section */}
                      <Grid item xs={!!technicianImages.length ? 6 : 12}>
                        <Grid container>
                          <Grid
                            item
                            xs={12}>
                            <p className={classes.notesTitle}>
                              {'Notes'}
                            </p>
                          </Grid>
                          {serviceTicketNotes &&<Grid item xs={12}>
                            <div className={classes.addMargin}>
                              <p className={classes.notesSubtitle}>
                                {'Service Ticket Note'}
                              </p>
                              <p className={classNames(classes.noMargin, classes.grayNormalText)}>
                                {serviceTicketNotes}
                              </p>
                            </div>
                          </Grid>}
                          {job.comment && <Grid
                            item
                            xs={12}>
                            <div className={classes.addMargin}>
                              <p className={classes.notesSubtitle}>
                                {'Job Notes'}
                              </p>
                              <p className={classNames(classes.noMargin, classes.grayNormalText)}>
                                {job.comment}
                              </p>
                            </div>
                          </Grid>}
                          {technicianNotes.length > 0 &&<Grid
                            item
                            xs={12}>
                            <div className={classes.addMargin}>
                              <p className={classes.notesSubtitle}>
                                {'Technician\'s Comments'}
                              </p>
                              {
                                  technicianNotes.map((note: string, index: number) =>
                                    <p key={index} className={classNames(classes.noMargin, classes.noMarginBottom, classes.grayNormalText)}>{note}</p>)
                              }
                            </div>
                          </Grid>}
                        </Grid>
                      </Grid>
                      {/* Technician photos */}
                      <Grid item xs={6}>
                        <Grid container>
                          {!!technicianImages.length && (
                            <Grid
                              item
                              xs={12}>
                              <div className={classes.addMargin}>
                                <p className={classes.attributeKey}>
                                  {'Technician\'s Photos'}
                                </p>
                                <BCDragAndDrop images={technicianImages.map((image: { imageUrl: string }) => image.imageUrl)} readonly={true} />
                              </div>
                            </Grid>)}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container className={classes.footerContainer}>
                  <img
                    className={classes.footerLogo}
                    alt={'logo'}
                    src={LogoSvg}
                  />
                  <p className={classes.footerText}>
                    {'Generated by BlueClerk'}
                  </p>
                </Grid>
              </Grid>
            </DataContainer>
          </Grid>
          <Grid container item xs={2}></Grid>
        </Grid>
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
          <CSButton
            variant="contained"
            onClick={downloadReport}
            color="primary">
            {'Download PDF'}
          </CSButton>

        </Grid>
        <EmailHistory emailHistory={jobReportData.emailHistory} />
      </PageContainer>
    </MainContainer>
  );
}

export default withStyles(styles, { 'withTheme': true })(BCJobReport);
