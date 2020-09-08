import { put, takeLatest } from 'redux-saga/effects'
import {TaxsActionType} from '../reducers/tax.type'
import getSalesTax from '../api/tax.api'

function* handleGetTaxs() {
    try {
        const res = yield getSalesTax()
        if (res.status == 1) {
            yield put({type: TaxsActionType.SUCCESS, payload: res.taxes})
        } else {
            yield put({type: TaxsActionType.FAILED, payload: res.message})
        }
    } catch (error) {

    }
}

export default function* watchGetTaxs() {
    yield takeLatest(TaxsActionType.GET, handleGetTaxs)
}