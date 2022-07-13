import BackImg from '../../../../assets/img/signup/bg.png';
import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  'LoginPaper': {
    '@media(max-width: 479px)': {
      'margin': theme.spacing(1)
    },
    'alignitems': 'center',
    'display': 'flex',
    'flexDirection': 'column',
    'margin': theme.spacing(4),
    // 'maxWidth': '480px',
    'padding': '20px 30px'
  },
  'forgetremember': {
    '@media(max-width: 479px)': {
      'display': 'block'
    },
    '& .MuiFormControlLabel-root': {
      '@media(max-width: 479px)': {
        'marginLeft': '-15px',
      }
    },
    'alignItems': 'center',
    'display': 'flex',
    'justifyContent': 'space-between',
    'margin': 5
  },
  'logoimg': {
    'margin': '40px auto 60px',
    'width': '40%'
  },
  'register': {
    '@media(max-width: 479px)': {
      'display': 'block'
    },
    '& div': {
      'marginBottom': '10px'
    },
    'alignItems': 'center',
    'display': 'flex',
    'justifyContent': 'space-between',
    'fontSize': 14,
    color: 'black',
  },
  'showpassowrdbtn': {
    'backgroundColor': '#fff',
    'padding': '2px',
    'position': 'absolute',
    'right': '25px',
    'top': '17px',
    'zIndex': 999
  },
  'AgreeTermDiv': {
    '& span': {
      '&:hover': {
        'textDecoration': 'underline',
        'color': '#00aaff',
      },
      'cursor': 'pointer'
    },
    '@media(max-width: 479px)': {
      'marginLeft': '-15px',
      'display': 'inline-flex',
      'alignItems': 'center',
    },
    'fontSize': 16
  },
  agreementHelperText: {
    'display': 'flex',
    'justifyContent': 'flex-end',
    'width': '100%',
    'marginBottom': 10
  },
  'link': {
    '&:hover': {
      'textDecoration': 'underline'
    },
    'color': '#00aaff',
    'textDecoration': 'none'
  },
});
