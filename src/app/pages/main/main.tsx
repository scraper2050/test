import AuthRoute from 'auth-route';
import BCHeader from '../../components/bc-header/bc-header';
import BCModal from 'app/modals/bc-modal';
import BCSidebar from 'app/components/bc-sidebar/bc-sidebar';
import BCToolBar from '../../components/bc-toolbar-btn/bc-tool-bar';
import { Grid } from '@material-ui/core';
import React, { Suspense, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
const DashboardPage = React.lazy(() => import('../dashboard/dashboard'));
const CustomersPage = React.lazy(() => import('../customer/customer'));
const NewCustomerPage = React.lazy(() => import('../customer/new-customer/new-customer'));
const InvoicingPage = React.lazy(() => import('../invoicing/invoicing'));
const TechnicianPage = React.lazy(() => import('../employee/technician/technician'));
const OfficeAdminPage = React.lazy(() => import('../employee/office/office'));
const ScheduleJobsPage = React.lazy(() => import('../customer/schedule-jobs/schedule-jobs'));
const ManagerPage = React.lazy(() => import('../employee/manager/manager'));
const GroupPage = React.lazy(() => import('../employee/group/group'));

const AdminEmployeesPage = React.lazy(() => import('../admin/employees/empolyees'));
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

function Main(): any {
  const [contentGrid, setContentGrid] = useState<any>({
    'lg': 12,
    'md': 12,
    'sm': 12
  });
  return (
    <Router>
      <Switch>
        <Suspense fallback={<div>
          {'Loading'}
        </div>}>
          <Route>
            <BCHeader />
            <BCToolBar />
            <Grid
              className={'main-container'}
              container
              spacing={0}>
              <BCSidebar setContentGrid={setContentGrid} />
              <Grid
                id={'content-container'}
                item
                lg={contentGrid.lg}
                md={contentGrid.md}
                sm={contentGrid.sm}
                xl>
                <Switch>
                  <AuthRoute
                    Component={DashboardPage}
                    exact
                    path={'/main/dashboard'}
                    title={'Dashboard'}
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
                    Component={ManagerPage}
                    exact
                    path={'/main/employees/manager'}
                    title={'Employees'}
                  />
                  <AuthRoute
                    Component={OfficeAdminPage}
                    exact
                    path={'/main/employees/office'}
                    title={'Employees'}
                  />

                  <AuthRoute
                    Component={CustomersPage}
                    actionData={{
                      'link': '/main/customers/new-customer',
                      'title': 'New Customer'
                    }}
                    exact
                    path={'/main/customers'}
                    title={'Customers'}
                  />
                  <AuthRoute
                    Component={NewCustomerPage}
                    exact
                    path={'/main/customers/new-customer'}
                    title={'New Customer'}
                  />
                  {/* For dev */}
                  <AuthRoute
                    Component={ScheduleJobsPage}
                    exact
                    path={'/main/customers/schedule'}
                    title={'Customers'}
                  />

                  <AuthRoute
                    Component={InvoicingPage}
                    path={'/main/invoicing'}
                    title={'Invoicing'}
                  />

                  <AuthRoute
                    Component={BillingPage}
                    exact
                    path={'/main/admin'}
                  />
                  <AuthRoute
                    Component={BillingPage}
                    exact
                    path={'/main/admin/billing'}
                  />
                  <AuthRoute
                    Component={BillingMethodsPage}
                    exact
                    path={'/main/admin/billing/billing-methods'}
                  />
                  <AuthRoute
                    Component={BillingHistoryPage}
                    exact
                    path={'/main/admin/billing/billing-history'}
                  />
                  <AuthRoute
                    Component={BillingSubscriptionPage}
                    exact
                    path={'/main/admin/billing/subscription'}
                  />
                  <AuthRoute
                    Component={BrandsPage}
                    exact
                    path={'/main/admin/brands'}
                  />
                  <AuthRoute
                    Component={CompanyProfilePage}
                    exact
                    path={'/main/admin/company-profile'}
                  />
                  <AuthRoute
                    Component={AdminEmployeesPage}
                    exact
                    path={'/main/admin/employees'}
                  />
                  <AuthRoute
                    Component={EquipmentTypePage}
                    exact
                    path={'/main/admin/equipment-type'}
                  />
                  <AuthRoute
                    Component={AdminGroupsPage}
                    exact
                    path={'/main/admin/groups'}
                  />
                  <AuthRoute
                    Component={AdminInvoicingPage}
                    exact
                    path={'/main/admin/invoicing'}
                  />
                  <AuthRoute
                    Component={AdminInvoicingItemsPage}
                    exact
                    path={'/main/admin/invoicing/items'}
                  />
                  <AuthRoute
                    Component={JobTypesPage}
                    exact
                    path={'/main/admin/job-types'}
                  />
                  <AuthRoute
                    Component={ReportNumberPage}
                    exact
                    path={'/main/admin/report-number'}
                  />
                  <AuthRoute
                    Component={RolesPermissionsPage}
                    exact
                    path={'/main/admin/roles-permissions'}
                  />
                  <AuthRoute
                    Component={RolesManagerPage}
                    exact
                    path={'/main/admin/roles-permissions/manager-list'}
                  />
                  <AuthRoute
                    Component={RolesTechnicianPage}
                    exact
                    path={'/main/admin/roles-permissions/technician-list'}
                  />
                  <AuthRoute
                    Component={ViewRolePage}
                    exact
                    path={'/main/admin/roles-permissions/view-roles'}
                  />
                  <AuthRoute
                    Component={AdminVendorsPage}
                    exact
                    path={'/main/admin/vendors'}
                  />
                </Switch>
              </Grid>
            </Grid>
            <BCModal />
          </Route>
        </Suspense>
      </Switch>
    </Router>
  );
}
export default Main;
