import {
  ASH, GRAY1, GRAY2, GRAY3,
} from "../../../constants";
import '../../../scss/variable.css';

export default (): any => ({
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
    fontSize: 26,
    color: GRAY2,
    margin: '0 0 20px 0',
  },
  customSummaryLabel: {
    fontWeight: 'bold',
    fontSize: 11,
    color: 'black',
    margin: 0,
  },
  customSummaryValue: {
    fontWeight: '400',
    fontSize: 13,
    color: GRAY1,
    margin: 0,
  },
  customSummaryTotalLabel: {
    fontWeight: '500',
    fontSize: 13,
    color: 'black',
    margin: 0,
    textAlign: 'right',
  },
  customSummaryTotalValue: {
    fontWeight: '700',
    fontSize: 16,
    color: GRAY2,
    margin: 0,
    textAlign: 'right',
  },
  customSubSummaryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0 180px 0 320px',
  },
});
