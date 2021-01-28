import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";
import NextIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    color: theme.palette.common.white,
  },
  title: {
    fontSize: 14,
  },
  cardBg: {
    padding: theme.spacing(6, 2),
    minHeight: 220,
  },
  cardActions: {
    minHeight: 50,
  },
  divider: {
    background: theme.palette.common.white,
    margin: theme.spacing(2, 0),
    height: 2,
  },
  list: {
    paddingInlineStart: "22px !important",
    "& li": {
      "&::marker": {
        fontSize: 22,
      },
    },
  },
}));

function BlueTagsCard({ items, index }: any) {
  const classes = useStyles();

  const getCardBackground = () => {
    switch (index) {
      case 0:
        return "#C4EBFE";
      case 1:
        return "#FCC108";
      case 2:
        return "#4DBD74";
      case 3:
        return "#F86C6B";
      default:
        return "";
    }
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent
        className={classes.cardBg}
        style={{ background: getCardBackground() }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Buy 100
        </Typography>
        <Typography className={classes.title}>TAGS</Typography>
        <Divider className={classes.divider} />

        <Typography gutterBottom>Dimensions</Typography>
        <ul className={classes.list}>
          <li>2 x 2 inches (square)</li>
          <li>1 inch (circle)</li>
        </ul>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Grid container justify="space-between" alignItems="center">
          <Button variant="text">Order Now</Button>
          <NextIcon color="action" fontSize="small" />
        </Grid>
      </CardActions>
    </Card>
  );
}

export default BlueTagsCard;
