import { Theme } from '@material-ui/core/styles';
import { swipe_wrapper, dataContainer, fabRoot, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';
import {PRIMARY_BLUE} from "../../../../constants";
export default (theme: Theme): any => ({
  ...fabRoot,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,
  ...topActionBar,
  ...dataContainer,
  ...swipe_wrapper,

  commissionAdd: {
    display: 'flex',
    alignItems: 'center',
    color: PRIMARY_BLUE,
    textTransform: 'none',
    fontWeight: 'normal',
  },
  commissionAddText: {
    marginLeft: 6,
    fontSize: 14,
    textDecoration: 'underline',
    color: PRIMARY_BLUE,
  },
});
