import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../constants";
import {
  ERROR_RED,
  GRAY2,
} from "../../../constants";

export default (theme: Theme): any => ({
  dialogActions: {
    padding: '25px  30px 25px 0 !important',
    backgroundColor: 'auto',
    borderWidth: 0,
  },
  dialogContent: {
    padding: '0 30px !important',
    maxHeight: '60vh',
    overflowY: 'auto !important',
  },
  closeButton: {
    color: GRAY2,
    borderColor: GRAY2,
    padding: '6px 24px',
    textTransform:'none',
    borderRadius: 8,
  },
  submitButton: {
    color: CONSTANTS.PRIMARY_WHITE,
    backgroundColor: `${CONSTANTS.TABLE_ACTION_BUTTON} !important`,
    borderColor: CONSTANTS.TABLE_ACTION_BUTTON,
    '&:hover': {
      backgroundColor: `${CONSTANTS.TABLE_ACTION_BUTTON_HOVER} !important`,
      borderColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
    },
    padding: '6px 24px',
    borderRadius: 8,
    textTransform:'none',
  },
  submitButtonDisabled : {
    color: `${CONSTANTS.PRIMARY_WHITE}  !important`,
    backgroundColor: `${CONSTANTS.TABLE_HOVER} !important`,
  },
  fullWidth: {
    width: '100%',
    marginBottom: '3px',
  },
  grey4 : {
    color: '#BDBDBD',
  },
  checkbox: {
    padding: '0 10px 0 0',
  },
  syncIcon: {
    fontSize: 28,
  },
  tooltip: {
    backgroundColor: ERROR_RED,
    color: 'white',
  },
  warningContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ERROR_RED,
    fontSize: 14
  }
});
