import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {ERROR_RED, GRAY4, PRIMARY_GREEN} from "../../../constants";
import { blue,green } from '@material-ui/core/colors';

interface STYLE_PROPS {
  isSynced: boolean;
  hasError: boolean;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
    },
    logo: {
      width: '30px',
      height: '30px',
      marginRight: 10,
      verticalAlign: 'middle',
    },
    syncIcon: {
      fontSize: 28,
      color: (props: STYLE_PROPS) => props.isSynced ? PRIMARY_GREEN : (props.hasError ? ERROR_RED : GRAY4),
    },
    fabProgress: {
      color: green[500],
      // position: 'absolute',
      top: 0,
      left: -6,
      zIndex: 1, fontSize: 28,

    },
    accProgress: {
      color: blue[500],
      // position: 'absolute',
      top: 0,
      left: -6,
      zIndex: 1, fontSize: 28,

    },
  }));

