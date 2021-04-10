import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, withStyles } from '@material-ui/core';
import { formatDatTimelll, formatDateYMD, formatTime } from 'helpers/format';
import styles, {
  DataContainer,
  MainContainer,
  PageContainer
} from './job-reports.styles';


function BCJobReport({ classes, jobReportData }: any) {
  const history = useHistory();

  if (!jobReportData) {
    return null;
  }


  const { job, scans, purchaseOrders } = jobReportData;
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

  return (
    <MainContainer>
      <PageContainer>
        <DataContainer>
          <Grid container>
            <Grid
              item
              xs={12}>
              <p className={classes.reportTag}>
                {'Work Report'}
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
                  <div>
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
                  <div>
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
                  xs={6}>
                  <p className={classes.subTitle}>
                    {'job details'}
                  </p>
                </Grid>
                <Grid
                  item
                  xs={6}>
                  <div className={classes.mt_24}>
                    <strong>
                      {'Technician Name'}
                    </strong>
                    <p className={classes.noMargin}>
                      {job.technician.profile.displayName || 'N/A'}
                    </p>
                  </div>
                </Grid>
              </Grid>
              <Grid container>
                <Grid
                  item
                  xs={4}>
                  <div>
                    <strong>
                      {'Job Type'}
                    </strong>
                    <p className={classes.noMargin}>
                      {job.type.title || 'N/A'}
                    </p>
                  </div>
                </Grid>

                <Grid
                  item
                  xs={4}>
                  <div>
                    <strong>
                      {'Date'}
                    </strong>
                    <p className={classes.noMargin}>
                      {formatDateYMD(job.scheduleDate) || 'N/A'}
                    </p>
                  </div>
                </Grid>

                <Grid
                  item
                  xs={4}>
                  <div>
                    <strong>
                      {'Time'}
                    </strong>
                    <p className={classes.noMargin}>
                      {formatTime(job.scheduleDate) || 'N/A'}
                    </p>
                  </div>
                </Grid>
              </Grid>
              <Grid container>
                <Grid
                  item
                  xs={12}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Purchase Order Created'}
                    </strong>
                    <p className={classes.noMargin}>
                      {/* {jobReportData.purchaseOrder} */}
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
              <Grid container>
                <Grid
                  item
                  xs={6}>
                  <div className={classes.addMargin}>
                    <strong>
                      {'Start Time'}
                    </strong>
                    <p className={classes.noMargin}>
                      {formatDatTimelll(job.startTime) || 'N/A'}
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
                      {formatDatTimelll(job.endTime) || 'N/A'}
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
          <Button className={classes.invoiceBtn}>
            {'Email Report'}
          </Button>
          <Button className={classes.invoiceBtn}>
            {'Generate Invoice'}
          </Button>
        </Grid>
      </PageContainer>
    </MainContainer>
  );
}

export default withStyles(styles, { 'withTheme': true })(BCJobReport);
