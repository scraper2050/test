import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {ERROR_RED, GRAY4, PRIMARY_GREEN} from "../../../constants";

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
    }
  }));

