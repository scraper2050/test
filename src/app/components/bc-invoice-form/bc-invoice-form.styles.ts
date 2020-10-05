import { Theme } from '@material-ui/core/styles';
import { fabRoot } from 'app/pages/main/main.styles';
export default (theme: Theme): any => ({
  ...fabRoot,
  'actionBar': {
    'alignItems': 'center',
    'display': 'flex'
  },
  'addItemAnchor': {
    '& span': {
      '&:hover': {
        'cursor': 'pointer',
        'textDecoration': 'underline'
      },
      'color': '#00aaff'
    },
    'marginBottom': '8px',
    'marginTop': '10px'
  },
  'cancelText': {
    '&:hover': {
      'cursor': 'pointer',
      'textDecoration': 'underline'
    },
    'marginRight': 8
  },
  'invoiceInputBaseRoot': {
    '& input': {
      'width': '100%'
    },
    'width': '100%'
  },
  'titleBar': {
    'alignItems': 'center',
    'display': 'flex',
    'justifyContent': 'space-between',
    'marginBottom': 10
  },
  'totalAmountText': {
    'fontWeight': 'bold',
    'marginLeft': 8
  },
  'totalContainer': {
    'display': 'flex',
    'flexDirection': 'row-reverse',
    'marginTop': '35px'
  }
});
