import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  'paper': {
    'color': theme.palette.text.secondary,
    'padding': theme.spacing(1)
  },
  'root': {
    'flexGrow': 1
  }
});
