import * as CONSTANTS from '../../../constants';
import { Theme } from '@material-ui/core/styles';

export default (theme: Theme): any => ({
  'appBar': {
    'alignItems': 'center',
    'backgroundColor': CONSTANTS.PRIMARY_WHITE,
    'display': 'flex',
    'flexDirection': 'row',
    'height': '77px',
    'width': '100%'
  },
  'bcTopBar': {
    'display': 'flex',
    'height': '100%',
    'paddingLeft': '0',
    'paddingRight': '0',
    'width': '100%'
  },
  'bcTopBarDrawer': {
    '@media(min-width: 1400px)': {
      'display': 'none'
    }
  },
  'dropdown': {
    'backgroundClip': 'padding-box',
    'backgroundColor': CONSTANTS.PRIMARY_WHITE,
    'border': '0',
    'borderRadius': '3px',
    'boxShadow': '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
    'fontSize': '14px',
    'listStyle': 'none',
    'margin': '2px 0 0',
    'minWidth': '160px',
    'padding': '5px 0',
    'textAlign': 'left',
    'top': '100%',
    'zIndex': '1000'
  },
  'dropdownItem': {
    '-webkit-font-smoothing': 'subpixel-antialiased',
    'borderRadius': '2px',
    'color': CONSTANTS.PRIMARY_DARK,
    'display': 'block',
    'fontSize': '15px',
    'fontWeight': '400',
    'height': '100%',
    'margin': '0 5px',
    'padding': '10px 20px',
    'perspective': '1000px',
    'position': 'relative',
    'whiteSpace': 'nowrap',
    'zIndex': '0'
  },
  'headerNav': {
    '@media(min-width: 1400px)': {
      'display': 'flex'
    },
    'alignItems': 'center',
    'display': 'none',
    'flex': '1 1 100%',
    'height': '100%',
    'justifyContent': 'center',
    'listStyle': 'none',
    'padding': '0'
  },
  'headerTools': {
    'alignItems': 'center',
    'display': 'flex',
    'flex': '0 0 120px',
    'justifyContent': 'flex-end',
    'listStyle': 'none',
    'marginLeft': 'auto'
  },
  'headerToolsButton': {
    '&:first-child': {
      'marginLeft': '0'
    },
    '&:last-child': {
      'marginRight': '0'
    },
    'backgroundColor': CONSTANTS.PRIMARY_BLUE,
    'borderRadius': '12px',
    'height': '24px',
    'margin': '0 12px',
    'minWidth': '24px',
    'padding': '0',
    'width': '24px'
  },
  'logoBrand': {
    'alignItems': 'center',
    'display': 'flex',
    'flex': `0 0 ${CONSTANTS.SIDEBAR_WIDTH}px`,
    'justifyContent': 'center',
    'overflow': 'hidden',
    'width': `${CONSTANTS.SIDEBAR_WIDTH}px`
  },
  'menuList': {
    'padding': '0'
  },
  'navItem': {
    '& > a': {
      'alignItems': 'center',
      'color': CONSTANTS.PRIMARY_DARK,
      'display': 'flex',
      'flex': '1 1 100%',
      'fontSize': '16px',
      'fontWeight': '500',
      'height': '100%',
      'justifyContent': 'center',
      'lineHeight': '20px',
      'textDecoration': 'none'
    },
    'alignItems': 'center',
    'backgroundColor': CONSTANTS.PRIMARY_WHITE,
    'display': 'flex',
    'flex': '1 1 100%',
    'height': '100%',
    'justifyContent': 'center',
    'width': '100%'
  },
  'navItemActive': {
    'backgroundColor': CONSTANTS.PRIMARY_BLUE
  },
  'popperClose': {
    'display': 'none !important',
    'pointerEvents': 'none'
  },
  'popperNav': {
    '@media(max-width: 767px)': {
      '& > div': {
        'boxShadow': 'none !important',
        'marginBottom': '5px !important',
        'marginLeft': '1.5rem',
        'marginRight': '1.5rem',
        'marginTop': '0px !important',
        'padding': '0px !important',
        'transition': 'none !important'
      },
      'left': 'unset !important',
      'position': 'static !important',
      'top': 'unset !important',
      'transform': 'none !important',
      'willChange': 'none !important'
    }
  },
  'popperResponsive': {
    '@media(max-width: 767px)': {
      'backgroundColor': 'transparent',
      'border': '0',
      'boxShadow': 'none',
      'color': 'black',
      'float': 'none',
      'marginTop': '0',
      'position': 'static',
      'width': 'auto',
      'zIndex': '1640'
    },
    'zIndex': '1200'
  },
  'primaryHover': {
    '&:hover': {
      'backgroundColor': CONSTANTS.PRIMARY_BLUE,
      'color': CONSTANTS.PRIMARY_WHITE
    }
  },
  'profile': {
    'flex': '0 0 200px',
    'marginLeft': '6px',
    'paddingLeft': '20px',
    'paddingRight': '40px'
  },
  'profileAvatar': {
    'alignItems': 'center',
    'color': CONSTANTS.PRIMARY_DARK,
    'display': 'flex',
    'fontSize': '16px',
    'fontStyle': 'normal',
    'fontWeight': '600',
    'lineHeight': '20px',
    'perspective': 'unset',
    'textTransform': 'capitalize',
    'zIndex': '0'
  },
  'profileAvatarImage': {
    'borderRadius': '23px !important',
    'height': '45px !important',
    'marginRight': '15px !important',
    'width': '45px !important'
  },
  'sideBarLogoBrand': {
    'alignItems': 'center',
    'borderBottom': `1px solid ${CONSTANTS.PRIMARY_GRAY}`,
    'display': 'flex',
    'flex': `0 0 ${CONSTANTS.SIDEBAR_WIDTH}px`,
    'justifyContent': 'center',
    'overflow': 'hidden',
    'width': `${CONSTANTS.SIDEBAR_WIDTH}px`
  },
  'sideBarNavItems': {
    'flexDirection': 'column',
    'width': '100%'
  }
});
