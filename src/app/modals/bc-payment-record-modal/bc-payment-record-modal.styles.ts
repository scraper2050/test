import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../constants";

export default (theme: Theme): any => ({
  'dialogActions': {
    'padding': '15px  24px 15px 0 !important',
    backgroundColor: 'auto'
  },
  'dialogContent': {
    'padding': '8px 75px !important',
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
  'goToJobsButton': {
    'background': 'rgb(0, 170, 255) !important',
    // 'borderRadius': '30px',
    'minWidth': '130px !important',
    'fontSize': '16px !important',
    'padding': '0 12px',
    'height': '34px',
    'color': CONSTANTS.PRIMARY_WHITE,
    'textTransform': 'capitalize',
    'marginRight': '1.5rem',
  },
  closeButton: {
    color: '#4F4F4F',
    borderColor: '#4F4F4F',
    width: '130px !important',
    height: '34px',
    fontSize: '16px !important',
    padding: '0 12px',
    textTransform:'none',
  },
  submitButton: {
    color: CONSTANTS.PRIMARY_WHITE,
    backgroundColor: `${CONSTANTS.TABLE_ACTION_BUTTON} !important`,
    borderColor: CONSTANTS.TABLE_ACTION_BUTTON,
    '&:hover': {
      backgroundColor: `${CONSTANTS.TABLE_ACTION_BUTTON_HOVER} !important`,
      borderColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
    },
    width: '130px !important',
    height: '34px',
    fontSize: '16px !important',
    padding: '0 12px',
    textTransform:'none',
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
  },
  formField: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  fullWidth: {
    width: '100%',
  },
  grey4 : {
    color: '#BDBDBD',
  }
});
