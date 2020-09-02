import { getAllCompanyEquipments } from "api/company-equipment.api";
import { loadCompanyEquipmentsActions } from "actions/company-equipment/company-equipment.action";
import { call, cancelled, fork, put, take } from "redux-saga/effects";

export function* handleGetCustomers(action: { payload: any }) {
  yield put(loadCompanyEquipmentsActions.fetching());
  try {
    const result = yield call(getAllCompanyEquipments);
    yield put(loadCompanyEquipmentsActions.success(result));
  } catch (error) {
    yield put(loadCompanyEquipmentsActions.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(loadCompanyEquipmentsActions.cancelled());
    }
  }
}

export default function* watchLoadAll() {
  while (true) {
    const fetchAction = yield take(loadCompanyEquipmentsActions.fetch);
    yield fork(handleGetCustomers, fetchAction);
  }
}
