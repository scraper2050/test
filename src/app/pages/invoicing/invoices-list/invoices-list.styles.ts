import { Theme } from '@material-ui/core/styles';
import { dataContainer, fabRoot,emailButton, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';
import {GRAY5, GRAY6, PRIMARY_BLUE, PRIMARY_GREEN} from "../../../../constants";

export default (theme: Theme): any => ({
  ...fabRoot,
  ...emailButton,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,
  ...topActionBar,
  'addButtonArea': {
    'display': 'flex',
    'justifyContent': 'flex-end',
    'padding': '12px 30px 5px 0',
    'position': 'absolute',
    'right': '0',
    'zIndex': '1'
  },
  currencySign: {
    'position': 'relative',
    'top': '-1px',
  },
  noLeftMargin: {
    marginLeft: '0 !important',
  },
  syncPaymentButton: {
    position: 'absolute',
    right: 30,
    textTransform: 'capitalize',
    borderRadius: 8,
    borderColor: GRAY5,
    zIndex: 1000
  },
  syncButton: {
    textTransform: 'capitalize',
    borderRadius: 8,
    borderColor: GRAY5,
    zIndex: 1000
  },
  exportButton: {
    marginRight: "10px",
    textTransform: 'capitalize',
    borderRadius: 8,
    display: "flex",
    color: "#1d6c41",
    zIndex: 1000,
    border: "1px solid #1d6c41",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px 10px 0px 10px",
  },
  exportButtonLabel: {
    marginLeft: "10px",
    marginRight: "10px",
  },
  containerToolbar: {
    display: 'flex',
    position: 'absolute',
    right: 30,
  },
  disabledButton: {
    backgroundColor: GRAY6,
    boxShadow: `0 0`,
  },
  buttonIcon: {
    color: PRIMARY_GREEN,
  },
  buttonIconDisabled: {
    color: GRAY5,
  },
  reminderText: {
    color: PRIMARY_BLUE,
    fontWeight: 'bold',
  }
});
