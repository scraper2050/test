import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  'dialogActions': {
    'margin-top': '10px',
    'padding': '15px 24px !important'
  },
  'dialogContent': {
    'padding': '8px 24px !important'
  },
  'fabRoot': {
    'color': '#fff',
    'fontSize': '.775rem',
    'height': '34px',
    'padding': '0 12px',
    'textTransform': 'capitalize'
  },
  'dialogDescription': {
    'padding': '0 24px'
  },
  'label': {
    'fontSize': '16px !important',
    'marginBottom': '0 !important'
  },
  'paper': {
    'color': theme.palette.text.secondary,
    'minWidth': '70%'
  },
});
