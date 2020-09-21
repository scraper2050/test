import { CustomersState } from './customer.types';
import { JobsSate } from './invoicing.types';
import { SnackbarState } from './snackbar.type';
import { TaxsState } from './tax.type';
import auth from './auth.reducer';
import { combineReducers } from 'redux';
import companyEquipment from './company-equipment.reducer';
import employees from './employee.reducer';
import jobState from './jobs.reducer';
import jobTypes from './job-type.reducer';
import modal from './bc-modal.reducer';
import routeReducer from './route.reducer';
import snackbarState from './snackbar.reducer';
import taxsState from './tax.reduxer';
import { VendorsReducer as vendors } from './vendor.reducer';
import { CustomersReducer as customers } from './customer.reducer';

export interface RootState {
  jobState: JobsSate,
  snackbarState?: SnackbarState,
  customersState: CustomersState,
  taxsState: TaxsState
}
export default combineReducers({
  auth,
  companyEquipment,
  customers,
  employees,
  jobState,
  jobTypes,
  modal,
  snackbarState,
  taxsState,
  vendors,
  routeData: routeReducer
});
