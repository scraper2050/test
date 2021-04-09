import React from 'react';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import { useHistory } from 'react-router-dom';
import { Button, Grid, withStyles } from '@material-ui/core';
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
  const goBack = () => {
    const prevKey: any = localStorage.getItem('prevNestedRouteKey');
    const linkKey: any = localStorage.getItem('nestedRouteKey');

    localStorage.setItem('prevNestedRouteKey', linkKey);
    localStorage.setItem('nestedRouteKey', prevKey);


    const jobEquipmentInfo = linkKey.includes('job-equipment-info');


    if (jobEquipmentInfo) {
      history.push({
        'pathname': `/main/customers/${jobReportData.job.customer}/job-equipment-info/reports`
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
                      {jobReportData.job.customer}
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
                      {jobReportData.company.company.contact.phone || 'N/A'}
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
                      {'Customer Email'}
                      {/* {jobReportData.customerEmail} */}
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
                      {jobReportData.address}
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
                      {jobReportData.technicianName}
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
                      {jobReportData.jobType}
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
                      {jobReportData.formatJobDate}
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
                      {jobReportData.formatJobTime}
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
                      {jobReportData.purchaseOrder}
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
                      {jobReportData.serviceTicket
                        ? jobReportData.serviceTicket.note
                        : 'N/A'}
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
                      {jobReportData.recordNote}
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
                      {jobReportData.startTime}
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
                      {jobReportData.endTime}
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
              {'company'}
            </p>
            <Grid container>
              <Grid
                item
                xs={3}>
                <div className={classes.avatarArea}>
                  <div
                    className={classes.imgArea}
                    style={{
                      'backgroundImage': `url(${jobReportData.companyLogo})`
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
                        {' '}
                      </strong>
                      {' '}
                      <p className={classes.m_0}>
                        {jobReportData.companyName}
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
                        {' '}
                      </strong>
                      {' '}
                      <p className={classes.m_0}>
                        {jobReportData.companyEmail}
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
                        {' '}
                      </strong>
                      {' '}
                      <p className={classes.m_0}>
                        {jobReportData.companyPhone}
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
                        {' '}
                      </strong>
                      {' '}
                      <p className={classes.m_0}>
                        {jobReportData.companyFax || 'N/A'}
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
                        {' '}
                      </strong>
                      {' '}
                      <p className={classes.m_0}>
                        {jobReportData.companyAddress.street}
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
                        {' '}
                      </strong>
                      {' '}
                      <p className={classes.m_0}>
                        {jobReportData.companyAddress.city}
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
                        {' '}
                      </strong>
                      {' '}
                      <p className={classes.m_0}>
                        {jobReportData.companyAddress.state}
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
                        {' '}
                      </strong>
                      {' '}
                      <p className={classes.m_0}>
                        {jobReportData.companyAddress.zipCode}
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
              {'work performed'}
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
                  {jobReportData.location}
                </p>
              </Grid>

              <Grid
                item
                xs={2}>
                <strong>
                  {'Date'}
                </strong>
                <p>
                  {jobReportData.formatworkPerformedDate}
                </p>
              </Grid>

              <Grid
                item
                xs={2}>
                <strong>
                  {'Time of Scan'}
                </strong>
                <p>
                  {jobReportData.formatworkPerformedTimeScan}
                </p>
              </Grid>

              <Grid
                item
                xs={2}>
                <strong>
                  {'Image'}
                </strong>
                <p>
                  {jobReportData.workPerformedImage === 'N/A'
                    ? <WallpaperIcon className={classes.smallIcon} />
                    : jobReportData.workPerformedImage
                  }
                </p>
              </Grid>

              <Grid
                item
                xs={3}>
                <strong>
                  {'Note'}
                </strong>
                <p>
                  {jobReportData.workPerformedNote}
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
