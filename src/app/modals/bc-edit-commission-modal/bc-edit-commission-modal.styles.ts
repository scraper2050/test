import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../constants";

export default (theme: Theme): any => ({
  dialogActions: {
    padding: '25px  40px !important',
    backgroundColor: 'auto',
    justifyContent: 'space-between'
  },
  dialogContent: {
    borderTop: '1px solid #EAECF3',
    padding: '16px 100px 16px 100px !important',
  },
  modalPreview: {
    backgroundColor: '#EAECF3',
    padding: '35px 50px',
    margin: '0 0 15px 0',
  },
  previewCaption: {
    color: '#828282',
    marginBottom: '10px',
    textTransform:'uppercase',
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
    borderColor: '#D0D3DC',
    fontSize: '14px !important',
    padding: '13px 30px',
    textTransform:'none',
  },
  viewHistoryButton: {
    color: CONSTANTS.TABLE_ACTION_BUTTON,
    borderColor: '#D0D3DC',
    fontSize: '14px !important',
    padding: '13px 30px',
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
    minWidth: '80px !important',
    fontSize: '14px !important',
    padding: '13px 30px',
    textTransform:'none',
  },
  submitButtonDisabled : {
    color: `${CONSTANTS.PRIMARY_WHITE}  !important`,
    backgroundColor: `${CONSTANTS.TABLE_HOVER} !important`,
  },
  formField: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  fullWidth: {
    width: 100,
    marginBottom: '3px',
  },
  grey4 : {
    color: '#BDBDBD',
  },
  datePicker: {
    borderRadius: '8px',
    paddingRight: 0,
    '& .MuiInputBase-input': {
      padding: '14px 0 13px 13px !important',
    },
    '& button': {
      paddingLeft: 3,
      paddingRight: 3,
    },
  },
  inputCommision: {
    '& .MuiInputBase-input': {
      padding: '14px 0 13px 13px !important',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
  }
});
