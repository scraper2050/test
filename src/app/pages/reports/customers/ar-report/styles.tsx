import { Theme } from '@material-ui/core/styles';
import { swipe_wrapper, dataContainer, fabRoot, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';
import {
  DARK_ASH,
  GRAY3,
  PRIMARY_BLUE,
  PRIMARY_GREEN
} from "../../../../../constants";
import styled from "styled-components";

export default (theme: Theme): any => ({
  ...fabRoot,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,
  ...topActionBar,
  ...dataContainer,
  ...swipe_wrapper,

  toolbar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuToolbarContainer: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    weight: '400',
    color: GRAY3,
    textTransform: 'uppercase',
    marginTop: 15,
    textAlign: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    margin: '22px 0',
  },
  valueBig: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    margin: '10px 0',
  },
});

export const SummaryContainer = styled.div `
    position: relative;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    background-color: ${PRIMARY_BLUE}05;
    border-radius: 8px;
    padding: 30px;
    div {
      flex: 1;
    }
    div:not(:first-child):after {
      content: '';
      width: 1px;
      height: 50px;
      background: ${DARK_ASH};
      position: absolute;
      top: 55px;
    }
    div:first-child {
      flex: 2;
    }
`
