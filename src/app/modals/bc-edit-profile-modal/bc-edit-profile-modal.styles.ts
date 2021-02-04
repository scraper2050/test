import { Theme } from '@material-ui/core/styles';
import { fabRoot } from 'app/pages/main/main.styles';
export default (theme: Theme): any => ({
  ...fabRoot,
  'dialogActions': {
    'margin-top': '10px',
    'padding': '15px 50px !important'
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
  'uploadImageNoData': {
    'height': '219px',
    'width': '236px',
    'background': '#FFFFFF',
    'boxSizing': 'border-box',
    'borderRadius': '6px',
    'background-size': '100% 100%',
    'position': 'relative',
  },
  'hadImageUrl': {
    'position': 'absolute',
    'bottom': '0'
  }
});
