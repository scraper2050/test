import React from 'react';
import styles from './bc-button-dashboard.style';
import { Grid, StyledComponentProps, withStyles } from "@material-ui/core";

interface Props {
  classes: any;
  text: string;
  icon?: JSX.Element;
  onClick: any;
}
function BCButtonDashboard(props: Props) {
  const {
    classes,
    text,
    icon,
    onClick
  } = props;

  return (
    <Grid
      container
      alignItems="center"
      className={`${classes.buttonContainer} elevation-1`}
      onClick={onClick}>
      {
        icon &&
        <Grid item className={classes.iconContainer}>
          {icon}
        </Grid>
      }

      <Grid item>
        {text}
      </Grid>
    </Grid>
  )
}


export default withStyles(
  styles,
  { 'withTheme': true }
)(BCButtonDashboard);