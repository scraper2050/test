import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../../constants";
import {GRAY2, GRAY3, PRIMARY_BLUE} from "../../../../constants";
export default (theme: Theme): any => ({
  gridWrapper: {
    position: 'relative',
    padding: '20px 50px 0 50px',
    margin: 0,
  },
  innerGrid: {
    padding: '16px 0',
  },
  mapWrapper: {
    height: 200,
  },
  collapseAllButton: {
    position: 'absolute',
    right: 40,
  },
  collapseAllButtonLabel: {
    fontSize: 8,
    color: PRIMARY_BLUE,
  },
  collapseButton: {
    margin: -15,
    // position: 'absolute',
    // right: 55,
    // top: 5
  },
  summaryCaption: {
    textTransform: 'uppercase',
    fontSize: 10,
    color: GRAY3,
  },
  summaryText: {
    fontSize: 14,
    marginTop: 10,
    color: GRAY2,
  },
  summaryTextBig: {
    fontSize: 16,
    marginTop: 9,
    color: PRIMARY_BLUE,
  },
  glassImageWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  glassImage: {
    marginLeft: 10,
    width: 25,
    marginTop: 10,
  },
  frameColor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 40,
    border: '1px solid black',
    marginTop: 10,
  },
});
