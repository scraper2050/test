import { Theme } from '@material-ui/core/styles';
import { dataContainer, fabRoot, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';
export default (theme: Theme): any => ({
  ...fabRoot,
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
    'color': '#008000',
    'fontWeight': 'bold'
  },
  'statusCanceledText': {
    'color': '#eb3856',
    'fontWeight': 'bold'
  },
  'statusStartedText': {
    'color': '#0762a8',
    'fontWeight': 'bold'
  },
  'statusResheduledText': {
    'color': '#F76D2E',
    'fontWeight': 'bold'
  },
  'statusPausedText': {
    'color': '#FFE5B0',
    'fontWeight': 'bold'
  },
  'statusIncompleteText': {
    'color': '#E05E3A',
    'fontWeight': 'bold'
  }
});
