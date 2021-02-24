import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../constants";
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
  },
  'uploadImageNoData': {
    'alignSelf': 'center',
    'height': '219px',
    'width': '236px',
    'background': '#FFFFFF',
    'boxSizing': 'border-box',
    'borderRadius': '6px',
    'background-size': '100% 100%',
    'position': 'relative',
  },
  'historyContainer': {
    'marginTop': '1rem'
  },
  'tableContainer': {
    'maxHeight': '30rem',
  },
  'deleteButton': {
    'background': '#C00707 !important',
    // 'borderRadius': '30px',
    'minWidth': '130px !important',
    'fontSize': '16px !important',
    'padding': '0 12px',
    'height': '34px',
    'color': CONSTANTS.PRIMARY_WHITE,
    'textTransform': 'capitalize',
    'marginRight': '1.5rem',
  },
});
