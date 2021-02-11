import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../constants";
export default (theme: Theme): any => ({
  'dialogActions': {
    'margin-top': '10px',
    'padding': '15px 24px !important'
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
    'background': '#C00707 !important',
    // 'borderRadius': '30px',
    'width': '130px !important',
    'height': '34px',
    'fontStyle': 'normal',
    'fontWeight': 'normal',
    'fontSize': '20px',
    'lineHeight': '30px',
    'marginBottom': '6px',
    'color': CONSTANTS.PRIMARY_WHITE,
  },
  selectContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    'fontSize': '16px !important',
    'fontWeight': 'bold',
    'color': '#000000 !important'
  }

});
