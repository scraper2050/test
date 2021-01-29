import { SnackbarType, SnackbarAction } from '../../reducers/snackbar.type'

export const warning: SnackbarAction = message => {
  return {
    type: SnackbarType.WARNING,
    payload: message
  }
}

export const error: SnackbarAction = message => {
  return {
    type: SnackbarType.ERROR,
    payload: message
  }
}

export const info: SnackbarAction = message => {
  return {
    type: SnackbarType.INFO,
    payload: message
  }
}



export const success: SnackbarAction = message => {
  return {
    type: SnackbarType.SUCCESS,
    payload: message
  }
}