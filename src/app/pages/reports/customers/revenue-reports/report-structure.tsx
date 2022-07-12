import React from 'react';
import { withStyles, createStyles } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';

import * as CONSTANTS from '../../../../../constants';
import { formatCurrency, formatReportDate } from 'helpers/format'; 
import styles from './revenue.styles';
import BCTableContent from 'app/components/bc-table-container/bc-table-content'

interface ReportProps {
  classes: any;
  data: any;
}

const reportStyles = makeStyles((theme: Theme) =>
  createStyles({
    topContainer: {
      backgroundColor: CONSTANTS.INVOICE_TOP,
    },
    bottomContainer: {
      backgroundColor: CONSTANTS.PRIMARY_WHITE,
    },
    dataRow: {
      paddingTop: 30,
      paddingBottom: 33,
      paddingLeft: 48,
      paddingRight: 48,
      borderBottom: '1px solid #EAECF3',
      display: 'flex',
    },
    dataCell: {
      width: 200,
    },
    dataTitle: {
      fontSize: 10,
      fontWeight: 400,
      color: '#828282',
      marginBottom: 12,
    },
    dataValue: {
      fontSize: 14,
      fontWeight: 500,
      color: '#4F4F4F',
    },
    titleCell: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      flexDirection: 'column',
    },
  })
);

const ReportStructure = ({classes, data}:ReportProps) => {
  const reportStyle = reportStyles();

  const columns: any = [
    {
      'accessor': 'customer.profile.displayName',
    },
    {
      Cell({ row }: any) {
        const totalAmount = formatCurrency(row.original.total);
        return totalAmount;
      },
      'accessor': 'total',
    }
  ];

  return (
    <>
      <div className={reportStyle.topContainer}>
        {/* <pre>
          {JSON.stringify(data, null, 2)}
        </pre> */}
        <div className={reportStyle.dataRow}>
          <div className={classNames(reportStyle.dataCell, reportStyle.titleCell)}>
            <div className={reportStyle.dataTitle}>
              REVENUE FROM
            </div>
            <div className={reportStyle.dataValue}>
              Income
            </div>
          </div>
          <div className={classNames(reportStyle.dataCell, reportStyle.titleCell)} style={{ width: 400}}>
            <div className={reportStyle.dataTitle}>
              PERIOD
            </div>
            <div className={reportStyle.dataValue}>
              {data?.filter?.startDate && data?.filter?.endDate ? (
                `${formatReportDate(data.filter.startDate)} - ${formatReportDate(data.filter.endDate)}`
              ) : 'All Time'}
            </div>
          </div>
          <div className={reportStyle.dataCell}>
            <div className={reportStyle.dataTitle} style={{ fontSize: 20}}>
              TOTAL REVENUE
            </div>
            <div className={reportStyle.dataValue} style={{ fontSize: 28}}>
              {formatCurrency(data.report.totalIncome)}
            </div>
          </div>
        </div>
      </div>
      <div className={reportStyle.bottomContainer}>
        <div className={reportStyle.dataRow}>
          <div className={reportStyle.dataCell}>
            <div className={reportStyle.dataTitle}>
              INVOICED
            </div>
            <div className={reportStyle.dataValue}>
              {formatCurrency(data.report.totalIncome)}
            </div>
          </div>
          <div className={reportStyle.dataCell}>
            <div className={reportStyle.dataTitle}>
              CUSTOMERS
            </div>
            <div className={reportStyle.dataValue}>
              {data.report.customerCount}
            </div>
          </div>
          <div className={reportStyle.dataCell}>
            <div className={reportStyle.dataTitle}>
              JOBS
            </div>
            <div className={reportStyle.dataValue}>
              {data.report.jobCount}
            </div>
          </div>
        </div>
        {data?.report?.customers && (
          <BCTableContent 
            noHeader
            onRowClick={()=>null}
            columns={columns}
            data={data.report.customers}
          />
        )}
      </div>
    </>
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(ReportStructure);