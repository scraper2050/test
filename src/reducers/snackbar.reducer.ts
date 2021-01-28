import { Reducer } from 'redux'
import { Action } from 'redux-actions'

import { SnackbarState, SnackbarType, SnackbarActionType } from './snackbar.type'
import { JobActionType } from './invoicing.types'

const initialSnackbar: SnackbarState = {
  type: SnackbarType.INFO,
  message: ''
}

export const SnackbarReducer: Reducer<any> = (state = initialSnackbar, action) => {
  switch (action.type) {
    case SnackbarActionType.WARNING:
      return {
        ...state,
        type: SnackbarType.WARNING,
        message: action.payload
      }
    case SnackbarActionType.ERROR:
      return {
        ...state,
        type: SnackbarType.ERROR,
        message: action.payload
      }
    case SnackbarActionType.INFO:
      return {
        ...state,
        type: SnackbarType.INFO,
        message: action.payload
      }
    case SnackbarActionType.SUCCESS:
      return {
        ...state,
        type: SnackbarType.SUCCESS,
        message: action.payload
      }
    default:
      break
  }
  return state;
}