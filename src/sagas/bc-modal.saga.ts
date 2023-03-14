import { closeModalAction, openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { fork, put, take } from 'redux-saga/effects';

export function *openModal(action: { payload: null }) {
  yield put(openModalAction(true));
}
export function *closeModal(action: { payload: null }) {
  yield put(closeModalAction(false));
}
export function *setModalData(action: { payload: any }) {
  yield put(setModalDataAction(action.payload));
}

export default function *openModalFlow() {
  const modalAction = yield take(openModalAction);

  yield fork(
    openModal,
    modalAction
  );
}
