import BackImg from '../../../assets/img/bg.png';
import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  'AgreeTermDiv': {
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
  'forgetremember': {
    'alignItems': 'center',
    'display': 'flex',
    'justifyContent': 'space-between',
    'marginBottom': '10px'
  },
  'link': {
    '&:hover': {
      'textDecoration': 'underline'
    },
    'color': '#00aaff',
    'textDecoration': 'none'
  },
  'login': {
    '& a': {
      '&:hover': {
        'textDecoration': 'underline'
      },
      'color': theme.palette.primary.main,
      'marginLeft': '10px',
      'textDecoration': 'none'
    },
    'alignItems': 'center',
    'display': 'flex',
    'height': '40px',
    'justifyContent': 'center'
  },
  'logoimg': {
    'margin': '20px auto 30px',
    'width': '80%'
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
    'backgroundSize': 'cover',
    'display': 'flex',
    'flexDirection': 'column',
    'fontSize': '14px',
    'minHeight': '100vh'
  },
  'showpassowrdbtn': {
    'backgroundColor': '#fff',
    'padding': '2px',
    'position': 'absolute',
    'right': '25px',
    'top': '17px',
    'zIndex': 999
  },
  'signupFooter': {
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
  'signupGrid': {
    '@media(max-width: 1280px)': {
      'flex': '1 1 100%',
      'maxWidth': '100%',
      'width': '100%'
    },
    'alignItems': 'center',
    'background': '#5d9cec',
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center'
  },
  'signupLeftSection': {
    '@media(max-width: 1280px)': {
      'display': 'none'
    }
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
      'fontSize': '2rem'
    }
  }
});
