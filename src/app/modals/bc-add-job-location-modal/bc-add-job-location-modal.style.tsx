import * as CONSTANTS from '../../../constants';
import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  'label': {
    'fontSize': '16px !important',
    'marginBottom': '0 !important'
  },
  'mapLocation': {
    'display': 'flex',
    'flexDirection': 'column'
  },
  'mapWrapper': {
    'height': '100%'
  },
  'paper': {
    'color': theme.palette.text.secondary,
    'padding': '4px 8px'
  },
  'root': {
    'flexGrow': 1
  },
  'subTitle': {
    'color': CONSTANTS.PRIMARY_DARK,
    'fontSize': '20px',
    'fontWeight': 'bold',
    'lineHeight': '26px',
    'margin': 0,
    'textDecoration': 'underline'
  }
});
