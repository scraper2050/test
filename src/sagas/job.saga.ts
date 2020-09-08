import { put, takeLatest } from 'redux-saga/effects'

import {getJobs} from '../api/job.api'
import {JobActionType} from '../reducers/invoicing.types'

function* handleGetJobs() {
    try {
        const res = yield getJobs()
        if (res.status === 1) {
            yield put({type: JobActionType.SUCCESS, payload: res.jobs})
        } else {
            yield put({type: JobActionType.FAILED, payload: res.message})
        }
    } catch(error) {
        yield put({type: JobActionType.FAILED, payload: error.message})
    }
}

export default function* watchGetJobs() {
    yield takeLatest(JobActionType.GET, handleGetJobs)
}