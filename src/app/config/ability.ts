import { User } from 'actions/employee/employee.types';
import { AbilityBuilder, AbilityClass, PureAbility } from '@casl/ability';
import { RolesAndPermissions } from 'actions/permissions/permissions.types';

export type Actions =
  | 'add'
  | 'edit'
  | 'view'
  | 'manage'
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'bypass';
export type Subjects =
  | 'Vendor'
  | 'Items'
  | 'Company'
  | 'Employee'
  | 'Jobs'
  | 'Tickets'
  | 'Invoicing'
  | 'CustomerPayments'
  | 'VendorPayments'
  | 'Reporting'
  | 'BillingInformation'
  | 'CustomerSettings'
  | 'PORequirement';

export type AppAbility = PureAbility<[Actions, Subjects]>;
export const appAbility = PureAbility as AbilityClass<AppAbility>;

export default function defineRulesFor(user: User, rolesAndPermissions: RolesAndPermissions) {
  const { can, rules } = new AbilityBuilder(appAbility);
  if (!user) {
    return rules;
  }
  const { permissions } = user;
  const isAdmin = permissions?.role === 3;

  // Admin
  if (rolesAndPermissions?.admin?.addVendors || isAdmin) {
    can('add', 'Vendor');
  }
  if (rolesAndPermissions?.admin?.manageItems || isAdmin) {
    can('manage', 'Items');
  }
  if (rolesAndPermissions?.admin?.manageCompanySettings || isAdmin) {
    can('manage', 'Company');
  }
  if (rolesAndPermissions?.admin?.manageEmployeeInfoAndPermissions || isAdmin) {
    can('manage', 'Employee');
  }
  // Dispatch
  if (rolesAndPermissions?.dispatch?.jobs || isAdmin) {
    can('manage', 'Jobs');
  }
  if (rolesAndPermissions?.dispatch?.serviceTickets || isAdmin) {
    can('manage', 'Tickets');
  }

  // Accounting
  if (rolesAndPermissions?.accounting?.invoicing || isAdmin) {
    can('manage', 'Invoicing');
  }
  if (rolesAndPermissions?.accounting?.customerPayments || isAdmin) {
    can('manage', 'CustomerPayments');
  }
  if (rolesAndPermissions?.accounting?.vendorPayments || isAdmin) {
    can('manage', 'VendorPayments');
  }
  if (rolesAndPermissions?.accounting?.reporting || isAdmin) {
    can('manage', 'Reporting');
  }

  if (rolesAndPermissions?.superAdmin?.editBillingInformation || isAdmin) {
    can('edit', 'BillingInformation');
  }

  if (rolesAndPermissions?.customers?.editCustomerSettings || isAdmin) {
    can('edit', 'CustomerSettings');
  }

  if (rolesAndPermissions?.customers?.overridePORequired || isAdmin) {
    can('bypass', 'PORequirement');
  }

  return rules;
}
