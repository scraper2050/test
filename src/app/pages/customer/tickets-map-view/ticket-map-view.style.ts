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
  '@media (max-width: 1200px)': {
    dialog: {
      width: '50%',
      padding: 25,
    },
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
});
