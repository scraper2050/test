import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  'dialogActions': {
    'padding': '15px 24px !important'
  },
  'dialogContent': {
    'padding': '8px 24px !important',
    'flexGrow': '1',
    'display': 'flex',
    'alignItems': 'center'
  },
  'formWrapper': {
    'display': 'flex',
    'flexDirection': 'column',
    'height': '100% !important',
  },
  'fabRoot': {
    'color': '#fff',
    'fontSize': '.775rem',
    'height': '34px',
    'padding': '0 12px',
    'textTransform': 'capitalize'
  },
  'label': {
    'fontSize': '16px !important',
    'marginBottom': '0 !important',
    'color': '#000000 !important'
  },
  'formGroup': {
    'margin': '1rem 0',
  }
});
