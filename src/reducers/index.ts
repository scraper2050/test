import { CustomersState } from './customer.types';
import { JobsSate } from './invoicing.types';
import { SnackbarState } from './snackbar.type';
import { TaxsState } from './tax.type';
import auth from './auth.reducer';
import { combineReducers } from 'redux';
import companyEquipment from './company-equipment.reducer';
import { CustomersReducer as customers } from './customer.reducer';
import employees from './employee.reducer';
import jobState from './jobs.reducer';
import jobTypes from './job-type.reducer';
import modal from './bc-modal.reducer';
import routeReducer from './route.reducer';
import serviceTicket from './service-ticket.reducer';
import snackbarState from './snackbar.reducer';
import taxsState from './tax.reduxer';
import { VendorsReducer as vendors } from './vendor.reducer';
import { GroupReducer as groups } from './group.reducer';
import { TechniciansReducer as technicians } from './technicians.reducer';
import { ManagersReducer as managers } from './managers.reducer';
import { OfficeAdminReducer as officeAdmin } from './office-admin.reducer';
import { InventoryReducer as inventory } from './inventory.reducer';
import { PurchasedTagsReducer as purchasedTags } from './tags.reducer';
import {
  InvoicingTodoReducer as invoiceTodos,
  InvoicingListReducer as invoiceList,
  InvoicingPurchaseOrderReducer as purchaseOrder,
  InvoicingEstimatesReducer as estimates
} from './invoicing.reducer';

export interface ReducerParamsInterface {
  payload: any,
  type: string
}
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
  'routeData': routeReducer,
  serviceTicket,
  snackbarState,
  taxsState,
  vendors,
  groups,
  technicians,
  managers,
  officeAdmin,
  invoiceTodos,
  invoiceList,
  purchaseOrder,
  estimates,
  inventory,
  purchasedTags
});
