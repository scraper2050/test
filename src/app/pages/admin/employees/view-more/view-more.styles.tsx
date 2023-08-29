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
