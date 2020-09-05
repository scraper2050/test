import AuthRoute from 'auth-route';
import BCHeader from './app/components/bc-header/bc-header';
import BCModal from 'app/modals/bc-modal';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
const DashboardPage = React.lazy(() => import('./app/pages/dashboard/dashboard'));
const CustomersPage = React.lazy(() => import('./app/pages/customer/customer'));
const NewCustomerPage = React.lazy(() => import('./app/pages/customer/new-customer/new-customer'));
const InvoicingPage = React.lazy(() => import('./app/pages/invoicing/invoicing'));
const LoginPage = React.lazy(() => import('./app/pages/login/login'));
const SignUpPage = React.lazy(() => import('./app/pages/signup/signup'));
const RecoverPage = React.lazy(() => import('./app/pages/recover/recover'));
const TechnicianPage = React.lazy(() => import('./app/pages/employee/technician/technician'));
const OfficeAdminPage = React.lazy(() => import('./app/pages/employee/office/office'));
const ScheduleJobsPage = React.lazy(() => import('./app/pages/customer/schedule-jobs/schedule-jobs'));
const ManagerPage = React.lazy(() => import('./app/pages/employee/manager/manager'));
const GroupPage = React.lazy(() => import('./app/pages/employee/group/group'));

const AdminEmployeesPage = React.lazy(() => import('./app/pages/admin/employees/empolyees'));
const BillingPage = React.lazy(() => import('./app/pages/admin/billing/billing'));
const BillingMethodsPage = React.lazy(() => import('./app/pages/admin/billing/methods/methods'));
const BillingHistoryPage = React.lazy(() => import('./app/pages/admin/billing/history/history'));
const BillingSubscriptionPage = React.lazy(() => import('./app/pages/admin/billing/subscription/subscription'));
const BrandsPage = React.lazy(() => import('./app/pages/admin/brands/brands'));
const CompanyProfilePage = React.lazy(() => import('./app/pages/admin/company-profile/company-profile'));
const EquipmentTypePage = React.lazy(() => import('./app/pages/admin/equipment-type/equipment-type'));
const AdminGroupsPage = React.lazy(() => import('./app/pages/admin/groups/groups'));
const AdminInvoicingPage = React.lazy(() => import('./app/pages/admin/invoicing/invoicing'));
const AdminInvoicingItemsPage = React.lazy(() => import('./app/pages/admin/invoicing/items/items'));
const JobTypesPage = React.lazy(() => import('./app/pages/admin/job-types/job-types'));
const ReportNumberPage = React.lazy(() => import('./app/pages/admin/report-number/report-number'));
const RolesPermissionsPage = React.lazy(() => import('./app/pages/admin/roles-permissions/roles-permissions'));
const RolesManagerPage = React.lazy(() => import('./app/pages/admin/roles-permissions/manager/manager'));
const RolesTechnicianPage = React.lazy(() => import('./app/pages/admin/roles-permissions/technician/technician'));
const ViewRolePage = React.lazy(() => import('./app/pages/admin/roles-permissions/roles/roles'));
const AdminVendorsPage = React.lazy(() => import('./app/pages/admin/vendors/vendors'));

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <div className={'App'}>
          <Switch>
            <Suspense fallback={<div>
              {'Loading'}
            </div>}>
              <Route
                component={LoginPage}
                exact
                path={'/'}
              />
              <Route
                component={SignUpPage}
                path={'/signup'}
              />
              <Route
                component={RecoverPage}
                path={'/recover'}
              />
              <Route>
                <BCHeader />
                <div className={'main-container'}>
                  <Switch>
                    <AuthRoute
                      Component={DashboardPage}
                      exact
                      path={'/dashboard'}
                    />
                    <AuthRoute
                      Component={GroupPage}
                      exact
                      path={'/employees'}
                    />
                    <AuthRoute
                      Component={GroupPage}
                      exact
                      path={'/employees/group'}
                    />
                    <AuthRoute
                      Component={TechnicianPage}
                      exact
                      path={'/employees/technician'}
                    />
                    <AuthRoute
                      Component={ManagerPage}
                      exact
                      path={'/employees/manager'}
                    />
                    <AuthRoute
                      Component={OfficeAdminPage}
                      exact
                      path={'/employees/office'}
                    />

                    <AuthRoute
                      Component={CustomersPage}
                      exact
                      path={'/customers'}
                    />
                    <AuthRoute
                      Component={CustomersPage}
                      exact
                      path={'/customers/customer-list'}
                    />
                    <AuthRoute
                      Component={NewCustomerPage}
                      exact
                      path={'/customers/new-customer'}
                    />

                    <AuthRoute
                        Component={InvoicingPage}
                        path={'/invoicing'}
                    />

                    {/* For dev */}
                    <AuthRoute
                      Component={ScheduleJobsPage}
                      exact
                      path={'/customers/schedule'}
                    />

                    <AuthRoute
                      Component={BillingPage}
                      exact
                      path={'/admin'}
                    />
                    <AuthRoute
                      Component={BillingPage}
                      exact
                      path={'/admin/billing'}
                    />
                    <AuthRoute
                      Component={BillingMethodsPage}
                      exact
                      path={'/admin/billing/billing-methods'}
                    />
                    <AuthRoute
                      Component={BillingHistoryPage}
                      exact
                      path={'/admin/billing/billing-history'}
                    />
                    <AuthRoute
                      Component={BillingSubscriptionPage}
                      exact
                      path={'/admin/billing/subscription'}
                    />
                    <AuthRoute
                      Component={BrandsPage}
                      exact
                      path={'/admin/brands'}
                    />
                    <AuthRoute
                      Component={CompanyProfilePage}
                      exact
                      path={'/admin/company-profile'}
                    />
                    <AuthRoute
                      Component={AdminEmployeesPage}
                      exact
                      path={'/admin/employees'}
                    />
                    <AuthRoute
                      Component={EquipmentTypePage}
                      exact
                      path={'/admin/equipment-type'}
                    />
                    <AuthRoute
                      Component={AdminGroupsPage}
                      exact
                      path={'/admin/groups'}
                    />
                    <AuthRoute
                      Component={AdminInvoicingPage}
                      exact
                      path={'/admin/invoicing'}
                    />
                    <AuthRoute
                      Component={AdminInvoicingItemsPage}
                      exact
                      path={'/admin/invoicing/items'}
                    />
                    <AuthRoute
                      Component={JobTypesPage}
                      exact
                      path={'/admin/job-types'}
                    />
                    <AuthRoute
                      Component={ReportNumberPage}
                      exact
                      path={'/admin/report-number'}
                    />
                    <AuthRoute
                      Component={RolesPermissionsPage}
                      exact
                      path={'/admin/roles-permissions'}
                    />
                    <AuthRoute
                      Component={RolesManagerPage}
                      exact
                      path={'/admin/roles-permissions/manager-list'}
                    />
                    <AuthRoute
                      Component={RolesTechnicianPage}
                      exact
                      path={'/admin/roles-permissions/technician-list'}
                    />
                    <AuthRoute
                      Component={ViewRolePage}
                      exact
                      path={'/admin/roles-permissions/view-roles'}
                    />
                    <AuthRoute
                      Component={AdminVendorsPage}
                      exact
                      path={'/admin/vendors'}
                    />
                  </Switch>
                  <BCModal />
                </div>
              </Route>
            </Suspense>
          </Switch>
        </div>
      </Router>
    </MuiPickersUtilsProvider>
  );
}
export default App;
