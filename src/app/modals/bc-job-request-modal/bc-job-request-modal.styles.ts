import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../constants";
import {GRAY4, PRIMARY_WHITE} from "../../../constants";
export default (theme: Theme): any => ({
  relative: {
    position: 'relative',
  },
  addJobTypeButton: {
    width: '100%',
    border: '1px dashed #BDBDBD',
    borderRadius: 8,
    textTransform: 'none',
  },
  removeJobTypeButton: {
    position: 'absolute',
    right: 16,
    top: 28,
  },
  noteContainer: {
    'paddingLeft': '1.5rem',
  },
  lastContent: {
    marginTop: -10,
    marginBottom: 35,
    padding: '10px 16px',
  },
  innerRow: {
    paddingTop: 15,
    paddingRight: 30,
  },
  lastRow: {
    marginBottom: '35px !important',
  },
  actionsList: {
    margin: '4px 0 4px 4px',
    padding: 0,
  },
  taskList: {
    padding: '5px 50px',
  },
  task: {
    padding: '0 0 5px 0 !important',
    // borderBottom: '0.5px solid #E0E0E0',
  },
  editButtonPadding: {
    paddingTop: 20,
  },
  editButton: {
    color: '#828282',
  },
  editButtonText: {
    textTransform: 'none',
  },
  markCompleteContainer: {
    flex: 1,
    textAlign: 'left'
  },
  actionsContainer: {
    flex: 2,
  },
  tableContainer: {
    'maxHeight': '30rem',
  },
  popper: {
    '& li[aria-disabled="true"]': {
      paddingTop: 0,
      paddingBottom: 0,
    }
  },
  dialogActions: {
    padding: '35px 60px !important',
    backgroundColor: 'auto'
  },
  closeButton: {
    color: '#4F4F4F',
    marginRight: '10px',
    height: '34px',
    fontSize: '14px !important',
    padding: '12px 18px 12px 18px',
    textTransform:'none',
    borderRadius: 8,
  },
  purpleButton: {
    color: CONSTANTS.PRIMARY_WHITE,
    backgroundColor: CONSTANTS.BUTTON_PURPLE,
    '&:hover': {
      backgroundColor: CONSTANTS.BUTTON_PURPLE_HOVER,
    },
  },
  grayButton: {
    color: CONSTANTS.PRIMARY_WHITE,
    backgroundColor: CONSTANTS.PRIMARY_WHITE,
    '&:hover': {
      backgroundColor: CONSTANTS.GRAY4,
    },
  },
  darkButtonLabel: {
    color: 'black',
  },
  submitButton: {
    height: '34px',
    fontSize: '14px !important',
    padding: '12px 25px 12px 25px',
    textTransform:'none',
    borderRadius: 8,
  },
  submitButtonDisabled : {
    color: `${CONSTANTS.PRIMARY_WHITE}  !important`,
    backgroundColor: `${CONSTANTS.TABLE_HOVER} !important`,
  },
});
