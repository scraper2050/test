import { Theme } from '@material-ui/core/styles';
import { swipe_wrapper, dataContainer, fabRoot, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';
import {PRIMARY_BLUE} from "../../../constants";

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
  filterClearButton: {
    fontSize: 10,
    color: PRIMARY_BLUE,
    textTransform: 'none',
  },
  tableCellWrap: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    minWidth: 250,
  },
  statusChip: {
    textTransform: 'none',
    fontSize: 13,
    borderRadius: 8,
    width: 80,
    height: '30px',
    backgroundColor: '#50AE5544',
    },
  unPaidChip: {
    backgroundColor: '#F5005744',
  }
});
