export const types = {
  'COMPANY_CONTRACTS_LOAD': "loadCompanyContractsActions",
  'GET_SINGLE_VENDOR': 'getSingleCustomer'
};

export interface InfoTypes {
  companyEmail: string;
  companyName: string;
}

export interface Vendor {
  _id: string;
  status: number;
  contractor: {
    _id: string;
    type: number;
    info: InfoTypes
  };
  company: {
    _id: string;
    type: number;
    info: InfoTypes
  },
  extraPermission?: any[];
}

export interface VendorsState {
  readonly loading: boolean
  readonly data?: any[]
  readonly error?: string
  readonly vendorObj?: Vendor | {}
}

export enum VendorActionType {
  GET = 'getVendors',
  SET = 'setVendors',
  SUCCESS = 'getVendorsSuccess',
  FAILED = 'getVendorsFailed',
  SET_SINGLE_VENDOR = 'setSingleVender',
  GET_SINGLE_VENDOR = 'getSingleVendor',
}
