import AuthRoute from 'auth-route';
import BCCircularLoader from '../../components/bc-circular-loader/bc-circular-loader';
import 'scss/elevation.scss';
import React, { Suspense, useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import BCAdminLayout from "../../components/bc-admin-layout/bc-admin-layout";
import BCAdminHeader from "../../components/bc-admin-header/bc-admin-header";
import BCAdminSidebar from "../../components/bc-admin-sidebar/bc-admin-sidebar";
import * as CONSTANTS from "../../../constants";
const UpdateInvoicePage = React.lazy(() => import('../invoicing/invoices-list/update-invoice/update-invoice'));
const DashboardPage = React.lazy(() => import('../dashboard/dashboard'));
const CustomersPage = React.lazy(() => import('../customer/customer'));
const NewCustomerPage = React.lazy(() => import('../customer/new-customer/new-customer'));
const JobReportsPage = React.lazy(() => import('../customer/job-reports/job-reports'));
const ViewMoreCustomerPage = React.lazy(() => import('../customer/view-more/view-more'));
const CustomersJobEquipmentInfoReportsPage = React.lazy(() => import('../customer/view-more/job-equipment-info/reports/reports'));
const CustomersJobEquipmentInfoJobsPage = React.lazy(() => import('../customer/view-more/job-equipment-info/jobs/jobs'));
const CustomersJobEquipmentInfoTicketsPage = React.lazy(() => import('../customer/view-more/job-equipment-info/tickets/tickets'));
const CustomersJobEquipmentInfoEquipmentPage = React.lazy(() => import('../customer/view-more/job-equipment-info/equipment/equipment'));
const ViewMoreLocationPage = React.lazy(() => import('../customer/view-more/view-more-location'));
const TicketsMapViewPage = React.lazy(() => import('../customer/tickets-map-view/tickets-map-view'));

const ViewJobReportsPage = React.lazy(() => import('../customer/job-reports/view-job-report'));
const ViewInvoicePage = React.lazy(() => import('../customer/job-reports/view-invoice'));
const EditInvoicePage = React.lazy(() => import('../customer/job-reports/view-invoice-edit'));

const InvoicingTodosPage = React.lazy(() => import('../invoicing/todos/todos'));
const InvoicingListPage = React.lazy(() => import('../invoicing/invoices-list/invoices-list'));
const InvoicingPurchaseOrderPage = React.lazy(() => import('../invoicing/purchase-order/purchase-order'));
const InvoicingEstimatesPage = React.lazy(() => import('../invoicing/estimates/estimates'));
const TechnicianPage = React.lazy(() => import('../employee/technicians/technicians'));
const OfficeAdminPage = React.lazy(() => import('../employee/office-admin/office-admin'));
const ScheduleJobsPage = React.lazy(() => import('../customer/schedule-jobs/schedule-jobs'));
const ManagersPage = React.lazy(() => import('../employee/managers/managers'));
const GroupPage = React.lazy(() => import('../employee/group/group'));

const AdminEmployeesPage = React.lazy(() => import('../admin/employees/employees'));
const BillingPage = React.lazy(() => import('../admin/billing/billing'));
const BillingMethodsPage = React.lazy(() => import('../admin/billing/methods/methods'));
const BillingHistoryPage = React.lazy(() => import('../admin/billing/history/history'));
const BillingSubscriptionPage = React.lazy(() => import('../admin/billing/subscription/subscription'));
const BrandsPage = React.lazy(() => import('../admin/brands/brands'));
const CompanyProfilePage = React.lazy(() => import('../admin/company-profile/company-profile'));
const EquipmentTypePage = React.lazy(() => import('../admin/equipment-type/equipment-type'));
const AdminGroupsPage = React.lazy(() => import('../admin/groups/groups'));
const AdminInvoicingPage = React.lazy(() => import('../admin/invoicing/invoicing'));
const AdminInvoicingItemsPage = React.lazy(() => import('../admin/invoicing/items/items'));
const JobTypesPage = React.lazy(() => import('../admin/job-types/job-types'));
const ReportNumberPage = React.lazy(() => import('../admin/report-number/report-number'));
const RolesPermissionsPage = React.lazy(() => import('../admin/roles-permissions/roles-permissions'));
const RolesManagerPage = React.lazy(() => import('../admin/roles-permissions/manager/manager'));
const RolesTechnicianPage = React.lazy(() => import('../admin/roles-permissions/technician/technician'));
const ViewRolePage = React.lazy(() => import('../admin/roles-permissions/roles/roles'));
const AdminVendorsPage = React.lazy(() => import('../admin/vendors/vendors'));
const AdminPayrollPage = React.lazy(() => import('../admin/payroll/payroll'));
const AdminIntegrationsPage = React.lazy(() => import('../admin/integrations/integrations'));
const ViewMoreVendorPage = React.lazy(() => import('../admin/vendors/view-more/view-more'));
const InventoryPage = React.lazy(() => import('../inventory/inventory'));
const PurchasedTagsPage = React.lazy(() => import('../tags/purchased-tags/purchased-tags'));
const BlueTagsPage = React.lazy(() => import('../tags/blue-tags/blue-tags'));
const CreateInvoicePage = React.lazy(() => import('../invoicing/invoices-list/create-invoice/create-invoice'));
const CreatePurchaseOrderPage = React.lazy(() =>
  import('../invoicing/purchase-order/create-purchase-order/create-purchase-order'));
const CreateEstimatePage = React.lazy(() => import('../invoicing/estimates/create-estimates/create-estimates'));
const ViewProfilePage = React.lazy(() => import('../profile/view-profile/view-profile'));
const EmailPreferencePage = React.lazy(() => import('../profile/email-preference/email-preference'));
const AdminAddNewEmployeePage = React.lazy(() => import('../admin/employees/add-new-employee'));
const NotificationPage = React.lazy(() => import('../notifications/notifications'));

const EmployeeProfilePage = React.lazy(() => import('../admin/employees/view-more/view-more'));
const ChangePasswordPage = React.lazy(() => import('../profile/change-password/change-password'));

const PayrollPage = React.lazy(() => import('../payroll/payroll'));
const PastPaymentPage = React.lazy(() => import('../payroll/past-payment/past-payment'));
const ReportsPage = React.lazy(() => import('../payroll/reports/reports'));

function Main(): any {

  return (
    <Router>
      <Switch>
        <Suspense
          fallback={
            <div style={{flex: 1}}>
              <BCAdminHeader
                drawerOpen={true}
              />
              <BCAdminSidebar
                open={true}
              />
              <div style={{
                flexGrow: 1,
                padding: 20,
                backgroundColor: CONSTANTS.PRIMARY_WHITE
              }}>
                <BCCircularLoader heightValue={'100vh'} />
              </div>
            </div>
          }>
          <Route>
            <BCAdminLayout>
              <Switch>
                <AuthRoute
                  Component={DashboardPage}
                  exact
                  path={'/main/dashboard'}
                  title={'Dashboard'}
                />
                <AuthRoute
                  Component={InventoryPage}
                  exact
                  path={'/main/inventory'}
                  title={'Inventory'}
                />
                <AuthRoute
                  Component={PurchasedTagsPage}
                  exact
                  path={'/main/tags/purchasedtag'}
                  title={'Tags'}
                />
                <AuthRoute
                  Component={PayrollPage}
                  exact
                  path={'/main/payroll'}
                  title={'Tags'}
                />
                <AuthRoute
                  Component={PastPaymentPage}
                  exact
                  path={'/main/payroll/pastpayment'}
                  title={'Tags'}
                />
                <AuthRoute
                  Component={PastPaymentPage}
                  exact
                  path={'/main/payroll/pastpayment/:contractorName'}
                  title={'Tags'}
                />
                <AuthRoute
                  Component={ReportsPage}
                  exact
                  path={'/main/payroll/reports'}
                  title={'Tags'}
                />
                <AuthRoute
                  Component={BlueTagsPage}
                  exact
                  path={'/main/tags/bluetag'}
                  title={'Tags'}
                />
                <AuthRoute
                  Component={GroupPage}
                  exact
                  path={'/main/employees/group'}
                  title={'Employees'}
                />
                <AuthRoute
                  Component={TechnicianPage}
                  exact
                  path={'/main/employees/technician'}
                  title={'Employees'}
                />
                <AuthRoute
                  Component={ManagersPage}
                  exact
                  path={'/main/employees/managers'}
                  title={'Employees'}
                />
                <AuthRoute
                  Component={OfficeAdminPage}
                  exact
                  path={'/main/employees/office-admin'}
                  title={'Employees'}
                />
                <AuthRoute
                  actionData={{
                    'link': '/main/customers/new-customer',
                    'title': 'Customers'
                  }}
                  Component={CustomersPage}
                  exact
                  path={'/main/customers'}
                  title={'Customers'}
                />
                <AuthRoute
                  Component={NewCustomerPage}
                  exact
                  path={'/main/customers/new-customer'}
                  title={'Customers'}
                />
                {/* For dev */}
                <AuthRoute
                  Component={ScheduleJobsPage}
                  exact
                  path={'/main/customers/schedule'}
                  title={'Customers'}
                />
                <AuthRoute
                  Component={TicketsMapViewPage}
                  exact
                  path={'/main/customers/ticket-map-view'}
                  title={'Map View'}
                />
                <AuthRoute
                  Component={JobReportsPage}
                  exact
                  path={'/main/customers/job-reports'}
                  title={'Job Reports'}
                />

                <AuthRoute
                  actionData={{
                    'link': '/main/customers/:customername',
                    'title': 'Customers'
                  }}
                  Component={ViewMoreCustomerPage}
                  exact
                  path={'/main/customers/:customername'}
                  title={'Customers'}
                />
                <AuthRoute
                  actionData={{
                    'link': '/main/customers/:customername/job-equipment-info/reports',
                    'title': 'Customers'
                  }}
                  Component={CustomersJobEquipmentInfoReportsPage}
                  exact
                  path={'/main/customers/:customername/job-equipment-info/reports'}
                  title={'Customers'}
                />
                <AuthRoute
                  actionData={{
                    'link': '/main/customers/:customername/job-equipment-info/jobs',
                    'title': 'Customers'
                  }}
                  Component={CustomersJobEquipmentInfoJobsPage}
                  exact
                  path={'/main/customers/:customername/job-equipment-info/jobs'}
                  title={'Customers'}
                />
                <AuthRoute
                  actionData={{
                    'link': '/main/customers/:customername/job-equipment-info/jobs/:jobId',
                    'title': 'Customers'
                  }}
                  Component={ViewJobReportsPage}
                  exact
                  path={'/main/customers/:customername/job-equipment-info/job-report/:jobReportId'}
                  title={'Customers'}
                />
                <AuthRoute
                  actionData={{
                    'link': '/main/customers/:customername/job-equipment-info/tickets',
                    'title': 'Customers'
                  }}
                  Component={CustomersJobEquipmentInfoTicketsPage}
                  exact
                  path={'/main/customers/:customername/job-equipment-info/tickets'}
                  title={'Customers'}
                />
                <AuthRoute
                  actionData={{
                    'link': '/main/customers/:customername/job-equipment-info/equipment',
                    'title': 'Customers'
                  }}
                  Component={CustomersJobEquipmentInfoEquipmentPage}
                  exact
                  path={'/main/customers/:customername/job-equipment-info/equipment'}
                  title={'Customers'}
                />
                <AuthRoute
                  actionData={{
                    'link': '/main/customers/location/:joblocation',
                    'title': 'Customers'
                  }}
                  Component={ViewMoreLocationPage}
                  exact
                  path={'/main/customers/location/:joblocation'}
                  title={'Customers'}
                />

                <AuthRoute
                  Component={ViewJobReportsPage}
                  /*
                   * ActionData={{
                   *   link: "/main/customers/job-reports/:jobId",
                   *   title: "Job Reports",
                   * }}
                   */
                  exact
                  path={'/main/customers/job-reports/:jobReportId'}
                  title={'Job Reports'}
                />

                <Redirect
                  exact
                  from={`/main/invoicing`}
                  to={`/main/invoicing/invoices-list`}
                />

                  <AuthRoute
                    Component={ViewInvoicePage}
                    exact
                    path={'/main/customers/job-reports/view/:invoice'}
                    title={'View Invoice'}
                  />

                  <AuthRoute
                    Component={ViewInvoicePage}
                    exact
                    path={'/main/customers/:customername/job-equipment-info/job-report/view/:invoice'}
                    title={'View Invoice'}
                  />

{/*                  <AuthRoute
                    Component={EditInvoicePage}
                    exact
                    path={'/main/customers/job-reports/edit/:invoice'}
                    title={'Edit Invoice'}
                  />*/}
                  <AuthRoute
                    Component={EditInvoicePage}
                    exact
                    path={'/main/invoicing/edit/:invoice'}
                    title={'Edit Invoice'}
                  />

                  <Redirect
                    exact
                    from={`/main/invoicing`}
                    to={`/main/invoicing/invoices-list`}
                  />

                  {/* <AuthRoute
                    Component={InvoicingTodosPage}
                    path={'/main/invoicing/todos'}
                    title={'Invoicing'}
                  /> */}

                <AuthRoute
                  Component={InvoicingListPage}
                  path={'/main/invoicing/invoices-list'}
                  title={'Invoicing'}
                />

                <AuthRoute
                  Component={EditInvoicePage}
                  path={'/main/invoicing/create-invoice'}
                  title={'Invoicing'}
                />

                <AuthRoute
                  Component={UpdateInvoicePage}
                  path={'/main/invoicing/update-invoice'}
                  title={'Invoicing'}
                />

                <AuthRoute
                  Component={InvoicingPurchaseOrderPage}
                  path={'/main/invoicing/purchase-order'}
                  title={'Invoicing'}
                />

                <AuthRoute
                  Component={CreatePurchaseOrderPage}
                  path={'/main/invoicing/create-purchase-order'}
                  title={'Invoicing'}
                />

                <AuthRoute
                  Component={ViewInvoicePage}
                  exact
                  path={'/main/invoicing/view/:invoice'}
                  title={'View Invoice'}
                />

                <AuthRoute
                  Component={InvoicingEstimatesPage}
                  path={'/main/invoicing/estimates'}
                  title={'Invoicing'}
                />

                <AuthRoute
                  Component={CreateEstimatePage}
                  path={'/main/invoicing/create-estimates'}
                  title={'Invoicing'}
                />

                <AuthRoute
                  Component={BillingPage}
                  exact
                  path={'/main/admin'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={BillingPage}
                  exact
                  path={'/main/admin/billing'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={BillingMethodsPage}
                  exact
                  path={'/main/admin/billing/billing-methods'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={BillingHistoryPage}
                  exact
                  path={'/main/admin/billing/billing-history'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={BillingSubscriptionPage}
                  exact
                  path={'/main/admin/billing/subscription'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={BrandsPage}
                  exact
                  path={'/main/admin/brands'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={CompanyProfilePage}
                  exact
                  path={'/main/admin/company-profile'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={AdminEmployeesPage}
                  exact
                  path={'/main/admin/employees'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={AdminAddNewEmployeePage}
                  exact
                  path={'/main/admin/employees/add-new-employee'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={EmployeeProfilePage}
                  exact
                  path={'/main/admin/employees/:contractorName'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={EquipmentTypePage}
                  exact
                  path={'/main/admin/equipment-type'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={AdminGroupsPage}
                  exact
                  path={'/main/admin/groups'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={AdminInvoicingPage}
                  exact
                  path={'/main/admin/invoicing'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={AdminInvoicingItemsPage}
                  exact
                  path={'/main/admin/invoicing/items'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={JobTypesPage}
                  exact
                  path={'/main/admin/job-types'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={ReportNumberPage}
                  exact
                  path={'/main/admin/report-number'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={RolesPermissionsPage}
                  exact
                  path={'/main/admin/roles-permissions'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={RolesManagerPage}
                  exact
                  path={'/main/admin/roles-permissions/manager-list'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={RolesTechnicianPage}
                  exact
                  path={'/main/admin/roles-permissions/technician-list'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={ViewRolePage}
                  exact
                  path={'/main/admin/roles-permissions/view-roles'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={AdminVendorsPage}
                  exact
                  path={'/main/admin/vendors'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={AdminPayrollPage}
                  exact
                  path={'/main/admin/payroll'}
                  title={'Admin'}
                />
                <AuthRoute
                  Component={AdminIntegrationsPage}
                  path={'/main/admin/integrations'}
                  title={'Integrations'}
                />
                <AuthRoute
                  actionData={{
                    'link': '/main/admin/vendors/:contractorName',
                    'title': 'Admin'
                  }}
                  Component={ViewMoreVendorPage}
                  exact
                  path={'/main/admin/vendors/:contractorName'}
                  title={'Admin'}
                />

                <AuthRoute
                  Component={ViewProfilePage}
                  exact
                  path={'/main/user/view-profile'}
                  title={'User'}
                />
                <AuthRoute
                  Component={EmailPreferencePage}
                  exact
                  path={'/main/user/email-preference'}
                  title={'User'}
                />
                <AuthRoute
                  Component={ChangePasswordPage}
                  exact
                  path={'/main/user/change-password'}
                  title={'User'}
                />
                <AuthRoute
                  Component={NotificationPage}
                  exact
                  path={'/main/notifications'}
                  title={'Notifications'}
                />
              </Switch>
            </BCAdminLayout>
          </Route>
        </Suspense>
      </Switch>
    </Router>
  );
}
export default Main;
