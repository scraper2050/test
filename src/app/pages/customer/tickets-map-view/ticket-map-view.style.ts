import { Theme } from '@material-ui/core/styles';
import { dataContainer, fabRoot, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';
export default (theme: Theme): any => ({
  ...fabRoot,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,
  ...topActionBar,
  ...dataContainer,
  dialog: {
    width: '25%',
    padding: 25,
  },
  dialogTitle: {
    paddingBottom: '25px !important',
    borderBottom: '2px solid #eee',
    textAlign: 'center',
  },
  dialogClose: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  loaderWrapper: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#ccc8',
    zIndex: 2000,
  }
});
