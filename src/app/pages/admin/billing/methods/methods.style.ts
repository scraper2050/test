import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../../../constants";
import { fabRoot, pageContainer, pageContent, pageMainContainer } from 'app/pages/main/main.styles';
export default (theme: Theme): any => ({
  ...fabRoot,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,
  'addButtonArea': {
    'display': 'flex',
    'justifyContent': 'flex-end',
    'padding': '12px 30px 5px 0',
    'position': 'absolute',
    'right': '0',
    'zIndex': '1000'
  },
  'fabRoot': {
    'color': '#fff',
    'fontSize': '.775rem',
    'height': '34px',
    'padding': '0 12px',
    'textTransform': 'capitalize'
  },
  'subTitle': {
    'color': CONSTANTS.PRIMARY_DARK,
    'fontFamily': 'Roboto',
    'fontSize': '30px',
    'fontStyle': 'normal',
    'fontWeight': '500',
    'lineHeight': '35px',
    'letterSpacing': '0px',
    'textAlign': 'left',
    'margin': '0 0 1rem 0',

  },
  'container': {
    'display': 'flex',
    'flexDirection': 'column',
    'height': '100%'
  },
  'contentContainer': {
    'margin': '0 auto !important',
    'flexGrow': 1,

  },
  'boxContainer': {
    'border': '1px solid #C4C4C4',
    'margin': '2rem 5rem'
  },
  'header': {
    'borderBottom': '2px solid #C4C4C4',
    'padding': '1rem',
    'fontFamily': 'Roboto',
    'fontSize': '20px',
    'fontStyle': 'normal',
    'fontWeight': '400',
    'lineHeight': '23px',
    'letterSpacing': '0px',
    'textAlign': 'left',
  },
  'content': {
    'padding': '1rem 1.5rem 0',
    'marginBottom': '-1px'
  },
  'contentItem': {
    'padding': '1.5rem 1rem',
    'borderBottom': 'solid 1px #C4C4C4',
    'alignItems': 'center',

  },
  'contentItemTextContainer': {
    'flexGrow': 1,
  },
  'addCreditCard': {
    'cursor': 'pointer'
  },
  'flex': {
    'display': 'flex',
  },
  'cardExp': {
    'marginTop': '0.5rem'
  },
  'billingCard': {
    'width': '30px',
    'margin': '-25px 20px 0 0',
  },
  'billingCardA': {
    'width': '30px',
    'margin': '-15px 20px 0 0',
  },
  'moreIcon' : {
    'width': '25px',
    'height': '25px'
  },
  'menuList': {
    'zIndex': 1
  },
  'MenuItem': {
    '&:hover': {
      background: "#00AAFF",
   },
  }
});


