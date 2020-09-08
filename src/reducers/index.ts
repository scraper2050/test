import auth from './auth.reducer';
import { combineReducers } from 'redux';
import customers, {CustomersReducer as customersState} from './customer.reducer';
import employees from './employee.reducer';
import jobTypes from './job-type.reducer';
import vendor from './vendor.reducer';
import companyEquipment from './company-equipment.reducer';

import jobState from './jobs.reducer';
import taxsState from './tax.reduxer';
import snackbarState from './snackbar.reducer';
import { JobsSate} from './invoicing.types'
import {CustomersState} from './customer.types'
import {TaxsState} from './tax.type'
import { SnackbarState} from './snackbar.type'
import modal from './bc-modal.reducer';

export interface RootState {
    jobState: JobsSate,
    snackbarState?: SnackbarState,
    customersState: CustomersState,
    taxsState: TaxsState,
}
export default combineReducers({
  auth,
  customers,
  customersState,
  employees,
  jobTypes,
  vendor,
  companyEquipment,
  jobState,
  taxsState,
  snackbarState,
  modal
});
