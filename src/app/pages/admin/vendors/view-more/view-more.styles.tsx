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
    padding: 4,
    borderRadius: 8,
    border: '1px solid #E0E0E0',
    boxShadow: '3px 3px 3px #E0E0E088',
    backgroundColor: 'white',
  },
  rangePickerWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  rangePicker: {
    borderBottom: '1px solid #E0E0E0',
  },
  buttonsWrapper: {
    alignSelf: 'flex-end',
    padding: 16,
  }
});
