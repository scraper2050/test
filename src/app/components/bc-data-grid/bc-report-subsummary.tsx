import {formatShortDateNoDay} from "../../../helpers/format";
import React from "react";
import {useSelector} from "react-redux";
import {withStyles} from "@material-ui/core";
import styles from "./styles";
import {CUSTOM_REPORT} from "./bc-data-grid";

interface Props {
  classes: any;
  reportData: CUSTOM_REPORT | null;
}

function BcReportSubSummary({classes, reportData}:Props) {
  const {companyName} = useSelector(({profile}: any) => profile);

  return <div className={classes.customSubSummaryContainer}>
    {reportData?.aging.map((data, index) => <div key={data.title}>
        <p className={classes.label}
           style={{fontSize: 10}}>{data.title}</p>
        <p className={classes.value}
           style={{margin: '10px 0', fontSize: 14}}>{data.value}</p>
      </div>
    )}
  </div>
}

export default withStyles(
  styles,
  {'withTheme': true}
)(BcReportSubSummary);
