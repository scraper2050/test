import { Theme } from '@material-ui/core/styles';
import { swipe_wrapper, dataContainer, fabRoot, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';
import {PRIMARY_BLUE, PRIMARY_GREEN} from "../../../constants";

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
    textTransform: 'capitalize',
    fontSize: 14,
    borderRadius: 8,
    width: 120,
    height: '30px',
    backgroundColor: `${PRIMARY_GREEN}44`,
  },
  unPaidChip: {
    backgroundColor: '#F5005744',
  },
  partiallyPaidChip: {
    backgroundColor: '#FED8B1',
  },
  totalContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
    marginLeft: 10,
  },
  totalText: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalValue: {
    fontSize: 18,
    flex: 1,
    color: PRIMARY_GREEN,
  },
  totalTextSmall: {
    fontSize: 12,
  },
  totalValueSmall: {
    fontSize: 16,
  },
});
