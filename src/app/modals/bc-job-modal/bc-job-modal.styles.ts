import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../constants";
export default (theme: Theme): any => ({
  'dialogActions': {
    'padding': '15px  24px 15px 0 !important'
  },
  'dialogContent': {
    'padding': '8px 24px !important'
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
  'fabRoot': {
    'color': '#fff',
    'width': '130px !important',
    'height': '34px',
    'fontSize': '16px !important',
    'padding': '0 12px',
    'textTransform': 'capitalize'
  },
  'dialogDescription': {
    'padding': '0 24px'
  },
  'label': {
    'fontSize': '16px !important',
    'marginBottom': '0 !important',
    'color': '#000000 !important'
  },
  'formGroup': {
    'margin': '.5rem 0 1rem 0',
  },
  'formWrapper': {
    'display': 'flex',
    'flexDirection': 'column',
    'height': '100% !important',
  },
  'uploadImageNoData': {
    'alignSelf': 'center',
    'height': '165px',
    'width': '200px',
    'background': '#FFFFFF',
    'boxSizing': 'border-box',
    'borderRadius': '6px',
    'background-size': '100% 100%',
    'position': 'relative',
    'marginTop': '1rem',
  },
  'tableContainer': {
    'maxHeight': '23rem'
  },
  'historyContainer': {
    'marginTop': '1rem'
  },
  'noteContainer': {
    'paddingLeft': '1.5rem',
  }
});
