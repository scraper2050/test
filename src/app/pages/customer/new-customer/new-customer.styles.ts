import * as CONSTANTS from '../../../../constants';
import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  'paper': {
    'color': theme.palette.text.secondary,
    'padding': theme.spacing(1)
  },
  'root': {
    'flexGrow': 1
  },
  'subTitle': {
    'color': CONSTANTS.PRIMARY_DARK,
    'fontSize': '24px',
    'fontWeight': 'bold',
    'lineHeight': '30px',
    'margin': 0,
    'textDecoration': 'underline'
  }
});
