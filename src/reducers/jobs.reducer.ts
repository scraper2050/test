import { Reducer } from 'redux'

import {JobsSate, Job, JobActionType} from './invoicing.types'

const initialState: JobsSate = {
    loading: false
}

const JobsReducer: Reducer<JobsSate> = (state=initialState, action) => {
    switch (action.type) {
        case JobActionType.GET:
            return {loading: true}
        case JobActionType.SUCCESS:
            return {
                loading: false,
                jobs: action.payload,
            }
        case JobActionType.FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            break
    }
    return state
}
export default JobsReducer