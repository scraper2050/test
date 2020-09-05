import { put, takeLatest } from 'redux-saga/effects'
import {CustomersActionType} from '../reducers/customer.types'
import {getCustomers} from '../api/customers.api'

function* handleGetCustomers() {
    try {
        const customers = yield getCustomers({})
        yield put({type: CustomersActionType.SUCCESS, payload: customers})
    } catch (error) {
        yield put({type: CustomersActionType.FAILED, payload: error.message})
    }
}

export default function* watchGetCustomers() {
    yield takeLatest(CustomersActionType.GET, handleGetCustomers)
}