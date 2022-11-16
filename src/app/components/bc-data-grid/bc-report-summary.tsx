import {formatShortDateNoDay} from "../../../helpers/format";
import React from "react";
import {useSelector} from "react-redux";
import {withStyles} from "@material-ui/core";
import styles from "./styles";

interface Props {
  classes: any;
  asOf: string;
  bucket: string | null;
  selectedCustomer: any,
  customers: any[];
  selectedLocation: any;
  total?: string;
}

function BcReportSummary({classes, asOf, bucket, selectedCustomer, customers, selectedLocation, total}:Props) {
  const {companyName} = useSelector(({profile}: any) => profile);

  return <div className={classes.customSummaryContainer}>
    <div className={classes.customSummaryColumn}>
      <p className={classes.customSummaryTitle}>{companyName}</p>
      <p className={classes.customSummaryLabel}>As Of</p>
      <p
        className={classes.customSummaryValue}>{formatShortDateNoDay(asOf)}</p>
    </div>
    <div className={classes.customSummaryColumn}>
      <p className={classes.customSummaryTitle}>&nbsp;</p>
      <p
        className={classes.customSummaryLabel}>Customer{bucket ? '' : '(s)'}</p>
      {selectedCustomer ?
        <p
          className={classes.customSummaryValue}>{selectedCustomer?.profile?.displayName}</p>
        : customers.length ?
          customers.map((customer: any) =>
            <p
              className={classes.customSummaryValue}>{customer?.profile?.displayName}</p>)
          : 'All'
      }
    </div>
    {selectedLocation &&
    <div className={classes.customSummaryColumn}>
      <p className={classes.customSummaryTitle}>&nbsp;</p>
      <p
        className={classes.customSummaryLabel}>Subdivision</p>
      <p
        className={classes.customSummaryValue}>{selectedLocation.name}</p>
    </div>
    }
    {bucket ? <>
        <div className={classes.customSummaryColumn}>
          <p className={classes.customSummaryTitle}>&nbsp;</p>
          <p
            className={classes.customSummaryLabel}>{bucket} {bucket.indexOf('-') > 0 ? 'days past due' : ''}</p>
        </div>
      </> :
      <div/>
    }
    <div className={classes.customSummaryColumn}
         style={{alignItems: 'flex-end'}}>
      <p className={classes.customSummaryTitle}>A/R REPORT</p>
      <p className={classes.customSummaryTotalLabel}>Total Outstanding</p>
      <p
        className={classes.customSummaryTotalValue}>{total}</p>
    </div>
  </div>
}

export default withStyles(
  styles,
  {'withTheme': true}
)(BcReportSummary);
