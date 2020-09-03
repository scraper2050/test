import React from 'react';
import classNames from 'classnames';
import styles from './bc-admin-card.style';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea } from '@material-ui/core';

interface Props {
  cardText: string;
  classes: any;
  color: string;
  children?: React.ReactNode;
}

function BCAdminCard({ cardText, classes, color, children } : Props) {
  let circleClass: string = '';
  let textClass: string = '';

  if (color === 'primary') {
    circleClass = classNames(classes.circleBackground, classes.primaryBackground);
    textClass = classNames(classes.cardText, classes.primaryTextColor);
  } else if (color === 'secondary') {
    circleClass = classNames(classes.circleBackground, classes.secondaryBackground);
    textClass = classNames(classes.cardText, classes.secondaryTextColor);
  } else {
    circleClass = classNames(classes.circleBackground, classes.infoBackground);
    textClass = classNames(classes.cardText, classes.infoTextColor);
  }
  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardActionArea}>
        <div className={circleClass}>
          { children }
        </div>
        <p className={textClass}>
          { cardText }
        </p>
      </CardActionArea>
    </Card>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCAdminCard);
