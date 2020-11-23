import { Reducer } from 'redux';
import { CompanyProfileState, CompanyProfileActonType, types } from './../actions/user/user.types';

const initialCompanyProfile: CompanyProfileState = {
  data: undefined
}

export const CompanyProfileReducer: Reducer<any> = (state = initialCompanyProfile, action) => {
  switch (action.type) {
    case CompanyProfileActonType.SUCCESS:
      return {
        data: action.payload,
      }
  }
  return state;
}
