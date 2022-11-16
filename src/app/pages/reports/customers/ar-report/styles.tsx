import { Theme } from '@material-ui/core/styles';
import {
  ASH,
  DARK_ASH, GRAY1, GRAY2,
  GRAY3, LIGHT_BLUE,
} from "../../../../../constants";
import styled from "styled-components";
import * as CONSTANTS from "../../../../../constants";

export default (theme: Theme): any => ({
  pageContainer: {
    padding: '0 40px',
  },
  toolbar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuToolbarContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
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
  'roundBackground': {
    'backgroundColor': CONSTANTS.GRAY4,
    'borderRadius': '50%',
    'color': 'white',
    'height': '28px',
    'width': '28px',
    '&:hover': {
      'opacity': '0.7',
      'backgroundColor': CONSTANTS.PRIMARY_BLUE
    }
  },
});

export const SummaryContainer = styled.div `
    position: relative;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    background-color: ${LIGHT_BLUE};
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
