import { Theme } from '@material-ui/core/styles';
import { dataContainer, fabRoot, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';
export default (theme: Theme): any => ({
  ...fabRoot,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,
  ...topActionBar,
  ...dataContainer,
  'addButtonArea': {
    'display': 'flex',
    'justifyContent': 'flex-end',
    'padding': '12px 30px 5px 0',
    'position': 'absolute',
    'right': '0',
    'zIndex': '1000'
  },
  'Text': {
    'fontWeight': '800'
  },
  'cancelledText': {
    'color': 'red'
  },
  'finishedText': {
    'color': 'green',
    'fontStyle': 'italic'
  },
  'statusPendingText': {
    'color': '#FFA500',
    'fontStyle': 'italic'
  },
  'statusConfirmedText': {
    'color': '#008000'
  }
});
