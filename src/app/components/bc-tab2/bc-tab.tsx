import {
  Tab, Tabs, Theme,
  createStyles, withStyles
} from '@material-ui/core';

export const BCTabs = withStyles((theme: Theme) =>
  createStyles({
    'indicator': {
      'backgroundColor': theme.palette.primary.main,
      'height': 5
    },
    'root': {
      'borderBottom': '1px solid black',
      'textTransform': 'none'
    }
  }))(Tabs);

export const BCTab = withStyles((theme: Theme) =>
  createStyles({
    'root': {
      'textTransform': 'none'
    }
  }))(Tab);
