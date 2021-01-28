import { Action } from 'redux-actions'

export enum SnackbarType {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}

export enum SnackbarActionType {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}

export interface SnackbarState {
  readonly type: SnackbarType
  readonly message: string
}

export type SnackbarAction = (message: string) => Action<string>