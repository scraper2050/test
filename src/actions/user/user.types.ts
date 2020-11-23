export const types = {
  'UPDATE_COMPANY_PROFILE': 'updateCompanyProfile'
}

export interface CompanyProfile {
  "status": number,
  "message": string,
}

export interface CompanyProfileState {
  readonly data?: CompanyProfile
}

export enum CompanyProfileActonType {
  SUCCESS = 'updatedCompanyProfile',
  FAILED = 'failedUpdating'
}
