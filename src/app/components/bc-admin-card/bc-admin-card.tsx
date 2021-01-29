import { Link } from 'react-router-dom';
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
  link?: string;
  func?: any;
}

function BCAdminCard({ cardText, classes, color, link, children, func }: Props) {
  let circleClass: string = '';
  let textClass: string = '';

  if (color === 'primary') {
    circleClass = classNames(classes.circleBackground, classes.primaryBackground);
    textClass = classNames(classes.cardText, classes.primaryTextColor);
  } else if (color === 'secondary') {
    circleClass = classNames(classes.circleBackground, classes.secondaryBackground);
    textClass = classNames(classes.cardText, classes.secondaryTextColor);
  } else if (color === 'primary-red') {
    circleClass = classNames(classes.circleBackground, classes.primaryRedBackground);
    textClass = classNames(classes.cardText, classes.primaryRedTextColor);
  } else if (color === 'primary-orange') {
    circleClass = classNames(classes.circleBackground, classes.primaryOrangeBackground);
    textClass = classNames(classes.cardText, classes.primaryOrangeTextColor);
  } else if (color === 'primary-green') {
    circleClass = classNames(classes.circleBackground, classes.primaryGreenBackground);
    textClass = classNames(classes.cardText, classes.primaryGreenTextColor);
  } else {
    circleClass = classNames(classes.circleBackground, classes.infoBackground);
    textClass = classNames(classes.cardText, classes.infoTextColor);
  }
  return (
    link ?
      <Link
        className={classes.link}
        to={link}
      >
        <Card className={classes.card}>
          <CardActionArea className={classes.cardActionArea}>
            <div className={circleClass}>
              {children}
            </div>
            <p className={textClass}>
              {cardText}
            </p>
          </CardActionArea>
        </Card>
      </Link>
      : func ?
        <Card className={classes.card} onClick={func} >
          <CardActionArea className={classes.cardActionArea}>
            <div className={circleClass}>
              {children}
            </div>
            <p className={textClass}>
              {cardText}
            </p>
          </CardActionArea>
        </Card> : null
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCAdminCard);
