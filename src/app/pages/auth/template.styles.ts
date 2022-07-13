import BackImg from '../../../assets/img/signup/bg.png';
import { Theme } from '@material-ui/core/styles';
import {PRIMARY_BLUE} from "../../../constants";
export default (theme: Theme): any => ({
  'root': {
    '& .MuiButton-containedPrimary': {
      '& img': {
        'height': '16px',
        'marginRight': '5px',
        'width': '16px'
      },
      'color': '#fff',
      'paddingLeft': '10px',
      'paddingRight': '10px'
    },
    'backgroundImage': `url(${BackImg})`,
    'backgroundSize': 'contain',
    'display': 'flex',
    'flexDirection': 'column',
    'fontSize': '14px',
    'minHeight': '100vh'
  },
  'leftSection': {
    '@media(max-width: 1280px)': {
      'display': 'none'
    }
  },
  'footer': {
    '@media(max-width: 479px)': {
      'paddingLeft': theme.spacing(1),
      'paddingRight': theme.spacing(1)
    },
    'alignItems': 'center',
    'background': '#f0f3f5',
    'borderTop': '1px solid #e9edf0',
    'color': '#23282c',
    'display': 'flex',
    'flex': '0 0 30px',
    'justifyContent': 'space-between',
    'paddingLeft': theme.spacing(4),
    'paddingRight': theme.spacing(4)
  },
  'link': {
    '&:hover': {
      'textDecoration': 'underline'
    },
    'color': PRIMARY_BLUE,
    'textDecoration': 'none',
    'fontSize': 14
  },
  'formGrid': {
    '@media(max-width: 1280px)': {
      'flex': '1 1 100%',
      'maxWidth': '100%',
      'width': '100%'
    },
    'alignItems': 'center',
    'background': 'black',
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center'
  },
});
