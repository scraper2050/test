
import { types } from './bc-modal.types';
import { Action, ActionFunctionAny, createAction } from 'redux-actions';
export type ApiAction = {
  openModal: ActionFunctionAny<Action<any>>,
  closeModal: ActionFunctionAny<Action<any>>,
  setModalData: ActionFunctionAny<Action<any>>
}

export const createApiAction = (baseAction: string) => ({
  'closeModal': createAction(`${baseAction}`),
  'openModal': createAction(`${baseAction}`),
  'setModalData': createAction(`${baseAction}`)
});

export const openModalAction = createAction(types.MODAL_OPEN);
export const closeModalAction = createAction(types.MODAL_CLOSE);
export const setModalDataAction = createAction(types.MODAL_SET_DATA);
