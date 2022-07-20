import BackImg from '../../../../assets/img/signup/bg.png';
import { Theme } from '@material-ui/core/styles';
import {LIGHT_GREY, PRIMARY_BLUE} from "../../../../constants";
export default (theme: Theme): any => ({
  'AgreeTermDiv': {
    '@media(max-width: 540px)': {
      'marginLeft': '-11px'
    },
    '& span': {
      '&:hover': {
        'textDecoration': 'underline'
      },
      'color': '#00aaff',
      'cursor': 'pointer'
    },
    'alignItems': 'center',
    'display': 'flex',
    'height': '100%'
  },
  'ButtonFormBox': {
    'background': '#f0f3f5',
    'borderTop': '1px solid #c8ced3',
    'padding': '20px'
  },
  'ControlFormBox': {
    'alignItems': 'center',
    'display': 'flex',
    'flexDirection': 'column',
    'padding': '40px 20px 20px 20px'
  },
  'Description': {
    'marginBottom': theme.spacing(4)
  },
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
  'signupPaper': {
    '@media(max-width: 479px)': {
      'margin': theme.spacing(1)
    },
    'margin': theme.spacing(4),
    'maxWidth': '768px',
    'overflow': 'hidden'
  },
  'signupTitle': {
    '@media(max-width: 540px)': {
      'fontSize': '1.7rem'
    }
  },
  successContainer: {
    backgroundImage: 'linear-gradient(transparent, black)',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoimg: {
    margin: '20vh auto 0',
    width: '20vw',
  },
  successTitle: {
    color: PRIMARY_BLUE,
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
  },
  successText: {
    color: LIGHT_GREY,
    fontSize: 18,
    textAlign: 'center',
  },
  successLogIn: {
    color: 'white',
    fontSize: 12,
  }
});
