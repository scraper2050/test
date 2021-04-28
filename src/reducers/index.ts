import { CustomersState } from './customer.types';
import { JobsSate } from './invoicing.types';
import { SnackbarState } from './snackbar.type';
import auth from './auth.reducer';
import { combineReducers } from 'redux';
import companyEquipment from './company-equipment.reducer';
import { CustomersReducer as customers } from './customer.reducer';
import { customerEquipmentsReducer as customerEquipments } from './customer-equipments.reducer';
import { contactsReducer as contacts } from './contacts.reducer';
import { ImageReducer as image } from './image.reducer';
import { EmployeesReducer as employees } from './employee.reducer';
import { jobReducer as jobState } from './jobs.reducer';
import jobTypes from './job-type.reducer';
import modal from './bc-modal.reducer';
import routeReducer from './route.reducer';
import serviceTicket from './service-ticket.reducer';
import { SnackbarReducer as snackbar } from './snackbar.reducer';
import tax from './tax.reduxer';
import { JobSiteReducer as jobSites } from './job-site.reducer';
import { JobLocationReducer as jobLocations } from './job-location.reducer';
import { EmployeesForJobReducer as employeesForJob } from './employees-for-job.reducer';
import { VendorsReducer as vendors } from './vendor.reducer';
import { GroupReducer as groups } from './group.reducer';
import { TechniciansReducer as technicians } from './technicians.reducer';
import { ManagersReducer as managers } from './managers.reducer';
import { OfficeAdminReducer as officeAdmin } from './office-admin.reducer';
import { InventoryReducer as inventory } from './inventory.reducer';
import { PurchasedTagsReducer as purchasedTags } from './tags.reducer';
import {
  InvoicingEstimatesReducer as estimates,
  InvoicingListReducer as invoiceList,
  InvoicingTodoReducer as invoiceTodos,
  InvoicingPurchaseOrderReducer as purchaseOrder
} from './invoicing.reducer';
import { BrandsReducer as brands } from './brands.reducer';
import { EquipmentTypeReducer as equipmentType } from './equipment-type.reducer';
import { CompanyProfileReducer as profile } from './user.reducer';
import { JobReportReducer as jobReport } from './job-report.reducer';
import { CompanyCardsReducer as companyCards } from './company-cards.reducer';
import tableState from './tableState.reducer';
import searchTerm from './searchText.reducer';
import { SubscriptionReducer as subscriptions } from './subscription.reducer';
import { NotificationsReducer as notifications } from './notifications.reducer';


export interface ReducerParamsInterface {
  payload: any;
  type: string;
}
export interface RootState {
  jobState: JobsSate;
  snackbarState?: SnackbarState;
  customersState: CustomersState;
  serviceTicket: any
}
export default combineReducers({
  auth,
  brands,
  companyCards,
  companyEquipment,
  contacts,
  customerEquipments,
  customers,
  employees,
  employeesForJob,
  equipmentType,
  estimates,
  groups,
  image,
  inventory,
  invoiceList,
  invoiceTodos,
  jobLocations,
  jobReport,
  jobSites,
  jobState,
  jobTypes,
  managers,
  modal,
  notifications,
  officeAdmin,
  profile,
  purchaseOrder,
  purchasedTags,
  'routeData': routeReducer,
  searchTerm,
  serviceTicket,
  snackbar,
  subscriptions,
  tableState,
  tax,
  technicians,
  vendors
});
