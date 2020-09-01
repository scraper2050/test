import BackImg from '../../../assets/img/bg.png';
import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  'Footer': {
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
  'LeftSection': {
    '@media(max-width: 1280px)': {
      'display': 'none'
    }
  },
  'LoginGrid': {
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
  'LoginPaper': {
    '@media(max-width: 479px)': {
      'margin': theme.spacing(1)
    },
    'alignitems': 'stretch',
    'display': 'flex',
    'flexDirection': 'column',
    'margin': theme.spacing(4),
    'maxWidth': '480px',
    'padding': '20px 30px'
  },
  'forgetpassword': {
    '&: hover': {
      'textDecoration': 'underline'
    },
    'color': 'rgba(0, 0, 0, 0.87)',
    'textDecoration': 'none'
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
  'logoimg': {
    'margin': '20px auto 30px',
    'width': '80%'
  },
  'register': {
    '& a': {
      'marginLeft': '10px'
    },
    'alignItems': 'center',
    'display': 'flex',
    'justifyContent': 'center'
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
  }
});
