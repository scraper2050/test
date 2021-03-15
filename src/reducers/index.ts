import { CustomersState } from "./customer.types";
import { JobsSate } from "./invoicing.types";
import { SnackbarState } from "./snackbar.type";
import auth from "./auth.reducer";
import { combineReducers } from "redux";
import companyEquipment from "./company-equipment.reducer";
import { CustomersReducer as customers } from "./customer.reducer";
import { customerEquipmentsReducer as customerEquipments } from './customer-equipments.reducer';
import { contactsReducer as contacts } from './contacts.reducer';
import { ImageReducer as image } from "./image.reducer";
import { EmployeesReducer as employees } from "./employee.reducer";
import { jobReducer as jobState } from "./jobs.reducer";
import jobTypes from "./job-type.reducer";
import modal from "./bc-modal.reducer";
import routeReducer from "./route.reducer";
import serviceTicket from "./service-ticket.reducer";
import { SnackbarReducer as snackbar } from "./snackbar.reducer";
import tax from "./tax.reduxer";
import { JobSiteReducer as jobSites } from "./job-site.reducer";
import { JobLocationReducer as jobLocations } from "./job-location.reducer";
import { EmployeesForJobReducer as employeesForJob } from "./employees-for-job.reducer";
import { VendorsReducer as vendors } from "./vendor.reducer";
import { GroupReducer as groups } from "./group.reducer";
import { TechniciansReducer as technicians } from "./technicians.reducer";
import { ManagersReducer as managers } from "./managers.reducer";
import { OfficeAdminReducer as officeAdmin } from "./office-admin.reducer";
import { InventoryReducer as inventory } from "./inventory.reducer";
import { PurchasedTagsReducer as purchasedTags } from "./tags.reducer";
import {
  InvoicingTodoReducer as invoiceTodos,
  InvoicingListReducer as invoiceList,
  InvoicingPurchaseOrderReducer as purchaseOrder,
  InvoicingEstimatesReducer as estimates,
} from "./invoicing.reducer";
import { BrandsReducer as brands } from "./brands.reducer";
import { EquipmentTypeReducer as equipmentType } from "./equipment-type.reducer";
import { CompanyProfileReducer as profile } from "./user.reducer";
import { JobReportReducer as JobReport } from "./job-report.reducer";
import { CompanyCardsReducer as companyCards } from './company-cards.reducer';
import tableState from './tableState.reducer';
import searchTerm from './searchText.reducer';



export interface ReducerParamsInterface {
  payload: any;
  type: string;
}
export interface RootState {
  jobState: JobsSate;
  snackbarState?: SnackbarState;
  customersState: CustomersState;
}
export default combineReducers({
  auth,
  profile,
  companyEquipment,
  customers,
  contacts,
  customerEquipments,
  image,
  employees,
  jobState,
  jobTypes,
  modal,
  routeData: routeReducer,
  serviceTicket,
  snackbar,
  tax,
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
  purchasedTags,
  brands,
  equipmentType,
  jobSites,
  jobLocations,
  employeesForJob,
  tableState,
  searchTerm,
  JobReport,
  companyCards
});
