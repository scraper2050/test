import { Theme } from '@material-ui/core/styles';
import { swipe_wrapper, dataContainer, fabRoot, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';
import {MENU_TEXT_COLOR, PRIMARY_BLUE} from "../../../../constants";
export default (theme: Theme): any => ({
  ...fabRoot,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,
  ...topActionBar,
  ...dataContainer,
  ...swipe_wrapper,

  filterClearButton: {
  fontSize: 10,
    color: PRIMARY_BLUE,
    textTransform: 'none',
}
});
