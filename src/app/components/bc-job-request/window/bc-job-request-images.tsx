import {Grid, Typography, withStyles} from '@material-ui/core';
import React from 'react';
import styles from './bc-job-request.styles';
import {Line, Tab} from "./bc-components";
import BCDragAndDrop from "../../bc-drag-drop/bc-drag-drop";

function BCJobRequestImages({
                             classes,
                             images,
                             index,
                           }: any): JSX.Element {

  return <Grid container direction={'column'} className={classes.gridWrapper}>
    <Line />
    <Grid item xs={12} sm={4}>
      <br/>
      <Typography variant={'caption'} className={'previewCaption'}>images(s)</Typography>
      <br/>
      <BCDragAndDrop images={images?.length ? images.map((image: any) => image.imageUrl) : []} readonly={true} />
    </Grid>
  </Grid>
}

export default withStyles(
  styles,
  {'withTheme': true},
)(BCJobRequestImages);


