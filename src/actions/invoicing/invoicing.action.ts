import {JobActionType} from '../../reducers/invoicing.types'

export const getJobs = () => {
    return {
        type: JobActionType.GET
    }
}
