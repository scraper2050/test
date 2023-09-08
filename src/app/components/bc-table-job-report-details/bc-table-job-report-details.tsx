import React from 'react';
import './bc-table-job-report-details.css';

function JobReportTable({ data, classes }: any) {
  return (
    <table className={'custom-table'}>
      <thead>
        <tr>
          <th className={'no-left-padding'}>{'TECHNICIAN(S) NAME(S) '}</th>
          <th>{'JOB TYPE(S) '}</th>
          <th>{'QUANTITY '}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) =>
          <tr key={index}>
            <td className={classes.grayBoldTextM_0}> {row.displayName || ''} </td>
            <td className={classes.grayBoldTextM_0}> {row.jobType || ''} </td>
            <td className={classes.grayBoldTextM_0}> {row.quantity || ''} </td>
          </tr>)}
      </tbody>
    </table>
  );
}
export default JobReportTable;
