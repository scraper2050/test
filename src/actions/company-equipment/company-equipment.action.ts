
import { createApiAction } from '../action.utils';
import { types } from './company-equipment.types';

export const loadCompanyEquipmentsActions = createApiAction(types.COMPANY_EQUIPMENTS_LOAD);
