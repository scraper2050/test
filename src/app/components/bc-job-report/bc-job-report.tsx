import { Grid, withStyles } from "@material-ui/core";
import styles, {
  MainContainer,
  PageContainer,
  DataContainer,
} from "./job-reports.styles";
import React from "react";
import WallpaperIcon from "@material-ui/icons/Wallpaper";

function BCJobReport({ classes, jobReportData }: any) {
  return (
    <>
      <MainContainer>
        <PageContainer>
          <DataContainer>
            <Grid container>
              <Grid item xs={12}>
                <p className={classes.reportTag}>
                  Work Report #{jobReportData.workReport}
                </p>
              </Grid>

              <Grid className={classes.paper} item xs={6}>
                <p className={classes.subTitle}>{"customer information"}</p>
                <Grid container>
                  <Grid item xs={5}>
                    <div>
                      <strong>Name</strong>
                      <p className={classes.noMargin}>
                        {jobReportData.customerName}
                      </p>
                    </div>

                    {jobReportData.workPerformedImage === "N/A" ? (
                      <WallpaperIcon className={classes.largeIcon} />
                    ) : (
                      jobReportData.workPerformedImage
                    )}
                  </Grid>

                  <Grid item xs={7}>
                    <div>
                      <strong>Phone Number</strong>
                      <p className={classes.noMargin}>
                        {jobReportData.customerPhoneNumber}
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
                  </Grid>
                </Grid>
              </Grid>

              <Grid className={classes.paper} item xs={6}>
                <p className={classes.subTitle}>{"job details"}</p>
                <Grid container>
                  <Grid xs={4}>
                    <div>
                      <strong>Job Type</strong>
                      <p className={classes.noMargin}>
                        {jobReportData.jobType}
                      </p>
                    </div>
                  </Grid>

                  <Grid xs={4}>
                    <div>
                      <strong>Date</strong>
                      <p className={classes.noMargin}>
                        {jobReportData.jobDate}
                      </p>
                    </div>
                  </Grid>

                  <Grid xs={4}>
                    <div>
                      <strong>Time</strong>
                      <p className={classes.noMargin}>
                        {jobReportData.jobTime}
                      </p>
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.addMargin}>
                    <strong>Technician Name</strong>
                    <p className={classes.noMargin}>
                      {jobReportData.technicianName}
                    </p>
                  </div>

                  <div className={classes.addMargin}>
                    <strong>Recorded Note</strong>
                    <p className={classes.noMargin}>
                      {jobReportData.recordNote}
                    </p>
                  </div>

                  <div className={classes.addMargin}>
                    <strong>Purchase Order Created</strong>
                    <p className={classes.noMargin}>
                      {jobReportData.purchaseOrderCreated}
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid className={classes.paper} item xs={12}>
              <p className={classes.subTitle}>{"company"}</p>
              <div>
                <strong className={classes.noMargin}>Name </strong>{" "}
                <span>{jobReportData.companyName}</span>
              </div>

              <div>
                <strong className={classes.noMargin}>Email </strong>{" "}
                <span>{jobReportData.companyEmail}</span>
              </div>

              <div>
                <strong className={classes.noMargin}>Phone </strong>{" "}
                <span>{jobReportData.companyPhone}</span>
              </div>
            </Grid>

            <Grid className={classes.paper} item xs={12}>
              <p className={classes.subTitle}>{"work performed"}</p>
              <Grid container className={classes.addMargin}>
                <Grid item xs={3}>
                  <strong>Unit Number/Location</strong>
                  <p>{jobReportData.workPerformedLocation}</p>
                </Grid>

                <Grid item xs={2}>
                  <strong>Date</strong>
                  <p>{jobReportData.workPerformedDate}</p>
                </Grid>

                <Grid item xs={2}>
                  <strong>Time of Scan</strong>
                  <p>{jobReportData.workPerformedTimeScan}</p>
                </Grid>

                <Grid item xs={2}>
                  <strong>Image</strong>
                  <p>
                    {jobReportData.workPerformedImage === "N/A" ? (
                      <WallpaperIcon className={classes.smallIcon} />
                    ) : (
                      jobReportData.workPerformedImage
                    )}
                  </p>
                </Grid>

                <Grid item xs={3}>
                  <strong>Note</strong>
                  <p>{jobReportData.workPerformedNote}</p>
                </Grid>
              </Grid>
            </Grid>
          </DataContainer>
        </PageContainer>
      </MainContainer>
    </>
  );
}

export default withStyles(styles, { withTheme: true })(BCJobReport);
