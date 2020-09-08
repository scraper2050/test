import { Reducer } from 'redux'

import {TaxsState, TaxsActionType} from './tax.type'

const initialState: TaxsState = {
    loading: false
}
const TaxsReducer: Reducer<TaxsState> = (state=initialState, action) => {
    switch (action.type) {
        case TaxsActionType.GET:
            return {loading: true}
        case TaxsActionType.SUCCESS:
            return {
                loading: false,
                taxs: action.payload,
            }
        case TaxsActionType.FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
    }
    return state
}
export default TaxsReducer