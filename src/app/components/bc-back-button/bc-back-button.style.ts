import * as CONSTANTS from '../../../constants';
import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  'roundBackground': {
    'backgroundColor': CONSTANTS.PRIMARY_BLUE,
    'borderRadius': '50%',
    'color': 'white',
    'height': '28px',
    'width': '28px',
    '&:hover': {
      'opacity': '0.7',
      'backgroundColor': CONSTANTS.PRIMARY_BLUE
    }
  },
  'centerIcon': {
    'display': 'flex',
    'align-items': 'center',
    'margin-right': '15px',
  },
  'centerWithBackground': {
    'backgroundColor': CONSTANTS.PRIMARY_BLUE,
    'borderRadius': '50%',
    'color': 'white',
    'height': '28px',
    'width': '28px',
    'display': 'flex',
    'align-items': 'center',
    'margin-right': '15px',
  }
});
