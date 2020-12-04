export const types = {
  'UPDATE_COMPANY_PROFILE': 'updateCompanyProfile'
}

export interface CompanyProfile {
  companyName: string,
  companyEmail: string,
  logoUrl?: string,
  street?: string,
  city?: string,
  state?: string,
  zipCode?: string,
  phone: string,
  fax?: string,
}

export interface CompanyProfileRes {
  "status"?: number,
  "message"?: string,
}

export interface CompanyProfileState {
  readonly data?: CompanyProfileRes
}

export enum CompanyProfileActonType {
  SUCCESS = 'updatedCompanyProfile',
  FAILED = 'failedUpdating'
}
