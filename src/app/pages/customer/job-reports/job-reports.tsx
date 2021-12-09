import BCTableContainer from '../../../components/bc-table-container/bc-table-container';
import BCTabs from '../../../components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import { formatDatTimelll, formatDate } from 'helpers/format';
import { loadJobReportsActions } from 'actions/customer/job-report/job-report.action';
import styles from '../customer.styles';
import { Grid, withStyles } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import EmailReportButton from './email-job-report';
import { MailOutlineOutlined } from '@material-ui/icons';
import {CSButtonSmall, CSChip, useCustomStyles} from "../../../../helpers/custom";

function JobReportsPage({ classes, theme }: any) {
  const dispatch = useDispatch();
  const customStyles = useCustomStyles();
  const { loading, jobReports, error } = useSelector(({ jobReport }: any) =>
    jobReport);

  const [curTab, setCurTab] = useState(0);
  const history = useHistory();

  const location = useLocation<any>();

  const locationState = location.state;

  const prevPage = locationState && locationState.prevPage
    ? locationState.prevPage
    : null;

  const [currentPage, setCurrentPage] = useState({
    'page': prevPage
      ? prevPage.page
      : 0,
    'pageSize': prevPage
      ? prevPage.pageSize
      : 10,
    'sortBy': prevPage
      ? prevPage.sortBy
      : []
  });


  const columns: any = [
    {
      'Header': 'Job ID',
      'accessor': 'job.jobId',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Customer',
      'accessor': 'customerName',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Date',
      'id': 'job-date',
      'accessor': (originalRow: any, rowIndex: number) => formatDate(originalRow.jobDate),
      'sortable': true
    },
    {
      'Header': 'Technician',
      'accessor': (originalRow: any) => originalRow.job.tasks.length === 1 ? originalRow.job.tasks[0]?.technician?.profile?.displayName : 'Multiple Techs',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Cell'({ row }: any) {
        return `${row.original.emailHistory[0]?.sentAt
          ? formatDatTimelll(row.original.emailHistory.reverse()[0]?.sentAt)
          : 'N/A'}`;
      },
      'Header': 'Last Email Send Date',
      'accessor': 'emailHistory.sentAt',
      'className': 'font-bold'
    },
    {
      'Cell'({ row }: any) {
        return row.original.invoiceCreated
          ? row.original.invoice?.isDraft ?
            <CSChip
              label={'Draft'}
              style={{ 'backgroundColor': '#FA8029',
                'color': '#fff' }}
            />
            : <CSChip
              label={'Yes'}
              style={{ 'backgroundColor': theme.palette.success.light,
                'color': '#fff' }}
            />
          : <CSChip
            color={'secondary'}
            label={'No'}
          />;
      },
      'Header': 'Invoiced',
      'accessor': 'invoiceCreated',
      'className': 'font-bold',
      'width': 60
    },
    {
      Cell({ row }: any) {
        return (
          <div className={customStyles.centerContainer}>
            <EmailReportButton
              Component={<CSButtonSmall
                variant="contained"
                classes={{
                  'root': classes.emailButton
                }}
                color="primary"
                size="small">
                <MailOutlineOutlined
                  className={customStyles.iconBtn}
                />
              </CSButtonSmall>}
              jobReport={row.original}
            />
          </div>
        );
      },
      'id': 'action',
      'sortable': false,
      'width': 100
    }
  ];


  useEffect(() => {
    dispatch(loadJobReportsActions.fetch());
  }, []);


  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const handleViewMore = (row: any) => {
    const jobReportId = row.original._id;
    localStorage.setItem('nestedRouteKey', `${jobReportId}`);
    history.push({
      'pathname': `job-reports/${jobReportId}`,
      'state': {
        currentPage
      }
    });
  };

  const handleRowClick = (event: any, row: any) => handleViewMore(row);

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
          <BCTabs
            curTab={curTab}
            indicatorColor={'primary'}
            onChangeTab={handleTabChange}
            tabsData={[
              {
                'label': 'Job Report List',
                'value': 0
              }
              /*
               * {
               *   label: "Recent Activities",
               *   value: 1,
               * },
               */
            ]}
          />
          <SwipeableViews
            disabled
            index={curTab}>
            <div
              className={classes.dataContainer}
              hidden={curTab !== 0}
              id={'0'}>
              <BCTableContainer
                columns={columns}
                currentPage={currentPage}
                initialMsg={'There are no Job Report List'}
                isLoading={loading}
                onRowClick={handleRowClick}
                search
                searchPlaceholder={'Search Job Reports...'}
                setPage={setCurrentPage}
                tableData={jobReports}
              />
            </div>
            <div
              hidden={curTab !== 1}
              id={'1'}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                />
              </Grid>
            </div>
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles, { 'withTheme': true })(JobReportsPage);
