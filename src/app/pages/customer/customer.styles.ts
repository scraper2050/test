import { Theme } from '@material-ui/core/styles';
import { dataContainer, fabRoot, emailButton, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';
export default (theme: Theme): any => ({
  ...fabRoot,
  ...emailButton,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,
  ...topActionBar,
  ...dataContainer,

  'statusPendingText': {
    'color': '#FFA500',
    'fontStyle': 'italic',
    'fontWeight': 'bold'
  },
  'statusFinishedText': {
    'color': '#50AE55',
    'fontWeight': 'bold'
  },
  'statusCanceledText': {
    'color': '#A107FF',
    'fontWeight': 'bold'
  },
  'statusStartedText': {
    'color': '#00AAFF',
    'fontWeight': 'bold'
  },
  'statusResheduledText': {
    'color': '#828282',
    'fontWeight': 'bold'
  },
  'statusPausedText': {
    'color': '#FA8029',
    'fontWeight': 'bold'
  },
  'statusIncompleteText': {
    'color': '#F50057',
    'fontWeight': 'bold'
  },
  'inactiveStyle': {
    fontWeight: 'bold',
    color: '#f50057',
    //fontSize: '1rem',
  },
  capitalize: {
    textTransform: 'capitalize'
  },
  'filterMenuItemRoot': {
    'backgroundColor': '#FFFFFF !important',
    'fontSize': 12,
  },
  'filterMenuItemSelected': {
    'backgroundColor': '#E5F7FF !important',
  },
  'addButtonArea': {
    'display': 'flex',
    'justifyContent': 'flex-end',
    'padding': '20px 30px 5px 0',
    'position': 'absolute',
    'right': '0',
    'top': 55,
    zIndex: 99,
  },
  'filterMenu': {
    'height': 'calc(100% - 10px)',
    'marginTop': 5,
    'marginBottom': 5,
    'display': 'flex',
    'alignItems': 'center',
    'fontWeight': 400,
    'fontFamily': 'Roboto, Helvetica, Arial, sans-serif',
    'fontSize': 14,
  },
  'filterMenuLabel': {
    fontSize: 16,
    marginRight: 13
  },
  'filterMenuContainer': {
    'width': 128,
    'borderBottom':'1px solid #BDBDBD',
    'cursor': 'pointer',
  },
  'filterIcon': {
    'marginRight': 10,
  },
  noMarginRight: {
    marginRight: 0,
  },
  noLeftMargin: {
    marginLeft: '0 !important',
  }
});
