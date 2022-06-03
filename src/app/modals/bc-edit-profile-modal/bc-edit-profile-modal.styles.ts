import { Theme } from '@material-ui/core/styles';
import { fabRoot } from 'app/pages/main/main.styles';
import * as CONSTANTS from "../../../constants";
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
  },
  closeButton: {
    color: '#4F4F4F',
    borderColor: '#4F4F4F',
    width: '110px !important',
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
    minWidth: '110px !important',
    height: '34px',
    fontSize: '16px !important',
    padding: '0 12px',
    textTransform:'none',
  },
  submitButtonDisabled : {
    color: `${CONSTANTS.PRIMARY_WHITE}  !important`,
    backgroundColor: `${CONSTANTS.TABLE_HOVER} !important`,
  },
});
