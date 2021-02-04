export const types = {
  'CUSTOMER_LOAD': 'loadCustomersActions',
  'CUSTOMER_NEW': 'newCustomerAction',
  'CUSTOMER_REMOVE': 'deleteCustomerActions',
  'SET_CUSTOMERS': 'setCustomer',
  'SET_SINGLE_CUSTOMER': 'setSingleCustomer',
  'GET_SINGLE_CUSTOMER': 'getSingleCustomer',
  'UPDATE_CUSTOMER_FAILED': 'updateCustomerFailed'
};

export interface Customer {
  _id: string
  info: {
    name?: string
    email: string
  }
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  contact: {
    name: string
    phone: string
  }
  isActive: boolean
  company: string
  contactname: string
  profile: {
    firstName: string
    lastName: string
    displayName: string
  }
  vendorId: string
}

export interface CustomersState {
  readonly loading: boolean
  readonly data?: Customer[]
  readonly error?: string
  readonly customerObj?: Customer
}

export enum CustomersActionType {
  GET = 'getCustomers',
  SUCCESS = 'getCustomersSuccess',
  FAILED = 'getCustomersFailed',
}
