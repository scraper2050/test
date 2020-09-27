import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  'fabRoot': {
    'color': '#fff',
    'fontSize': '.775rem',
    'height': '34px',
    'padding': '0 12px',
    'textTransform': 'capitalize'
  },
  'scheduleContent': {
    '@media(min-width: 1909px)': {
      'padding-left': '60px'
    },
    'padding': '5px 30px 10px 30px'
  },
  'scheduleMainContainer': {
    'display': 'flex',
    'flex': '1 1 100%',
    'overflowX': 'hidden',
    'width': '100%'
  },
  'schedulePageConatiner': {
    'display': 'flex',
    'flex': '1 1 100%',
    'flexDirection': 'column',
    'margin': '0 auto',
    /*
     * 'padding': '30px',
     * 'paddingLeft': '56px',
     * 'paddingRight': '65px',
     */
    'width': '100%'
  },
  'topActionBar': {
    'display': 'flex',
    'justifyContent': 'flex-end',
    'padding': '20px 30px 5px 0'
  }
});
