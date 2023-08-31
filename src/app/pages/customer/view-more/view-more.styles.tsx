import { Theme } from '@material-ui/core/styles';
import { swipe_wrapper, dataContainer, fabRoot, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';
export default (theme: Theme): any => ({
  ...fabRoot,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,
  ...topActionBar,
  ...dataContainer,
  ...swipe_wrapper,
  'addButtonArea': {
    // 'display': 'flex',
    // 'justifyContent': 'flex-end',
    // 'padding': '12px 30px 5px 0',
    'position': 'absolute',
    'right': '0',
    'zIndex': '120',
  },
  'customerName': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
    fontSize: 20,
  },
  'customerNameLocation': {
    display: 'flex',
    flexDirection: 'column',
    right: 0,
    // alignItems: 'flex-end',
    alignText: 'left'
  },
  'inactiveStyle': {
    fontWeight: 'bold',
    color: '#f50057',
    //fontSize: '1rem',
  },
  'viewingName': {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'Center',
    fontSize: '18px',
    padding: '15px', 
  },
  'marginLeft': {
    marginLeft: '10px',
  }
});
