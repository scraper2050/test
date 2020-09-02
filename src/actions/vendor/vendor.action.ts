import { createApiAction } from '../action.utils';
import { types } from './vendor.types';

export const loadCompanyContractsActions = createApiAction(types.COMPANY_CONTRACTS_LOAD);