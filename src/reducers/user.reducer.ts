import { Reducer } from 'redux';
import { initialCompanyProfileState, CompanyProfileActonType } from './../actions/user/user.types';

export const CompanyProfileReducer: Reducer<any> = (state = initialCompanyProfileState, action) => {
  switch (action.type) {
    case CompanyProfileActonType.LOADING:
      return { ...state, isLoading: action.payload }
    case CompanyProfileActonType.ONCHANGE: {
      const { id, value, inputError } = action.payload

      return { ...state, [id]: value, inputError }
    }
    case CompanyProfileActonType.UPDATE_SUCCESS:
      return { ...state }
    case CompanyProfileActonType.FETCH_SUCCESS: {
      const { address, contact, info } = action.payload;
      const newState = {
        companyName: info.companyName,
        companyEmail: info.companyEmail,
        logoUrl: info.logoUrl,
        fax: contact.fax,
        phone: contact.phone,
        city: address.city,
        state: address.state,
        street: address.street,
        zipCode: address.zipCode
      }
      return { ...newState, inputError: {}, serverError: null }
    }
    case CompanyProfileActonType.ON_UPDATE_ERROR:
      return {
        ...state, serverError: action.payload
      }
    case CompanyProfileActonType.ON_FETCH_ERROR:
      return {
        ...state, serverError: action.payload
      }
    default:
  }
  return state;
}
