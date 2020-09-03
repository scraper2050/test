import AuthRoute from 'auth-route';
import BCHeader from './app/components/bc-header/bc-header';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
const DashboardPage = React.lazy(() => import('./app/pages/dashboard/dashboard'));
const CustomersPage = React.lazy(() => import('./app/pages/customer/customer'));
const NewCustomerPage = React.lazy(() => import('./app/pages/customer/new-customer/new-customer'));
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
const BrandsPage = React.lazy(() => import('./app/pages/admin/brands/brands'));
const CompanyProfilePage = React.lazy(() => import('./app/pages/admin/company-profile/company-profile'));
const EquipmentTypePage = React.lazy(() => import('./app/pages/admin/equipment-type/equipment-type'));
const AdminGroupsPage = React.lazy(() => import('./app/pages/admin/groups/groups'));
const AdminInvoicingPage = React.lazy(() => import('./app/pages/admin/invoicing/invoicing'));
const JobTypesPage = React.lazy(() => import('./app/pages/admin/job-types/job-types'));
const ReportNumberPage = React.lazy(() => import('./app/pages/admin/report-number/report-number'));
const RolesPage = React.lazy(() => import('./app/pages/admin/roles/roles'));
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
                      Component={RolesPage}
                      exact
                      path={'/admin/roles'}
                    />
                    <AuthRoute
                      Component={AdminVendorsPage}
                      exact
                      path={'/admin/vendors'}
                    />
                  </Switch>
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
