import { Theme } from '@material-ui/core/styles';
import {DARK_ASH} from "../../../constants";
export default (theme: Theme): any => ({
  'root': {
    '& .MuiButton-root': {
      'color': '#fff',
      'width': '100%'
    },
    '& .MuiGrid-item': {
      'alignItems': 'stretch',
      'display': 'flex',
      'justifyContent': 'center'
    },
    'alignItems': 'center',
    'display': 'flex',
    'justifyContent': 'center',
    'minHeight': '100vh',
    'width': '100%'
  },
  'paper': {
    '@media(max-width: 479px)': {
      'margin': theme.spacing(1)
    },
    'margin': theme.spacing(4),
    'maxWidth': '768px',
    width: '90%',
    'overflow': 'hidden'
  },
  'box': {
    'alignItems': 'center',
    'display': 'flex',
    'flexDirection': 'column',
    'padding': '40px 20px 20px 20px'
  },
  'backButton': {
    'alignSelf': 'flex-start',
    'color': DARK_ASH,
    'marginBottom': 40,
  },
  'title': {
    '@media(max-width: 540px)': {
      'fontSize': '1.7rem'
    }
  },
  'description': {
    'marginBottom': theme.spacing(4)
  },
});
