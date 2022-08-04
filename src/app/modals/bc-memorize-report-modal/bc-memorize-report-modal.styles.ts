import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../constants";

export default (theme: Theme): any => ({
  dialogActions: {
    padding: '35px 60px !important',
    backgroundColor: 'auto'
  },
  dialogContent: {
    padding: '20px 40px !important',
  },
  closeButton: {
    color: '#4F4F4F',
    marginRight: '10px',
    fontSize: '14px !important',
    padding: '12px 18px',
    textTransform:'none',
    borderRadius: '8px',
  },
  submitButton: {
    color: CONSTANTS.PRIMARY_WHITE,
    backgroundColor: `${CONSTANTS.TABLE_ACTION_BUTTON} !important`,
    borderColor: CONSTANTS.TABLE_ACTION_BUTTON,
    '&:hover': {
      backgroundColor: `${CONSTANTS.TABLE_ACTION_BUTTON_HOVER} !important`,
      borderColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
    },
    fontSize: '14px !important',
    padding: '12px 33px',
    textTransform:'none',
    borderRadius: '8px',
  },
  submitButtonDisabled : {
    color: `${CONSTANTS.PRIMARY_WHITE}  !important`,
    backgroundColor: `${CONSTANTS.TABLE_HOVER} !important`,
  },
});
