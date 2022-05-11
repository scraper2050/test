import {
  Button,
  createStyles,
  makeStyles,
  withStyles,
  Chip,
  IconButton
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import * as CONSTANTS from "../constants";

export const useCustomStyles = makeStyles((theme: Theme) =>
  createStyles({
    // items table
    centerContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    iconBtn: {
      fontSize: 18,
      color: CONSTANTS.PRIMARY_WHITE
    },
    iconBtnGray: {
      color: CONSTANTS.PRIMARY_DARK_GREY
    }
  }),
);


export const CSButton = withStyles({
  root: {
    textTransform: 'none',
    fontSize: 13,
    padding: '5px 15px',
    //lineHeight: 1.5,
    borderRadius: 8,
    minWidth: '136px',
    height: '34px',
    margin: '0 5px 0 0',
    color: CONSTANTS.PRIMARY_WHITE,
    backgroundColor: CONSTANTS.TABLE_ACTION_BUTTON,
    borderColor: CONSTANTS.TABLE_ACTION_BUTTON,
    '&:hover': {
      backgroundColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
      borderColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
    },
    '&:active': {
      backgroundColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
      borderColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

export const CSButtonSmall = withStyles({
  root: {
    textTransform: 'none',
    fontSize: 13,
    padding: '5px 15px',
    lineHeight: 1.5,
    borderRadius: '8px',
    minWidth: '134px',
    height: '30px',
    margin: '0 5px 0 0',
    color: CONSTANTS.PRIMARY_WHITE,
    backgroundColor: CONSTANTS.TABLE_ACTION_BUTTON,
    borderColor: CONSTANTS.TABLE_ACTION_BUTTON,
    '&:hover': {
      backgroundColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
      borderColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
    },
    '&:active': {
      backgroundColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
      borderColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

export const CSIconButton = withStyles({
  root: {
    textTransform: 'none',
    fontSize: 13,
    padding: '5px 10px',
    borderRadius: '8px',
    height: '30px',
    margin: '0 15px 0 0',
    color: CONSTANTS.PRIMARY_WHITE,
    backgroundColor: CONSTANTS.TABLE_ACTION_BUTTON,
    borderColor: CONSTANTS.TABLE_ACTION_BUTTON,
    '&:hover': {
      backgroundColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
      borderColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
    },
    '&:active': {
      backgroundColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
      borderColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(IconButton);

export const CSChip = withStyles({
  root: {
    textTransform: 'none',
    fontSize: 13,
    borderRadius: 4,
    width: '100%',
    height: '30px',
  },
})(Chip);
