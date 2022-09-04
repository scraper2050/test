import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../constants";
import {GRAY2, PRIMARY_BLUE} from "../../../constants";

export default (theme: Theme): any => ({
  dialogActions: {
    padding: '25px  40px 25px 0 !important',
    backgroundColor: 'auto'
  },
  dialogContent: {
    padding: '8px 150px !important',
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
  }
});
