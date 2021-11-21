import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../constants";

export default (theme: Theme): any => ({
  dialogActions: {
    borderTop: '1px solid #bdbdbd',
    textAlign: 'right',
    padding: '25px  56px',
    backgroundColor: 'auto',

  },
  dialogContent: {
    padding: '8px 200px !important',
  },
  modalPreview: {
    backgroundColor: '#EAECF3',
    padding: '35px 50px',
    margin: '0',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: '35px 50px 0 50px',
    margin: '0',
  },
  lastContent: {
    marginBottom: 35,
  },
  previewCaption: {
    color: '#828282',
    marginBottom: '10px',
    textTransform:'uppercase',
  },
  bigText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  previewTextTitle: {
    marginTop: 8,
    color: '#4F4F4F',
    fontSize: 16,
  },
  previewText: {
    color: '#4F4F4F',
    fontSize: 16,
  },
  description: {
    maxHeight: 80,
    overflowY: 'auto',
  },
  jobTypeText: {
    fontSize: 12,
    backgroundColor: '#F2F2F2',
    marginRight: 2,
    padding: '4px 8px',
    borderRadius: 8,
    display: 'inline-block',
  },
  jobImageWrapper: {
    padding: 10,
    height: 220,
    width: '80%',
    borderRadius: 10,
    border: '1px solid #BDBDBD',
    textAlign:'center',
  },
  jobImage: {
    height: 200,
    objectFit: 'contain',
  },
  actionsList: {
    margin: '4px 0 4px 4px',
    padding: 0,
  },
  previewTextSm: {
    color: '#4F4F4F',
    marginBottom: '5px',
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
  formField: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  fullWidth: {
    width: '100%',
    marginBottom: '3px',
  },
  grey4 : {
    color: '#BDBDBD',
  }
});
