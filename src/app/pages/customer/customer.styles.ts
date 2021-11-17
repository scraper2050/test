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
  }
});
