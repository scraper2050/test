import { Theme } from '@material-ui/core/styles';
import {
  ASH,
  DARK_ASH, GRAY1, GRAY2,
  GRAY3, LIGHT_BLUE,
} from "../../../../../constants";
import styled from "styled-components";

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
  customSummaryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: ASH,
    padding: '27px 48px',
    //margin: '30px 0',
    marginTop: 30,
  },
  customSummaryColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '10px 0'
  },
  customSummaryValueContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  customSummaryTitle: {
    fontWeight: '700',
    fontSize: 22,
    color: GRAY2,
    margin: '0 0 20px 0',
  },
  customSummaryLabel: {
    fontWeight: '700',
    fontSize: 9,
    color: GRAY3,
    margin: 0,
  },
  customSummaryValue: {
    fontWeight: '400',
    fontSize: 12,
    color: GRAY1,
    margin: 0,
  },
  customSummaryTotalLabel: {
  fontWeight: '500',
    fontSize: 11,
    color: GRAY3,
    margin: 0,
    textAlign: 'right',
  },
  customSummaryTotalValue: {
    fontWeight: '700',
    fontSize: 14,
    color: GRAY2,
    margin: 0,
    textAlign: 'right',
  },
  customSubSummaryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0 50px',
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
