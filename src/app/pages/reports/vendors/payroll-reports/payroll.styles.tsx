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

  example: {
    display: 'flex',
    alignItems: 'center',
    color: PRIMARY_BLUE,
    textTransform: 'none',
    fontWeight: 'normal',
  },
});
