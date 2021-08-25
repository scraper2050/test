import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../constants";

export default (theme: Theme): any => ({
  dialogActions: {
    padding: '15px  24px 15px 0 !important',
    backgroundColor: 'auto'
  },
  dialogContent: {
    padding: '8px 75px !important',
  },
  modalPreview: {
    backgroundColor: '#EAECF3',
    padding: '35px 50px',
    margin: '15px 0',
  },
  previewCaption: {
    color: '#828282',
    marginBottom: '10px',
  },
  previewCaption2: {
    color: '#828282',
    marginBottom: '5px',
  },
  previewText: {
    color: '#4F4F4F',
  },
  previewTextSm: {
    color: '#4F4F4F',
    marginBottom: '5px',
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
  submitButtonDisabled : {
    color: `${CONSTANTS.PRIMARY_WHITE}  !important`,
    backgroundColor: `${CONSTANTS.TABLE_HOVER} !important`,
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
