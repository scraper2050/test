export const types = {
  COMPANY_CONTRACTS_LOAD: "loadCompanyContractsActions"
};

export interface VendorsState {
  readonly loading: boolean
  readonly data?: any[]
  readonly error?: string
}

export enum VendorActionType {
  GET = 'getVendors',
  SET = 'setVendors',
  SUCCESS = 'getVendorsSuccess',
  FAILED = 'getVendorsFailed',
  SET_SINGLE_CONTRACTOR = 'setsinglecontractor',
}
