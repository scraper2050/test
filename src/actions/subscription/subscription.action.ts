import { createApiAction } from 'actions/action.utils';
import { types } from './subscription.types';


export const loadSubscriptions = createApiAction(types.LOAD_SUBSCRIPTION);
