import {
  PermissionsState,
  RolesAndPermissions,
  UserPermissionsActionType,
} from 'actions/permissions/permissions.types';
import { Reducer } from 'redux';

export const initialRolesAndPermissions: RolesAndPermissions = {
  'admin': {
    'addVendors': false,
    'manageItems': false,
    'manageCompanySettings': false,
    'manageEmployeeInfoAndPermissions': false
  },
  'dispatch': {
    'serviceTickets': false,
    'jobs': false
  },
  'accounting': {
    'invoicing': false,
    'customerPayments': false,
    'vendorPayments': false,
    'reporting': false
  },
  'superAdmin': {
    'editBillingInformation': false
  },
  'customers': {
    'editCustomerSettings': false,
    'overridePORequired': false
  }
};

const initialPermissions: PermissionsState = {
  loading: false,
  hasLoaded: false,
  rolesAndPermissions: initialRolesAndPermissions,
  error: '',
};

const PermissionsReducer: Reducer<any> = (
  state = initialPermissions,
  action
) => {
  switch (action.type) {
    case UserPermissionsActionType.LOADING:
      return {
        ...state,
        loading: true,
      };
    case UserPermissionsActionType.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        hasLoaded: true,
        rolesAndPermissions: {
          ...initialRolesAndPermissions,
          ...action.payload
        }
      }
    case UserPermissionsActionType.NO_RECORD:
      return {
        ...state,
        loading: false,
        hasLoaded: true,
        rolesAndPermissions: initialRolesAndPermissions
      }
    case UserPermissionsActionType.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false
      }
    default:
  }
  return state;
};

export default PermissionsReducer