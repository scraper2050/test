import {
  Button,
  Grid,
  withStyles
} from '@material-ui/core';
import React, {useState} from 'react';
import styles from './bc-job-request.styles';
import BCJobRequestMap from "./bc-job-request-map";
import BCJobRequestSummary from "./bc-job-request-summary";
import BCJobRequestGlass from "./bc-job-request-glass";
import BCJobRequestImages from "./bc-job-request-images";
import BCJobRequestFrame from "./bc-job-request-frame";
import BCJobRequestScreen from "./bc-job-request-screen";
import {ExpandLess} from "@material-ui/icons";



function BCJobRequestComponent({
  classes,
  jobRequest,
  customerContact,
}: {classes?: any, jobRequest: any, customerContact: any}): JSX.Element {
  const [collapseIndex, setCollapseIndex] = useState(0);
  return <>
    <BCJobRequestMap jobRequest={jobRequest} customerContact={customerContact} />
    <Button
      variant={'text'}
      classes={{
        root: classes.collapseAllButton,
        label: classes.collapseAllButtonLabel,
      }}
      onClick={() => setCollapseIndex(-1)}
    >
      collapse all
      <ExpandLess />
    </Button>
    <br />
    {jobRequest.windows.map((window: any, requestIndex: number, arr: Array<any>) =>
      <React.Fragment key={requestIndex}>
        <BCJobRequestSummary
          windowRequest={window}
          index={requestIndex + 1}
          isWindowServiceNeeded={jobRequest.isWindowServiceNeeded}
          collapsed={collapseIndex === requestIndex}
          onChangeCollapse={() => setCollapseIndex(index => index === requestIndex ? -1 : requestIndex)}
        />
        {collapseIndex === requestIndex && <>
          <BCJobRequestScreen screen={window.screen}/>
          {window.glass.windowType &&
          <BCJobRequestGlass glass={window.glass}/>
          }
          {window.glass?.frameColor &&
          <BCJobRequestFrame frame={window.glass.frameColor}/>
          }
          <BCJobRequestImages images={window.images}/>
        </>
        }
      </React.Fragment>
    )}
  </>
}

export default withStyles(
  styles,
  { 'withTheme': true },
)(BCJobRequestComponent);


