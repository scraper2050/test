import React from "react";
import {Grid, Typography, withStyles} from "@material-ui/core";
import classNames from "classnames";
import BCDragAndDrop from "../../bc-drag-drop/bc-drag-drop";
import styles from "./bc-job-request-repair.styles";

interface PROPS {
  classes?: any,
  jobRequest: any,
}

function BcJobRequestRepair({
   classes,
   jobRequest,
 }: PROPS): JSX.Element {

  return <>
    {jobRequest.requests.map((request: any, requestIndex: number, arr: Array<any>) =>
      <React.Fragment key={requestIndex}>
        <Grid container className={'modalContent'} justify={'space-around'}>
          <Grid item xs={12} sm={8}>
            <Typography variant={'caption'}
                        className={'previewCaption'}>{`Job Request ${requestIndex + 1}`}</Typography>
            <Typography variant={'h6'}
                        className={'previewText'}>{request.category}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}/>
        </Grid>
        <Grid container
              className={classNames(['modalContent', 'modalContentBottom'])}
              justify={'space-around'}>
          <Grid item xs={12} sm={8}>
            <Typography variant={'caption'}
                        className={'previewCaption'}>{'Notes'}</Typography>
            <Typography>
              {request.note}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant={'caption'}
                        className={'previewCaption'}>photo(s)</Typography>
            <BCDragAndDrop
              images={request.images?.length ? request.images.map((image: any) => image.imageUrl) : []}
              readonly={true}/>
          </Grid>
        </Grid>
        <Grid container className={'modalContent'} justify={'space-around'}>
          <Grid item xs={12}>
            {requestIndex !== arr.length - 1 &&
            <div style={{borderBottom: '1px solid #bdbdbd'}}/>}
          </Grid>
        </Grid>
      </React.Fragment>
    )}
  </>
}

export default withStyles(
  styles,
  { 'withTheme': true },
)(BcJobRequestRepair);
