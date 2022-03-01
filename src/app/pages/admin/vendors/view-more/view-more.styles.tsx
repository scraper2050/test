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

  rangePickerContainer: {
    position: 'relative',
  },
  rangePickerButton: {
    textTransform: 'none',
    borderRadius: 8,
  },
  rangePickerPopup: {
    zIndex: 1,
    //borderRadius: 8,
  },
});
