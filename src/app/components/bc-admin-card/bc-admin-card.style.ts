import * as CONSTANTS from '../../../constants';
import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  'card': {
    'borderRadius': '14px',
    'display': 'flex',
    'flexDirection': 'column',
    'height': '176px',
    'textAlign': 'center',
    'width': '190px'
  },
  'cardActionArea': {
    'height': '100%',
    'padding': '28px 30px 38px'
  },
  'cardMedia': {
    'paddingTop': '56.25%' // 16:9
  },
  'cardText': {
    'fontSize': '16px',
    'lineHeight': '19px',
    'marginTop': '40px'
  },
  'circleBackground': {
    '& > svg': {
      'color': CONSTANTS.PRIMARY_WHITE
    },
    'alignItems': 'center',
    'borderRadius': '50%',
    'display': 'flex',
    'height': '48px',
    'justifyContent': 'center',
    'margin': 'auto',
    'width': '48px'
  },
  'infoBackground': {
    'backgroundColor': CONSTANTS.PRIMARY_CARD_PURPLE
  },
  'infoTextColor': {
    'color': CONSTANTS.PRIMARY_CARD_PURPLE
  },
  'link': {
    'textDecoration': 'none'
  },
  'primaryBackground': {
    'backgroundColor': CONSTANTS.PRIMARY_CARD_BLUE
  },
  'primaryTextColor': {
    'color': CONSTANTS.PRIMARY_CARD_BLUE
  },
  'secondaryBackground': {
    'backgroundColor': CONSTANTS.SECONDARY_CARD_BLUE
  },
  'secondaryTextColor': {
    'color': CONSTANTS.SECONDARY_CARD_BLUE
  },
  'primaryRedBackground': {
    'backgroundColor': CONSTANTS.PRIMARY_RED
  },
  'primaryRedTextColor': {
    'color': CONSTANTS.PRIMARY_RED
  },
  'primaryOrangeBackground': {
    'backgroundColor': CONSTANTS.PRIMARY_ORANGE
  },
  'primaryOrangeTextColor': {
    'color': CONSTANTS.PRIMARY_ORANGE
  },
  'primaryGreenBackground': {
    'backgroundColor': CONSTANTS.PRIMARY_GREEN
  },
  'primaryGreenTextColor': {
    'color': CONSTANTS.PRIMARY_GREEN
  },
});
