import { Reducer } from 'redux'
import { Action } from 'redux-actions'

import {SnackbarState, SnackbarType, SnackbarActionType} from './snackbar.type'
import {JobActionType} from './invoicing.types'

const SnackbarReducer: Reducer<SnackbarState|null, Action<string>> = (state=null, action) => {
    switch (action.type) {
        case SnackbarActionType.WARNING:
            return {
                type: SnackbarType.WARNING,
                message: action.payload
            }
        case JobActionType.FAILED:
            return {
                type: SnackbarType.ERROR,
                message: action.payload
            }
        default:
            break
    }
    return null
}
export default SnackbarReducer