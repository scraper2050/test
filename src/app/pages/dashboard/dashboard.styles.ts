import { Theme } from '@material-ui/core/styles';
import {
  dataContainer,
  fabRoot,
  pageContainer,
  pageContent,
  pageMainContainer,
  topActionBar
} from 'app/pages/main/main.styles';
export default (theme: Theme): any => ({
  ...fabRoot,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,
  ...topActionBar,
  ...dataContainer,
  'dashboardContainer': {
    'padding': '3rem 0'
  },
  'icons': {
    'width': '30px',
    'height': '30px',
    'fill': '#FFF'
  },
  'Text': {
    'fontWeight': 'bold',
    'borderRadius': '50px',
    'padding': '0.5rem 1rem',
    'margin': '0.5rem 1rem',
    'maxWidth': '120px',
    'display': 'flex',
    'alignItems': 'center',
    'marginLeft': 'auto'
  },
  'cancelledText': {
    'color': 'red',
    'background': '#ff000026'
  },
  'finishedText': {
    'color': 'green',
    'fontStyle': 'italic',
    'background': '#FFA50026'
  },
  'statusPendingText': {
    'color': '#FFA500',
    'fontStyle': 'italic',
    'background': '#FFA50026'
  },
  'statusConfirmedText': {
    'color': '#008000',
    'background': '#00800026'
  },
  'statusCircle': {
    'width': '10px',
    'height': '10px',
    'borderRadius': '50%'
  },
  'statusPendingCircle': {
    'background': '#FFA500'
  },
  'statusConfirmedCircle': {
    'background': '#008000'
  },
  'finishedCircle': {
    'background': 'green'
  },
  'cancelledCircle': {
    'background': 'red'
  },
  'statusText': {
    'flexGrow': 1,
    'textAlign': 'center'
  },
  'textTable': {
    'fontFamily': 'Roboto',
    'fontSize': '14px',
    'fontStyle': 'normal',
    'fontWeight': 'bold',
    'lineHeight': '14px',
    'letterSpacing': '0px',
    'textAlign': 'left',
    'color': '#9EA5B8',
    'textTransform': 'capitalize'
  }
});
