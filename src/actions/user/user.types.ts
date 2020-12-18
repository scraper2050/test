export interface CompanyProfile {
  companyName: string;
  companyEmail: string;
  logoUrl?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone: string;
  fax?: string;
}

export interface CompanyProfileOtherState {
  inputError: {[k: string]: boolean}
  serverError: any,
  isLoading: boolean
}
export interface CompanyProfileRes {
  status?: number;
  message?: string;
}

export const companyProfileState: CompanyProfile = {
  companyName: '',
  companyEmail: '',
  fax: '',
  phone: '',
  city: '',
  state: '',
  zipCode: '',
  logoUrl: '',
  street: '',
}

export type CompanyProfileStateType = CompanyProfile & CompanyProfileOtherState

export const initialCompanyProfileState: CompanyProfileStateType = {
  ...companyProfileState,
  inputError: {},
  serverError: null,
  isLoading: false
};


export enum CompanyProfileActonType {
  ONCHANGE = "ON_VALUE_CHANGE",
  LOADING = "IS_LOADING",
  UPDATE_SUCCESS = "COMPANY_PROFILE_UPDATE_SUCCESSFUL",
  FETCH_SUCCESS = 'FETCH_COMPANY_PROFILE_SUCCESSFUL',
  ON_UPDATE_ERROR = "COMPANY_PROFILE_UPDATE_FAILED",
  ON_FETCH_ERROR = "COMPANY_PROFILE_FETCH_FAILED",
  ON_INPUT_ERROR = 'VALIDATION_FAILED'
}
