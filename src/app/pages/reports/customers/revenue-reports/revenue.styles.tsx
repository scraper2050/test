import { Theme } from '@material-ui/core/styles';
import { swipe_wrapper, dataContainer, fabRoot, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';
import {PRIMARY_BLUE, PRIMARY_GREEN} from "../../../../../constants";

export default (theme: Theme): any => ({
  ...fabRoot,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,
  ...topActionBar,
  ...dataContainer,
  ...swipe_wrapper,

  label: {
    fontSize: 14,
    textTransform: 'uppercase',
    marginBottom: 15,
  },
  reportType: {
    borderBottom: '1px solid #D0D3DC',
    maxWidth: 550,
    height: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
  },
  reportName: {
    fontSize: 18,
    fontWeight: 500,
  },
  menuToolbarContainer: {
    margin: 'auto',
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    maxWidth: 900,
  },
  reportContainer: {
    margin: 'auto',
    maxWidth: 900,
  },
  backButton: {
    'width': '30px',
    'position': 'absolute',
    'top': '20px',
  }
});
