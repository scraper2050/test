import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../constants";
export default (theme: Theme): any => ({
  'dialogActions': {
    'margin-top': '55px',
    'padding': '28px 44px !important',
    'border-top': '1px solid #D0D3DC'
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
    'marginBottom': '0 !important',
    'color': '#000000 !important'
  },
  'paper': {
    'color': theme.palette.text.secondary,
    'minWidth': '70%'
  },
  'deleteButton': {
    'background': CONSTANTS.PRIMARY_WHITE,
    'color': CONSTANTS.INVOICE_HEADING,
    'fontStyle': 'normal',
    'fontWeight': 'normal',
    'fontSize': '14px',
    'lineHeight': '27px',
    'border': '1px solid #4F4F4F',
    'border-radius': '8px',
    'textTransform': 'none'
  },
  'saveButton': {
    'color': CONSTANTS.PRIMARY_WHITE,
    'fontStyle': 'normal',
    'fontWeight': 'normal',
    'fontSize': '14px',
    'lineHeight': '30px',
    'border-radius': '8px',
    'textTransform': 'none',
    'width': '80px'
  },
  selectContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    'fontSize': '16px !important',
    'fontWeight': 'bold',
    'color': '#000000 !important'
  },
  'contact-modal-title': {
    padding: '150px 0px'
  }

});
