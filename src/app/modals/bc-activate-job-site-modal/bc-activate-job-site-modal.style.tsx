import * as CONSTANTS from '../../../constants';
import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  'activeWarning': {
    color: CONSTANTS.PRIMARY_RED,
    fontSize: 150,
  },
  'inactiveWarning': {
    color: CONSTANTS.PRIMARY_GREEN,
    fontSize: 150,
  },
  'submittingButton': {
    backgroundColor: CONSTANTS.PRIMARY_GRAY,
  },
  'activeButton': {
    backgroundColor: CONSTANTS.PRIMARY_RED,
  },
  'inactiveButton': {
    backgroundColor: CONSTANTS.PRIMARY_GREEN,
  },
});
